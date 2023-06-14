@echo off
echo.
echo ClassPlus PDF Downloader
echo.

set /p arg1=Enter the url: 
set /p arg2=Enter the token: 
echo.

if not exist "downloads" (
  mkdir "downloads"
)

node dist/index.js "%arg1%" "%arg2%"

pause