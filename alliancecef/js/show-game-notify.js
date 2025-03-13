function gameNotify(title, text) {
    var frame = document.getElementById("notify-bock-frame");   
    let test = document.querySelectorAll('.notify-bock'); 
            
    if(test.length >= 3) {
        document.getElementsByClassName("notify-bock")[0].remove();
    }
            
    var div = document.createElement("div");
    div.className = "notify-bock game-notify";
    div.style = "animation: game-notify-fade-in 0.3s ease forwards;";
    frame.append(div);
    
    // Создаем заголовок
    var header = document.createElement("div");
    header.className = "game-notify-header";
    div.append(header);
    
    // Добавляем заголовок
    var titleElem = document.createElement("div");
    titleElem.innerHTML = title;
    header.append(titleElem);
    
    // Добавляем кнопку закрытия
    var closeBtn = document.createElement("div");
    closeBtn.className = "game-notify-close";
    closeBtn.innerHTML = "✕";
    header.append(closeBtn);
    
    // Создаем тело уведомления
    var body = document.createElement("div");
    body.className = "game-notify-body";
    div.append(body);
    
    // Добавляем иконку колокольчика
    var icon = document.createElement("div");
    icon.className = "game-notify-icon";
    icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>`;
    body.append(icon);
    
    // Добавляем сообщение
    var message = document.createElement("div");
    message.className = "game-notify-message";
    message.innerHTML = text;
    body.append(message);
    
    // Добавляем разделительную линию внизу
    var separator = document.createElement("div");
    separator.className = "game-notify-separator";
    div.append(separator);
    
    // Обработчик кнопки закрытия
    closeBtn.addEventListener('click', function() {
        div.style.animation = "game-notify-fade-out 0.3s ease forwards";
        setTimeout(function() {
            div.remove();
        }, 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(function () {
        div.style.animation = "game-notify-fade-out 0.3s ease forwards";
        setTimeout(function() {
            div.remove();
        }, 300);
    }, 4500);
}

// Добавьте этот обработчик события к другим обработчикам cef.on
cef.on("show-game-notify", (title, text) => { gameNotify(title, text); });