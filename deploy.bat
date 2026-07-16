@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === メダカ図鑑 公開反映（デプロイ）===
echo.

rem 変更をすべてステージ
git add .

rem 変更がなければ終了
git diff --cached --quiet
if %errorlevel%==0 (
  echo 反映する変更はありませんでした。
  echo.
  pause
  exit /b 0
)

rem コミット（日時つき）してプッシュ
git commit -m "図鑑を更新 (%date% %time%)"
git push

echo.
echo 公開サイトに反映しました。数分後に下記へ反映されます:
echo   https://hiro5618-design.github.io/medaka-zukan/
echo.
pause
