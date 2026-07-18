# -*- coding: utf-8 -*-
"""
medaka_crawler.py  ―― 新品種・ハウスネーム 差分クローラ（Layer 1）
---------------------------------------------------------------------
中核ソース（RSS）を巡回し、品種名を抽出 → 既知の品種マスタ/図鑑データと
差分をとり、新規候補だけを inbox に追記する。LLMは使わない（ほぼ無料）。

  1. sources.json のRSSを取得
  2. タイトルから品種名を抽出（mode別）
  3. data/variety-master.js と data/medaka-data.js の既知名と照合
  4. 新規のみ tools/inbox.json / tools/inbox.md に追記（重複除去）
  5. tools/crawler-log.txt に実行ログ

使い方:  python medaka_crawler.py
定期実行:  Windowsタスクスケジューラで週1回（register-task.bat 参照）
※ 個人利用の低頻度・礼儀正しい巡回。robots.txt/利用規約を尊重すること。
"""
import os, re, json, time, urllib.request
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
JST  = timezone(timedelta(hours=9))

def today():
    return datetime.now(JST).strftime("%Y-%m-%d")
def now_str():
    return datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S")

# ---- 正規化（照合用）：空白・括弧内読み・記号を除去 ----
def norm(name):
    s = name or ""
    s = re.sub(r"[（(【\[].*?[）)】\]]", "", s)   # 括弧内（読み等）を除去
    s = re.sub(r"[\s　、,・]", "", s)              # 空白・区切りを除去
    return s.strip()

# ---- 既知の品種名を data/*.js から集める ----
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

# ---- RSS取得 ----
def fetch(url, ua, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", "ignore")

def clean(t):
    return re.sub(r"<!\[CDATA\[|\]\]>", "", t or "").strip()

# ---- タイトル→品種名の抽出 ----
def extract_name(title, mode):
    t = clean(title)
    t = re.sub(r"[＜<][^＜<＞>]*[＞>]", "", t).strip()   # ＜通常価格〇〇円＞等の装飾を除去
    if mode == "toha":
        m = re.match(r"^(.*?)とは", t)
        return m.group(1).strip() if m else None
    if mode == "colon":
        head = re.split(r"[：:【　]", t)[0]         # ：: や 【現物】・全角空白の手前まで
        head = re.split(r"[?？]", head)[-1]         # 「会員専用?」等の接頭辞を除去
        head = re.sub(r"(の型|の系統|系統)$", "", head.strip())
        if any(k in head for k in ("玉手箱", "福袋", "セット", "箱", "詰め合わせ")):
            return None                             # 品種でない商品を除外
        return head.strip() or None
    # mode == "title"
    return t or None

def parse_items(xml):
    out = []
    for block in re.findall(r"<item\b.*?</item>", xml, re.S):
        tm = re.search(r"<title>(.*?)</title>", block, re.S)
        lm = re.search(r"<link>(.*?)</link>", block, re.S)
        if tm:
            out.append((clean(tm.group(1)), clean(lm.group(1)) if lm else ""))
    return out

def main():
    cfg = json.load(open(os.path.join(HERE, "sources.json"), encoding="utf-8"))
    ua = cfg.get("user_agent", "MedakaZukanBot/1.0")
    interval = cfg.get("request_interval_sec", 2)

    known = load_known()

    # 既存インボックスを読み込み（重複を避ける）
    inbox_path = os.path.join(HERE, "inbox.json")
    inbox = json.load(open(inbox_path, encoding="utf-8")) if os.path.exists(inbox_path) else []
    seen = set(norm(x["name"]) for x in inbox)

    new_items, errors, scanned = [], [], 0
    for src in cfg["sources"]:
        try:
            xml = fetch(src["url"], ua)
            for title, link in parse_items(xml):
                if src.get("must_contain") and src["must_contain"] not in title:
                    continue
                name = extract_name(title, src.get("mode", "title"))
                if not name:
                    continue
                scanned += 1
                key = norm(name)
                if not key or key in known or key in seen:
                    continue
                seen.add(key)
                rec = {"name": name, "source": src["name"], "url": link,
                       "foundOn": today(), "status": "new"}
                new_items.append(rec)
                inbox.append(rec)
        except Exception as e:
            errors.append(f'{src["name"]}: {type(e).__name__}: {e}')
        time.sleep(interval)

    # 保存
    json.dump(inbox, open(inbox_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    write_inbox_md(os.path.join(HERE, "inbox.md"), inbox)

    log = f"[{now_str()}] 走査{scanned}件 / 新規{len(new_items)}件 / 既知{len(known)}件 / エラー{len(errors)}件"
    if errors:
        log += " :: " + " | ".join(errors)
    with open(os.path.join(HERE, "crawler-log.txt"), "a", encoding="utf-8") as f:
        f.write(log + "\n")

    # コンソールはASCIIのみ（文字化け回避）。詳細はinbox.md参照。
    print(f"scanned={scanned} new={len(new_items)} known={len(known)} errors={len(errors)}")
    if errors:
        for e in errors:
            print("  ERROR:", e.encode("ascii", "backslashreplace").decode())
    print("=> see tools/inbox.md (new candidates), tools/crawler-log.txt (log)")

def write_inbox_md(path, inbox):
    new = [x for x in inbox if x.get("status") == "new"]
    lines = ["# 新品種候補インボックス（未処理）", "",
             f"未処理 {len(new)} 件 / 全 {len(inbox)} 件。処理したら status を \"done\" に変えてください。", ""]
    if new:
        lines += ["| 品種名 | 情報源 | 発見日 | リンク |", "|---|---|---|---|"]
        for x in new:
            lines.append(f'| {x["name"]} | {x["source"]} | {x["foundOn"]} | {x["url"]} |')
    else:
        lines.append("（未処理の新規候補はありません）")
    open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")

if __name__ == "__main__":
    main()
