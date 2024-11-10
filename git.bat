@echo off
if "%1"=="" (
    echo Ошибка: необходимо указать сообщение для коммита.
    echo Использование: auto_commit.bat "Ваше сообщение для коммита" [ветка]
    exit /b 1
)

set BRANCH=%2
if "%BRANCH%"=="" set BRANCH=main

git add .
git commit -m "%1"
git push origin %BRANCH%
