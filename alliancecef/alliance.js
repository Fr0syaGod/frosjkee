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

function updateSpeedometer(speed, maxSpeed = 320) {
    // Обновляем текст скорости
    document.getElementById("speed-text").innerHTML = Math.round(speed);
    
    // Обновляем индикатор скорости
    const speedPath = document.getElementById("speed-path");
    if (speedPath) {
        // Рассчитываем offset на основе текущей скорости
        // dasharray = 838, полный круг
        const maxOffset = 838;
        const minOffset = 0;
        const offset = maxOffset - (maxOffset * (speed / maxSpeed));
        speedPath.style.strokeDashoffset = Math.max(minOffset, Math.min(maxOffset, offset));
    }
}

function updateFuel(fuel, maxFuel = 100) {
    // Обновляем индикатор топлива
    const fuelPath = document.getElementById("fuel-path");
    if (fuelPath) {
        // Рассчитываем offset на основе текущего уровня топлива
        // dasharray = 340, полный круг
        const maxOffset = 340;
        const minOffset = 0;
        const offset = maxOffset - (maxOffset * (fuel / maxFuel));
        fuelPath.style.strokeDashoffset = Math.max(minOffset, Math.min(maxOffset, offset));
    }
}

function updateEngine(health, maxHealth = 100) {
    // Обновляем индикатор двигателя
    const enginePath = document.getElementById("engine-path");
    if (enginePath) {
        // Рассчитываем offset на основе текущего здоровья двигателя
        // dasharray = 345, полный круг
        const maxOffset = 345;
        const minOffset = 0;
        const offset = maxOffset - (maxOffset * (health / maxHealth));
        enginePath.style.strokeDashoffset = Math.max(minOffset, Math.min(maxOffset, offset));
    }
}

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

    cef.on("update-speed-icon", (icon, value) => { 
        update_icon(icon, value);
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
        if(value === 1) { 
            cstyle="filter: grayscale(0);"; 
        } else { 
            cstyle="filter: grayscale(1000%);"; 
        }
        
        if(icon === 1) {
            document.getElementById("engine").style = cstyle;
        }
        if(icon === 2) {
            document.getElementById("lock").style = cstyle;
        }
        if(icon === 3) {
            document.getElementById("light").style = cstyle;
        }
    }
    
    cef.on("update-speed-icon", (icon, value) => { update_icon(icon, value); });
    cef.on("update-speed-text", (textId, value) => {
        if(textId === 1) {
            // Здоровье автомобиля
            updateEngine(parseFloat(value));
        }
        if(textId === 2) {
            // Топливо
            updateFuel(parseFloat(value));
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
            updateSpeedometer(speed);
        }

        if(arm <= 0) {
            document.getElementById("arm_progress").style.opacity = "0";
            document.getElementById("arm_value").style.opacity = "0";
        } else {
            document.getElementById("arm_progress").style.opacity = "1";
            document.getElementById("arm_value").style.opacity = "1";
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

    // Обработчик для управления видимостью интерфейса
cef.on("game:hud:setComponentVisible", (component, isVisible) => {
    if (component === "interface") {
        if (isVisible) {
            // Показываем элементы интерфейса
            $(".hud-container").show();
            $(".hud-server-datetime").show();
            $("#server-info").show();
        } else {
            // Скрываем элементы интерфейса
            $(".hud-container").hide();
            $(".hud-server-datetime").hide();
            $("#server-info").hide();
        }
    }
});



cef.on("show_certificate", (name, transport, level, progress, limit, deliveries, cargo, status) => {
    create_certificate(name, transport, level, progress, limit, deliveries, cargo, status);
    cef.set_focus(true);
});

function create_certificate(name, transport, level, progress, limit, deliveries, cargo, status) {
    // Удаляем существующее удостоверение если есть
    var element = document.getElementById("certificate_container");
    if(element) { element.remove(); }   

    var body = document.getElementsByTagName("body")[0];
    var certificate_container = document.createElement('div');
    
    certificate_container.id = "certificate_container";
    certificate_container.className = "certificate-dialog";
    body.append(certificate_container);

    // Создаем HTML удостоверения
    certificate_container.innerHTML = `
        <div class="certificate-card">
            <div class="certificate-header">
                <div class="certificate-logo">🚚</div>
                <div class="certificate-title">Посвідчення розвозника</div>
                <div class="certificate-subtitle">Офіційний документ працівника</div>
                <button class="certificate-close" onclick="close_certificate()">×</button>
            </div>
            
            <div class="certificate-info">
                <div class="certificate-row">
                    <div class="certificate-label">Ім'я розвозника:</div>
                    <div class="certificate-value">${name}</div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Робочий транспорт:</div>
                    <div class="certificate-value">${transport}</div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Рівень:</div>
                    <div class="certificate-level">${level}</div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Прогрес рівня:</div>
                    <div class="certificate-progress-container">
                        <div class="certificate-progress-text">${progress}/${limit}</div>
                        <div class="certificate-progress-bar">
                            <div class="certificate-progress-fill" style="width: ${calculateProgress(progress, limit)}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Всього поставок:</div>
                    <div class="certificate-value">${deliveries}</div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Доставлено вантажу:</div>
                    <div class="certificate-value">${cargo} кг</div>
                </div>
                
                <div class="certificate-row">
                    <div class="certificate-label">Статус:</div>
                    <div class="certificate-status ${getStatusClass(status)}">${status}</div>
                </div>
            </div>
            
            <div class="certificate-footer">
                <div class="certificate-footer-text">© 2025 Служба доставки вантажів</div>
            </div>
        </div>
    `;
}

// Функция закрытия удостоверения (аналогично callcack_dialog_response)
function close_certificate() {
    cef.set_focus(false);
    cef.emit("callback_certificate_close");
    
    var element = document.getElementById("certificate_container");
    if(element) { element.remove(); }
}

// Вспомогательные функции
function calculateProgress(progress, limit) {
    if(limit === "Максимальный!") return 100;
    return Math.min(100, (parseInt(progress) / parseInt(limit)) * 100);
}

function getStatusClass(status) {
    // Проверяем точное соответствие статусов
    if(status === "На работе" || status === "НА РАБОТЕ") {
        return "status-working";
    } else if(status === "Не работает" || status === "НЕ РАБОТАЕТ") {
        return "status-not-working";
    }
    // Дополнительная проверка для украинского языка
    if(status.includes("працює") || status.includes("роботі")) {
        return "status-working";
    }
    return "status-not-working";
}

// Обработка клавиши ESC (аналогично вашим диалогам)
window.addEventListener("keyup", (event) => {
    var certificate = document.getElementById("certificate_container");
    if(certificate && event.keyCode === 27) {
        close_certificate();
    }
});

// Функции для паспорта
function create_passport(name, years, law, wanted, house, job, regdate, gender) {
    var element = document.querySelector(".passport-shadow");
    if(element) { element.remove(); }   

    var body = document.getElementsByTagName("body")[0];
    
    // ИСПРАВЛЕНО: Инвертируем логику пола
    var passportImage = gender == 1 ? 'img/passport_male.png' : 'img/passport_female.png';
    
    var passportHTML = `
        <div class="passport-shadow">
            <div class="passport-container" onclick="event.stopPropagation()" style="background-image: url('${passportImage}');">
                <div class="player-skin" id="player-skin"></div>
                <div class="blur-skin"></div>
                
                <div class="passport-field field-lastname" id="passport-lastname">Петренко</div>
                <div class="passport-field field-firstname" id="passport-firstname">Іван</div>
                <div class="passport-field field-gender" id="passport-gender">Чоловіча</div>
                <div class="passport-field field-city" id="passport-city">Київ</div>
                <div class="passport-field field-birthday" id="passport-birthday">01.01.1990</div>
                <div class="passport-field field-level" id="passport-level">5 років</div>
                <div class="passport-field field-military" id="passport-military">В наявності</div>
                <div class="passport-field field-regdate" id="passport-regdate">${regdate || '01/01/2020'}</div>
                
                <div class="social-background" id="social-bg"></div>
                <div class="passport-field field-social-text" id="passport-social">100</div>
                
                <button class="passport-close" onclick="closePassport()">Закрыть</button>
                
                <div class="passport-additional-info">
                    <div class="passport-info-row">
                        <span class="passport-info-label">Законопослушність:</span>
                        <span class="passport-info-value">
                            <span class="passport-law-badge passport-law-high" id="passport-info-law">Високий</span>
                        </span>
                    </div>
                    <div class="passport-info-row">
                        <span class="passport-info-label">Рівень розшуку:</span>
                        <span class="passport-info-value">
                            <div class="passport-wanted-stars" id="passport-info-wanted"></div>
                        </span>
                    </div>
                    <div class="passport-info-row">
                        <span class="passport-info-label">Номер будинку:</span>
                        <span class="passport-info-value" id="passport-info-house">---</span>
                    </div>
                    <div class="passport-info-row">
                        <span class="passport-info-label">Місце роботи:</span>
                        <span class="passport-info-value" id="passport-info-job">Не працює</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    body.insertAdjacentHTML('beforeend', passportHTML);
    
    // ИСПРАВЛЕНО: Добавляем обработчик клика для закрытия
    var shadowElement = document.querySelector('.passport-shadow');
    shadowElement.addEventListener('click', function(e) {
        if (e.target === shadowElement) {
            closePassport();
        }
    });
    
    update_passport_data(name, years, law, wanted, house, job, regdate, gender);
}

function update_passport_data(name, years, law, wanted, house, job, regdate, gender) {
    // Обработка ника с подчеркиванием
    var firstName, lastName;
    
    if (name.includes('_')) {
        var nameParts = name.split('_');
        firstName = nameParts[0] || '';
        lastName = nameParts[1] || '';
    } else {
        var nameParts = name.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts[1] || '';
    }
    
    document.getElementById('passport-firstname').innerHTML = firstName;
    document.getElementById('passport-lastname').innerHTML = lastName;
    
    // ИСПРАВЛЕНО: Инвертируем логику пола
    var genderText = gender == 1 ? "Чоловіча" : "Жіноча";
    document.getElementById('passport-gender').innerHTML = genderText;
    
    // Обновляем дату регистрации
    if (regdate) {
        document.getElementById('passport-regdate').innerHTML = regdate;
    }
    
    var levelPlural = years == 1 ? "рік" : (years < 5 ? "роки" : "років");
    document.getElementById('passport-level').innerHTML = years + " " + levelPlural;
    
    var lawElement = document.getElementById('passport-info-law');
    lawElement.className = 'passport-law-badge';
    
    if (law >= 80) {
        lawElement.classList.add('passport-law-high');
        lawElement.innerHTML = 'Високий';
    } else if (law >= 50) {
        lawElement.classList.add('passport-law-medium');
        lawElement.innerHTML = 'Середній';
    } else {
        lawElement.classList.add('passport-law-low');
        lawElement.innerHTML = 'Низький';
    }
    
    var wantedContainer = document.getElementById('passport-info-wanted');
    wantedContainer.innerHTML = '';
    
    for (var i = 0; i < 5; i++) {
        var star = document.createElement('span');
        star.className = 'passport-wanted-star';
        if (i >= wanted) {
            star.classList.add('inactive');
        }
        wantedContainer.appendChild(star);
    }
    
    document.getElementById('passport-info-house').innerHTML = house == -1 ? '---' : house;
    document.getElementById('passport-info-job').innerHTML = job || 'Не працює';
}

function closePassport() {
    cef.emit("callback_passport_close");
    cef.set_focus(false);
    
    var element = document.querySelector('.passport-shadow');
    if(element) { element.remove(); }
}

// CEF события для паспорта
cef.on("show_passport", function(name, years, law, wanted, house, job, regdate, gender) {
    create_passport(name, years, law, wanted, house, job, regdate, gender);
    cef.set_focus(true);
});

// Обработка клавиши ESC для паспорта
window.addEventListener("keyup", function(event) {
    var passport = document.querySelector(".passport-shadow");
    if(passport && event.keyCode === 27) {
        closePassport();
    }
});