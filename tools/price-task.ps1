# =====================================================================
# price-task.ps1 ―― 相場の定期収集＋公開（タスクスケジューラ用・無人実行）
#   1) price_crawler.py で全品種の相場を収集（価格履歴へ追記）
#   2) 変更があればコミットして GitHub Pages へ公開
#   実行結果は tools\crawler-log.txt に記録されます。
#   手動テスト: powershell -NoProfile -ExecutionPolicy Bypass -File tools\price-task.ps1
# =====================================================================
$ErrorActionPreference = "Continue"
$repo = Split-Path -Parent $PSScriptRoot   # tools の1つ上 = リポジトリ直下
Set-Location $repo
$log = Join-Path $repo "tools\crawler-log.txt"

function Write-Log($msg) {
    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $log -Value "[$stamp] $msg" -Encoding UTF8
}

Write-Log "==== 相場収集を開始 ===="

# Python の場所（ユーザーインストール優先。なければ PATH の python）
$py = Join-Path $env:LocalAppData "Programs\Python\Python312\python.exe"
if (-not (Test-Path $py)) { $py = "python" }

& $py "tools\price_crawler.py" 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
if ($LASTEXITCODE -ne 0) {
    Write-Log "相場収集でエラー発生（終了コード $LASTEXITCODE）。公開を中止"
    exit 1
}

# 相場データのみステージして、変更がなければ公開しない
git add data/price-history.js 2>&1 | Out-Null
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Log "相場に変更なし。公開スキップ"
    exit 0
}

$d = Get-Date -Format "yyyy-MM-dd"
git commit -m "相場データを自動更新 ($d)" 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
git push 2>&1 | ForEach-Object { Add-Content -Path $log -Value $_ -Encoding UTF8 }
if ($LASTEXITCODE -ne 0) {
    Write-Log "プッシュ失敗。ネットワークか認証を確認"
    exit 1
}
Write-Log "公開完了"
exit 0
