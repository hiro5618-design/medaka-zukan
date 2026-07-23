# -*- coding: utf-8 -*-
"""
enrich_apply.py  ―― 「調査中」品種に調査結果を反映する
---------------------------------------------------------------------
data/medaka-data.js の既存エントリ（status:"draft"）を、調査で判明した
作出者・作出年・経緯・説明・飼育情報・固定率で更新し、status を "done" にします。

分類（phenotype）・親品種・IDは変更しません（既に確定しているため）。

入力：tools/_enrich_data.json
  [{ "id":"m057", "reading":"しゅてんのう", "breeder":"…", "year":"…",
     "story":"…", "description":"…", "difficulty":3, "points":["…"],
     "fixation":[{"rate":"50%","source":"…","checkedOn":"2026-07-21"}],
     "photoUrl":"https://medakazukan.net/0004_syutenno/",
     "photoCaption":"参考：朱天皇（改良メダカWEB図鑑）" }, …]

使い方:  python enrich_apply.py --dry-run
        python enrich_apply.py
"""
import os, re, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")

def js_str(s):
    """JS文字列リテラルとして安全に埋め込む（改行は \\n に）"""
    return (str(s or "").replace("\\", "\\\\").replace('"', '\\"')
            .replace("\n", "\\n").replace("\r", ""))

def js_arr(items):
    return "[" + ",".join('"%s"' % js_str(x) for x in (items or [])) + "]"

def fixation_js(arr):
    if not arr:
        return "[]"
    parts = []
    for f in arr:
        parts.append('{ rate:"%s", source:"%s", checkedOn:"%s" }' %
                     (js_str(f.get("rate")), js_str(f.get("source")), js_str(f.get("checkedOn"))))
    return "[ " + ", ".join(parts) + " ]"

def find_block(txt, vid):
    """指定idのエントリ本体（{...}）の範囲を、波括弧の対応を数えて特定する"""
    m = re.search(r'\{\s*\n?\s*id:\s*"%s"' % re.escape(vid), txt)
    if not m:
        return None
    start = m.start()
    depth, i = 0, start
    while i < len(txt):
        c = txt[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return (start, i + 1)
        i += 1
    return None

def patch_field(block, key, new_value):
    """block内の key: … を new_value に置き換える（1階層目のみ）"""
    pat = re.compile(r'(\b%s:\s*)(".*?"|\[.*?\]|null|\{\s*\}|\d+)' % re.escape(key), re.S)
    return pat.sub(lambda m: m.group(1) + new_value, block, count=1)

def main():
    dry = "--dry-run" in sys.argv
    items = json.load(open(os.path.join(HERE, "_enrich_data.json"), encoding="utf-8"))
    path = os.path.join(DATA, "medaka-data.js")
    txt = open(path, encoding="utf-8").read()

    applied, missing = [], []
    for it in items:
        vid = it["id"]
        span = find_block(txt, vid)
        if not span:
            missing.append(vid); continue
        s, e = span
        block = txt[s:e]

        if it.get("reading"):
            block = patch_field(block, "reading", '"%s"' % js_str(it["reading"]))
        if it.get("name"):
            block = patch_field(block, "name", '"%s"' % js_str(it["name"]))
        if it.get("refTags") is not None:
            block = re.sub(r'refTags:\s*\[[^\]]*\]', 'refTags: %s' % js_arr(it["refTags"]), block, count=1)
        # origin（作出者・作出年・経緯）
        block = re.sub(r'breeder:\s*".*?"', 'breeder:"%s"' % js_str(it.get("breeder","")), block, count=1)
        block = re.sub(r'year:\s*".*?"',   'year:"%s"'    % js_str(it.get("year","")),   block, count=1)
        block = re.sub(r'story:\s*".*?"',  'story:"%s"'   % js_str(it.get("story","")),  block, count=1, flags=re.S)
        if it.get("description"):
            block = patch_field(block, "description", '"%s"' % js_str(it["description"]))
        # phenotype（分類）… 記事で判明したものだけ、phenotypeブロック内を差し替える
        if it.get("phenotype"):
            phd = it["phenotype"]
            def patch_pheno(m):
                inner = m.group(1)
                for k in ("bodyColor","pattern","iridophore","bodyType","finVariation","eyeVariation"):
                    if k in phd:
                        inner = re.sub(r'(%s:\s*)"[^"]*"' % k,
                                       lambda mm: mm.group(1) + '"%s"' % js_str(phd[k]),
                                       inner, count=1)
                return "phenotype: { " + inner.strip() + " }"
            block = re.sub(r'phenotype:\s*\{(.*?)\}', patch_pheno, block, count=1, flags=re.S)
        # 系統（親品種・類似）… 記事で判明したものだけ差し替える
        if it.get("parentIds") is not None:
            arr = "[" + ", ".join('"%s"' % js_str(x) for x in it["parentIds"]) + "]"
            block = re.sub(r'(parentIds:\s*)\[[^\]]*\]', lambda m: m.group(1) + arr, block, count=1)
        if it.get("similarIds") is not None:
            arr = "[" + ", ".join('"%s"' % js_str(x) for x in it["similarIds"]) + "]"
            block = re.sub(r'similarIds:\s*\[[^\]]*\]', 'similarIds: ' + arr, block, count=1)
        # care（難易度・ポイント）
        if it.get("difficulty") is not None:
            block = re.sub(r'difficulty:\s*(null|\d+)', 'difficulty:%d' % int(it["difficulty"]), block, count=1)
        if it.get("points"):
            block = re.sub(r'points:\s*\[.*?\]', 'points:%s' % js_arr(it["points"]), block, count=1, flags=re.S)
        if it.get("fixation"):
            block = patch_field(block, "fixation", fixation_js(it["fixation"]))
        # 参考リンク（記事が特定できたものは、その記事ページに差し替える）
        if it.get("photoUrl"):
            block = re.sub(r'url:"[^"]*"', 'url:"%s"' % js_str(it["photoUrl"]), block, count=1)
            if it.get("photoCaption"):
                block = re.sub(r'caption:"[^"]*"', 'caption:"%s"' % js_str(it["photoCaption"]), block, count=1)
            block = re.sub(r'(sources:\s*\[\s*\{\s*url:\s*)"[^"]*"',
                           lambda m: m.group(1) + '"%s"' % js_str(it["photoUrl"]), block, count=1)
        # 調査が済んだので draft を外す
        block = re.sub(r'status:\s*"draft"', 'status: "done"', block, count=1)

        txt = txt[:s] + block + txt[e:]
        applied.append(vid)

    print(f"更新: {len(applied)}件 / 見つからず: {len(missing)}件")
    if missing:
        print("  ID不明:", ", ".join(missing))
    if dry:
        print("(--dry-run のため書き込みませんでした)")
        return
    open(path, "w", encoding="utf-8").write(txt)
    print("medaka-data.js を更新しました")

if __name__ == "__main__":
    main()
