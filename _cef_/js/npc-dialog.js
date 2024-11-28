let npcid = 1;

$(".npc-dialog-item").on("click", function (el) {
    let action = $(this).attr("id");
    $(".npc-dialog-text").text( npcText[npcid - 1][action - 1] );
    cef.emit("npc-dialog-action", action);
});

cef.on("show-npc-dialog", (npc, title, text) => {
    let test = document.querySelectorAll('.npc-dialog-item');
    test.forEach( e => e.remove() );
    npcid = npc;
    $(".npc-dialog").css("display", "flex");
    $(".npc-dialog-title").text(title);
    $(".npc-dialog-text").text(text);
    cef.set_focus(true);
});

cef.on("update-npc-text", (text) => {
    $(".npc-dialog-text").text(text);
});

cef.on("hide-npc-dialog", () => {
    $(".npc-dialog").css("display", "none");
    cef.set_focus(false);
});

cef.on("insert-npc-button", (buttonText) => {
    let button = document.createElement("div");
    button.className = "npc-dialog-item";
    button.innerHTML = buttonText;
    document.getElementsByClassName("npc-dialog-items")[0].append(button);
});