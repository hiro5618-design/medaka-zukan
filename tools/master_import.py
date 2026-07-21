# -*- coding: utf-8 -*-
"""
master_import.py  ―― 品種マスタ（台帳）の全件取り込み
---------------------------------------------------------------------
改良メダカWEB図鑑の3つのナンバー一覧を解析して、
data/variety-master.js を「全品種の台帳」として作り直します。

  ・固定品種ナンバー … https://medakazukan.net/koteihinsyunumber/  （通称つき主要品種）
  ・品種ナンバー     … https://medakazukan.net/hinsyunumber/      （約610）
  ・種類ナンバー     … https://medakazukan.net/syuruinumber/      （約610）

LLMを使わないため実行コストはほぼゼロ。年数回この洗い替えを回せば、
新しく採番された品種が自動で台帳に載ります。

【重要】既存の登録状況（status:"done" と mappedId）は必ず引き継ぎます。
        図鑑本体（medaka-data.js）は変更しません。

使い方:  python master_import.py
"""
import os, re, json, urllib.request
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))
UA   = {"User-Agent": "MedakaZukanBot/1.0 (personal hobby; polite, low-frequency)"}

SOURCES = [
    ("kotei",  "固定品種", "https://medakazukan.net/koteihinsyunumber/"),
    ("hinsyu", "品種",     "https://medakazukan.net/hinsyunumber/"),
    ("syurui", "種類",     "https://medakazukan.net/syuruinumber/"),
]

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")

def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA),
                                  timeout=30).read().decode("utf-8", "ignore")

def parse_rows(html):
    """No.が4桁の行だけを拾う → [No, 列2, 列3, ...]"""
    out = []
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.S):
        cells = [re.sub(r"<[^>]+>", "", c).replace("&nbsp;", " ").strip()
                 for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)]
        if cells and re.match(r"^\d{4}$", cells[0] or ""):
            out.append(cells)
    return out

def norm(s):
    """照合用：空白・括弧内（読み等）を除去"""
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s or "")
    return re.sub(r"[\s　、,・]", "", s).strip()

# ---- 派生（体型・ヒレ違い）判定：名前の末尾が形質そのものなら派生とみなす ----
DERIV = re.compile(r"(ヒカリダルマ|ヒカリ|ダルマ|半ダルマ|スワロー|ヒレ長|"
                   r"リアルロングフィン|セルフィン|サムライ|マルコ|出目|アルビノ|"
                   r"透明鱗|半透明鱗|パンダ|スモールアイ|ビッグアイ|目前)$")

def load_registered():
    """図鑑本体（medaka-data.js）の収録品種を名前・別名で引けるようにする。
       旧マスタの done ではなく"実際に図鑑にあるか"で判定するため、取りこぼしが出ない。"""
    txt = open(os.path.join(DATA, "medaka-data.js"), encoding="utf-8").read()
    reg = {}
    pat = re.compile(r'id:\s*"(m\d{3})",\s*name:\s*"([^"]+)",\s*reading:\s*"[^"]*",\s*aliases:\s*\[([^\]]*)\]', re.S)
    for m in pat.finditer(txt):
        vid, name, al = m.group(1), m.group(2), m.group(3)
        if vid == "m000":
            continue
        reg.setdefault(norm(name), vid)
        for a in re.findall(r'"([^"]+)"', al):
            reg.setdefault(norm(a), vid)
    return reg

def load_house_block():
    """ハウスネーム欄は原文のまま引き継ぐ（JSのキーが引用符なしでJSON解析できないため）"""
    p = os.path.join(DATA, "variety-master.js")
    if not os.path.exists(p):
        return "[]"
    txt = open(p, encoding="utf-8").read()
    m = re.search(r"houseNames:\s*(\[.*?\])\s*\};\s*$", txt, re.S)
    return m.group(1).strip() if m else "[]"

def main():
    keep  = load_registered()
    house = load_house_block()
    print(f"図鑑に収録済みの名前（別名含む）: {len(keep)}件")

    entries, seen = [], {}
    for key, label, url in SOURCES:
        try:
            rows = parse_rows(fetch(url))
        except Exception as e:
            print(f"  {label}ナンバー: 取得エラー {type(e).__name__}")
            continue
        added = 0
        for cells in rows:
            no = cells[0]
            # 固定品種表は [No, 通称, 品種名, 補足] / 他は [No, 品種名, 補足]
            if key == "kotei":
                nick = cells[1] if len(cells) > 1 else ""
                typ  = cells[2] if len(cells) > 2 else ""
                note = cells[3] if len(cells) > 3 else ""
            else:
                nick = ""
                typ  = cells[1] if len(cells) > 1 else ""
                note = cells[2] if len(cells) > 2 else ""
            name = nick or typ
            if not name:
                continue
            k = norm(name)
            if k in seen:                      # 同名は最初の出典を優先（重複排除）
                continue
            seen[k] = True
            entries.append({
                "no": no, "noType": label, "name": name,
                "type": typ, "note": note,
                "named": bool(nick),                      # 通称つき＝主要品種
                "derived": bool(DERIV.search(typ or "")), # 体型・ヒレ違いの派生
                "status": "done" if k in keep else "todo",
                "mappedId": keep.get(k),
            })
            added += 1
        print(f"  {label}ナンバー: {len(rows)}行 → 新規 {added}件")

    named   = sum(1 for e in entries if e["named"])
    derived = sum(1 for e in entries if e["derived"])
    done    = sum(1 for e in entries if e["status"] == "done")
    header = f'''/* =====================================================================
 * variety-master.js  ―― 品種マスタ（全品種の台帳）
 * ---------------------------------------------------------------------
 * ※このファイルは tools/master_import.py が自動生成します（手で編集しない）
 * 出典：改良メダカWEB図鑑のナンバー一覧（固定品種 / 品種 / 種類）
 *   https://medakazukan.net/koteihinsyunumber/
 *   https://medakazukan.net/hinsyunumber/
 *   https://medakazukan.net/syuruinumber/
 * 取得日：{today()}
 *
 * 各項目
 *   no       … ナンバー（出典表の番号）      noType … 固定品種 / 品種 / 種類
 *   name     … 品種名（通称があれば通称）    type   … 形質の記述（分類のヒント）
 *   named    … true=通称つきの主要品種（優先して図鑑に収録したい対象）
 *   derived  … true=体型・ヒレ違いの派生（例「朱赤ダルマ」。個別調査の価値は低い）
 *   status   … done=図鑑に収録済み / todo=未収録   mappedId … medaka-data.js の id
 *
 * 収録状況：全{len(entries)}件中 {done}件が収録済み（通称つき{named}件 / 派生{derived}件）
 * ===================================================================== */
window.MEDAKA_MASTER = {{
  source: "改良メダカWEB図鑑 ナンバー一覧（固定品種／品種／種類）",
  fetchedOn: "{today()}",
  total: {len(entries)},
  note: "台帳は全件を網羅する。解説の充実は named=true を優先し、derived=true は簡易登録でよい。",

  list: '''
    body = json.dumps(entries, ensure_ascii=False, indent=2)
    out = header + body + ",\n\n  /* ハウスネーム品種（SNS等で発見した、図鑑・JMA未収録の呼び名）*/\n" + \
          "  houseNames: " + house + "\n};\n"
    open(os.path.join(DATA, "variety-master.js"), "w", encoding="utf-8").write(out)

    print(f"\n台帳を更新しました: 全{len(entries)}件")
    print(f"  収録済み {done}件 / 未収録 {len(entries)-done}件")
    print(f"  通称つき（優先対象）{named}件 / 派生 {derived}件")

if __name__ == "__main__":
    main()
