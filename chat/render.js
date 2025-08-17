function cleanCalls(array) {
    const callIndexes = array
        .map((item, index) => item.type === 'call' ? index : -1)
        .filter(index => index !== -1);

    if (callIndexes.length <= 1) return array;

    const lastCallIndex = callIndexes[callIndexes.length - 1];

    return array.filter((item, index) => {
        return item.type !== 'call' || index === lastCallIndex;
    });
}

function calctime(unixTime) {
    let date = new Date(unixTime * 1000);

    // Форматируем вручную
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/Minsk',
    };

    return date.toLocaleString('ru-RU', options);
}

function render() {
    console.log(history)
    history = cleanCalls(history)
    console.log(history)
        //setCookie2(getCookie("chatid") + "_history", JSON.stringify(history))
    let schatix = history[history.length - 1]
    fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_oldchat" + getCookie("chatid") + "&text=" + Crypt(JSON.stringify(schatix)))
        .then(response => response.text())
        .then(data => {
            globalres = data;
            console.log(globalres); // выводим уже присвоенное значение
        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
        });
    let superbutton = createButton("А что вы тут забыли????")
    superbutton.position(0, 1000000)
    container.child(superbutton)
    let autor
    let num = objs.length - 1
    while (num > -1) {
        try {
            objs[num].remove()
        } catch {
            console.log("НЕ УДАЛЕНО!")
        }
        num--
    }
    num = objs.length - 1
    while (num > -1) {
        try {
            adds[num].remove()
        } catch {
            console.log("НЕ УДАЛЕНО!")
        }
        num--
    }
    num = history.length - 1
    while (num > -1) {
        if (history[num].type == "text") {
            let colour
            if (history[num].sender == pp) {
                autor = "Вы:\n"
                colour = "#66ff66"
            } else if (history[num].sender == "system") {
                autor = "Система:\n"
                colour = "#669999"
            } else {
                autor = getAutor(history[num].sender) + ":\n"
                colour = "#6699ff"
            }

            let text = history[num].value
            if (getCookie("nofilt") != 1) {
                text = filterTextWithBanwords(text);
            }
            let time = calctime(history[num].time)
            objs[num] = createButton(time + "\n" + autor + text)
            objs[num].style('white-space', 'pre-wrap');
            objs[num].style('text-align', 'left');
            objs[num].style('background-color', colour); // фон кнопки
            objs[num].style('border-radius', '12px');

            container.child(objs[num]);
            let mynum = num
            objs[num].mousePressed(() => {
                OvlayShow()
                MenuShow(mynum)
                console.log(mynum)
            });
        } else if (history[num].type == "img") {
            console.log("Отображаем картинку!")
            let colour
            if (history[num].sender == pp) {
                autor = "Вы:\n"
                colour = "#66ff66"
            } else if (history[num].sender == "system") {
                autor = "Система:\n"
                colour = "#669999"
            } else {
                autor = getAutor(history[num].sender) + ":\n"
                colour = "#6699ff"
            }
            let time = calctime(history[num].time)
            let file = history[num].value
            objs[num] = createButton("")
            objs[num].style('white-space', 'pre-wrap');
            objs[num].style('text-align', 'left');
            objs[num].style('background-color', colour); // фон кнопки
            objs[num].style('border-radius', '12px');
            objs[num].style('background-image', `url("${file}")`);
            objs[num].style('align-self', 'flex-start');
            objs[num].style('flex', 'none');
            objs[num].style('background-repeat', 'no-repeat');
            objs[num].style('background-size', 'calc(100% - 10px)'); // ⬅️ уменьшить высоту
            objs[num].style('background-position', 'center 20px'); // ⬅️ отступ сверху
            container.child(objs[num]);
            objs[num].size(256, 256)
            let p = createP(time + "\n" + autor);
            let pos = objs[num].position();
            p.position(pos.x + 10, pos.y - 10);
            container.child(p);
            adds[num] = p


            let mynum = num
            objs[num].mousePressed(() => {
                OvlayShow()
                MenuShow(mynum)
                console.log(mynum)
            });
        } else if (history[num].type == "file") {
            console.log("Отображаем файл")
            let colour
            if (history[num].sender == pp) {
                autor = "Вы: "
                colour = "#06ff88"
            } else if (history[num].sender == "system") {
                autor = "Система: "
                colour = "#070000"
            } else {
                autor = getAutor(history[num].sender) + ": "
                colour = "#049999"
            }
            let time = calctime(history[num].time)
            let text = history[num].header
            if (getCookie("nofilt") != 1) {
                text = filterTextWithBanwords(text);
            }
            objs[num] = createButton(time + "\n" + autor + text)
            objs[num].style('white-space', 'pre-wrap');
            objs[num].style('text-align', 'left');
            objs[num].style('background-color', colour); // фон кнопки

            container.child(objs[num]);
            let mynum = num
            objs[num].mousePressed(() => {
                OvlayShow()
                MenuShow(mynum)
                console.log(mynum)
            });
        } else if (history[num].type == "call") {
            console.log("Рендерим вызов!")
            console.log("Отображаем файл")
            let colour = "#00cc00"
            objs[num] = createButton("📞📞📞Начался созвон  ([ЗАЙТИ])  📞📞📞")
            objs[num].style('white-space', 'pre-wrap');
            objs[num].style('text-align', 'left');
            objs[num].style('background-color', colour); // фон кнопки
            objs[num].size(300, 50)

            container.child(objs[num]);
            let mynum = num
            objs[num].mousePressed(() => {
                OvlayShow()
                MenuShow(mynum)
                console.log(mynum)
            });
        } else {
            try {
                getAutor(history[num].sender)
            } catch {
                console.log("При добавке автора произошла ошибка!")
            }
        }


        num--
    }
    superbutton.remove()
}



function update() {
    if (editmenu == 0) {
        console.log("Обновление")
        fetch("https://sebain.pythonanywhere.com/get?filename=chat_" + getCookie("chatid"))
            .then(response => response.text())
            .then(data2 => {
                data2 = Decrypt(data2)
                let data = JSON.stringify(JSON.parse(data2))
                console.log(data)
                console.log(JSON.stringify(history))
                if (JSON.stringify(cleanCalls(JSON.parse(data))) == JSON.stringify(history)) {
                    console.log("Новых сообщений нет")
                } else {
                    SoundEffect("msg.mp3")
                    history = JSON.parse(data)
                    render()
                }


            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }
}