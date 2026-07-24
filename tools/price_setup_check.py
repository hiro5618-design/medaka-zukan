# -*- coding: utf-8 -*-
"""
price_setup_check.py  ―― 相場収集の「準備確認」スクリプト（自宅PCで最初に実行する）
---------------------------------------------------------------------
相場収集を始める前に、つまずきやすい点をまとめて確認します。

  1. このPCのグローバルIP        … 楽天アプリの「許可されたIPアドレス」に登録する値
  2. 認証情報の2ファイルの有無    … tools/rakuten_app_id.txt / rakuten_access_key.txt
  3. 認証情報の形式              … アプリID=UUID形式 / アクセスキー=pk_ で始まる
  4. 公開リポジトリへの漏れ       … 認証ファイルがGitの管理対象に入っていないか
  5. 楽天APIへの疎通テスト        … 実際に1回だけ検索して応答を確認
  6. 収集対象の品種数と所要時間    … 何件・何分かかるか

使い方:  python tools\\price_setup_check.py
"""
import os, re, sys, json, subprocess, urllib.request, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
DATA = os.path.join(ROOT, "data")
API  = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20220601"

ok_n, ng_n = 0, 0
def ok(msg):
    global ok_n; ok_n += 1; print("  [OK] " + msg)
def ng(msg):
    global ng_n; ng_n += 1; print("  [!!] " + msg)
def info(msg):
    print("       " + msg)

def head(n, title):
    print("\n" + str(n) + ". " + title)

# ---- 1. グローバルIP ----
head(1, "このPCのグローバルIP（楽天アプリに登録する値）")
gip = None
try:
    req = urllib.request.Request("https://api.ipify.org", headers={"User-Agent": "MedakaZukanBot/1.0"})
    gip = urllib.request.urlopen(req, timeout=15).read().decode().strip()
    ok("グローバルIP = " + gip)
    info("楽天ウェブサービスのアプリ設定「許可されたIPアドレス」がこの値と一致している必要があります。")
    info("会社PCではなく自宅回線で実行しているか、必ず確認してください。")
except Exception as e:
    ng("グローバルIPを取得できませんでした（" + type(e).__name__ + "）")
    info("ブラウザで https://api.ipify.org を開いても確認できます。")

# ---- 2〜3. 認証情報 ----
head(2, "認証情報のファイル")
def read_secret(fn, env):
    v = os.environ.get(env, "").strip()
    if v:
        return v, "環境変数 " + env
    p = os.path.join(HERE, fn)
    if os.path.exists(p):
        return open(p, encoding="utf-8").read().strip(), "tools/" + fn
    return "", None

app_id, src1 = read_secret("rakuten_app_id.txt", "RAKUTEN_APP_ID")
acc_key, src2 = read_secret("rakuten_access_key.txt", "RAKUTEN_ACCESS_KEY")

if app_id: ok("アプリケーションID を読み込みました（" + src1 + "）")
else:      ng("アプリケーションIDがありません → tools/rakuten_app_id.txt を作ってください")
if acc_key: ok("アクセスキー を読み込みました（" + src2 + "）")
else:       ng("アクセスキーがありません → tools/rakuten_access_key.txt を作ってください")

head(3, "認証情報の形式")
if app_id:
    if re.match(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", app_id):
        ok("アプリケーションIDはUUID形式です")
    elif re.match(r"^\d{20}$", app_id):
        ng("20桁の数字は旧API用のIDです（旧APIは2026-05-14に停止）。新しいアプリを作り直してください")
    else:
        ng("アプリケーションIDの形式が想定と違います（UUID形式のはず）: " + app_id[:12] + "…")
if acc_key:
    if acc_key.startswith("pk_"):
        ok("アクセスキーは pk_ で始まっています")
    else:
        ng("アクセスキーは pk_ で始まるはずです。取り違えていないか確認してください: " + acc_key[:8] + "…")

# ---- 4. 公開リポジトリへの漏れチェック ----
head(4, "公開リポジトリへの漏れ（重要）")
try:
    r = subprocess.run(["git", "check-ignore", "tools/rakuten_app_id.txt", "tools/rakuten_access_key.txt"],
                       cwd=ROOT, capture_output=True, text=True)
    ignored = [l.strip().replace("\\", "/") for l in r.stdout.splitlines() if l.strip()]
    for f in ("tools/rakuten_app_id.txt", "tools/rakuten_access_key.txt"):
        if f in ignored: ok(f + " はGitの対象外です（公開されません）")
        else:            ng(f + " がGitの対象外になっていません。.gitignore を確認してください")
    t = subprocess.run(["git", "ls-files", "tools/rakuten_app_id.txt", "tools/rakuten_access_key.txt"],
                       cwd=ROOT, capture_output=True, text=True)
    if t.stdout.strip():
        ng("認証ファイルがGitに登録されています！ 直ちに git rm --cached で外してください")
        info(t.stdout.strip())
    else:
        ok("認証ファイルはGitに登録されていません")
except FileNotFoundError:
    info("gitコマンドが見つからないため、この確認はスキップしました")

# ---- 5. 疎通テスト ----
head(5, "楽天APIへの疎通テスト（1回だけ検索します）")
if app_id and acc_key:
    try:
        q = urllib.parse.urlencode({
            "applicationId": app_id, "accessKey": acc_key, "keyword": "メダカ 楊貴妃",
            "hits": 3, "format": "json", "formatVersion": 2,
        })
        req = urllib.request.Request(API + "?" + q, headers={"User-Agent": "MedakaZukanBot/1.0"})
        with urllib.request.urlopen(req, timeout=25) as res:
            body = json.loads(res.read().decode("utf-8", "ignore"))
        items = body.get("Items", []) if isinstance(body, dict) else []
        ok("APIに接続できました。「メダカ 楊貴妃」で " + str(len(items)) + "件を取得")
        for it in items[:3]:
            nm = str(it.get("itemName", ""))[:38]
            info("・" + nm + " … " + str(it.get("itemPrice")) + "円")
    except urllib.error.HTTPError as e:
        detail = ""
        try: detail = e.read().decode("utf-8", "ignore")[:200]
        except Exception: pass
        ng("APIエラー HTTP " + str(e.code))
        if e.code in (400, 401, 403):
            info("よくある原因：IPが未登録／IPが変わった／アクセスキーの取り違え／スコープ未選択")
            if gip: info("→ 楽天アプリの許可IPを " + gip + " に更新してください")
        if detail: info(detail)
    except Exception as e:
        ng("APIに接続できませんでした（" + type(e).__name__ + "）")
else:
    info("認証情報が揃っていないため、疎通テストはスキップしました")

# ---- 6. 収集対象 ----
head(6, "収集対象の品種数と所要時間")
try:
    txt = open(os.path.join(DATA, "medaka-data.js"), encoding="utf-8").read()
    pat = re.compile(r'id:\s*"(m\d{3,4})",\s*name:\s*"([^"]+)",\s*reading:\s*"[^"]*",\s*'
                     r'aliases:\s*\[([^\]]*)\],\s*status:\s*"([^"]*)"', re.S)
    rows = [m for m in pat.finditer(txt) if m.group(1) != "m000" and m.group(4) != "template"]
    dn = len([m for m in rows if m.group(4) == "done"])
    ok("全 " + str(len(rows)) + "品種（うち充実登録 " + str(dn) + "品種）")
    info("充実登録だけ    : 約" + str(round(dn * 1.25 / 60)) + "分")
    info("全品種          : 約" + str(round(len(rows) * 1.25 / 60)) + "分")
    info("おすすめの進め方 : python tools\\price_crawler.py --status done --limit 100")
except Exception as e:
    ng("品種データを読めませんでした（" + type(e).__name__ + "）")

print("\n" + "=" * 56)
print("確認できた項目: " + str(ok_n) + "件 / 要対応: " + str(ng_n) + "件")
if ng_n == 0:
    print("準備は整っています。次のコマンドで収集を始められます：")
    print("  python tools\\price_crawler.py --status done --limit 100")
else:
    print("上の [!!] の項目を解消してから、もう一度このスクリプトを実行してください。")
print("=" * 56)
