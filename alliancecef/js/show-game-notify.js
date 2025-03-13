function gameNotify(title, text) {
    // Создаем контейнер уведомления
    var notifyDiv = document.createElement("div");
    notifyDiv.style.cssText = `
        position: absolute;
        top: 40%;
        left: 50px;
        width: 320px !important;
        max-width: 320px !important;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
    `;
    
    // HTML содержимое уведомления
    var htmlContent = `
        <div style="background-color: #2a4ed6; color: #ffffff; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; font-family: 'Proxima Nova Bold', sans-serif; font-size: 14px;">
            <div>${title}</div>
            <div style="cursor: pointer; font-size: 16px; opacity: 0.8;">✕</div>
        </div>
        <div style="padding: 15px; display: flex; align-items: center;">
            <div style="margin-right: 15px; color: #2a4ed6;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2a4ed6" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
            <div style="font-size: 13px; color: #303030; line-height: 1.4; font-family: 'Proxima Nova Sm', sans-serif;">
                ${text}
            </div>
        </div>
        <div style="height: 3px; background-color: #2a4ed6; width: 100%;"></div>
    `;
    
    notifyDiv.innerHTML = htmlContent;
    
    // Независимый контейнер, добавляем напрямую в body
    document.body.appendChild(notifyDiv);
    
    // Получаем кнопку закрытия
    var closeBtn = notifyDiv.querySelector("div div:first-child div:last-child");
    
    // Анимация появления
    setTimeout(function() {
        notifyDiv.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        notifyDiv.style.opacity = "1";
        notifyDiv.style.transform = "translateY(0)";
    }, 10);
    
    // Обработчик закрытия
    closeBtn.addEventListener('click', function() {
        notifyDiv.style.opacity = "0";
        notifyDiv.style.transform = "translateY(-20px)";
        setTimeout(function() {
            if (document.body.contains(notifyDiv)) {
                document.body.removeChild(notifyDiv);
            }
        }, 500);
    });
    
    // Автоматическое закрытие
    setTimeout(function() {
        notifyDiv.style.opacity = "0";
        notifyDiv.style.transform = "translateY(-20px)";
        setTimeout(function() {
            if (document.body.contains(notifyDiv)) {
                document.body.removeChild(notifyDiv);
            }
        }, 500);
    }, 4500);
}

// Добавьте этот обработчик события 
cef.on("show-game-notify", (title, text) => { gameNotify(title, text); });