@echo off
chcp 65001 >nul
rem 自動実行タスク（新品種クローラ・相場クローラ）を解除します。
schtasks /Delete /TN "MedakaZukanCrawler" /F
schtasks /Delete /TN "MedakaZukanPrice" /F
echo.
echo 自動実行タスクを解除しました。
pause
