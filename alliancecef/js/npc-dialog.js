let npcid = 1;

// Слушаем клик по кнопкам
$(".npc-dialog-item").on("click", function (el) {
    let action = $(this).attr("id"); // Получаем ID кнопки
    $(".npc-dialog-text").text(npcText[npcid - 1][action - 1]); // Обновляем текст диалога
    cef.emit("npc-dialog-action", action); // Отправляем событие на сервер
});

// Событие для отображения диалога
cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); // Удаляем старые кнопки, если они есть

    npcid = npc; // Сохраняем текущий npcid
    $(".npc-dialog").css("display", "flex"); // Показываем диалог
    $(".npc-dialog-title").text(title); // Обновляем заголовок
    $(".npc-dialog-text").text(text); // Обновляем текст диалога
    cef.set_focus(true); // Устанавливаем фокус на диалог
});

// Событие для обновления текста диалога
cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text); // Обновляем текст в диалоге
});

// Событие для скрытия диалога
cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none"); // Скрываем диалог
    cef.set_focus(false); // Убираем фокус с диалога
});

// Событие для вставки кнопки в диалог
cef.on("insert-npc-button", (buttonText) => {
    let button = document.createElement("div"); // Создаем элемент кнопки
    button.className = "npc-dialog-item"; // Добавляем класс
    button.innerHTML = buttonText; // Устанавливаем текст кнопки
    document.getElementsByClassName("npc-dialog-items")[0].append(button); // Добавляем кнопку в диалог
});