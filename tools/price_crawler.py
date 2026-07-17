# -*- coding: utf-8 -*-
"""
price_crawler.py  ―― 相場（価格）収集スクリプト
---------------------------------------------------------------------
楽天市場API（楽天ウェブサービス）で「メダカ ＋ 品種名」を検索し、
出品タイトルから 卵 / 針子 / 成魚 を判定して、ステージ別に
最安・平均・最高・件数を集計 → data/price-history.js に追記します。

【アプリIDの設定（どちらか）】
  1) 環境変数  RAKUTEN_APP_ID=xxxxxxxx
  2) ファイル  tools/rakuten_app_id.txt に アプリID だけを書いて保存
  ※ このリポジトリは公開なので、アプリIDは .gitignore で除外されます（絶対にコミットしない）

【使い方】
  python price_crawler.py                # 全品種
  python price_crawler.py m004 m003      # 品種IDを指定
※ 楽天APIのマナーに従い、1秒に1リクエスト程度に抑えています。
"""
import os, re, sys, json, time, urllib.parse, urllib.request
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))
API  = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")

# ---- アプリID読み込み ----
def load_app_id():
    v = os.environ.get("RAKUTEN_APP_ID", "").strip()
    if v:
        return v
    p = os.path.join(HERE, "rakuten_app_id.txt")
    if os.path.exists(p):
        return open(p, encoding="utf-8").read().strip()
    return ""

# ---- 品種一覧（id, name）を medaka-data.js から取得 ----
def load_varieties():
    txt = open(os.path.join(DATA, "medaka-data.js"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r'id:\s*"(m\d{3})",\s*name:\s*"([^"]+)"', txt):
        vid, name = m.group(1), m.group(2)
        if vid == "m000":
            continue
        out.append((vid, name))
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
def search(app_id, keyword, hits=30):
    q = urllib.parse.urlencode({
        "applicationId": app_id, "keyword": keyword,
        "hits": hits, "format": "json", "formatVersion": 2,
    })
    req = urllib.request.Request(API + "?" + q, headers={"User-Agent": "MedakaZukanBot/1.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))

def aggregate(items):
    buckets = {"egg": [], "fry": [], "adult": []}
    for it in items:
        name = it.get("itemName", "")
        price = it.get("itemPrice")
        url = it.get("itemUrl", "")
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

def main():
    app_id = load_app_id()
    if not app_id:
        print("ERROR: Rakuten app id not found.")
        print("  -> set env RAKUTEN_APP_ID, or create tools/rakuten_app_id.txt")
        sys.exit(1)

    targets = load_varieties()
    if len(sys.argv) > 1:
        want = set(sys.argv[1:])
        targets = [t for t in targets if t[0] in want]
    if not targets:
        print("no target varieties"); sys.exit(1)

    records = load_records()
    # 同日・同品種・同ソースの重複は上書き
    key = lambda r: (r["id"], r["checkedOn"], r["source"])
    existing = {key(r): i for i, r in enumerate(records)}

    added, errors, d = 0, [], today()
    for vid, name in targets:
        kw = "メダカ " + name
        try:
            res = search(app_id, kw)
            items = res.get("Items", []) if isinstance(res, dict) else []
            stages = aggregate(items)
            total = sum(s["count"] for s in stages.values())
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
            print(f"{vid} {name}: egg={stages['egg']['count']} fry={stages['fry']['count']} adult={stages['adult']['count']} (total {total})")
        except Exception as e:
            errors.append(f"{vid} {name}: {type(e).__name__}: {e}")
            print(f"{vid} {name}: ERROR {type(e).__name__}")
        time.sleep(1.2)   # 楽天APIのマナー（1req/秒程度）

    save_records(records)
    print(f"\nsaved: {added} records / errors {len(errors)} / total {len(records)}")
    for e in errors:
        print("  ", e.encode("ascii", "backslashreplace").decode())

if __name__ == "__main__":
    main()
