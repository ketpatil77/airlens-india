@echo off
REM ============================================================================
REM         AIRLENS INDIA - Air Quality Visualization Platform
REM                    Application Launcher Script
REM ============================================================================

setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================================
REM CONFIGURATION
REM ============================================================================
set "PORT=5173"
set "HOST=127.0.0.1"
set "APP_URL=http://%HOST%:%PORT%"
set "PROJECT_NAME=AIRLENS INDIA"
set "MIN_NODE_VERSION=18"
set "STARTUP_TIMEOUT=30"
set "DEV_LAUNCHER=%TEMP%\airlens-dev-server-%RANDOM%.bat"

REM ============================================================================
REM INITIALIZE TERMINAL
REM ============================================================================
cd /d "%~dp0"
title AirLens - Application Launcher
color 0A
cls

echo.
echo ============================================================================
echo.
echo        +-----------------------------------------------------------+
echo        ^|        AIRLENS INDIA - APPLICATION LAUNCHER              ^|
echo        ^|                                                           ^|
echo        ^|         "See What You Breathe"                           ^|
echo        ^|    Air Quality Awareness Platform for India              ^|
echo        +-----------------------------------------------------------+
echo.
echo ============================================================================
echo.
echo Initializing %PROJECT_NAME% development environment...
echo.
echo Current directory: %cd%
echo.
echo ============================================================================
echo.

REM ============================================================================
REM STEP 1: VALIDATE NODE.JS INSTALLATION
REM ============================================================================
echo [STEP 1/6] Validating Node.js installation...
set "NODE_CMD=node"
node -v >nul 2>nul
if errorlevel 1 set "NODE_CMD="
if not defined NODE_CMD if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles%\nodejs\node.exe"
if not defined NODE_CMD if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "NODE_CMD=%LOCALAPPDATA%\Programs\nodejs\node.exe"
if not defined NODE_CMD (
  color 0C
  echo.
  echo [ERROR] Node.js is not installed or not available in PATH.
  echo.
  echo Checked locations:
  echo   - PATH environment variable
  echo   - C:\Program Files\nodejs
  echo   - %%LOCALAPPDATA%%\Programs\nodejs
  echo.
  echo SOLUTION:
  echo   1. Install Node.js from https://nodejs.org/ ^(LTS recommended^)
  echo   2. During installation, enable "Add to PATH"
  echo   3. Restart the terminal after installation
  echo   4. Run this script again
  echo.
  call :maybe_pause
  exit /b 1
)

for /f "delims=" %%V in ('"%NODE_CMD%" -v') do set "NODE_VERSION=%%V"
echo   [OK] Node.js installed: %NODE_VERSION%
for /f "tokens=1 delims=." %%V in ("%NODE_VERSION:~1%") do set "NODE_MAJOR=%%V"
if not defined NODE_MAJOR (
  color 0C
  echo.
  echo [ERROR] Unable to determine the installed Node.js major version.
  echo.
  echo Detected version string: %NODE_VERSION%
  echo Please verify your Node.js installation and try again.
  echo.
  call :maybe_pause
  exit /b 1
)
if %NODE_MAJOR% LSS %MIN_NODE_VERSION% (
  color 0C
  echo.
  echo [ERROR] Node.js %MIN_NODE_VERSION%+ is required.
  echo.
  echo Detected version: %NODE_VERSION%
  echo Required version: v%MIN_NODE_VERSION%.0.0 or newer
  echo.
  echo SOLUTION:
  echo   1. Install the latest LTS release from https://nodejs.org/
  echo   2. Restart your terminal
  echo   3. Run this script again
  echo.
  call :maybe_pause
  exit /b 1
)

REM ============================================================================
REM STEP 2: VALIDATE NPM INSTALLATION
REM ============================================================================
echo [STEP 2/6] Validating npm installation...
set "NPM_CMD="
if exist "%ProgramFiles%\nodejs\npm.cmd" set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"
if not defined NPM_CMD if exist "%LOCALAPPDATA%\Programs\nodejs\npm.cmd" set "NPM_CMD=%LOCALAPPDATA%\Programs\nodejs\npm.cmd"
if defined NPM_CMD (
  call "%NPM_CMD%" -v >nul 2>nul
  if errorlevel 1 set "NPM_CMD="
)
if not defined NPM_CMD (
  call npm -v >nul 2>nul
  if not errorlevel 1 set "NPM_CMD=npm"
)
if not defined NPM_CMD (
  color 0C
  echo.
  echo [ERROR] npm is not installed or not available in PATH.
  echo.
  echo npm is bundled with Node.js. Please reinstall Node.js from:
  echo   https://nodejs.org/
  echo.
  call :maybe_pause
  exit /b 1
)

for /f "delims=" %%V in ('cmd /d /c call "%NPM_CMD%" -v') do set "NPM_VERSION=%%V"
echo   [OK] npm installed: version %NPM_VERSION%
echo.
echo   System check complete:
echo   [OK] Node %NODE_VERSION% / npm %NPM_VERSION%
echo   [OK] All prerequisites satisfied
echo.

REM ============================================================================
REM STEP 3: VERIFY PROJECT STRUCTURE
REM ============================================================================
echo [STEP 3/6] Verifying project structure...
if not exist package.json (
  color 0C
  echo.
  echo [ERROR] Project configuration not found ^(package.json missing^).
  echo.
  echo Current directory: %cd%
  echo.
  echo SOLUTION:
  echo   - Ensure this script is in the AirLens project root directory
  echo   - The directory should contain package.json, vite.config.ts, and src\
  echo   - Try running the script from the correct location
  echo.
  call :maybe_pause
  exit /b 1
)

echo   [OK] package.json found
echo   [OK] Project: %PROJECT_NAME%
echo   [OK] Root directory: %cd%
echo.

REM ============================================================================
REM STEP 4: INSTALL/UPDATE DEPENDENCIES
REM ============================================================================
echo [STEP 4/6] Installing project dependencies...
if not exist node_modules (
  echo.
  echo   [INFO] First-time setup detected
  echo   [INFO] Downloading and installing packages...
  echo   [INFO] npm output may appear below
  echo.

  if exist package-lock.json (
    echo   Using package-lock.json for reliable installations...
    call "%NPM_CMD%" ci --silent
  ) else (
    echo   Installing from package.json...
    call "%NPM_CMD%" install --silent
  )

  if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Dependency installation failed.
    echo.
    echo Troubleshooting:
    echo   1. Check your internet connection
    echo   2. Run: npm cache clean --force
    echo   3. Delete package-lock.json and try again
    echo   4. Try: npm install
    echo.
    echo Error occurred in directory: %cd%
    echo.
    call :maybe_pause
    exit /b 1
  )
  echo.
  echo   [OK] Dependencies installed successfully
) else (
  echo   [OK] Dependencies already installed
  echo   [INFO] To update: run npm install in a terminal
)
echo.

REM ============================================================================
REM STEP 5: COMPILE TYPESCRIPT & VERIFY BUILD
REM ============================================================================
echo [STEP 5/6] Verifying TypeScript compilation...
call "%NPM_CMD%" run build >nul 2>&1

if errorlevel 1 (
  color 0E
  echo.
  echo [WARN] Build validation had issues.
  echo.
  echo This may be caused by:
  echo   - TypeScript compilation warnings
  echo   - Missing environment variables
  echo   - Optional dependencies not installed
  echo.
  echo The app may still work. Attempting to continue...
  echo.
) else (
  echo   [OK] TypeScript compilation successful
  echo   [OK] Production build verified
)
echo.

REM ============================================================================
REM STEP 6: START DEVELOPMENT SERVER
REM ============================================================================
echo [STEP 6/6] Starting Vite development server...
echo.
echo   Server URL:  %APP_URL%
echo   Framework:   React 18 + TypeScript + Vite
echo   Features:    Hot Module Replacement
echo.
echo   ----------------------------------------------------------------
echo.

call :check_server
set "SERVER_STATUS=New terminal window opened"
if "%SERVER_READY%"=="1" (
  echo   [OK] Existing dev server detected at %APP_URL%
  echo   [INFO] Reusing the already running app instance
  set "SERVER_STATUS=Existing dev server reused"
  goto open_browser
)

echo.
echo   [INFO] Starting Vite development server...
echo   [INFO] Command: "%NPM_CMD%" run dev -- --host %HOST% --port %PORT% --strictPort
echo.

call :write_dev_launcher
start "AirLens Dev Server" "%ComSpec%" /k "%DEV_LAUNCHER%"

echo   [INFO] Waiting for the app to respond...
call :wait_for_server
if "%SERVER_READY%"=="1" goto open_browser
goto startup_timeout

:open_browser
echo.
if /I "%NO_BROWSER%"=="1" (
  echo   [INFO] Browser launch skipped because NO_BROWSER=1
) else (
  echo   [INFO] Opening application in browser at %APP_URL%...
  echo.
  start "" "%APP_URL%"
)
goto launcher_complete

:startup_timeout
color 0E
echo.
echo   [WARN] The dev server did not respond within %STARTUP_TIMEOUT% seconds.
echo   [WARN] Check the "AirLens Dev Server" window for errors.
echo   [INFO] You can still open %APP_URL% manually once the server is ready.
echo.

:launcher_complete
echo.
echo ============================================================================
echo.
echo        AIRLENS IS READY
echo.
echo   Application: %APP_URL%
echo   Status:      Running in development mode
echo   Server:      %SERVER_STATUS%
echo   Hot Reload:  Enabled
echo.
echo ============================================================================
echo.
echo QUICK REFERENCE:
echo.
echo   - Browser target: %APP_URL%
echo   - Edit files in src\
echo   - Browser auto-refreshes on save
echo   - To stop the server, close the server terminal or press Ctrl+C there
echo   - If the port is unavailable, change PORT in start.bat
echo.
echo ============================================================================
echo.
if /I "!CI!"=="1" goto :eof
if /I "!NO_PAUSE!"=="1" goto :eof
echo Press any key to close this window ^(server will continue running^)...
echo.
call :maybe_pause
exit /b 0

:maybe_pause
if /I "!CI!"=="1" exit /b 0
if /I "!NO_PAUSE!"=="1" exit /b 0
pause
exit /b 0

:write_dev_launcher
(
  echo @echo off
  echo cd /d "%cd%"
  echo color 0B
  echo call "%NPM_CMD%" run dev -- --host %HOST% --port %PORT% --strictPort
) > "%DEV_LAUNCHER%"
exit /b 0

:wait_for_server
set "SERVER_READY=0"
set /a WAITED_SECONDS=0

:wait_for_server_loop
if !WAITED_SECONDS! GEQ %STARTUP_TIMEOUT% exit /b 0
timeout /t 1 /nobreak >nul
set /a WAITED_SECONDS+=1
call :check_server
if "!SERVER_READY!"=="1" exit /b 0
goto wait_for_server_loop

:check_server
set "SERVER_READY=0"
where powershell >nul 2>nul
if errorlevel 1 exit /b 0

powershell -NoProfile -Command "try { $response = Invoke-WebRequest -Uri '%APP_URL%/' -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>nul
if not errorlevel 1 set "SERVER_READY=1"
exit /b 0
