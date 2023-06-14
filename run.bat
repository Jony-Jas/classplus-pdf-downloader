@echo off
echo.
echo ClassPlus PDF Downloader
echo.

set /p arg1=Enter the url: 
set /p arg2=Enter the token: 
echo.
set /p arg3=Enter the starting : 
set /p arg4=Enter the Ending : 
echo.

if not exist "downloads" (
  mkdir "downloads"
)

node dist/index.js "%arg1%" "%arg2%" "%arg3%" "%arg4%"

pause