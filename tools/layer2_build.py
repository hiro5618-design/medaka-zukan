# -*- coding: utf-8 -*-
"""
layer2_build.py  ―― 通称つき品種（第2層）を図鑑に登録する
---------------------------------------------------------------------
品種マスタの「通称つき・未収録」の品種を、medaka-data.js に追記します。

【方針】推測しない。事実として確定できるものだけを埋める。
  ・分類（体色/柄/虹色素胞/体型/ヒレ変化/目の変化）
      … マスタの type 欄（例「朱赤ヒカリダルマ」）は形質の記述そのものなので、
        機械的に分解して確定できる。調査不要・誤りが入らない。
  ・親品種  … 体色ベースが図鑑にあれば紐づける（系統ツリーが繋がる）
  ・作出者/作出年/経緯/固定率
      … type からは分からないため **空欄（詳細画面で「調査中」表示）**。
        status は "draft" とし、後から調査で充実させられる状態にする。

使い方:  python layer2_build.py            # 追記を実行
        python layer2_build.py --dry-run  # 追記せず内容だけ確認
"""
import os, re, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
TODAY = "2026-07-19"

# ---- type 文字列から拾う形質（長い語から順に判定する）----
BODY_TYPE = [("ヒカリダルマ","ヒカリダルマ"),("半ダルマ","半ダルマ"),
             ("ヒカリ体型","ヒカリ体型"),("ヒカリ","ヒカリ体型"),("ダルマ","ダルマ")]
FIN       = [("リアルロングフィン","リアルロングフィン"),("ロングフィン","リアルロングフィン"),
             ("ヒレ長","ヒレ長"),("スワロー","スワロー"),("サムライ","サムライ"),
             ("セルフィン","セルフィン"),("ワイドフィン","ワイドフィン"),("マルコ","マルコ")]
EYE       = [("ブルーアイ","ブルーアイ"),("ルビーアイ","ルビーアイ"),("スモールアイ","スモールアイ"),
             ("ビッグアイ","ビッグアイ"),("アルビノ","アルビノ"),("パンダ","パンダ"),
             ("目前","目前"),("出目","出目")]
IRID      = [("全身体内光","体内光"),("ラメ幹之","ラメ幹之"),("体外光","体外光(幹之)"),
             ("体内光","体内光"),("腹膜光","体内光"),("ラメ","ラメ"),("幹之","体外光(幹之)")]
# 体色（長い語から）。値は classification.js の options に合わせる
COLOR     = [("白朱赤","")  ,("ピュアホワイト","ピュアホワイト(白)"),("スカイブルー","スカイブルー(青)"),
             ("ブラック","ブラック"),("オロチ","オロチ"),("和墨","和墨"),("シルバー","シルバー"),
             ("オレンジ","オレンジ"),("ピンク","ピンク"),("黄金","黄金"),("琥珀","琥珀"),
             ("朱赤","楊貴妃(朱赤)"),("茶","茶"),("白","ピュアホワイト(白)"),
             ("青","スカイブルー(青)"),("黄","黄")]
# 参考タグ（refTags）として拾うもの
REF       = ["半透明鱗","透明鱗","ブラックリム","オーロラ","錦","斑"]

# 体色 → 図鑑にある基本品種（親品種として紐づける）
BASE_PARENT = {
    "楊貴妃(朱赤)":"m004", "黄金":"m012", "琥珀":"m011",
    "ピュアホワイト(白)":"m049", "スカイブルー(青)":"m050",
    "ブラック":"m051", "ピンク":"m055", "オロチ":"m005",
}

def parse_type(t):
    """type（例「朱赤透明鱗ヒカリ」）を JMA6カテゴリ＋参考タグに分解する"""
    s = t or ""
    ph = {"bodyColor":"","pattern":"","iridophore":"","bodyType":"","finVariation":"","eyeVariation":""}
    refs = []
    def take(pairs, key):
        for word, val in pairs:
            if word in s:
                ph[key] = val
                return word
        return None
    take(BODY_TYPE, "bodyType")
    take(FIN, "finVariation")
    take(EYE, "eyeVariation")
    take(IRID, "iridophore")
    for w in REF:
        if w in s and w not in refs:
            refs.append(w)
    # 体色は他の形質語を取り除いてから判定（「黄金ヒカリ」の"黄"誤検出を防ぐ）
    rest = s
    for pairs in (BODY_TYPE, FIN, EYE, IRID):
        for word, _ in pairs:
            rest = rest.replace(word, "")
    for w in REF:
        rest = rest.replace(w, "")
    for word, val in COLOR:
        if word in rest and val:
            ph["bodyColor"] = val
            break
    if "白朱赤" in s or "紅白" in s:
        ph["pattern"] = "二色"
    if "錦" in s:
        ph["pattern"] = "錦"
    if "斑" in s:
        ph["pattern"] = "斑(ぶち)"
    # 形質が付かない体色のみの品種は「無地」
    if not ph["pattern"] and ph["bodyColor"]:
        ph["pattern"] = "無地"
    # ラメ・体外光は参考タグにも入れて、カードの形質アイコンに出す
    if ph["iridophore"] in ("ラメ","ラメ幹之") and "ラメ" not in refs: refs.append("ラメ")
    if ph["iridophore"] == "体外光(幹之)" and "体外光" not in refs: refs.append("体外光")
    if ph["finVariation"] and ph["finVariation"] not in refs: refs.append(ph["finVariation"])
    if ph["bodyType"] in ("ダルマ","半ダルマ","ヒカリダルマ") and "ダルマ" not in refs: refs.append("ダルマ")
    if ph["eyeVariation"] == "アルビノ" and "アルビノ" not in refs: refs.append("アルビノ")
    return ph, refs

def describe(name, typ, parent_name):
    """type から確実に言えることだけで説明文を作る（推測しない）"""
    s = f"「{name}」は、正式には「{typ}メダカ」と分類される品種です。"
    if parent_name:
        s += f"体色は{parent_name}と同系で、そこに体型やヒレ・目などの形質が加わった品種にあたります。"
    s += "作出者・作出年・作出の経緯などの詳しい情報は調査中です。"
    return s

def main():
    dry = "--dry-run" in sys.argv
    targets = json.load(open(os.path.join(HERE, "_layer2_targets.json"), encoding="utf-8"))

    data_path = os.path.join(DATA, "medaka-data.js")
    txt = open(data_path, encoding="utf-8").read()
    ids = [i for i in re.findall(r'id:\s*"(m\d{3})"', txt) if i != "m000"]
    nxt = max(int(i[1:]) for i in ids) + 1

    # 既存の名前（重複登録の防止）
    existing = set(re.findall(r'name:\s*"([^"]+)"', txt))

    blocks, added = [], []
    for e in targets:
        name = re.sub(r"[（(].*?[）)]", "", e["name"]).strip()   # 「（N〜HD）」等を除く
        if name in existing:
            continue
        ph, refs = parse_type(e["type"])
        pid = BASE_PARENT.get(ph["bodyColor"])
        pname = {"m004":"楊貴妃","m012":"黄金","m011":"琥珀","m049":"ピュアホワイト",
                 "m050":"スカイブルー","m051":"ブラック","m055":"ピンク","m005":"オロチ"}.get(pid,"")
        vid = "m%03d" % nxt; nxt += 1
        aliases = [e["type"]] if e["type"] and e["type"] != name else []
        note = (e.get("note") or "").strip()
        blocks.append(f'''
    {{
      id: "{vid}", name: "{name}", reading: "", aliases: {json.dumps(aliases, ensure_ascii=False)}, status: "draft",
      phenotype: {{ bodyColor:"{ph['bodyColor']}", pattern:"{ph['pattern']}", iridophore:"{ph['iridophore']}", bodyType:"{ph['bodyType']}", finVariation:"{ph['finVariation']}", eyeVariation:"{ph['eyeVariation']}" }},
      refTags: {json.dumps(refs, ensure_ascii=False)},
      lineage: {{ strain:"{e['type']}", parentIds: {json.dumps([pid] if pid else [], ensure_ascii=False)} }},
      origin: {{ breeder:"", year:"", story:"" }},
      description: "{describe(name, e['type'], pname)}",
      care: {{ difficulty:null, points:[] }},
      fixation: [],
      photos: [ {{ mode:"link", url:"https://medakazukan.net/koteihinsyunumber/", caption:"参考：固定品種ナンバー一覧（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" }} ],
      similarIds: {json.dumps([pid] if pid else [], ensure_ascii=False)},
      genotype: {{}}, myRecords: {{ keeping:[], breeding:[] }}, priceRef: {{ key:"{vid}" }},
      sources: [ {{ url:"https://medakazukan.net/koteihinsyunumber/", referencedOn:"{TODAY}" }} ]{(chr(10)+'      // 補足：'+note) if note else ''}
    }}''')
        added.append((vid, name, e["type"], ph["bodyColor"], pname))

    print(f"追記対象: {len(added)}件（m{nxt-len(added):03d}〜m{nxt-1:03d}）")
    for vid, nm, ty, bc, pn in added[:8]:
        print(f"  {vid} {nm} ← {ty} / 体色={bc or '—'} / 親={pn or 'なし'}")
    if len(added) > 8:
        print(f"  … 他{len(added)-8}件")

    if dry or not blocks:
        print("\n(--dry-run のため書き込みませんでした)" if dry else "\n追記対象がありません")
        return

    marker = "\n\n  ]\n};"
    if marker not in txt:
        print("ERROR: 追記位置が見つかりません"); sys.exit(1)
    new = txt.replace(marker, ",\n\n    /* ===== 通称つき品種（第2層）：分類は確定、作出情報は調査中 ===== */" +
                      ",".join(blocks) + marker, 1)
    new = re.sub(r'dataVersion:\s*"[^"]*"', 'dataVersion: "0.8"', new, count=1)
    open(data_path, "w", encoding="utf-8").write(new)
    print(f"\nmedaka-data.js に {len(added)}件を追記しました")

if __name__ == "__main__":
    main()
