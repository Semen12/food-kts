# Устанавливаем кодировку для вывода
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8


param (
    [string]$m,
    [string]$b = git branch --show-current
)

if (-not $m) {
    Write-Host "Ошибка: необходимо указать сообщение для коммита."
    Write-Host "Использование: .\auto_commit.ps1 -commitMessage 'Ваше сообщение' [-branch 'имя_ветки']"
    exit 1
}
    git add .
    git commit -m $m
    git push origin $b