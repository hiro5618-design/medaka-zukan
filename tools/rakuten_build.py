# -*- coding: utf-8 -*-
"""
rakuten_build.py  ―― 楽天で発見したハウスネームを draft 品種として図鑑に追加する
---------------------------------------------------------------------
discover_rakuten.py が出力した tools/_rakuten_auto.json（高信頼の候補）を、
medaka-data.js に draft 品種として自動追記し、variety-master.js の houseNames にも記録する。

【方針】layer2_build.py / layer3_build.py と完全に同じ。推測しない。
  ・分類    … descriptor（例「三色ラメサムライ」）を parse_type() で機械分解して確定
  ・親品種  … 体色ベースが図鑑にあれば紐づける（BASE_PARENT）
  ・作出情報… 空欄（詳細で「調査中」表示、status="draft"）
  ・写真    … 他サイト画像は使わない。楽天"検索結果ページ"への参照リンクのみ（CLAUDE.md §7）

使い方:
  python rakuten_build.py --dry-run   # 生成内容の確認のみ
  python rakuten_build.py             # medaka-data.js と variety-master.js に追記
"""
import os, re, sys, json
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))

sys.path.insert(0, HERE)
from layer2_build import parse_type, BASE_PARENT, describe  # 分類の付け方を図鑑本体と一致させる

PARENT_NAME = {"m004":"楊貴妃","m012":"黄金","m011":"琥珀","m049":"ピュアホワイト",
               "m050":"スカイブルー","m051":"ブラック","m055":"ピンク","m005":"オロチ"}

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")

def norm(s):
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s or "")
    return re.sub(r"[\s　、,・]", "", s).strip()

def js_str(s):
    return (str(s or "").replace("\\", "\\\\").replace('"', '\\"')
            .replace("\n", "\\n").replace("\r", ""))

def load_auto():
    p = os.path.join(HERE, "_rakuten_auto.json")
    if not os.path.exists(p):
        return []
    return json.load(open(p, encoding="utf-8"))

def load_existing_names(txt):
    """図鑑本体の既存名（重複登録の防止）"""
    return set(norm(n) for n in re.findall(r'name:\s*"([^"]+)"', txt))

def build_block(vid, name, descriptor, search_url):
    """layer2_build と同じ書式で draft ブロックを1つ作る。写真は楽天検索リンクのみ。"""
    ph, refs = parse_type(descriptor)
    pid = BASE_PARENT.get(ph["bodyColor"])
    pname = PARENT_NAME.get(pid, "")
    aliases = [descriptor] if descriptor and descriptor != name else []
    desc = (f"「{name}」は、楽天市場の出品で見つかったハウスネーム（ショップ・作出者独自の呼び名）です。"
            + (f"体色は{pname}と同系で、" if pname else "")
            + "分類は出品名から機械的に推定したもので、作出者・作出年・作出の経緯などは調査中です。"
            + "図鑑・JMAへの正式収録が確認できしだい、正規の品種情報に更新します。")
    return f'''
    {{
      id: "{vid}", name: "{js_str(name)}", reading: "", aliases: {json.dumps(aliases, ensure_ascii=False)}, status: "draft",
      phenotype: {{ bodyColor:"{ph['bodyColor']}", pattern:"{ph['pattern']}", iridophore:"{ph['iridophore']}", bodyType:"{ph['bodyType']}", finVariation:"{ph['finVariation']}", eyeVariation:"{ph['eyeVariation']}" }},
      refTags: {json.dumps(refs, ensure_ascii=False)},
      lineage: {{ strain:"ハウスネーム（楽天発見）", parentIds: {json.dumps([pid] if pid else [], ensure_ascii=False)} }},
      origin: {{ breeder:"", year:"", story:"" }},
      description: "{js_str(desc)}",
      care: {{ difficulty:null, points:[] }},
      fixation: [],
      photos: [ {{ mode:"link", url:"{js_str(search_url)}", caption:"参考：楽天市場の検索結果", credit:"楽天市場", usage:"参照リンクのみ（画像は転載しない）" }} ],
      similarIds: {json.dumps([pid] if pid else [], ensure_ascii=False)},
      genotype: {{}}, myRecords: {{ keeping:[], breeding:[] }}, priceRef: {{ key:"{vid}" }},
      sources: [ {{ url:"{js_str(search_url)}", referencedOn:"{today()}" }} ]
    }}'''

def house_block(name, descriptor, search_url):
    """variety-master.js の houseNames[] に足す1エントリ（verified:false, auto:true）"""
    reading = ""
    return f'''    {{
      name: "{js_str(name)}", reading: "{reading}", nameType: "ハウスネーム", verified: false, auto: true,
      characteristic: "{js_str(descriptor)}",
      discovery: {{ source: "楽天市場", url: "{js_str(search_url)}", date: "{today()}" }},
      status: "draft", mappedId: null,
      note: "楽天出品から自動発見。分類は出品名からの推定。図鑑・JMA収録で verified:true に昇格予定"
    }}'''

def main():
    dry = "--dry-run" in sys.argv
    cands = load_auto()
    if not cands:
        print("追加対象がありません（_rakuten_auto.json が空か存在しません）")
        return

    data_path = os.path.join(DATA, "medaka-data.js")
    txt = open(data_path, encoding="utf-8").read()
    ids = [i for i in re.findall(r'id:\s*"(m\d{3,4})"', txt) if i != "m000"]
    nxt = max(int(i[1:]) for i in ids) + 1
    existing = load_existing_names(txt)

    blocks, house_blocks, added = [], [], []
    for c in cands:
        name = c["name"].strip()
        if norm(name) in existing:
            continue
        existing.add(norm(name))                       # 同一実行内の重複も防ぐ
        vid = "m%03d" % nxt; nxt += 1
        desc = c.get("descriptor", "") or ""
        url = c.get("searchUrl", "")
        blocks.append(build_block(vid, name, desc, url))
        house_blocks.append(house_block(name, desc, url))
        ph, _ = parse_type(desc)
        added.append((vid, name, desc, ph["bodyColor"]))

    print(f"追加対象: {len(added)}件（m{nxt-len(added):03d}〜m{nxt-1:03d}）")
    for vid, nm, ds, bc in added[:12]:
        print(f"  {vid} {nm} ← «{ds}» / 体色={bc or '—'}")
    if len(added) > 12:
        print(f"  … 他{len(added)-12}件")

    if dry or not blocks:
        print("\n(--dry-run のため書き込みませんでした)" if dry else "\n追加対象がありません")
        return

    # ---- medaka-data.js に追記 ----
    marker = "\n\n  ]\n};"
    if marker not in txt:
        print("ERROR: medaka-data.js の追記位置が見つかりません"); sys.exit(1)
    new = txt.replace(marker,
        ",\n\n    /* ===== ハウスネーム（楽天発見・第4層）：分類は推定、作出情報は調査中 ===== */" +
        ",".join(blocks) + marker, 1)
    open(data_path, "w", encoding="utf-8").write(new)
    print(f"\nmedaka-data.js に {len(added)}件を追記しました")

    # ---- variety-master.js の houseNames に追記 ----
    mp = os.path.join(DATA, "variety-master.js")
    mtxt = open(mp, encoding="utf-8").read()
    # houseNames: [ ... ] の閉じ ] の直前に差し込む（ファイル末尾の "\n  ]\n};"）
    hmarker = "\n  ]\n};"
    if hmarker in mtxt:
        joined = ",\n".join(house_blocks)
        # houseNames が空 [] の場合と、既存要素がある場合の両対応
        if re.search(r"houseNames:\s*\[\s*\]", mtxt):
            mtxt = re.sub(r"houseNames:\s*\[\s*\]",
                          "houseNames: [\n" + joined + "\n  ]", mtxt, count=1)
        else:
            mtxt = mtxt.replace(hmarker, ",\n" + joined + hmarker, 1)
        open(mp, "w", encoding="utf-8").write(mtxt)
        print(f"variety-master.js の houseNames に {len(house_blocks)}件を追記しました")
    else:
        print("WARNING: variety-master.js の houseNames 追記位置が見つかりませんでした（medaka-data.js のみ更新）")

    # 使い終わった入力は消しておく（次回の二重取り込み防止）
    try:
        os.remove(os.path.join(HERE, "_rakuten_auto.json"))
    except OSError:
        pass

if __name__ == "__main__":
    main()
