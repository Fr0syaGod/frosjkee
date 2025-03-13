function gameNotify(title, text) {
    // Используем новый контейнер
    var container = document.getElementById("game-notify-container");
    if (!container) {
        // Если контейнер не найден, создаем его
        container = document.createElement("div");
        container.id = "game-notify-container";
        container.style = "position: fixed; left: 20px; top: 20%; z-index: 1000; width: 350px;";
        document.body.appendChild(container);
    }
    
    // Проверяем количество уведомлений в контейнере
    if (container.children.length >= 3) {
        container.removeChild(container.children[0]);
    }
    
    // Создаем уведомление
    var div = document.createElement("div");
    div.style = "background: #fff; border-radius: 4px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); width: 100%; overflow: hidden; position: relative; margin-bottom: 10px; opacity: 0; transform: translateY(-20px); transition: opacity 0.3s ease, transform 0.3s ease;";
    container.appendChild(div);
    
    // Создаем заголовок
    var header = document.createElement("div");
    header.style = "background-color: #2a4ed6; color: #fff; padding: 10px 15px; font-family: 'Proxima Nova Bold', sans-serif; font-size: 14px; width: 100%; position: relative; display: flex; justify-content: space-between; align-items: center;";
    div.appendChild(header);
    
    // Добавляем заголовок
    var titleElem = document.createElement("div");
    titleElem.innerHTML = title;
    header.appendChild(titleElem);
    
    // Добавляем кнопку закрытия
    var closeBtn = document.createElement("div");
    closeBtn.style = "cursor: pointer; font-size: 16px; opacity: 0.8;";
    closeBtn.innerHTML = "✕";
    header.appendChild(closeBtn);
    
    // Создаем тело уведомления
    var body = document.createElement("div");
    body.style = "padding: 15px; display: flex; align-items: center;";
    div.appendChild(body);
    
    // Добавляем иконку колокольчика
    var icon = document.createElement("div");
    icon.style = "color: #2a4ed6; margin-right: 15px; flex-shrink: 0;";
    icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2a4ed6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>`;
    body.appendChild(icon);
    
    // Добавляем сообщение
    var message = document.createElement("div");
    message.style = "font-size: 13px; color: #303030; line-height: 1.4; font-family: 'Proxima Nova Sm', sans-serif;";
    message.innerHTML = text;
    body.appendChild(message);
    
    // Добавляем разделительную линию внизу
    var separator = document.createElement("div");
    separator.style = "height: 1px; width: 100%; background-color: #2a4ed6;";
    div.appendChild(separator);
    
    // Показываем уведомление с анимацией
    setTimeout(function() {
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 10);
    
    // Обработчик кнопки закрытия
    closeBtn.addEventListener('click', function() {
        div.style.opacity = "0";
        div.style.transform = "translateY(-20px)";
        setTimeout(function() {
            container.removeChild(div);
        }, 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(function () {
        div.style.opacity = "0";
        div.style.transform = "translateY(-20px)";
        setTimeout(function() {
            if (div.parentNode === container) {
                container.removeChild(div);
            }
        }, 300);
    }, 4500);
}

// Добавьте этот обработчик события к другим обработчикам cef.on
cef.on("show-game-notify", (title, text) => { gameNotify(title, text); });