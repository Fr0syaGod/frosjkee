function gameNotify(title, text, color = "2a4ed6", textColor = null, rightText = null) {
    // Если textColor не задан, используем основной цвет
    textColor = textColor || color;
    
    // Сначала удалим все существующие уведомления
    var existingNotifications = document.querySelectorAll('.game-notification');
    existingNotifications.forEach(function(notification) {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    });
    
    // Создаем контейнер уведомления
    var notifyDiv = document.createElement("div");
    notifyDiv.className = "game-notification";
    notifyDiv.style.cssText = `
        position: absolute;
        top: 60%;
        left: 50px;
        width: 320px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        opacity: 0;
        transform: translateX(-100px);
        z-index: 10000;
        animation: notifySlideIn 0.5s ease forwards;
    `;
    
    // Добавляем стиль анимации
    var styleId = "notify-style-" + Date.now();
    if (!document.getElementById(styleId)) {
        var styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.innerHTML = `
            @keyframes notifySlideIn {
                0% {
                    transform: translateX(-100px);
                    opacity: 0;
                }
                100% {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes notifyProgress {
                0% {
                    width: 0;
                }
                100% {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Добавляем дополнительный текст справа, если он есть
    var rightTextHtml = '';
    if (rightText) {
        rightTextHtml = `<div style="margin-left: auto; margin-right: 5px; font-size: 13px; font-family: 'Proxima Nova Bold'; color: #${color};">${rightText}</div>`;
    }
    
    // HTML содержимое уведомления
    var htmlContent = `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; background: #${color}; color: #fff;">
            <div style="font-size: 15px; font-weight: 600; font-family: 'Proxima Nova Bold', sans-serif;">${title}</div>
            <div style="width: 20px; height: 20px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px;">✕</div>
        </div>
        <div style="padding: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(${hexToRgb(color)}, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </div>
                <div style="font-size: 13px; color: #303030; line-height: 1.4; font-family: 'Proxima Nova Sm', sans-serif; flex-grow: 1;">
                    ${text.replace(/<strong>/g, `<strong style="color: #${textColor};">`)
                    .replace(/<b>/g, `<b style="color: #${textColor};">`)}
                </div>
                ${rightTextHtml}
            </div>
        </div>
        <div style="height: 3px; width: 100%; background-color: #e9ecef;">
            <div style="height: 100%; width: 0; background: #${color}; animation: notifyProgress 3s linear forwards;"></div>
        </div>
    `;
    
    notifyDiv.innerHTML = htmlContent;
    
    // Добавляем уведомление в DOM
    document.body.appendChild(notifyDiv);
    
    // Получаем кнопку закрытия
    var closeBtn = notifyDiv.querySelector("div div:nth-child(2)");
    
    // Функция плавного закрытия
    function closeNotification() {
        notifyDiv.style.opacity = '0';
        notifyDiv.style.transform = 'translateX(-100px)';
        notifyDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(function() {
            if (document.body.contains(notifyDiv)) {
                document.body.removeChild(notifyDiv);
            }
        }, 300);
    }
    
    // Обработчик закрытия
    closeBtn.addEventListener('click', closeNotification);
    
    // Автоматическое закрытие через 3 секунды
    setTimeout(closeNotification, 3000);
}

// Обработчик события
cef.on("show-game-notify", (title, text, color = "2a4ed6", textColor = null, rightText = null) => { 
    gameNotify(title, text, color, textColor, rightText); 
});