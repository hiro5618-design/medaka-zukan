@echo off
chcp 65001 >nul
rem 自動実行タスクを登録します（2つ）。
rem   1) 新品種クローラ … 毎週土曜 9:00（medaka_crawler.py）
rem   2) 相場クローラ   … 毎週土曜 6:00（price-task.ps1：収集→公開まで）

rem Python の場所（ユーザーインストール優先。なければ PATH の python）
set "PY=%LocalAppData%\Programs\Python\Python312\python.exe"
if not exist "%PY%" set "PY=python"

schtasks /Create /TN "MedakaZukanCrawler" /TR "\"%PY%\" \"%~dp0medaka_crawler.py\"" /SC WEEKLY /D SAT /ST 09:00 /F
schtasks /Create /TN "MedakaZukanPrice" /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"%~dp0price-task.ps1\"" /SC WEEKLY /D SAT /ST 06:00 /F
echo.
echo 登録しました。
echo   新品種クローラ : 毎週土曜  9:00
echo   相場クローラ   : 毎週土曜  6:00（収集→GitHub Pages公開まで自動）
echo 解除するには unregister-task.bat を実行してください。
pause
