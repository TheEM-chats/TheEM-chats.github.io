function filterUniqueByChatId(arr) {
    const seen = new Set();
    return Array.isArray(arr) ? arr.filter(function(item) {
        if (!item) return false;

        // Нормализуем chatid: строка + trim
        var key = item.chatid != null ? String(item.chatid).trim() : '';

        // Если хочешь пропускать элементы без chatid, раскомментируй:
        // if (key === '') return false;

        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    }) : [];
}


function getProfUrl(pubk, element, type) {
    urlp = "https://sebain.pythonanywhere.com/get?filename=" + pubk + "_img"
    if (type == "basic") {
        urlp = "https://sebain.pythonanywhere.com/saveget?filename=" + pubk + "_img"
    }
    fetch(urlp)
        .then(response => response.text())
        .then(data => {
            data = Decrypt(data)
            console.log(data)
            if (data == "Файл не найден в save") {
                element.style('background-image', 'url("https://i.ibb.co/F4qyF7RN/blank.png")')
            } else {
                element.style('background-image', `url("${data}")`);

            }
        })
        .catch(error => {
            element.style('background-image', 'url("https://i.ibb.co/F4qyF7RN/blank.png")')
        });
}

function load_chats(intGrt = false) {

    fetch("https://sebain.pythonanywhere.com/saveget?filename=" + pp + "_chats")
        .then(response => response.text())
        .then(data => {
            chatsJSON = data;
            console.log(chatsJSON) // выводим уже присвоенное значение
            let tchats = JSON.parse(chatsJSON)
            tchats = filterUniqueByChatId(tchats)
            let num = tchats.length - 1
            let btnum = 0
            let pos = 75
            let checked = []
            while (num > -1) {
                let xpos = pos
                let xbtnum = btnum
                let xnum = num
                let type = "basic"
                let displaytype = " [Чат]"
                try {
                    if (tchats[xnum].target == "channel") {
                        type = "channel"
                        displaytype = " [Канал]"
                        console.log("Канал")
                    } else if (tchats[xnum].target == "group") {
                        type = "group"
                        displaytype = " [Группа]"
                        console.log("Группа")
                    } else {
                        console.log("Просто чат")
                    }
                } catch {
                    console.log("Памылка!")
                }
                let nameurl = "https://sebain.pythonanywhere.com/saveget?filename=" + tchats[xnum].target + "_profn"
                if (type != "basic") {
                    nameurl = "https://sebain.pythonanywhere.com/get?filename=" + tchats[xnum].chatid + "_profn"
                }
                fetch(nameurl)
                    .then(response => response.text())
                    .then(data => {
                        let clr
                        let xid = tchats[xnum].chatid
                        let tbutton = createButton(data)
                        let xdata = data
                        let targ = tchats[xnum].target
                        tbutton.style('white-space', 'pre-wrap');
                        //tbutton.html("Текст")
                        tbutton.position(0, xpos)
                        tbutton.size(window.innerWidth, 35)
                        tbutton.style('border-radius', '8px');
                        tbutton.style('text-align', 'left');
                        tbutton.style('padding-left', '12px');
                        if (intGrt) {
                            tbutton.style('position', 'fixed');
                            tbutton.style('z-index', '30');
                        }
                        chatbuttons[xbtnum] = tbutton
                        let chkuped = false
                        tbutton.mousePressed(() => {
                            if (intGrt && !chkuped) {
                                chkuped = true
                                checked.push({
                                    target: targ,
                                    chatid: xid
                                });
                                tbutton.style("border-width", "12px");
                                tbutton.style("border-color", "#930c0cff");
                            } else if (!intGrt) {
                                setCookie2("chatid", xid)
                                setCookie2("name", data)
                                if (type == "basic") {
                                    setCookie2("colour", clr)
                                } else {
                                    setCookie2("colour", "#4da6ff")
                                }
                                setCookie2("target", targ)
                                window.location.href = "chat.html";
                            }

                        });
                        tbutton.style("border-width", "3px");
                        tbutton.style("border-color", "#00004d");
                        if (type == "basic") {
                            fetch("https://sebain.pythonanywhere.com/saveget?filename=" + targ + "_last-online&text=" + Math.floor(Date.now() / 1000))
                                .then(response => response.text())
                                .then(data => {
                                    let dif1 = Math.floor(Date.now() / 1000) - data
                                    let dstate
                                    if (dif1 < 60) {
                                        tbutton.style("border-width", "3px");
                                        tbutton.style("border-color", "#009900");
                                    }
                                })
                                .catch(error => {});
                        }
                        let btn = createButton('');
                        if (type == "basic") {
                            getProfUrl(tchats[xnum].target, btn, type)
                        } else {
                            getProfUrl(tchats[xnum].chatid, btn, type)
                        }

                        btn.style('background-size', 'cover');
                        btn.position(window.innerWidth - 35, xpos)
                        let pubk
                        if (type == "basic") {
                            pubk = tchats[xnum].target
                        } else {
                            pubk = tchats[xnum].chatid
                        }
                        btn.mousePressed(() => {
                            if (!intGrt) {
                                overlay.style('background', 'rgba(0, 0, 0, 0.6)');
                                overlay.style('z-index', '100');
                                let fsimg = createButton('');
                                fsimg.style('z-index', '101');
                                getProfUrl(pubk, fsimg, type)
                                fsimg.style('background-size', 'cover');
                                fsimg.size(366, 366)
                                fsimg.position(0, 0)
                                fsimg.mousePressed(() => {
                                    fsimg.remove()
                                    overlay.style('background', '#ffffff');
                                    overlay.style('z-index', '-100');
                                });
                            }
                        });
                        btn.size(35, 35)
                        chatimgs[xbtnum] = btn
                        fetch("https://sebain.pythonanywhere.com/get?filename=chat_" + xid)
                            .then(response => response.text())
                            .then(data => {
                                let history_newJSON = data
                                fetch("https://sebain.pythonanywhere.com/saveget?filename=" + pp + "_oldchat" + xid)
                                    .then(response => response.text())
                                    .then(data => {
                                        data = Decrypt(data)
                                        let history_oldJSON = data
                                        let new1 = JSON.parse(history_newJSON)
                                        new1 = new1[new1.length - 1]
                                        let old1 = JSON.parse(history_oldJSON)
                                        console.log(JSON.stringify(new1))
                                        if (!intGrt) {
                                            if (JSON.stringify(new1) == JSON.stringify(old1)) {
                                                let history = JSON.parse(history_newJSON)
                                                let l = history.length - 1
                                                let text = history[l].value
                                                if (getCookie("nofilt") != 1) {
                                                    text = filterTextWithBanwords(text);
                                                }
                                                tbutton.html(xdata + displaytype + " [ПОСЛЕДНЕЕ]\n" + shortenText(text))

                                            } else {
                                                tbutton.html(xdata + displaytype + " [НОВОЕ]")
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Ошибка при получении данных:", error);
                                    });

                            })
                            .catch(error => {
                                console.error("Ошибка при получении данных:", error);
                            });
                        if (type == "basic") {
                            fetch("https://sebain.pythonanywhere.com/saveget?filename=" + tchats[xnum].target + "_colour")
                                .then(response => response.text())
                                .then(data => {
                                    console.log(data)
                                    if (data == "Файл не найден в save") {
                                        console.log("Не получен цвет" + tchats[xnum].target)
                                    } else {
                                        tbutton.style('background-color', "#" + data);
                                        clr = "#" + data
                                    }
                                })
                                .catch(error => {
                                    console.error(error)
                                });
                        }
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
                pos = pos + 33
                btnum++
                num--
            }
            if (intGrt) {
                let CommitUserListBTN = createButton("Готово")
                CommitUserListBTN.position(30, pos + 15)
                CommitUserListBTN.size(100, 25)
                CommitUserListBTN.mousePressed(() => {
                    CommitUserListFunc(CommitUserListBTN, checked)
                });
                CommitUserListBTN.style('position', 'fixed');
                CommitUserListBTN.style('z-index', '30');
            }

        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
            alert("У вас нет ни одного чата??? Так добавь своего друга по его ID, если уже добавил или хочешь добавить жми ОК")
        });
}