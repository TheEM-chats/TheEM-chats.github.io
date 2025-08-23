var addschat = 0

function returneschat() {
    addschat--
    if (addschat == 0) {
        inwork = false
        xAlert("Успешно добавлено! Чтобы новый чат появился нажмите ↻ в верху экрана!")
    }
}

function getProfUrl(pubk, element) {
    InProcess++
    fetch("https://sebain.pythonanywhere.com/saveget?filename=" + pubk + "_img")
        .then(response => response.text())
        .then(data => {
            InProcess--
            data = Decrypt(data)
            console.log(data)
            if (data == "Файл не найден в save") {
                element.style('background-image', 'url("https://i.ibb.co/F4qyF7RN/blank.png")')
            } else {
                element.style('background-image', `url("${data}")`);

            }
        })
        .catch(error => {
            InProcess--
            element.style('background-image', 'url("https://i.ibb.co/F4qyF7RN/blank.png")')
        });
}

function finder(text) {
    inwork = true
    overlay = createButton("")
    overlay.position(0, 0);
    overlay.size(windowWidth, windowHeight);
    overlay.style('background', 'rgba(0, 0, 0, 0.6)');
    overlay.style('position', 'fixed');
    overlay.style('z-index', '100');
    overlay.style('pointer-events', 'auto');
    overlay.mousePressed(() => {
        console.log("На оверлей тыкать низя!")
    });
    overlay.style('background', 'rgba(0, 0, 0, 0.6)');
    overlay.style('z-index', '100');
    overlay.hide()
    InProcess++
    fetch("https://sebain.pythonanywhere.com/search_ids?searchtag=" + Crypt(text))
        .then(response => response.text())
        .then(data => {
            InProcess--
            res = JSON.parse(data)
            console.log(res)
            let num = 0
            let pos = 30
            while (num < res.length) {
                let xid = res[num].id
                let tbutton = createButton(res[num].profn + "\n ID:" + res[num].id)
                ButtonStyling(tbutton)
                tbutton.style('white-space', 'pre-wrap')
                objs.push(tbutton)
                tbutton.size(window.innerWidth - 3, 35)
                tbutton.position(0, pos)
                tbutton.style('text-align', 'left')
                tbutton.style('padding-left', '40px')
                tbutton.mousePressed(() => {
                    if (!inwork) {
                        tbutton.remove()
                        btn.remove()
                        inwork = true
                        InProcess++
                        fetch("https://sebain.pythonanywhere.com/savestget?filename=" + ps + "_chats")
                            .then(response => response.text())
                            .then(data => {
                                InProcess--
                                chats = JSON.parse(data)
                                num = chats.length - 1
                                let found = false
                                while (num > -1) {
                                    if (chats[num].target == xid || xid == pp) {
                                        found = true
                                    }
                                    num--
                                }
                                if (found) {
                                    xAlert("Этот чат уже у вас есть")
                                    inwork = false
                                } else {
                                    addschat = 3
                                    console.log("Добавляем!")
                                    let chatid = getRandomFromRange(1111111111, 9999999999)
                                    addbyid(xid, chatid, pp, returneschat)
                                    addbyid(pp, chatid, xid, returneschat)
                                    let placeholder = [{
                                        type: 'text',
                                        value: "Когда вас спросят про разрешение на уведомление, нажимайте разрешить(без этого вы пропустите выжные сообщения)(прислушайтесь к моему совету!!!)",
                                        sender: "system",
                                        time: Math.floor(Date.now() / 1000)
                                    }];
                                    let placeholderJSON = JSON.stringify(placeholder)
                                    InProcess++
                                    fetch("https://sebain.pythonanywhere.com/set?filename=chat_" + chatid + "&text=" + placeholderJSON)
                                        .then(response => response.text())
                                        .then(data => {
                                            InProcess--
                                            returneschat()

                                        })
                                        .catch(error => {
                                            console.error("Ошибка при получении данных:", error);
                                            InProcess--
                                            xAlert("Произошла ошибка!!")
                                        });
                                }
                            })
                            .catch(error => {
                                InProcess--
                                addschat = 3
                                console.log("Добавляем!")
                                let chatid = getRandomFromRange(1111111111, 9999999999)
                                addbyid(xid, chatid, pp, returneschat)
                                addbyid(pp, chatid, xid, returneschat)
                                let placeholder = [{
                                    type: 'text',
                                    value: "Когда вас спросят про разрешение на уведомление, нажимайте разрешить(без этого вы пропустите выжные сообщения)(прислушайтесь к моему совету!!!)",
                                    sender: "system",
                                    time: Math.floor(Date.now() / 1000)
                                }];
                                let placeholderJSON = JSON.stringify(placeholder)
                                InProcess++
                                fetch("https://sebain.pythonanywhere.com/set?filename=chat_" + chatid + "&text=" + placeholderJSON)
                                    .then(response => response.text())
                                    .then(data => {
                                        InProcess--
                                        returneschat()

                                    })
                                    .catch(error => {
                                        console.error("Ошибка при получении данных:", error);
                                        InProcess--
                                        xAlert("Произошла ошибка!!")
                                    });
                            });
                    }
                });

                let btn = createButton('');
                ButtonStyling(btn)
                btn.mouseOver(() => {});
                btn.mouseOut(() => {});
                getProfUrl(res[num].id, btn)

                btn.style('background-size', 'cover');
                btn.position(0, pos)
                objs.push(btn)
                btn.mousePressed(() => {
                    let scroll = window.scrollY
                    window.scrollTo(0, 0);
                    overlay.show()
                    let fsimg = createButton('');
                    fsimg.style('z-index', '101');
                    getProfUrl(xid, fsimg)
                    fsimg.style('background-size', 'cover');
                    fsimg.size(366, 366)
                    fsimg.position(0, 0)
                    fsimg.style('border-radius', '15px')
                    fsimg.mousePressed(() => {
                        window.scrollTo(0, scroll);
                        fsimg.remove()
                        overlay.hide()
                    });
                });
                btn.size(35, 35)

                num++
                pos = pos + 35
            }
            inwork = false
        })
        .catch(error => {
            InProcess--
            xAlert("Ошибка" + error)
        });
}