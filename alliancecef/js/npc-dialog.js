let npcid = null;


cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach(e => e.remove()); 
    
    // ВАЖНО: Создаем локальную переменную для этого конкретного диалога
    let currentNpcId = npc; 
    
    $(".npc-dialog").css("display", "flex"); 
    $(".npc-dialog-title").text(title); 
    $(".npc-dialog-text").text(text); 
    cef.set_focus(true); 

    // Очищаем предыдущие обработчики
    $(".npc-dialog-items").off('click', '.npc-dialog-item');
    
    // Используем делегирование событий с замыканием
    $(".npc-dialog-items").on('click', '.npc-dialog-item', function() {
        let index = $(this).attr('id');
        console.log("Emitting NPC ID:", currentNpcId, "Action:", index);
        cef.emit("npc-dialog-action", currentNpcId, index);
    });
});


cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text); 
});


cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none");
    cef.set_focus(false); 
});


cef.on("insert-npc-button", (index, buttonText) => {
   
    let button = document.createElement("div");
    button.className = "npc-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;

    
    button.onclick = function () {
      
        cef.emit("npc-dialog-action", npcid, index);
    };

    
    document.getElementsByClassName("npc-dialog-items")[0].append(button);
});
