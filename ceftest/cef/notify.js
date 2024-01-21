function addNotify(notifyHeader, notifyText, notifyType, deleteTime) {
    var frames = document.getElementsByClassName("left_bottom")[0];
    var notifyClass = "", notifyImg = "";

    var div = document.createElement("div");
    if(notifyType === 1) notifyClass = "succes_type", notifyImg = "succes";
    if(notifyType === 2) notifyClass = "warning_type", notifyImg = "warning";
    if(notifyType === 3) notifyClass = "error_type", notifyImg = "error";

    div.className = `notify ${notifyClass}`;
    frames.append(div);  

    var notify_img = document.createElement('div');
    notify_img.className = `notifyImg ${notifyImg}`;
    div.append(notify_img);

    var texts = document.createElement('div');
    texts.className = "notify_texts";
    div.append(texts);

    var notify_header = document.createElement('div');
    notify_header.innerText = notifyHeader;
    notify_header.className = "notifyHeader";
    texts.append(notify_header);

    var notify_text = document.createElement('div');
    notify_text.innerHTML = notifyText;
    notify_text.className = "notifyText";
    texts.append(notify_text);

    var animation = div.animate([{
        opacity: '0',
        transform: 'translateY(-100%)'
    }, 
    {
        opacity: '1',
        transform: 'translateY(0)'
    }], 500);
    animation.addEventListener('finish', function() {
        setTimeout(deleteNotify, parseInt(deleteTime), div);
    });
}

function deleteNotify(elem) {
    var animation = elem.animate([{
        opacity: '1',
        transform: 'translateY(0)'
    }, 
    {
        opacity: '0',
        transform: 'translateY(-100%)'
    }], 1000);
    animation.addEventListener('finish', function() {
        elem.remove();
    });
}         

cef.on("add_notify", (notifyHeader, notifyText, notifyType, deleteTime) => {
    addNotify(notifyHeader, notifyText, notifyType, deleteTime);
});