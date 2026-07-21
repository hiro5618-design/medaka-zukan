# -*- coding: utf-8 -*-
"""
layer3_build.py  ―― 派生品種（第3層）の簡易登録
---------------------------------------------------------------------
品種マスタの未収録のうち、既存品種と重複しないものを medaka-data.js に追記します。
第2層(layer2_build.py)の導出ロジックをそのまま再利用するため、分類の付け方は同一です。

【方針】第2層と同じ。推測しない。
  ・分類    … type欄（例「白アルビノヒカリダルマ」）を機械分解して確定
  ・親品種  … 体色ベースが図鑑にあれば紐づける
  ・作出情報… 空欄（詳細で「調査中」表示、status="draft"）

【重複の除外】次のいずれかで既存品種と一致するものは登録しない
  ・品種名／通称が既存の名前・別名と一致
  ・台帳の「品種名→通称」対応をたどって既存と一致（例「朱赤」＝既登録の「楊貴妃」）

使い方:  python layer3_build.py --dry-run   # 確認のみ
        python layer3_build.py             # 追記を実行
"""
import os, re, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from layer2_build import parse_type, BASE_PARENT   # 第2層と同じ導出ロジックを使う

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
TODAY = "2026-07-19"

PARENT_NAME = {"m004":"楊貴妃","m012":"黄金","m011":"琥珀","m049":"ピュアホワイト",
               "m050":"スカイブルー","m051":"ブラック","m055":"ピンク","m005":"オロチ"}

def norm(s):
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s or "")
    return re.sub(r"[\s　、,・]", "", s).strip()

def load_known(txt):
    """図鑑の既存品種：名前・別名を照合キーにする"""
    known = {}
    pat = re.compile(r'id:\s*"(m\d{3})",\s*name:\s*"([^"]+)",\s*reading:\s*"[^"]*",\s*aliases:\s*\[([^\]]*)\]', re.S)
    for vid, nm, al in pat.findall(txt):
        if vid == "m000":
            continue
        known.setdefault(norm(nm), (vid, nm))
        for a in re.findall(r'"([^"]+)"', al):
            known.setdefault(norm(a), (vid, nm))
    return known

def describe(name, typ, parent_name, derived):
    kind = "体型やヒレ・目などの形質違い" if derived else "形質の組み合わせ"
    s = f"「{name}」は、正式には「{typ}メダカ」と分類される品種です。"
    if parent_name:
        s += f"体色は{parent_name}と同系で、そこに{kind}が加わった品種にあたります。"
    s += "作出者・作出年・作出の経緯などの詳しい情報は調査中です。"
    return s

def main():
    dry = "--dry-run" in sys.argv
    targets = json.load(open(os.path.join(HERE, "_layer3_targets.json"), encoding="utf-8"))

    data_path = os.path.join(DATA, "medaka-data.js")
    txt = open(data_path, encoding="utf-8").read()
    known = load_known(txt)
    ids = [i for i in re.findall(r'id:\s*"(m\d{3})"', txt) if i != "m000"]
    nxt = max(int(i[1:]) for i in ids) + 1

    blocks, added, skipped, seen = [], [], 0, set()
    for e in targets:
        name = re.sub(r"[（(].*?[）)]", "", e["name"]).strip()
        key = norm(name)
        # 既存・および今回の追加分どうしの重複を防ぐ
        if key in known or key in seen:
            skipped += 1
            continue
        seen.add(key)
        ph, refs = parse_type(e["type"])
        pid = BASE_PARENT.get(ph["bodyColor"])
        pname = PARENT_NAME.get(pid, "")
        vid = "m%03d" % nxt; nxt += 1
        aliases = [e["type"]] if e["type"] and e["type"] != name else []
        blocks.append(f'''
    {{
      id: "{vid}", name: "{name}", reading: "", aliases: {json.dumps(aliases, ensure_ascii=False)}, status: "draft",
      phenotype: {{ bodyColor:"{ph['bodyColor']}", pattern:"{ph['pattern']}", iridophore:"{ph['iridophore']}", bodyType:"{ph['bodyType']}", finVariation:"{ph['finVariation']}", eyeVariation:"{ph['eyeVariation']}" }},
      refTags: {json.dumps(refs, ensure_ascii=False)},
      lineage: {{ strain:"{e['type']}", parentIds: {json.dumps([pid] if pid else [], ensure_ascii=False)} }},
      origin: {{ breeder:"", year:"", story:"" }},
      description: "{describe(name, e['type'], pname, e.get('derived'))}",
      care: {{ difficulty:null, points:[] }},
      fixation: [],
      photos: [ {{ mode:"link", url:"https://medakazukan.net/hinsyunumber/", caption:"参考：品種ナンバー一覧（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" }} ],
      similarIds: {json.dumps([pid] if pid else [], ensure_ascii=False)},
      genotype: {{}}, myRecords: {{ keeping:[], breeding:[] }}, priceRef: {{ key:"{vid}" }},
      sources: [ {{ url:"https://medakazukan.net/hinsyunumber/", referencedOn:"{TODAY}" }} ]
    }}''')
        added.append((vid, name, e["type"], pname))

    print(f"登録対象 {len(added)}件 / 重複でスキップ {skipped}件")
    if added:
        print(f"  採番: {added[0][0]} 〜 {added[-1][0]}")
        for vid, nm, ty, pn in added[:6]:
            print(f"  {vid} {nm} ← {ty} / 親={pn or 'なし'}")
        if len(added) > 6:
            print(f"  … 他{len(added)-6}件")

    if dry or not blocks:
        print("\n(--dry-run のため書き込みませんでした)" if dry else "\n追記対象がありません")
        return

    marker = "\n\n  ]\n};"
    if marker not in txt:
        print("ERROR: 追記位置が見つかりません"); sys.exit(1)
    new = txt.replace(marker, ",\n\n    /* ===== 派生品種（第3層）：分類は確定、作出情報は調査中 ===== */" +
                      ",".join(blocks) + marker, 1)
    new = re.sub(r'dataVersion:\s*"[^"]*"', 'dataVersion: "0.9"', new, count=1)
    open(data_path, "w", encoding="utf-8").write(new)
    print(f"\nmedaka-data.js に {len(added)}件を追記しました")

if __name__ == "__main__":
    main()
