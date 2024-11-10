# Устанавливаем кодировку для вывода
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Сообщение по умолчанию для коммита
$commitMessage = "Автоматический коммит $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Интервал в минутах
$intervalMinutes = 10

# Бесконечный цикл для автоматического коммита каждые 10 минут
while ($true) {
    # Извлекаем имя текущей активной ветки
    $branch = git branch --show-current

    if (-not $branch) {
        Write-Host "Не удалось определить текущую ветку. Скрипт завершён."
        break
    }

    Write-Host "Текущая ветка: $branch"

    # Проверяем, есть ли изменения, которые нужно закоммитить
    $status = git status --porcelain

    if ($status) {
        Write-Host "Изменения найдены. Добавление изменений, коммит и пуш в ветку '$branch'."
        
        # Добавляем изменения
        git add .

        # Выполняем коммит с сообщением
        git commit -m $commitMessage

        # Пушим изменения в текущую ветку
        git push origin $branch

        Write-Host "Коммит и пуш завершены."
    } else {
        Write-Host "Изменений нет, коммит не требуется."
    }

    # Ожидаем 10 минут перед следующей проверкой
    Start-Sleep -Seconds ($intervalMinutes * 60)
}

