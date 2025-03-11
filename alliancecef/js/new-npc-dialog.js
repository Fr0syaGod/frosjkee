cef.on("show-new-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.new-npc-dialog-item');
    test.forEach(e => e.remove());
    otherNpcId = npc;
    
    $(".new-npc-dialog").css("display", "flex");
    $(".new-npc-dialog-title").text(title);
    $(".new-npc-dialog-text").text(text);
    
    cef.set_focus(true);
});

cef.on("insert-new-npc-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "new-npc-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("new-npc-dialog-action", index);
    };
    
    document.getElementsByClassName("new-npc-dialog-items")[0].append(button);
});

cef.on("update-new-npc-text", (text) => {
    $(".new-npc-dialog-text").text(text);
});

cef.on("hide-new-npc-dialog", () => {
    $(".new-npc-dialog").css("display", "none");
    cef.set_focus(false);
});