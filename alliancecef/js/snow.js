let snowEnabled = false;
let snowTimer;
let snowElements = [];
let snowImage = "img/flakewin.png"; 
let snowMax = 250;
let snowMaxSize = 30;
let snowMinSize = 10;
let sinkSpeed = 1.5;
let xMove = [];
let coordinates = [];
let leftRight = [];
let marginBottom;
let marginRight;

// Функция для случайного числа в диапазоне
function randomMaker(range) {
    return Math.floor(Math.random() * range);
}

// Функция для создания снежинок
function initSnow() {
    marginBottom = window.innerHeight;
    marginRight = window.innerWidth;

    const snowSizeRange = snowMaxSize - snowMinSize;

    // Создаем снежинки
    for (let i = 0; i < snowMax; i++) {
        const snowflake = document.createElement("img");
        snowflake.src = snowImage;
        snowflake.style.position = "absolute";
        snowflake.style.zIndex = "1000";
        snowflake.style.pointerEvents = "none";
        
        // Случайный размер снежинки
        let snowflakeSize = randomMaker(snowSizeRange) + snowMinSize;
        snowflake.style.width = `${snowflakeSize}px`;
        
        // Применение фильтров для улучшения видимости
        snowflake.style.filter = "brightness(1.5) drop-shadow(0 0 10px white)";
        
        // Случайная скорость падения снежинки
        snowflake.sink = sinkSpeed * snowflakeSize / 5;
        
        // Начальные координаты
        snowflake.posX = randomMaker(marginRight - snowflakeSize);
        snowflake.posY = randomMaker(-marginBottom); 
        snowflake.style.left = `${snowflake.posX}px`;
        snowflake.style.top = `${snowflake.posY}px`;
        
        // Добавляем снежинку в DOM
        document.body.appendChild(snowflake);
        snowElements.push(snowflake);
        
        // Генерация случайных значений для движения
        xMove[i] = 0.03 + Math.random() / 10;
        coordinates[i] = 0;
        leftRight[i] = Math.random() * 15;
    }

    // Начинаем движение снежинок
    moveSnow();
}

// Функция для движения снежинок
function moveSnow() {
    if (!snowEnabled) return;

    for (let i = 0; i < snowElements.length; i++) {
        coordinates[i] += xMove[i];
        
        // Движение по оси Y (падение)
        snowElements[i].posY += snowElements[i].sink;
        
        // Движение по оси X (колебания)
        snowElements[i].style.left = `${snowElements[i].posX + leftRight[i] * Math.sin(coordinates[i])}px`;
        snowElements[i].style.top = `${snowElements[i].posY}px`;

        // Если снежинка выходит за пределы экрана, возвращаем ее в начало
        if (snowElements[i].posY >= marginBottom - parseInt(snowElements[i].style.width) || 
            parseInt(snowElements[i].style.left) > (marginRight - 3 * leftRight[i])) {
            snowElements[i].posX = randomMaker(marginRight - parseInt(snowElements[i].style.width));
            snowElements[i].posY = -marginBottom; 
        }
    }

    snowTimer = setTimeout(moveSnow, 25);
}

// Остановка снега
function stopSnow() {
    snowElements.forEach(snowflake => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    });

    snowElements = [];
    clearTimeout(snowTimer);
}

// Управление состоянием снега через CEF
cef.on("toggle-snow", () => {
    if (snowEnabled) {
        snowEnabled = false;
        stopSnow();
    } else {
        snowEnabled = true;
        initSnow();
    }
});

// Получаем статус снега через CEF
cef.on("get-snow-status", () => {
    cef.invoke("snow-status", snowEnabled ? 1 : 0);
});

// Включение снега по событию
cef.on("start-snow", () => {
    if (snowEnabled) return;
    snowEnabled = true;
    initSnow();
});

// Остановка снега по событию
cef.on("stop-snow", () => {
    if (!snowEnabled) return;
    snowEnabled = false;
    stopSnow();
});
