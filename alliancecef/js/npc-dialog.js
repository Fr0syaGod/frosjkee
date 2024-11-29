let npcid = 1;

// Показать диалог с NPC
cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); // Убираем все старые кнопки

    npcid = npc; // Сохраняем id NPC
    $(".npc-dialog").css("display", "flex"); // Показываем диалог
    $(".npc-dialog-title").text(title); // Устанавливаем заголовок
    $(".npc-dialog-text").text(text); // Устанавливаем текст диалога
    cef.set_focus(true); // Фокусируемся на окне
});

// Обновить текст NPC
cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text); // Обновить текст в диалоге
});

// Скрыть диалог с NPC
cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none"); // Скрыть диалог
    cef.set_focus(false); // Убираем фокус
});

// Вставка кнопки NPC
cef.on("insert-npc-button", (index, buttonText) => {
    // Создаём новую кнопку
    let button = document.createElement("div");
    button.className = "npc-dialog-item";
    button.innerHTML = buttonText;
    button.id = index; // Устанавливаем id кнопки

    // Добавляем обработчик нажатия на кнопку
    button.onclick = function () {
        // Передаём индекс кнопки в событие npc-dialog-action
        cef.emit("npc-dialog-action", index);
    };

    // Добавляем кнопку в список кнопок
    document.getElementsByClassName("npc-dialog-items")[0].append(button);
});
