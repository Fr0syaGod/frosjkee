let npcid = 1;

// Основной диалог
cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); 
    npcid = npc; 
    $(".npc-dialog").css("display", "flex"); 
    $(".npc-dialog-title").text(title); 
    $(".npc-dialog-text").text(text); 
    cef.set_focus(true); 
});

cef.on("insert-npc-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "npc-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("npc-dialog-action", index);
    };
    
    document.getElementsByClassName("npc-dialog-items")[0].append(button);
});

// Диалог семьи
cef.on("show-family-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); 
    npcid = npc; 
    $(".npc-dialog").css("display", "flex"); 
    $(".npc-dialog-title").text(title); 
    $(".npc-dialog-text").text(text); 
    cef.set_focus(true); 
});

cef.on("insert-family-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "npc-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("npc-family-action", index);
    };
    
    document.getElementsByClassName("npc-dialog-items")[0].append(button);
});

// Общие функции для обоих диалогов
cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text); 
});

cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none");
    cef.set_focus(false); 
});