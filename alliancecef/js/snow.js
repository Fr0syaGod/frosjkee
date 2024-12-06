let snowEnabled = false;
let snowTimer;
let snowElements = [];
let snowImage = "img/snowflake.png"; // Укажите путь к изображению снежинки
let snowMax = 250;
let snowMaxSize = 30;
let snowMinSize = 10;
let sinkSpeed = 1.5;
let xMove = [];
let coordinates = [];
let leftRight = [];
let marginBottom;
let marginRight;

function randomMaker(range) {
    return Math.floor(Math.random() * range);
}

function initSnow() {
    if (document.body.clientHeight) {
        marginBottom = document.body.clientHeight;
        marginRight = document.body.clientWidth;
    } else {
        marginBottom = window.innerHeight;
        marginRight = window.innerWidth;
    }

    const snowSizeRange = snowMaxSize - snowMinSize;

    // Создаем снежинки
    for (let i = 0; i < snowMax; i++) {
        const snowflake = document.createElement("img");
        snowflake.src = snowImage;
        snowflake.style.position = "absolute";
        snowflake.style.zIndex = "1000";
        snowflake.style.width = `${randomMaker(snowSizeRange) + snowMinSize}px`;
        snowflake.sink = sinkSpeed * parseInt(snowflake.style.width) / 5;
        snowflake.posX = randomMaker(marginRight - parseInt(snowflake.style.width));
        snowflake.posY = randomMaker(2 * marginBottom - marginBottom - 2 * parseInt(snowflake.style.width));
        snowflake.style.left = `${snowflake.posX}px`;
        snowflake.style.top = `${snowflake.posY}px`;
        document.body.appendChild(snowflake);
        snowElements.push(snowflake);
        xMove[i] = 0.03 + Math.random() / 10;
        coordinates[i] = 0;
        leftRight[i] = Math.random() * 15;
    }

    // Начинаем движение
    moveSnow();
}

function moveSnow() {
    if (!snowEnabled) return;

    for (let i = 0; i < snowMax; i++) {
        coordinates[i] += xMove[i];
        snowElements[i].posY += snowElements[i].sink;
        snowElements[i].style.left = `${snowElements[i].posX + leftRight[i] * Math.sin(coordinates[i])}px`;
        snowElements[i].style.top = `${snowElements[i].posY}px`;

        if (snowElements[i].posY >= marginBottom - 2 * parseInt(snowElements[i].style.width) || 
            parseInt(snowElements[i].style.left) > (marginRight - 3 * leftRight[i])) {
            snowElements[i].posX = randomMaker(marginRight - parseInt(snowElements[i].style.width));
            snowElements[i].posY = 0;
        }
    }

    snowTimer = setTimeout(moveSnow, 25);
}

function stopSnow() {
    // Убираем снежинки с экрана
    snowElements.forEach(snowflake => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    });

    // Очищаем массив
    snowElements = [];
    clearTimeout(snowTimer);
}

// Обработчики CEF
cef.on("start-snow", () => {
    if (snowEnabled) return; // Если снег уже включен
    snowEnabled = true;
    initSnow();
});

cef.on("stop-snow", () => {
    if (!snowEnabled) return; // Если снег уже выключен
    snowEnabled = false;
    stopSnow();
});
