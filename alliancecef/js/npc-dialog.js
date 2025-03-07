cef.on("show-new-npc-dialog", (npc, title, text, buttons) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); 

    $(".npc-dialog").css("display", "flex"); 
    $(".npc-dialog-title").text(title); 
    $(".npc-dialog-text").text(text); 
    cef.set_focus(true); 

    buttons.forEach((buttonText, index) => {
        let button = document.createElement("div");
        button.className = "npc-dialog-item";
        button.innerHTML = buttonText;
        button.id = index + 1;

        button.onclick = function () {
            cef.emit("npc-dialog-action", npc, index + 1); // Передаем npc и action
        };

        document.getElementsByClassName("npc-dialog-items")[0].append(button);
    });
});

cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text); 
});

cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none");
    cef.set_focus(false); 
});
