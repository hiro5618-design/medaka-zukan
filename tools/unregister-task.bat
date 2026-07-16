@echo off
chcp 65001 >nul
rem 新品種クローラの自動実行タスクを解除します。
schtasks /Delete /TN "MedakaZukanCrawler" /F
echo.
echo 自動実行タスクを解除しました。
pause
