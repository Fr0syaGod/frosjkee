let customDialogId = 1;

cef.on("show-custom-dialog", (dialogId, title, text) => {
    let buttons = document.querySelectorAll('.custom-dialog-item:not(.color-box)');
    buttons.forEach(e => {
        // Не удаляем кнопки-иконки и цветные кнопки
        if (!e.closest('.vertical-buttons-container') && !e.classList.contains('color-box')) {
            e.remove();
        }
    }); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    $(".color-selection-container").hide(); // Скрываем панель выбора цвета по умолчанию
    cef.set_focus(true); 
});

cef.on("insert-custom-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "custom-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("custom-dialog-action", index);
    };
    
    document.getElementsByClassName("custom-dialog-items")[0].append(button);
});

cef.on("show-custom-secondary-dialog", (dialogId, title, text) => {
    let buttons = document.querySelectorAll('.custom-dialog-item:not(.color-box)');
    buttons.forEach(e => {
        // Не удаляем кнопки-иконки и цветные кнопки
        if (!e.closest('.vertical-buttons-container') && !e.classList.contains('color-box')) {
            e.remove();
        }
    }); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    $(".color-selection-container").hide(); // Скрываем панель выбора цвета
    cef.set_focus(true); 
});

cef.on("insert-custom-secondary-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "custom-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("custom-secondary-action", index);
    };
    
    document.getElementsByClassName("custom-dialog-items")[0].append(button);
});

$(document).on('click', '.custom-dialog-close', function() {
    cef.emit("custom-dialog-close");
    $(".custom-dialog").css("display", "none");
    cef.set_focus(false);
});

cef.on("update-custom-text", (text) => {
    $(".custom-dialog-text").text(text); 
});

cef.on("hide-custom-dialog", () => {
    $(".custom-dialog").css("display", "none");
    cef.set_focus(false); 
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cef.emit("custom-dialog-close");
        $(".custom-dialog").css("display", "none");
        cef.set_focus(false);
    }
});

// ФУНКЦИИ ДЛЯ ВЫБОРА ЦВЕТА

// Показать панель выбора цвета
cef.on("show-color-selection", (dialogId, title = "ВЫБЕРИТЕ ЦВЕТ АВТОМОБИЛЯ") => {
    $(".color-selection-container").show();
    $(".color-selection-title").text(title);
});

// Обработка нажатий на цветные кнопки
$(document).on('click', '.color-box', function() {
    const itemId = $(this).attr('id');
    const color = $(this).css('background-color');
    
    // Сбросить все рамки
    $('.color-box').css('border', '2px solid transparent');
    // Подсветить выбранный цвет
    $(this).css('border', '2px solid white');
    
    // Отправить событие выбора цвета - используем тот же обработчик, что и для обычных кнопок
    cef.emit("custom-dialog-action", itemId);
});

// Скрыть панель выбора цвета
cef.on("hide-color-selection", () => {
    $(".color-selection-container").hide();
});

// Функция для инициализации цветных кнопок
cef.on("initialize-color-buttons", () => {
    // Если кнопки уже существуют, ничего не делаем
    if (document.querySelectorAll('.color-box').length > 0) {
        return;
    }
    
    const colors = [
        { id: 4, color: "white" },
        { id: 5, color: "black" },
        { id: 6, color: "red" },
        { id: 7, color: "orange" },
        { id: 8, color: "yellow" },
        { id: 9, color: "lime" },
        { id: 10, color: "cyan" },
        { id: 11, color: "blue" },
        { id: 12, color: "purple" },
        { id: 13, color: "crimson" }
    ];
    
    const colorGrid = document.querySelector('.color-grid');
    if (!colorGrid) return;
    
    colors.forEach(colorData => {
        let button = document.createElement("div");
        button.className = "custom-dialog-item color-box";
        button.id = colorData.id;
        button.style.backgroundColor = colorData.color;
        
        colorGrid.appendChild(button);
    });
});

// НОВЫЕ ФУНКЦИИ ДЛЯ ВЕРТИКАЛЬНЫХ КНОПОК

// Инициализация вертикальных кнопок
cef.on("initialize-vertical-buttons", () => {
    console.log("Initializing vertical buttons");
    
    // Если контейнер уже существует, не создаем его заново
    if (document.querySelector('.vertical-buttons-container')) {
        console.log("Vertical buttons container already exists");
        return;
    }
    
    // Создаем контейнер для вертикальных кнопок
    const container = document.createElement('div');
    container.className = 'vertical-buttons-container';
    
    // Определяем типы кнопок
    const buttonTypes = [
        { id: 14, type: 'sedan-icon', tooltip: 'Седан' },
        { id: 15, type: 'suv-icon', tooltip: 'Внедорожник' },
        { id: 16, type: 'sport-icon', tooltip: 'Спорткар' },
        { id: 17, type: 'pickup-icon', tooltip: 'Пикап' },
        { id: 18, type: 'truck-icon', tooltip: 'Грузовик' },
        { id: 19, type: 'motorcycle-icon', tooltip: 'Мотоцикл' }
    ];
    
    // Создаем кнопки
    buttonTypes.forEach(btn => {
        const button = document.createElement('div');
        button.id = btn.id;
        button.className = 'vertical-button-item';
        button.title = btn.tooltip; // Добавляем всплывающую подсказку
        
        const icon = document.createElement('div');
        icon.className = `car-icon ${btn.type}`;
        
        button.appendChild(icon);
        
        // Добавляем обработчик события для кнопок
        button.onclick = function() {
            // Удаляем активное состояние со всех кнопок
            document.querySelectorAll('.vertical-button-item').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активное состояние на нажатую кнопку
            this.classList.add('active');
            
            // Отправляем событие нажатия с ID кнопки
            cef.emit("custom-dialog-action", this.id);
        };
        
        container.appendChild(button);
    });
    
    // Добавляем контейнер с кнопками в диалог
    document.querySelector('.custom-dialog').appendChild(container);
    console.log("Vertical buttons container added to dialog");
});

// Показать/скрыть вертикальные кнопки
cef.on("show-vertical-buttons", (show = true) => {
    const container = document.querySelector('.vertical-buttons-container');
    if (container) {
        container.style.display = show ? 'flex' : 'none';
    } else if (show) {
        // Если контейнер не существует и нужно его показать, инициализируем
        cef.emit("initialize-vertical-buttons");
    }
});

// Выделить конкретную вертикальную кнопку
cef.on("select-vertical-button", (buttonId) => {
    document.querySelectorAll('.vertical-button-item').forEach(button => {
        if (button.id == buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});