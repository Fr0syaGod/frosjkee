let npcid = 1; // Изначальный NPC ID

// Обработчик кликов по кнопкам
$(document).on("click", ".npc-dialog-item", function () {
    let action = $(this).attr("id"); // Получаем ID нажатой кнопки
    console.log("Кнопка нажата, ID:", action); // Лог для отладки
    if (action) {
        cef.emit("npc-dialog-action", action); // Отправляем событие на сервер
    }
});

// Событие для отображения диалога
cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); // Удаляем старые кнопки

    npcid = npc; // Обновляем NPC ID
    console.log("Открыт диалог для NPC ID:", npcid); // Лог для отладки

    $(".npc-dialog").css("display", "flex"); // Показываем диалог
    $(".npc-dialog-title").text(title); // Заголовок диалога
    $(".npc-dialog-text").text(text); // Текст диалога
    cef.set_focus(true); // Устанавливаем фокус на диалог

    // Вставляем кнопки
    npcButtons.forEach((buttonText, index) => {
        let button = document.createElement("div");
        button.className = "npc-dialog-item";
        button.id = index + 1; // Устанавливаем ID кнопки
        button.innerHTML = buttonText;
        document.getElementsByClassName("npc-dialog-items")[0].append(button);
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