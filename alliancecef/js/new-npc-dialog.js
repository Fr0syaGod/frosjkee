let customDialogId = 1;

cef.on("show-custom-dialog", (dialogId, title, text) => {
    let buttons = document.querySelectorAll('.custom-dialog-item:not(.color-box):not(.vertical-button-item)');
    buttons.forEach(e => {
        // Удаляем только обычные кнопки, оставляем цветные и вертикальные
        e.remove();
    }); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    $(".color-selection-container").hide(); // Скрываем панель выбора цвета по умолчанию
    $(".vertical-buttons-container").hide(); // Скрываем вертикальные кнопки по умолчанию
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
    let buttons = document.querySelectorAll('.custom-dialog-item:not(.color-box):not(.vertical-button-item)');
    buttons.forEach(e => {
        // Удаляем только обычные кнопки, оставляем цветные и вертикальные
        e.remove();
    }); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    $(".color-selection-container").hide(); // Скрываем панель выбора цвета
    $(".vertical-buttons-container").hide(); // Скрываем вертикальные кнопки
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
    const itemId = parseInt($(this).attr('id'));
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

// Показать и инициализировать вертикальные кнопки
cef.on("show-vertical-buttons", (dialogId, title = "ВЫБЕРИТЕ ТИП АВТОМОБИЛЯ") => {
    // Инициализируем кнопки, если их еще нет
    if (!document.querySelector('.vertical-buttons-container')) {
        // Создаем контейнер
        const container = document.createElement('div');
        container.className = 'vertical-buttons-container';
        container.style.display = 'flex';
        document.querySelector('.custom-dialog').appendChild(container);
        
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
            button.setAttribute('data-id', btn.id); // Добавляем дополнительный атрибут для ID
            button.title = btn.tooltip;
            
            const icon = document.createElement('div');
            icon.className = `car-icon ${btn.type}`;
            
            button.appendChild(icon);
            container.appendChild(button);
        });
    }
    
    // Показываем контейнер
    $('.vertical-buttons-container').show();
});

// Обработка нажатий на вертикальные кнопки через делегирование
$(document).on('click', '.vertical-button-item', function() {
    const itemId = parseInt($(this).attr('id'));
    
    // Сбросить активное состояние со всех кнопок
    $('.vertical-button-item').removeClass('active');
    // Добавить активное состояние текущей кнопке
    $(this).addClass('active');
    
    // Явно логируем нажатие для отладки
    console.log("Vertical button clicked, ID:", itemId);
    
    // Отправляем событие с числовым ID
    cef.emit("custom-dialog-action", itemId);
});

// Выделить конкретную вертикальную кнопку
cef.on("select-vertical-button", (buttonId) => {
    document.querySelectorAll('.vertical-button-item').forEach(button => {
        if (parseInt(button.id) === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});

// Прямое добавление статических кнопок в документ (если динамика не работает)
cef.on("create-static-vertical-buttons", () => {
    // Если кнопки уже существуют, удаляем их
    const existingContainer = document.querySelector('.vertical-buttons-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Создаем HTML для кнопок
    const buttonsHTML = `
    <div class="vertical-buttons-container" style="display: flex;">
        <div id="14" class="vertical-button-item" onclick="handleVerticalButtonClick(14)">
            <div class="car-icon sedan-icon"></div>
        </div>
        <div id="15" class="vertical-button-item" onclick="handleVerticalButtonClick(15)">
            <div class="car-icon suv-icon"></div>
        </div>
        <div id="16" class="vertical-button-item" onclick="handleVerticalButtonClick(16)">
            <div class="car-icon sport-icon"></div>
        </div>
        <div id="17" class="vertical-button-item" onclick="handleVerticalButtonClick(17)">
            <div class="car-icon pickup-icon"></div>
        </div>
        <div id="18" class="vertical-button-item" onclick="handleVerticalButtonClick(18)">
            <div class="car-icon truck-icon"></div>
        </div>
        <div id="19" class="vertical-button-item" onclick="handleVerticalButtonClick(19)">
            <div class="car-icon motorcycle-icon"></div>
        </div>
    </div>`;
    
    // Добавляем HTML в документ
    document.querySelector('.custom-dialog').insertAdjacentHTML('beforeend', buttonsHTML);
});

// Функция-обработчик для статических кнопок
function handleVerticalButtonClick(id) {
    // Сбросить активное состояние со всех кнопок
    $('.vertical-button-item').removeClass('active');
    // Добавить активное состояние нажатой кнопке
    $(`#${id}`).addClass('active');
    
    console.log("Static vertical button clicked, ID:", id);
    
    // Отправить событие
    cef.emit("custom-dialog-action", id);
}