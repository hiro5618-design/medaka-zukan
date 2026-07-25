# =====================================================================
# discover-task.ps1 ―― ハウスネームの定期発見＋公開（タスクスケジューラ用・無人実行）
#   1) discover_rakuten.py で楽天の出品タイトルからハウスネーム候補を発見
#   2) 成功時に rakuten_build.py で data/medaka-data.js と data/variety-master.js へ反映
#   3) 変更があればコミットして GitHub Pages へ公開
#   実行結果は tools\crawler-log.txt に記録されます。
#   手動テスト: powershell -NoProfile -ExecutionPolicy Bypass -File tools\discover-task.ps1
# =====================================================================
$ErrorActionPreference = "Continue"
$repo = Split-Path -Parent $PSScriptRoot   # tools の1つ上 = リポジトリ直下
Set-Location $repo
$log = Join-Path $repo "tools\crawler-log.txt"

function Write-Log($msg) {
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $log -Value "[$stamp] $msg" -Encoding UTF8
}

Write-Log "==== ハウスネーム発見を開始 ===="

# Python の場所（ユーザーインストール優先。なければ PATH の python）
$py = Join-Path $env:LocalAppData "Programs\Python\Python312\python.exe"
if (-not (Test-Path $py)) { $py = "python" }

# discover_rakuten.py を実行
& $py "tools\discover_rakuten.py" 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
if ($LASTEXITCODE -ne 0) {
    Write-Log "ハウスネーム発見でエラー発生（終了コード $LASTEXITCODE）。ビルドを中止"
    exit 1
}

# 成功時に rakuten_build.py を実行
& $py "tools\rakuten_build.py" 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
if ($LASTEXITCODE -ne 0) {
    Write-Log "ビルドでエラー発生（終了コード $LASTEXITCODE）。公開を中止"
    exit 1
}

# medaka-data.js と variety-master.js をステージして、変更がなければ公開しない
git add data/medaka-data.js data/variety-master.js 2>&1 | Out-Null
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Log "発見なし。公開スキップ"
    exit 0
}

$d = Get-Date -Format "yyyy-MM-dd"
git commit -m "楽天発見のハウスネームを自動追加 ($d)" 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
# 外部（メイン側）の更新と競合してpushが弾かれないよう、先に早送りpull
git pull --rebase 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
git push 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
if ($LASTEXITCODE -ne 0) {
    Write-Log "プッシュ失敗。ネットワークか認証を確認"
    exit 1
}
Write-Log "公開完了"
exit 0
