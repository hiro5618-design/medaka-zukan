@echo off
chcp 65001 >nul
rem 新品種クローラを「毎週土曜 9:00」に自動実行するタスクを登録します。
schtasks /Create /TN "MedakaZukanCrawler" /TR "\"C:\Program Files\Python312\python.exe\" \"%~dp0medaka_crawler.py\"" /SC WEEKLY /D SAT /ST 09:00 /F
echo.
echo 登録しました。毎週土曜 9:00 に自動実行されます。
echo 解除するには unregister-task.bat を実行してください。
pause
