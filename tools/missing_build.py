# -*- coding: utf-8 -*-
"""
missing_build.py  ―― サイトマップで見つかった未収録品種を図鑑に登録する
---------------------------------------------------------------------
tools/_missing.json（サイトマップ基準で図鑑に無い品種＋その記事URL）を
medaka-data.js に追記します。第2・3層と同じ導出ロジックを再利用します。

【方針】推測しない。
  ・分類 … 通称に含まれる形質語から機械導出（「琥珀ヒカリ」→体色琥珀・ヒカリ体型）
           カタカナ等で形質が読めないものは空欄（詳細で「調査中」表示）
  ・親品種 … 体色ベースが図鑑にあれば紐づけ
  ・作出情報 … 空欄（status="draft"）。参照リンクは各品種の実記事URLを使う
  ・既存の名前・別名と重複するものは登録しない

使い方:  python missing_build.py --dry-run
        python missing_build.py
"""
import os, re, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from layer2_build import parse_type, BASE_PARENT

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
TODAY = "2026-07-21"
PARENT_NAME = {"m004":"楊貴妃","m012":"黄金","m011":"琥珀","m049":"ピュアホワイト",
               "m050":"スカイブルー","m051":"ブラック","m055":"ピンク","m005":"オロチ"}

def norm(s):
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s or "")
    return re.sub(r"[\s　、,・]", "", s).strip()

def load_known(txt):
    known = {}
    pat = re.compile(r'id:\s*"(m\d{3})",\s*name:\s*"([^"]+)",\s*reading:\s*"[^"]*",\s*aliases:\s*\[([^\]]*)\]', re.S)
    for vid, nm, al in pat.findall(txt):
        if vid == "m000": continue
        known.setdefault(norm(nm), (vid, nm))
        for a in re.findall(r'"([^"]+)"', al):
            known.setdefault(norm(a), (vid, nm))
    return known

def has_class(ph):
    for k in ph:
        if ph[k]: return True
    return False

def describe(name, ph, pname):
    if has_class(ph):
        s = "「%s」は、改良メダカWEB図鑑に個別記事のある品種です。" % name
        if pname:
            s += "体色は%sと同系で、そこに体型・ヒレ・目などの形質が加わった品種にあたります。" % pname
        s += "作出者・作出年・作出の経緯などの詳しい情報は調査中です。"
    else:
        s = "「%s」は、改良メダカWEB図鑑に個別記事のある品種です。名前からは体色や形質を判別できないため、分類・作出情報とも調査中です。参考リンクから元記事を確認できます。" % name
    return s

def main():
    dry = "--dry-run" in sys.argv
    miss = json.load(open(os.path.join(HERE, "_missing.json"), encoding="utf-8"))
    path = os.path.join(DATA, "medaka-data.js")
    txt = open(path, encoding="utf-8").read()
    known = load_known(txt)
    ids = [i for i in re.findall(r'id:\s*"(m\d{3})"', txt) if i != "m000"]
    nxt = max(int(i[1:]) for i in ids) + 1

    blocks, added, skipped, seen, no_class = [], [], 0, set(), 0
    for e in miss:
        name = re.sub(r"[（(].*?[）)]", "", e["name"]).strip()
        key = norm(name)
        if not name or key in known or key in seen:
            skipped += 1; continue
        seen.add(key)
        ph, refs = parse_type(name)       # 通称そのものを形質語として解析
        if not has_class(ph): no_class += 1
        pid = BASE_PARENT.get(ph["bodyColor"])
        pname = PARENT_NAME.get(pid, "")
        vid = "m%03d" % nxt; nxt += 1
        url = e.get("url", "https://medakazukan.net/")
        blocks.append(f'''
    {{
      id: "{vid}", name: "{name}", reading: "", aliases: [], status: "draft",
      phenotype: {{ bodyColor:"{ph['bodyColor']}", pattern:"{ph['pattern']}", iridophore:"{ph['iridophore']}", bodyType:"{ph['bodyType']}", finVariation:"{ph['finVariation']}", eyeVariation:"{ph['eyeVariation']}" }},
      refTags: {json.dumps(refs, ensure_ascii=False)},
      lineage: {{ strain:"", parentIds: {json.dumps([pid] if pid else [], ensure_ascii=False)} }},
      origin: {{ breeder:"", year:"", story:"" }},
      description: "{describe(name, ph, pname)}",
      care: {{ difficulty:null, points:[] }},
      fixation: [],
      photos: [ {{ mode:"link", url:"{url}", caption:"参考：{name}（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" }} ],
      similarIds: {json.dumps([pid] if pid else [], ensure_ascii=False)},
      genotype: {{}}, myRecords: {{ keeping:[], breeding:[] }}, priceRef: {{ key:"{vid}" }},
      sources: [ {{ url:"{url}", referencedOn:"{TODAY}" }} ]
    }}''')
        added.append((vid, name, ph["bodyColor"]))

    print(f"登録対象 {len(added)}件（うち分類なし {no_class}件）/ 重複スキップ {skipped}件")
    if added:
        print(f"  採番: {added[0][0]} 〜 {added[-1][0]}")
        for vid, nm, bc in added[:6]:
            print(f"  {vid} {nm} / 体色={bc or '(なし)'}")
        print(f"  … 他{max(0,len(added)-6)}件")
    if dry or not blocks:
        print("\n(--dry-run のため書き込みませんでした)" if dry else "\n追記対象なし"); return

    marker = "\n\n  ]\n};"
    new = txt.replace(marker, ",\n\n    /* ===== サイトマップ基準で発見した未収録品種（記事はあるがナンバー表未掲載）===== */" +
                      ",".join(blocks) + marker, 1)
    new = re.sub(r'dataVersion:\s*"[^"]*"', 'dataVersion: "1.0"', new, count=1)
    open(path, "w", encoding="utf-8").write(new)
    print(f"\nmedaka-data.js に {len(added)}件を追記しました")

if __name__ == "__main__":
    main()
