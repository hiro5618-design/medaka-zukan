# -*- coding: utf-8 -*-
"""
price_crawler.py  ―― 相場（価格）収集スクリプト
---------------------------------------------------------------------
楽天市場API（楽天ウェブサービス）で「メダカ ＋ 品種名」を検索し、
出品タイトルから 卵 / 針子 / 成魚 を判定して、ステージ別に
最安・平均・最高・件数を集計 → data/price-history.js に追記します。

【認証情報の設定（2026年2月の楽天API刷新後は2つ必要）】
  1) アプリケーションID（UUID形式）
       環境変数 RAKUTEN_APP_ID か、tools/rakuten_app_id.txt に保存
  2) アクセスキー（pk_ で始まる文字列）
       環境変数 RAKUTEN_ACCESS_KEY か、tools/rakuten_access_key.txt に保存
  ※ このリポジトリは公開なので、両ファイルとも .gitignore で除外されます（絶対にコミットしない）
  ※ 旧API（app.rakuten.co.jp）は2026-05-14に停止済み。本スクリプトは新API対応版。

【使い方】
  python price_crawler.py --status done --limit 100   # まずは充実登録の品種を100件（約2分）
  python price_crawler.py --resume                    # 続きから（本日取得済みは自動でスキップ）
  python price_crawler.py m004 m003                   # 品種IDを指定（テスト用）
  python price_crawler.py                             # 全1241品種（約26分）

  オプション
    --status done|draft  … 充実登録済み／調査中だけに絞る
    --limit N            … 先頭N件だけ実行する（分割実行用）
    --resume             … 本日すでに取得した品種を飛ばす（中断からの再開）

※ 楽天APIのマナーに従い、1.2秒に1リクエストに抑えています。
※ 充実登録（done）の品種から先に回すので、途中で止めても価値の高い品種から埋まります。
※ Ctrl+C で中断してもその時点までの結果は保存されます。
"""
import os, re, sys, json, time, urllib.parse, urllib.request
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))
API  = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20220601"

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")

# ---- 認証情報読み込み（アプリケーションID＋アクセスキー） ----
def _load_secret(env_name, file_name):
    v = os.environ.get(env_name, "").strip()
    if v:
        return v
    p = os.path.join(HERE, file_name)
    if os.path.exists(p):
        return open(p, encoding="utf-8").read().strip()
    return ""

def load_app_id():
    return _load_secret("RAKUTEN_APP_ID", "rakuten_app_id.txt")

def load_access_key():
    return _load_secret("RAKUTEN_ACCESS_KEY", "rakuten_access_key.txt")

# ---- 品種一覧（id, name, aliases, status）を medaka-data.js から取得 ----
#     ※IDは m001〜m1241。3桁固定で書くと m1000番台を取りこぼすので m\d{3,4} にすること
def load_varieties():
    txt = open(os.path.join(DATA, "medaka-data.js"), encoding="utf-8").read()
    out = []
    pat = re.compile(
        r'id:\s*"(m\d{3,4})",\s*name:\s*"([^"]+)",\s*reading:\s*"[^"]*",\s*'
        r'aliases:\s*\[([^\]]*)\],\s*status:\s*"([^"]*)"',
        re.S)
    for m in pat.finditer(txt):
        vid, name, al, status = m.group(1), m.group(2), m.group(3), m.group(4)
        if vid == "m000" or status == "template":
            continue
        aliases = re.findall(r'"([^"]+)"', al)
        out.append((vid, name, aliases, status))
    return out

# ---- ステージ判定 ----
EXCLUDE = ("餌","エサ","フード","水草","容器","ネット","本","書籍","カレンダー","グッズ",
           "ケース","ポンプ","ソイル","肥料","Tシャツ","ステッカー","水槽","ヒーター","バクテリア")
def classify(name):
    """出品タイトル -> 'egg' / 'fry' / 'adult' / None(対象外)"""
    if any(k in name for k in EXCLUDE):
        return None
    if ("卵" in name) or ("たまご" in name) or ("有精卵" in name):
        return "egg"
    if ("針子" in name) or ("稚魚" in name) or ("はりこ" in name):
        return "fry"
    if any(k in name for k in ("成魚","親魚","ペア","オス","メス","若魚","サイズ","匹")):
        return "adult"
    return None   # 判定できないものは採用しない（誤データ防止）

STAGE_NOTE = {
    "egg":   "数量（10個入り等）は出品により異なります",
    "fry":   "匹数は出品により異なります",
    "adult": "匹数・サイズは出品により異なります",
}

# ---- 楽天API検索 ----
def search(app_id, access_key, keyword, hits=30):
    q = urllib.parse.urlencode({
        "applicationId": app_id, "accessKey": access_key, "keyword": keyword,
        "hits": hits, "format": "json", "formatVersion": 2,
    })
    req = urllib.request.Request(API + "?" + q, headers={"User-Agent": "MedakaZukanBot/1.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))

def clean_url(url):
    """楽天が付けるトラッキングパラメータ（rafcid等。アプリIDを含む）を除去する"""
    return url.split("?")[0]

def aggregate(items):
    buckets = {"egg": [], "fry": [], "adult": []}
    for it in items:
        name = it.get("itemName", "")
        price = it.get("itemPrice")
        url = clean_url(it.get("itemUrl", ""))
        st = classify(name)
        if st and isinstance(price, int) and price > 0:
            buckets[st].append((price, url))
    stages = {}
    for st, arr in buckets.items():
        if not arr:
            stages[st] = {"min": None, "avg": None, "max": None, "count": 0, "minUrl": "", "note": STAGE_NOTE[st]}
            continue
        arr.sort(key=lambda x: x[0])
        prices = [p for p, _ in arr]
        stages[st] = {
            "min": prices[0],
            "avg": int(round(sum(prices) / len(prices))),
            "max": prices[-1],
            "count": len(prices),
            "minUrl": arr[0][1],
            "note": STAGE_NOTE[st],
        }
    return stages

# ---- price-history.js の読み書き ----
def load_records():
    p = os.path.join(DATA, "price-history.js")
    if not os.path.exists(p):
        return []
    txt = open(p, encoding="utf-8").read()
    m = re.search(r"records:\s*(\[.*?\])\s*};", txt, re.S)
    if not m:
        return []
    try:
        return json.loads(m.group(1))
    except Exception:
        return []

HEADER = '''/* =====================================================================
 * price-history.js  ―― 相場（価格）履歴データ  ※このファイルは price_crawler.py が自動生成します
 * ---------------------------------------------------------------------
 * 1レコード ＝ 品種ID × 調査日 × 情報源。中に卵/針子/成魚の3ステージ。
 * 各ステージ：min(最安)/avg(平均)/max(最高)/count(件数)/minUrl(最安出品URL)/note(備考)
 * ===================================================================== */
window.MEDAKA_PRICES = {
  currency: "JPY",
  note: "楽天市場の複数ショップの出品から集計した参考相場です。数量・サイズは出品により異なります。",
  records: '''

def save_records(records):
    body = json.dumps(records, ensure_ascii=False, indent=2)
    open(os.path.join(DATA, "price-history.js"), "w", encoding="utf-8").write(HEADER + body + "\n};\n")

def opt(name, default=None):
    """--name 値 の形のオプションを取り出す"""
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return default

def main():
    app_id = load_app_id()
    access_key = load_access_key()
    if not app_id:
        print("ERROR: Rakuten application id not found.")
        print("  -> set env RAKUTEN_APP_ID, or create tools/rakuten_app_id.txt")
        sys.exit(1)
    if not access_key:
        print("ERROR: Rakuten access key not found.")
        print("  -> set env RAKUTEN_ACCESS_KEY, or create tools/rakuten_access_key.txt")
        sys.exit(1)

    all_targets = load_varieties()
    ids = [a for a in sys.argv[1:] if re.match(r"^m\d{3,4}$", a)]
    if ids:
        targets = [t for t in all_targets if t[0] in set(ids)]
    else:
        targets = all_targets
        # --status done / draft で絞り込み
        st = opt("--status")
        if st:
            targets = [t for t in targets if t[3] == st]
        # 充実登録（done）を先に回す。途中で止めても価値の高い品種から埋まる
        targets.sort(key=lambda t: (0 if t[3] == "done" else 1, t[0]))

    records = load_records()
    # 同日・同品種・同ソースの重複は上書き
    key = lambda r: (r["id"], r["checkedOn"], r["source"])
    existing = {key(r): i for i, r in enumerate(records)}

    d = today()
    # 再開用：今日すでに取得済みの品種は飛ばす（中断しても続きから回せる）
    if "--resume" in sys.argv:
        before = len(targets)
        targets = [t for t in targets if (t[0], d, "楽天市場") not in existing]
        print(f"再開モード：本日取得済み {before - len(targets)}件をスキップ")

    lim = opt("--limit")
    if lim:
        targets = targets[:int(lim)]

    if not targets:
        print("対象の品種がありません（すべて取得済みか、条件に一致しません）"); sys.exit(0)

    est = round(len(targets) * 1.25 / 60)
    print(f"対象 {len(targets)}品種 / 全 {len(all_targets)}品種 中　所要時間の目安：約{est}分")
    print("（Ctrl+C で中断できます。--resume を付けて再実行すると続きから再開します）\n")

    added, errors = 0, []
    done_n = 0
    for vid, name, aliases, status in targets:
        done_n += 1
        kw = "メダカ " + name
        try:
            res = search(app_id, access_key, kw)
            items = res.get("Items", []) if isinstance(res, dict) else []
            stages = aggregate(items)
            total = sum(s["count"] for s in stages.values())
            # 品種名で0件なら別名で再検索（最初にヒットした別名を採用）
            if total == 0:
                for alt in aliases:
                    time.sleep(1.2)
                    kw2 = "メダカ " + alt
                    res = search(app_id, access_key, kw2)
                    items = res.get("Items", []) if isinstance(res, dict) else []
                    st2 = aggregate(items)
                    if sum(s["count"] for s in st2.values()) > 0:
                        stages, kw = st2, kw2
                        total = sum(s["count"] for s in stages.values())
                        break
            rec = {
                "id": vid, "checkedOn": d, "source": "楽天市場",
                "searchUrl": "https://search.rakuten.co.jp/search/mall/" + urllib.parse.quote(kw) + "/",
                "stages": stages,
            }
            k = key(rec)
            if k in existing:
                records[existing[k]] = rec
            else:
                records.append(rec); existing[k] = len(records) - 1
            added += 1
            print(f"[{done_n}/{len(targets)}] {vid} {name}: egg={stages['egg']['count']} "
                  f"fry={stages['fry']['count']} adult={stages['adult']['count']} (total {total})")
        except KeyboardInterrupt:
            print("\n中断しました。ここまでの結果を保存します。")
            save_records(records)
            print(f"保存済み {added}件 / --resume を付けて再実行すると続きから再開します")
            sys.exit(0)
        except Exception as e:
            errors.append(f"{vid} {name}: {type(e).__name__}: {e}")
            print(f"[{done_n}/{len(targets)}] {vid} {name}: ERROR {type(e).__name__}")
        # 50件ごとに保存（長時間の実行で成果を失わないため）
        if added and added % 50 == 0:
            save_records(records)
        time.sleep(1.2)   # 楽天APIのマナー（1req/秒程度）

    save_records(records)
    print(f"\n保存しました：今回 {added}件 / エラー {len(errors)}件 / 累計 {len(records)}レコード")
    for e in errors[:20]:
        print("  ", e.encode("ascii", "backslashreplace").decode())
    if len(errors) > 20:
        print(f"   … ほか{len(errors)-20}件")

if __name__ == "__main__":
    main()
