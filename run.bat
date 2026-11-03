@echo off
cd /d "%~dp0"
echo Starting VITALSYN Server on http://127.0.0.1:8000 ...
"C:\Users\Girish V\AppData\Local\Programs\Orange\python.exe" -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause

