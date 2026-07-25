# -*- coding: utf-8 -*-
"""
discover_rakuten.py  ―― 楽天出品タイトルからハウスネームを発見する（Layer 1・逆引き）
---------------------------------------------------------------------
price_crawler.py が「既知の品種名で検索して相場を集める」のに対し、
本スクリプトはその逆で「楽天の新着出品タイトルから"未知の品種名・ハウスネーム"を掘り出す」。

  1. キーワード群×新着順で楽天商品検索API（price_crawler.search を再利用）
  2. タイトルから候補名を抽出（【】内 / メダカ直前 / 「」内）
  3. ストップワード辞書と既知名（図鑑＋マスタ）で除外
  4. 信頼度スコアリング（異なる店舗数・構造・分類抽出可否）
  5. HIGH → tools/_rakuten_auto.json（rakuten_build.py が draft 品種に変換）
     LOW  → tools/inbox.json（人手確認用。medaka_crawler と同じ形式）
  6. tools/crawler-log.txt に実行ログ

※ LLMは使わない（実行コストほぼゼロ）。楽天APIのマナー（1.2秒間隔）を守る。
※ 認証は price_crawler と同じ（tools/rakuten_app_id.txt ＋ rakuten_access_key.txt）。

使い方:
  python discover_rakuten.py            # 発見を実行（_rakuten_auto.json と inbox に出力）
  python discover_rakuten.py --dry-run  # ファイルに書かず、結果を画面表示するだけ
"""
import os, re, sys, json, time
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))

sys.path.insert(0, HERE)
import price_crawler as pc          # 認証・検索を再利用
from layer2_build import parse_type  # 分類抽出ロジックを再利用（付け方を図鑑本体と一致させる）

# ---- 発見に使うキーワードと収集設定 ----
KEYWORDS = [
    "メダカ 新品種", "メダカ ラメ", "メダカ 三色", "メダカ サムライ",
    "メダカ 体外光", "メダカ ヒレ長", "メダカ 幹之", "メダカ 極上",
]
PAGES_PER_KW = 3        # 1キーワードあたり何ページ取るか（hits30×3＝最大90件/kw）
HITS = 30
AUTO_LIMIT = 30         # 1回で自動追加（HIGH）に回す上限。超過分は次回へ（ログに残す）
SHOP_THRESHOLD = 2      # HIGH判定：この店舗数以上で出現していること

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")
def now_str():
    return datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S")

# ---- 正規化（medaka_crawler.norm と同じ：括弧内・空白区切りを除去）----
def norm(name):
    s = name or ""
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s)
    s = re.sub(r"[\s　、,・]", "", s)
    return s.strip()

# ---- 既知名（図鑑＋マスタの name/aliases）を集める（medaka_crawler.load_known 相当）----
def load_known():
    known = set()
    for fn in ("variety-master.js", "medaka-data.js"):
        p = os.path.join(DATA, fn)
        if not os.path.exists(p):
            continue
        txt = open(p, encoding="utf-8").read()
        for m in re.findall(r'name:\s*"([^"]+)"', txt):
            known.add(norm(m))
        for arr in re.findall(r'aliases:\s*\[([^\]]*)\]', txt):
            for a in re.findall(r'"([^"]+)"', arr):
                known.add(norm(a))
    known.discard("")
    known.discard(norm("（品種名）"))
    return known

# ---- ストップワード辞書 ----
def load_stopwords():
    p = os.path.join(HERE, "_stopwords.json")
    if not os.path.exists(p):
        return set()
    try:
        d = json.load(open(p, encoding="utf-8"))
        return set(norm(w) for w in d.get("words", []))
    except Exception:
        return set()

# ---- 候補名の抽出（構造手がかり）----
# 戻り値：[(candidate_name, structural_bool)]。structural=括弧内/区切り前/メダカ直前で採れたか
BRACKET = re.compile(r"[【「『（(\[]([^】」』）)\]]{2,16})[】」』）)\]]")
BEFORE_MEDAKA = re.compile(r"([ァ-ヶーゝ一-龠々]{2,14})\s*(?:めだか|メダカ|目高)")
# めだかの館式「名前：オスx、メスy…」→ ： の手前を品種名とみなす
BEFORE_COLON = re.compile(r"([ァ-ヶーゝ一-龠々a-zA-Z]{2,16})\s*[：:]\s*(?:オス|メス|\d|ペア|同|各|５|３)")

def pc_clean(t):
    # 装飾（＜通常価格〇〇円＞【送料無料】等）を除去してから抽出
    t = re.sub(r"[＜<][^＜<＞>]*[＞>]", "", t or "")
    t = re.sub(r"【[^】]*(送料|無料|即納|在庫|限定|ポイント|セール|クーポン|予約)[^】]*】", "", t)
    return t.strip()

def extract_candidates(title):
    out = []
    t = pc_clean(title)
    for m in BEFORE_COLON.finditer(t):
        out.append((m.group(1).strip(), True))
    for m in BRACKET.finditer(t):
        out.append((m.group(1).strip(), True))
    for m in BEFORE_MEDAKA.finditer(t):
        out.append((m.group(1).strip(), True))
    # クリーニング＋ノイズ除去して返す
    cleaned = []
    for name, structural in out:
        c = clean_candidate(name)
        if c:
            cleaned.append((c, structural))
    return cleaned

# ---- 候補語のクリーニング＆ハードリジェクト ----
# 数量・梱包・販促・ブランド等、品種名でないものを弾く
HARD_REJECT = re.compile(
    r"(\d|×|✕|ｘ|x\d|セット|ペア|匹|個|袋|パック|限定|送料|無料|即納|在庫|中古|新品|雑誌|"
    r"本体|代引|同梱|対応|育成|現物|販売|注文|予約|クーポン|ポイント|お得|特価|割引|"
    r"全国|沖縄|北海道|離島|生体|飼育|産卵|餌|エサ|フード|水草|水槽|ヒーター|フィルター|"
    r"ゾウリムシ|ミジンコ|クロレラ|バクテリア|ビオトープ|"
    # 一般語・販促語（品種名ではない）
    r"メダカ|めだか|目高|キレイ|綺麗|簡単|高級|幼魚|成魚|成体|幼体|若魚|通販|観賞|鑑賞|"
    r"品種改良|改良|浮き草|浮草|強光|スーパー|ゴールド|サンシャイン|無農薬|まとめ|ペット|"
    r"取り寄せ|前後|ミリ|別途|当店|人気|おすすめ|ランキング|数量|各種|種類|厳選|"
    r"有精卵|卵|針子|普通種|体型|"
    r"熱帯魚|観賞魚|淡水魚|川魚|錦鯉|金魚|エビ|貝)")
# 熱帯魚ブランド・メーカー（品種名ではない）
BRANDS = {"テトラ", "Tetra", "ジェックス", "GEX", "スドー", "キョーリン", "ニチドウ",
          "コトブキ", "エーハイム", "熱帯魚", "観賞魚", "淡水魚", "川魚"}
# 純粋な形質語（これ"だけ"で構成される名前はハウスネームでなく形質＝layer2/3の担当）
TRAIT_ONLY = ["三色ラメ", "虹色ラメ", "ラメ幹之", "体外光", "体内光", "ラメ", "三色", "二色",
              "サムライ", "ヒレ長", "リアルロングフィン", "ロングフィン", "スワロー", "ダルマ",
              "半ダルマ", "ヒカリ", "透明鱗", "半透明鱗", "アルビノ", "オーロラ", "ブラックリム",
              "錦", "斑", "朱赤", "楊貴妃", "黄金", "琥珀", "オロチ", "ブラック", "ピンク",
              "オレンジ", "スカイブルー", "マリンブルー", "青", "白", "黄", "茶", "幹之",
              "和墨", "銀", "白銀", "紅白", "メダカ", "めだか"]

def clean_candidate(name):
    s = (name or "").strip()
    # 前後の区切り・記号を除去
    s = re.sub(r"^[／/・,、\s　]+|[／/・,、\s　]+$", "", s)
    if len(s) < 2 or len(s) > 16:
        return None
    if HARD_REJECT.search(s):
        return None
    if s in BRANDS:
        return None
    return s

def is_pure_trait(name):
    """名前が形質語だけで構成されているか（＝ハウスネームではない）"""
    rest = name
    for w in sorted(TRAIT_ONLY, key=len, reverse=True):
        rest = rest.replace(w, "")
    rest = re.sub(r"[ァ-ヶー\s　]", "", rest) if False else rest
    return rest.strip() == ""

# ---- 固有名詞らしさ（ハウスネームは"命名された"語）----
KATA_RUN = re.compile(r"[ァ-ヶー]{3,}")     # フェアリー/モルフォ/マリアージュ等
def is_proper_noun_like(name):
    if KATA_RUN.search(name):
        return True
    # 形質語を除いた後に、2文字以上の漢字が残れば固有名詞的（藤煌・桜餅・上州 等）
    rest = name
    for w in sorted(TRAIT_ONLY, key=len, reverse=True):
        rest = rest.replace(w, "")
    kanji = "".join(re.findall(r"[一-龠々]", rest))
    return len(kanji) >= 2

# ---- 候補が品種名らしいか（体色/形質のヒントを持つか）----
def phenotype_parseable(text):
    ph, refs = parse_type(text)
    return bool(ph.get("bodyColor")) or any(ph.get(k) for k in
              ("iridophore", "bodyType", "finVariation", "eyeVariation")) or bool(refs)

# ---- inbox 入出力（medaka_crawler と同じ形式）----
def load_inbox():
    p = os.path.join(HERE, "inbox.json")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else []

def write_inbox_md(inbox):
    new = [x for x in inbox if x.get("status") == "new"]
    lines = ["# 新品種候補インボックス（未処理）", "",
             f"未処理 {len(new)} 件 / 全 {len(inbox)} 件。処理したら status を \"done\" に変えてください。", ""]
    if new:
        lines += ["| 品種名 | 情報源 | 発見日 | リンク |", "|---|---|---|---|"]
        for x in new:
            lines.append(f'| {x["name"]} | {x["source"]} | {x["foundOn"]} | {x["url"]} |')
    else:
        lines.append("（未処理の新規候補はありません）")
    open(os.path.join(HERE, "inbox.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")

def search_url(name):
    import urllib.parse
    kw = "メダカ " + name
    return "https://search.rakuten.co.jp/search/mall/" + urllib.parse.quote(kw) + "/"

def main():
    dry = "--dry-run" in sys.argv
    app_id = pc.load_app_id()
    access_key = pc.load_access_key()
    if not app_id or not access_key:
        print("ERROR: 認証情報がありません（tools/rakuten_app_id.txt と rakuten_access_key.txt）")
        sys.exit(1)

    known = load_known()
    stop = load_stopwords()

    # 候補ごとに { key: {name, shops:set, count, structural, sampleTitle, url} } を集約
    agg = {}
    scanned, errors = 0, []
    for kw in KEYWORDS:
        for page in range(1, PAGES_PER_KW + 1):
            try:
                res = _search_page(app_id, access_key, kw, page)  # 新着順・ページ指定つき検索
                items = res.get("Items", []) if isinstance(res, dict) else []
            except Exception as e:
                errors.append(f"{kw} p{page}: {type(e).__name__}")
                time.sleep(1.2)
                continue
            for it in items:
                title = it.get("itemName", "")
                shop = it.get("shopCode") or it.get("shopName") or ""
                scanned += 1
                for cand, structural in extract_candidates(title):
                    key = norm(cand)
                    if not key or key in known or key in stop:
                        continue
                    if len(key) < 2:
                        continue
                    rec = agg.setdefault(key, {
                        "name": cand, "shops": set(), "count": 0,
                        "structural": False, "sampleTitle": title, "url": search_url(cand)})
                    rec["shops"].add(shop)
                    rec["count"] += 1
                    rec["structural"] = rec["structural"] or structural
            time.sleep(1.2)

    # ---- 信頼度判定 ----
    # 【重要】本物のハウスネームは希少（1店舗・少数出品）で、汎用ノイズは多店舗に出る。
    # よって頻度ではなく「語の質」で判定する：
    #   HIGH（自動追加）= 純粋な形質語でない かつ 固有名詞らしい かつ 分類のヒントがある
    #   それ以外は LOW（inbox で人手確認）
    high, low = [], []
    for key, r in agg.items():
        name = r["name"]
        shop_count = len([s for s in r["shops"] if s])
        parseable = phenotype_parseable(r["sampleTitle"])
        proper = is_proper_noun_like(name)
        pure_trait = is_pure_trait(name)
        is_high = proper and (not pure_trait) and parseable
        item = {
            "name": name, "descriptor": _descriptor(r["sampleTitle"]),
            "sampleTitle": r["sampleTitle"], "searchUrl": r["url"],
            "shopCount": shop_count, "listingCount": r["count"], "foundOn": today(),
        }
        (high if is_high else low).append(item)

    # 固有名詞らしさ→出現数の順に並べ、上限で切る（超過はログに残す）
    high.sort(key=lambda x: (-x["shopCount"], -x["listingCount"]))
    overflow = []
    if len(high) > AUTO_LIMIT:
        overflow = high[AUTO_LIMIT:]
        high = high[:AUTO_LIMIT]

    # ---- 出力 ----
    log = (f"[{now_str()}] 楽天発見: 走査{scanned}件 / 候補{len(agg)} "
           f"/ HIGH{len(high)}(自動追加) / LOW{len(low)}(inbox) "
           f"/ 上限超過{len(overflow)} / エラー{len(errors)}")
    if errors:
        log += " :: " + " | ".join(errors[:6])

    if dry:
        print(log)
        print("\n=== HIGH（自動追加候補）===")
        for h in high:
            print(f'  ★ {h["name"]}  店舗{h["shopCount"]}/出品{h["listingCount"]}  «{h["descriptor"]}»')
        print("\n=== LOW（inbox・人手確認）上位20 ===")
        for l in sorted(low, key=lambda x: -x["shopCount"])[:20]:
            print(f'  ・ {l["name"]}  店舗{l["shopCount"]}/出品{l["listingCount"]}')
        if overflow:
            print(f"\n（今回の上限{AUTO_LIMIT}を超えた{len(overflow)}件は次回に回します）")
        print("\n(--dry-run のためファイルには書き込みません)")
        return

    # HIGH → _rakuten_auto.json
    json.dump(high, open(os.path.join(HERE, "_rakuten_auto.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    # LOW（＋上限超過HIGH）→ inbox.json（重複回避）
    inbox = load_inbox()
    seen = set(norm(x["name"]) for x in inbox)
    for item in low + overflow:
        k = norm(item["name"])
        if k in seen:
            continue
        seen.add(k)
        inbox.append({"name": item["name"], "source": "楽天市場",
                      "url": item["searchUrl"], "foundOn": today(), "status": "new"})
    json.dump(inbox, open(os.path.join(HERE, "inbox.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    write_inbox_md(inbox)

    with open(os.path.join(HERE, "crawler-log.txt"), "a", encoding="utf-8") as f:
        f.write(log + "\n")

    print(log)
    print(f"=> HIGH {len(high)}件を _rakuten_auto.json に書き出しました（rakuten_build.py で図鑑へ）")
    print(f"=> LOW/超過 {len(low)+len(overflow)}件を inbox に追記しました")


# ---- ページ指定つき検索（price_crawler.search にpageを足した版）----
def _search_page(app_id, access_key, keyword, page):
    import urllib.parse, urllib.request, json as _json
    q = urllib.parse.urlencode({
        "applicationId": app_id, "accessKey": access_key, "keyword": keyword,
        "hits": HITS, "page": page, "sort": "-updateTimestamp",
        "format": "json", "formatVersion": 2,
    })
    req = urllib.request.Request(pc.API + "?" + q, headers={"User-Agent": "MedakaZukanBot/1.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return _json.loads(r.read().decode("utf-8", "ignore"))

# ---- サンプルタイトルから形質語だけ抜き出して descriptor にする ----
DESC_WORDS = ["三色ラメ", "虹色ラメ", "ラメ幹之", "体外光", "体内光", "ラメ", "三色", "二色",
              "サムライ", "ヒレ長", "リアルロングフィン", "スワロー", "ダルマ", "ヒカリ",
              "透明鱗", "半透明鱗", "アルビノ", "オーロラ", "ブラックリム", "錦", "斑",
              "朱赤", "楊貴妃", "黄金", "琥珀", "オロチ", "ブラック", "ピンク", "オレンジ",
              "スカイブルー", "青", "白", "黄", "茶", "幹之"]
def _descriptor(title):
    t = pc_clean(title)
    found = [w for w in DESC_WORDS if w in t]
    return "".join(dict.fromkeys(found))  # 重複除去して連結

if __name__ == "__main__":
    main()
