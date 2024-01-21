let is_chat_open = false;

window.addEventListener('keydown', function(event) {
	if(event.keyCode == 'KeyZ') {
        if(is_chat_open === false) {
            document.getElementById('chat__input').style = "display: block;";
            document.getElementById('__language').style = "display: block;";
            // document.getElementById('chat__input').setAttribute("autofocus", "autofocus");
            document.getElementById('chat__input').select();
            is_chat_open = true;
            cef.set_focus(true);
        }
	}
});

document.getElementById('chat__input')
    .addEventListener('keyup', (event) => {
        if (event.keyCode === 27)
        {
            document.getElementById("chat__input").value = "";
            
            document.getElementById('chat__input').style = "display: none;";
            document.getElementById('__language').style = "display: none;";
            document.getElementById('chat__box').style = "overflow: hidden;";
            is_chat_open = false;            
            cef.set_focus(false);
        }
        if (event.keyCode === 13)
        {
            // console.log("нажали enter");
            // add_chat_message('133,133,133', document.getElementById("chat__input").value);
            if(document.getElementById("chat__input").value != "") {
                cef.emit("player_chat", document.getElementById("chat__input").value);   
            }
            document.getElementById("chat__input").value = "";
            
            document.getElementById('chat__input').style = "display: none;";
            document.getElementById('__language').style = "display: none;";
            document.getElementById('chat__box').style = "overflow: hidden;";
            is_chat_open = false;            
            cef.set_focus(false);
        }        

        var info = "RU", myText=this.value;
        if(/[A-Za-z]/gi.test(myText)) info = "EN";
        if(/[А-Яа-я]/gi.test(myText)) info = "RU";
        if(/[А-Яа-я]/gi.test(myText)&&/[A-Za-z]/gi.test(myText)) info = "RU/EN";
 
        document.getElementById("__language").setAttribute("data-fon", info);    
});

function add_chat_message(color, message) {
    var chat_box = document.getElementById("chat__box");
    var chat_message = document.createElement("div");
    
    var replacedColors = message.replace(/\{(\w{3}|\w{6})\}[^{}]*/gi, (textWithColor) => {
		return textWithColor.replace(/{\w*\}/, (colorInBrackets) => {
			return `<span style='color: #${colorInBrackets.slice(1, -1).toLowerCase()};'>`
		}) + '</span>';
	});    
    
    chat_message.innerHTML = replacedColors;
    chat_message.className = "chat__message";
    chat_message.style = `color: rgba(${color});`;
    chat_box.append(chat_message);
    
    chat_box.scrollTop = chat_box.scrollHeight;

    var animation = chat_message.animate([{
        opacity: '0',
        transform: 'translateY(-100%)'
    }, 
    {
        opacity: '1',
        transform: 'translateY(0)'
    }], 200);
}

cef.on("open_chat", () => {
    if(is_chat_open === false) {
        document.getElementById('chat__input').style = "display: block;";
        document.getElementById('__language').style = "display: block;";
        // document.getElementById('chat__input').setAttribute("autofocus", "autofocus");
        document.getElementById('chat__input').select();
        document.getElementById('chat__box').style = "overflow: auto;";
        is_chat_open = true;
        cef.set_focus(true);
    } 
});

cef.on("send_chat", (color, message) => {
    add_chat_message(color, message);
});