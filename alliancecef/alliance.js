function pad(n, width, z) {
  z = z || '<span style="opacity: 0.6">0</span>';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function MoneyUpdate(money) {
    const block = document.getElementById('hud-money');
    block.innerHTML = pad(money, 9) + '<span class="currency-symbol">₴</span>';
}

var show_speed = 0;

function notify_right_text(type, text, color, right_text) {
    var frame = document.getElementById("notify-bock-frame");   
    let test = document.querySelectorAll('.notify-bock'); 
  
    if(test.length >= 3) {
        document.getElementsByClassName("notify-bock")[0].remove();
    }
            
    var div = document.createElement("div");
    div.className = "notify-bock";
    div.style = `background: linear-gradient(to right, #${color}, #${color}21);`;
    frame.append(div);

    var background = document.createElement("div");
    background.id = "background-png-notify";
    div.append(background);
                
    var img = document.createElement("img");
    img.src = `img/notify/bock/notify${type}.png`;
    img.id = "notify-img";
    img.width = "30";
    background.append(img);

    var content = document.createElement("div");
    content.id = "notify-text";
    content.innerHTML = text;
    div.append(content);

    var rtext = document.createElement('div');

    rtext.innerHTML = right_text;
    rtext.style = "margin-left: auto; padding-left: 10px; margin-right: 7px; font-size: 0.9vw; font-family: 'Font 900';";
    div.append(rtext);           
    
    var animation = div.animate([{ opacity: '0' }, { opacity: '1', }], 500);
    animation.addEventListener('finish', function() {
        setTimeout(function () {
        var finish_animation = div.animate([{ opacity: '1' }, { opacity: '0', }], 500);
            finish_animation.addEventListener('finish', function() {
                div.style = "display: none";
                div.innerHTML = '';
            });
        }, 4500);   
    }); 
}

function notify_right_text_no_img(text, color, right_text) {
    var frame = document.getElementById("notify-bock-frame");   
    let test = document.querySelectorAll('.notify-bock'); 
    console.log(test.length);    
            
    if(test.length >= 3) {
        document.getElementsByClassName("notify-bock")[0].remove();
    }
            
    var div = document.createElement("div");
    div.className = "notify-bock";
    frame.append(div);

    div.style = `background: linear-gradient(to right, #${color}, #${color}21); padding: 15px; padding-left: 5px;`;
    
    var content = document.createElement("div");
    content.id = "notify-text";
    content.innerHTML = text;
    div.append(content);

    var rtext = document.createElement('div');
    rtext.innerHTML = right_text;
    rtext.style = "margin-left: auto; margin-right: 5px; font-size: 0.9vw; font-family: 'Font 900';";
    div.append(rtext);         
    
    var animation = div.animate([{ opacity: '0' }, { opacity: '1', }], 500);
    animation.addEventListener('finish', function() {
        setTimeout(function () {
        var finish_animation = div.animate([{ opacity: '1' }, { opacity: '0', }], 500);
            finish_animation.addEventListener('finish', function() {
                div.style = "display: none";
                div.innerHTML = '';
            });
        }, 4500);   
    }); 
}

function notifyCompact(title, text, color) {
    var frame = document.getElementById("notify-bock-frame");   
    let test = document.querySelectorAll('.notify-bock'); 
            
    if(test.length >= 3) {
        document.getElementsByClassName("notify-bock")[0].remove();
    }
            
    var div = document.createElement("div");
    div.className = "notify-bock compact-notify";
    div.style = `background: #fff; border-radius: 6px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); width: 290px; overflow: hidden; position: relative;`;
    frame.append(div);
    
    // Создаем заголовок уведомления
    var header = document.createElement("div");
    header.style = `display: flex; align-items: center; justify-content: space-between; padding: 12px; background: linear-gradient(135deg, #${color} 0%, #4682B4 100%); color: #fff;`;
    div.append(header);
    
    // Добавляем заголовок
    var titleElem = document.createElement("div");
    titleElem.style = `font-size: 14px; font-weight: 600; font-family: 'Proxima Nova Ex', sans-serif; letter-spacing: -0.3px;`;
    titleElem.innerHTML = title;
    header.append(titleElem);
    
    // Добавляем кнопку закрытия
    var closeBtn = document.createElement("div");
    closeBtn.style = `width: 20px; height: 20px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px;`;
    closeBtn.innerHTML = "✕";
    header.append(closeBtn);
    
    // Создаем тело уведомления
    var body = document.createElement("div");
    body.style = `padding: 12px;`;
    div.append(body);
    
    // Создаем контент
    var content = document.createElement("div");
    content.style = `display: flex; align-items: center;`;
    body.append(content);
    
    // Добавляем иконку
    var icon = document.createElement("div");
    icon.style = `width: 36px; height: 36px; border-radius: 50%; background-color: #ecf0f1; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;`;
    icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>`;
    content.append(icon);
    
    // Добавляем сообщение
    var message = document.createElement("div");
    message.style = `font-size: 13px; color: #303030; line-height: 1.3; font-family: 'Proxima Nova Sm', sans-serif; letter-spacing: -0.3px;`;
    message.innerHTML = text;
    content.append(message);
    
    // Добавляем полосу прогресса
    var progress = document.createElement("div");
    progress.style = `height: 3px; width: 100%; background-color: #e9ecef; position: relative;`;
    div.append(progress);
    
    var progressBar = document.createElement("div");
    progressBar.style = `height: 100%; width: 0; background: linear-gradient(90deg, #${color} 0%, #4682B4 100%);`;
    progress.append(progressBar);
    
    // Анимация появления
    var animation = div.animate([{ opacity: '0', transform: 'translateX(-80px)' }, { opacity: '1', transform: 'translateX(0)' }], 500);
    
    // Анимация полосы прогресса
    progressBar.animate([{ width: '0%' }, { width: '100%' }], { duration: 4500, fill: 'forwards' });
    
    // Обработчик кнопки закрытия
    closeBtn.addEventListener('click', function() {
        var closeAnim = div.animate([{ opacity: '1' }, { opacity: '0', transform: 'translateY(20px)' }], 500);
        closeAnim.addEventListener('finish', function() {
            div.style.display = 'none';
            div.remove();
        });
    });
    
    // Автоматическое закрытие через 5 секунд
    animation.addEventListener('finish', function() {
        setTimeout(function () {
        var finish_animation = div.animate([{ opacity: '1' }, { opacity: '0', transform: 'translateY(20px)' }], 500);
            finish_animation.addEventListener('finish', function() {
                div.style.display = 'none';
                div.remove();
            });
        }, 4500);   
    }); 
}

function notify(type, text, color) {
    var frame = document.getElementById("notify-bock-frame");   
    let test = document.querySelectorAll('.notify-bock'); 
    console.log(test.length);    
            
    if(test.length >= 3) {
        document.getElementsByClassName("notify-bock")[0].remove();
    }
            
    var div = document.createElement("div");
    div.className = "notify-bock";
    div.style = `background: linear-gradient(to right, #${color}, #${color}21);`;
    frame.append(div);

    var background = document.createElement("div");
    background.id = "background-png-notify";
    div.append(background);
                
    var img = document.createElement("img");
    img.src = `img/notify/bock/notify${type}.png`;
    img.id = "notify-img";
    img.width = "30";
    background.append(img);
    
    var content = document.createElement("div");
    content.id = "notify-text";
    content.innerHTML = text;
    div.append(content);
     
    
    var animation = div.animate([{ opacity: '0' }, { opacity: '1', }], 500);
    animation.addEventListener('finish', function() {
        setTimeout(function () {
        var finish_animation = div.animate([{ opacity: '1' }, { opacity: '0', }], 500);
            finish_animation.addEventListener('finish', function() {
                div.style = "display: none";
                div.innerHTML = '';
            });
        }, 4500);   
    }); 
}
    
    function notifyCenter(type, text) {
        var notify = document.getElementById("notify-center");
        var notify_img = document.getElementById("notify-center-img");
        var notify_text = document.getElementById("notify-center-text");
        var notify_center_color = ["00b7ce", "ff256a", "fe7500", "ffffff", "00cb56"];
    
        notify.style = "display: flex;";
        notify_img.src = `img/notify/icon${type}.png`;
        notify_text.style = `color: #${notify_center_color[type - 1]};`;
        notify_text.innerHTML = text;
    
        setTimeout(function () {
            notify.style = "display: none";
            notify_text.innerHTML = '';
        }, 3500);  
    }

    function helpButton(buttonText, leftText) {
        var notify = document.getElementById("key-help");
        var button = document.getElementById("key-help-name");
        var text = document.getElementById("key-help-text");
    
        notify.style = "display: flex;";
        button.innerHTML = buttonText;     
        text.innerHTML = leftText;   

        notify.animate([{ opacity: '0' }, { opacity: '1', }], 500);
    }

    function hideButton() {
        var notify = document.getElementById("key-help");

        var animation = notify.animate([{ opacity: '1' }, { opacity: '0', }], 500); 
        animation.addEventListener('finish', function() {
            notify.style = "display: none;";
        });               
    }

    cef.on("show-button", (button, text) => {
        helpButton(button, text);
    });
    cef.on("hide-button", () => {
        hideButton();
    });
    
    cef.on("show-center-notify", (type, text) => { notifyCenter(type, text); });
    cef.on("show-notify", (type, text, color) => { notify(type, text, color); });
    cef.on("show-notify-right-text", (type, text, color, right_text) => { notify_right_text(type, text, color, right_text); });
    cef.on("show-notify-no-img", (text, color, right_text) => { notify_right_text_no_img(text, color, right_text); });
    cef.on("show-compact-notify", (title, text, color) => { notifyCompact(title, text, color); });
    cef.on("show-ammo-notify", (text, color) => {
        var notify = document.getElementById("notify-right-bock");
        var notify_img = document.getElementById("notify-right-img");
        var notify_text = document.getElementById("notify-bock-text");

        notify.style = `display: flex; background: linear-gradient(to right, #${color}, #${color}21);`;
        notify_img.src = `img/notify/bock/notify1.png`;
        notify_text.innerHTML = text; 
    });
    cef.on("hide-ammo-notify", () => {
        var notify = document.getElementById("notify-right-bock");
        notify.style = "display: none";
        notify_text.innerHTML = '';
    });
    
    cef.on("show-speed", () => {
        document.getElementById("speed-car").style = "display: block";
        show_speed = 1;
    });
    cef.on("hide-speed", () => {
        document.getElementById("speed-car").style = "display: none";
        show_speed = 0;
    });     

     // Показать help-panel
    cef.on("show-helppanel", () => {
        const helpPanel = document.getElementById("help-panel");
        helpPanel.style.display = "flex"; // Показываем блок
        helpPanel.style.top = "50%"; // Убедимся, что позиция правильная
        helpPanel.style.transform = "translateY(-50%)"; // Центруем по вертикали
    });

    // Скрыть help-panel
    cef.on("hide-helppanel", () => {
        document.getElementById("help-panel").style.display = "none"; // Скрываем блок
    });


    function update_icon(icon, value) {
        var cstyle = "";
        if(value === 1) { cstyle="filter: grayscale(0);" }
        else { cstyle="filter: grayscale(1000%);" }
        if(icon === 1) {
            document.getElementById("engine").style = cstyle;
        }
        if(icon === 2) {
            document.getElementById("lock").style = cstyle;
        }
        if(icon === 3) {
            document.getElementById("light").style = cstyle;
        }
        if(icon === 4) {
            document.getElementById("key").style = cstyle;
        }                                    
    }
    
    cef.on("update-speed-icon", (icon, value) => { update_icon(icon, value); });
    cef.on("update-speed-text", (textId, value) => {
        if(textId === 1) {
            document.getElementById("chealth").innerHTML = `${value} %`;
        }
        if(textId === 2) {
            document.getElementById("fuel").innerHTML = `${value} л`;
        }            
        if(textId === 3) {
            document.getElementById("icon-car").innerHTML = `${value} км`;
        }            
    });
    
    cef.on("show-capture-kill", (text) => {
        document.getElementById("capture-kill").style = "display: block";
        document.getElementById("capture-kill").innerHTML = text;
    
        setTimeout(function () {
            document.getElementById("capture-kill").style = "display: none";
            document.getElementById("capture-kill").innerHTML = '';
        }, 3500);    
    });
    
    cef.on("show-capture", () => {
        document.getElementById("capture-info").style = 'display: flex;';
        document.getElementById("kill_list").style = "display: block";
    });
    cef.on("hide-capture", () => {
        document.getElementById("capture-info").style = 'display: none;';
        document.getElementById("kill_list").style = "display: none";
    });        
    cef.on("capture-info-name", (name1, name2) => {
        document.getElementById("name-one").innerHTML = name1;
        document.getElementById("name-two").innerHTML = name2;
    });
    cef.on("capture-score", (score1, score2) => {
        document.getElementById("score-one").innerHTML = score1;
        document.getElementById("score-two").innerHTML = score2;
    });      
    cef.on("capture-time", (time) => {
        document.getElementById("capture-time").innerHTML = time;
    });       
    cef.on("capture-text", (text) => {
        document.getElementById("capture-time-text").innerHTML = text;
    });                  
    function add_kill_list_item(name1, gunId, name2) {
        var count = document.getElementsByClassName('kill-list-item').length;
        if(count >= 5) {
            document.getElementsByClassName('kill-list-item')[0].remove();
        }
        var frame = document.getElementsByClassName("kill-list")[0];
        var item = document.createElement('div');
        item.className = "kill-list-item";
        frame.append(item);
    
        var name_1 = document.createElement('div');
        name_1.innerHTML = name1;
        name_1.className = "kill-list-player";
        item.append(name_1);
    
        var gun = document.createElement('img');
        gun.src = `img/guns/guns/${gunId}.png`;
        gun.className = "kill-list-img";
        item.append(gun);
    
        var name_2 = document.createElement('div');
        name_2.innerHTML = name2;
        name_2.className = "kill-list-player";
        item.append(name_2);
    }
    function update_wanted(wanted_level) {
        for(var i = 0; i < 6; i ++) {
            if(i < wanted_level) {
                document.getElementById(`wanted_${i}`).style = "opacity: 1";
            }
            else document.getElementById(`wanted_${i}`).style = "opacity: 0.5";
        }
    }
    setInterval(function () {
        var d = new Date();
        var month = d.getMonth() + 1;
       document.getElementById("server-date").innerHTML = d.getDate().toString().padStart(2, '0') + "." + month.toString().padStart(2, '0') + "." + d.getFullYear();
       document.getElementById("server-time").innerHTML = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0') + ":" + d.getSeconds().toString().padStart(2, '0');
    }, 500);     
    cef.emit("game:hud:setComponentVisible", "interface", false);
    cef.emit("game:data:pollPlayerStats", true, 50);
    cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {

         if(show_speed === 1) {
            document.getElementById("speed-text").innerHTML = `${Math.round(speed)}<div class="kmh">км/ч</div>`;
        }
    
        document.getElementById("arm_progress").value = `${arm}`;
        document.getElementById('arm_value').innerText = Math.round(arm);
        document.getElementById("hp_progress").value = `${hp}`;
        document.getElementById('hp_value').innerText = Math.round(hp); 
    
        document.getElementById('fist').src = `img/guns/${weapon}.png`;
        if(ammo > 0) {
            document.getElementById("ammo_value_source").style = "display: none;";
            document.getElementById("ammo_value").style = "display: block;";
    
            document.getElementById("ammo_value").innerText = `${ammo} / ${max_ammo}`;
        }
        else {
            document.getElementById("ammo_value_source").style = "display: block;";
            document.getElementById("ammo_value").style = "display: none;";
        }
        MoneyUpdate(money);
    
        if(wanted > 0) {
            document.getElementById("suspect-block").style = "display: block";
            //update_wanted(wanted);
            for(var i = 0; i < 6; i ++) {
                if(i < wanted) {
                    document.getElementById(`wanted_${i}`).style = "opacity: 1";
                }
                else document.getElementById(`wanted_${i}`).style = "opacity: 0.5";
            }
        }
        else {
            document.getElementById("suspect-block").style = "display: none";
        }
    });       
    cef.on("set-hud-run", (value) => {
        document.getElementById('run_progress').value = value;
        document.getElementById('run_value').innerText = value;
    });       
    cef.on("update-player-info", (version, id, uid) => {
        document.getElementById("server-info").innerHTML = `alliance.rp (v. ${version}/ID: ${id}/UID: ${uid})`;
    });
    cef.on("insert-to-kill", (name1, gunid, name2) => {
        add_kill_list_item(name1, gunid, name2);
    });
    cef.on("clear-kill-list", () => {
        let test = document.querySelectorAll('.kill-list-item'); 
        test.forEach( e => e.remove() );
    });

    cef.on("show-fps", () => {
        fpsOut.style = "display: block";
    });
    cef.on("hide-fps", () => {
        fpsOut.style = "display: none";
    });