# -*- coding: utf-8 -*-
"""
sitemap_import.py  ―― サイトマップ基準で「未収録の品種」を洗い出す
---------------------------------------------------------------------
改良メダカWEB図鑑のサイトマップから全品種記事を取得し、各記事の
タイトルから品種名を取り出して、図鑑本体（medaka-data.js）に無いものを
tools/_missing.json に書き出します。

ナンバー一覧表（作成中で記載漏れがある）ではなく、実在する全記事を
起点にするため、「記事はあるが表に載っていない」品種も拾えます。

【動作】
  1. post-sitemap.xml / post_lp-sitemap.xml から記事URLを集める
  2. 各記事のタイトルを取得（結果は tools/_title_cache.json にキャッシュ）
     ※タイトルに「改良メダカWEB図鑑No」を含むものだけ品種記事とみなす
     ※「〇〇とは」の〇〇を品種名として抽出
  3. 図鑑の既存名（別名含む）と照合し、未収録を出力
※ 礼儀正しく 0.4秒間隔で取得。中断しても次回はキャッシュから再開。

使い方:  python sitemap_import.py                 # 続きから取得
        python sitemap_import.py --limit 100     # 今回はキャッシュ未取得を100件だけ
"""
import os, re, sys, json, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
UA = {"User-Agent": "MedakaZukanBot/1.0 (personal hobby; polite)"}
CACHE = os.path.join(HERE, "_title_cache.json")

SITEMAPS = [
    "https://medakazukan.net/post-sitemap.xml",
    "https://medakazukan.net/post_lp-sitemap.xml",
]
# 品種でない記事のスラッグに含まれる語（ブログ・用語・番号一覧など）
BLOG = ("blog","profile","number","term","breeding-info","history","charact",
        "/category/","/tag/","privacy","sitemap","birth","recommend","matome",
        "medakanoyakata","book","100年","jma-info","kentei")

def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=25).read().decode("utf-8","ignore")

def norm(s):
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s or "")
    return re.sub(r"[\s　、,・]", "", s).strip()

def article_urls():
    urls = []
    for sm in SITEMAPS:
        try:
            urls += re.findall(r"<loc>(?:<!\[CDATA\[)?(https?://[^<\]]+)", get(sm))
        except Exception as e:
            print("sitemap NG:", sm, type(e).__name__)
    out = []
    for u in urls:
        if any(b in u for b in BLOG):
            continue
        slug = u.rstrip("/").split("/")[-1]
        if re.match(r"^\d{4}_", slug) or (re.match(r"^[a-z0-9\-]+$", slug) and len(slug) > 3):
            out.append(u)
    # 重複排除（順序維持）
    seen, uniq = set(), []
    for u in out:
        if u not in seen:
            seen.add(u); uniq.append(u)
    return uniq

def title_to_name(title):
    """タイトルが品種記事なら品種名を返す。違えば None"""
    if "改良メダカWEB図鑑No" not in title and "改良メダカweb図鑑No" not in title:
        return None
    m = re.match(r"^(.*?)とは", title)
    if not m:
        return None
    name = re.sub(r"[（(].*?[）)]", "", m.group(1)).strip()   # 読み仮名の括弧を除く
    return name or None

def load_known():
    txt = open(os.path.join(DATA, "medaka-data.js"), encoding="utf-8").read()
    known = set()
    pat = re.compile(r'name:\s*"([^"]+)"', re.S)
    for nm in pat.findall(txt):
        known.add(norm(nm))
    for arr in re.findall(r'aliases:\s*\[([^\]]*)\]', txt):
        for a in re.findall(r'"([^"]+)"', arr):
            known.add(norm(a))
    known.discard(norm("（品種名）"))
    return known

def main():
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit")+1])

    cache = json.load(open(CACHE, encoding="utf-8")) if os.path.exists(CACHE) else {}
    urls = article_urls()
    print("品種記事の候補URL:", len(urls), "/ キャッシュ済み:", len(cache))

    todo = [u for u in urls if u not in cache]
    if limit:
        todo = todo[:limit]
    print("今回タイトルを取得:", len(todo), "件")
    for i, u in enumerate(todo, 1):
        try:
            h = get(u)
            t = re.search(r"<title>(.*?)</title>", h, re.S)
            cache[u] = (t.group(1).strip() if t else "")
        except Exception as e:
            cache[u] = "__ERROR__:" + type(e).__name__
        if i % 25 == 0:
            json.dump(cache, open(CACHE,"w",encoding="utf-8"), ensure_ascii=False)
            print(f"  {i}/{len(todo)} 取得…")
        time.sleep(0.4)
    json.dump(cache, open(CACHE,"w",encoding="utf-8"), ensure_ascii=False)

    # 品種名を取り出して未収録を判定
    known = load_known()
    missing, varieties, errs = [], 0, 0
    for u, title in cache.items():
        if title.startswith("__ERROR__"):
            errs += 1; continue
        name = title_to_name(title)
        if not name:
            continue
        varieties += 1
        if norm(name) not in known:
            missing.append({"name": name, "url": u})
    # 未収録内の重複を排除
    seen, uniq = set(), []
    for m in missing:
        k = norm(m["name"])
        if k not in seen:
            seen.add(k); uniq.append(m)
    json.dump(uniq, open(os.path.join(HERE,"_missing.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=1)

    remaining = len([u for u in urls if u not in cache])
    print(f"\n品種記事: {varieties}件 / 取得エラー: {errs}件")
    print(f"未収録（図鑑に無い品種）: {len(uniq)}件 → tools/_missing.json")
    if remaining:
        print(f"※未取得の記事が {remaining} 件残っています。もう一度実行すると続きから取得します。")
    for m in uniq[:15]:
        print("   -", m["name"])

if __name__ == "__main__":
    main()
