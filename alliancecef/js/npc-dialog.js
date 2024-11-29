let npcid = 1; // Изначальный NPC ID

// Обработчик кликов по кнопкам
$(document).on("click", ".npc-dialog-item", function () {
    let action = $(this).attr("data-action"); // Получаем action из data-атрибута
    console.log("Кнопка нажата, Action:", action); // Лог для отладки
    if (action) {
        cef.emit("npc-dialog-action", action); // Отправляем событие на сервер
    }
});

// Событие для отображения диалога
cef.on("show-npc-dialog", (npc, title, text) => {
    let buttonsContainer = document.querySelector('.npc-dialog-items');
    buttonsContainer.innerHTML = ''; // Удаляем старые кнопки

    npcid = npc; // Обновляем NPC ID
    console.log("Открыт диалог для NPC ID:", npcid); // Лог для отладки

    $(".npc-dialog").css("display", "flex"); // Показываем диалог
    $(".npc-dialog-title").text(title); // Заголовок диалога
    $(".npc-dialog-text").text(text); // Текст диалога
    cef.set_focus(true); // Устанавливаем фокус на диалог

    // Вставляем кнопки, полученные с сервера
    cef.on("insert-npc-button", (buttonText) => {
        let button = document.createElement("div");
        button.className = "npc-dialog-item";
        button.setAttribute("data-action", buttonText); // Используем data-action для хранения текста кнопки
        button.innerHTML = buttonText;
        buttonsContainer.append(button);
    });
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
