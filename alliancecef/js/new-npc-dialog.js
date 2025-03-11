let customDialogId = 1;

cef.on("show-custom-dialog", (dialogId, title, text) => {
    let buttons = document.querySelectorAll('.custom-dialog-item');
    buttons.forEach(e => e.remove()); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    cef.set_focus(true); 
});

cef.on("insert-custom-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "custom-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("custom-dialog-action", index);
    };
    
    document.getElementsByClassName("custom-dialog-items")[0].append(button);
});

cef.on("show-custom-secondary-dialog", (dialogId, title, text) => {
    let buttons = document.querySelectorAll('.custom-dialog-item');
    buttons.forEach(e => e.remove()); 
    
    customDialogId = dialogId; 
    $(".custom-dialog").css("display", "flex"); 
    $(".custom-dialog-title").text(title); 
    $(".custom-dialog-text").text(text); 
    cef.set_focus(true); 
});

cef.on("insert-custom-secondary-button", (index, buttonText) => {
    let button = document.createElement("div");
    button.className = "custom-dialog-item";
    button.innerHTML = buttonText;
    button.id = index;
    
    button.onclick = function () {
        cef.emit("custom-secondary-action", index);
    };
    
    document.getElementsByClassName("custom-dialog-items")[0].append(button);
});

$(document).on('click', '.custom-dialog-close', function() {
    cef.emit("custom-dialog-close");
    $(".custom-dialog").css("display", "none");
    cef.set_focus(false);
});

cef.on("update-custom-text", (text) => {
    $(".custom-dialog-text").text(text); 
});

cef.on("hide-custom-dialog", () => {
    $(".custom-dialog").css("display", "none");
    cef.set_focus(false); 
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cef.emit("custom-dialog-close");
        $(".custom-dialog").css("display", "none");
        cef.set_focus(false);
    }
});