function gameNotify(title, text, color = "2a4ed6") {
    // Сначала удалим все существующие уведомления
    var existingNotifications = document.querySelectorAll('.game-notification');
    existingNotifications.forEach(function(notification) {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    });
    
    // Создаем контейнер уведомления
    var notifyDiv = document.createElement("div");
    notifyDiv.className = "game-notification"; // Добавляем класс для легкой идентификации
    notifyDiv.style.cssText = `
        position: absolute;
        top: 60%;
        left: -320px; /* Начинаем за пределами экрана */
        width: 320px !important;
        max-width: 320px !important;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 10000;
        opacity: 0;
        transition: left 0.5s ease, opacity 0.5s ease;
    `;
    
    // HTML содержимое уведомления
    var htmlContent = `
        <div style="background-color: #${color}; color: #ffffff; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; font-family: 'Proxima Nova Bold', sans-serif; font-size: 14px;">
            <div>${title}</div>
            <div style="cursor: pointer; font-size: 16px; opacity: 0.8;">✕</div>
        </div>
        <div style="padding: 15px; display: flex; align-items: center;">
            <div style="margin-right: 15px; color: #${color};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#${color}" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
            <div style="font-size: 13px; color: #303030; line-height: 1.4; font-family: 'Proxima Nova Sm', sans-serif;">
                ${text}
            </div>
        </div>
        <div class="progress-container" style="height: 3px; width: 100%; position: relative; overflow: hidden;">
            <div class="progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #${color}; transition: width 4.5s linear;"></div>
        </div>
    `;
    
    notifyDiv.innerHTML = htmlContent;
    
    // Добавляем уведомление в DOM
    document.body.appendChild(notifyDiv);
    
    // Получаем кнопку закрытия и прогресс-бар
    var closeBtn = notifyDiv.querySelector("div div:first-child div:last-child");
    var progressBar = notifyDiv.querySelector(".progress-bar");
    
    // Анимация появления (с левой стороны)
    setTimeout(function() {
        notifyDiv.style.left = "50px";
        notifyDiv.style.opacity = "1";
    }, 10);
    
    // Анимация прогресс-бара
    setTimeout(function() {
        progressBar.style.width = "0%";
    }, 50);
    
    // Обработчик закрытия
    closeBtn.addEventListener('click', function() {
        notifyDiv.style.left = "-320px";
        notifyDiv.style.opacity = "0";
        
        setTimeout(function() {
            if (document.body.contains(notifyDiv)) {
                document.body.removeChild(notifyDiv);
            }
        }, 500);
    });
    
    // Автоматическое закрытие
    setTimeout(function() {
        notifyDiv.style.left = "-320px";
        notifyDiv.style.opacity = "0";
        
        setTimeout(function() {
            if (document.body.contains(notifyDiv)) {
                document.body.removeChild(notifyDiv);
            }
        }, 500);
    }, 4500);
}

// Обработчик события
cef.on("show-game-notify", (title, text, color = "2a4ed6") => { gameNotify(title, text, color); });