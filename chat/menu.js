function OvlayShow() {
    overlay.show()
}

function OvlayHide() {
    overlay.hide()
    try {
        btnOpen.remove()
    } catch {}
    try {
        btnDelete.remove()
    } catch {}
    try {
        btnText.remove()
    } catch {}
    try {
        btnEdit.remove()
    } catch {}
    try {
        btnCancel.remove()
    } catch {}
    try {
        btnCopy.remove()
    } catch {}
}

function MenuShow(editnum) {
    if (history[editnum].type == "call") {
        setCookie2("callid", history[editnum].callid)
        window.location.href = "call.html"
    }
    if (history[editnum].sender == pp) {
        let uid = history[editnum].uid
        console.log("Меню для моего сообщения")
        btnText = createButton(history[editnum].value)
        btnText.position(windowWidth / 10, 50);
        btnText.size(windowWidth - windowWidth / 10 - windowWidth / 10, 25)
        btnText.style('position', 'fixed');
        btnText.style('z-index', '101');
        btnText.style('border-radius', '8px');
        ButtonStyling(btnText)
        let edtst
        if (history[editnum].type == "text") {
            edtst = "text"
            btnEdit = createButton('Изменить');
            btnEdit.mousePressed(() => {
                editmenu = 1
                var uidXS = uid
                var historyeditnum = history[editnum]

                function edit(place) {
                    if (place !== "" && place !== null) {
                        historyeditnum.prevvalue = historyeditnum.value
                        historyeditnum.value = place + " (изменено)"
                        historyeditnum.time = Math.floor(Date.now() / 1000)
                        fetch("https://sebain.pythonanywhere.com/changer?filename=chat_" + getCookie("chatid") + "&text=" + JSON.stringify(historyeditnum) + "&uid=" + uidXS + andpass)
                            .then(response => response.text())
                            .then(data => {
                                SoundEffect("push.mp3")
                                editmenu = 0
                                render()
                                OvlayHide()
                            })
                            .catch(error => {
                                editmenu = 0
                                console.error("Ошибка при получении данных:", error);
                            });

                    } else {
                        editmenu = 0
                    }
                }
                xPrompt("Новое сообщение:", edit)


            });
        } else if (history[editnum].type == "img") {
            edtst = "img"
            btnEdit = createButton('Открыть (как картинку)');
            btnEdit.mousePressed(() => {
                window.location.href = history[editnum].value;
            });
        }
        try {
            btnEdit.position(0, 100);
            btnEdit.size(windowWidth, 50)
            btnEdit.style('position', 'fixed');
            btnEdit.style('z-index', '101');
            btnEdit.style('background-color', '#3366cc');
            superstyler(btnEdit, '#3366cc')
        } catch {
            console.log("Изменять нельзя")
        }
        if (history[editnum].type == "file") {
            btnOpen = createButton('Открыть (этот файл)')
        } else {
            btnOpen = createButton('Открыть (как ссылку)')
        }

        btnOpen.mousePressed(() => {
            function getLink(text) {
                // Сначала ищем ссылку с http/https
                const httpRegex = /https?:\/\/[^\s]+/i;
                const httpMatch = text.match(httpRegex);
                if (httpMatch) return httpMatch[0];

                // Если не найдено — ищем по доменам
                const domainRegex = /\b(?:www\.)?[^\s]+\.(?:io|com|by|ru|site|org|net)\b[^\s]*/i;
                const domainMatch = text.match(domainRegex);
                if (domainMatch) return domainMatch[0];

                // Если ничего не найдено
                return "NO";
            }

            if (getLink(history[editnum].value) != "NO") {
                setCookie2("safeurl", getLink(history[editnum].value))
                window.location.href = "safeweb.html";
            } else {
                alert("Ссылок нету!")
            }

        });
        btnOpen.position(0, 150);
        btnOpen.size(windowWidth, 50)
        btnOpen.style('position', 'fixed');
        btnOpen.style('z-index', '101');
        btnOpen.style('background-color', '#3366cc');
        superstyler(btnOpen, '#3366cc')


        btnDelete = createButton('Удалить');
        btnDelete.position(0, 200);
        btnDelete.size(windowWidth, 50)
        btnDelete.style('position', 'fixed');
        btnDelete.style('z-index', '101');
        btnDelete.style('background-color', '#ff5733');
        superstyler(btnDelete, '#ff5733')
        btnDelete.mousePressed(() => {
            history[editnum].prevsender = history[editnum].sender
            history[editnum].prevvalue = history[editnum].value
            history[editnum].sender = "system"
            history[editnum].value = "Удалённое сообщение"
            if (getCookie("target") == "note") {
                history[editnum].type = "invis"
            } else {
                history[editnum].type = "text"
            }

            fetch("https://sebain.pythonanywhere.com/changer?filename=chat_" + getCookie("chatid") + "&text=" + Crypt(JSON.stringify(history[editnum])) + "&uid=" + uid + andpass)
                .then(response => response.text())
                .then(data => {
                    SoundEffect("push.mp3")
                    render()
                    OvlayHide()
                })
                .catch(error => {
                    console.error("Ошибка при получении данных:", error);
                });
        });
        btnCopy = createButton('Копировать');
        btnCopy.position(0, 250);
        btnCopy.size(windowWidth, 50)
        btnCopy.style('position', 'fixed');
        btnCopy.style('z-index', '101');
        btnCopy.style('background-color', '#b3b3b3');
        superstyler(btnCopy, '#b3b3b3')
        btnCopy.mousePressed(() => {
            navigator.clipboard.writeText(history[editnum].value)
                .then(() => {
                    alert("Скопировано")
                })
                .catch(err => {
                    alerterr(err)
                });
        });

        btnCancel = createButton('Отмена');
        btnCancel.position(0, 300);
        btnCancel.size(windowWidth, 50)
        btnCancel.style('position', 'fixed');
        btnCancel.style('z-index', '101');
        btnCancel.style('background-color', '#b3b3b3');
        superstyler(btnCancel, '#b3b3b3')
        btnCancel.mousePressed(() => {
            OvlayHide()
        });
        if (level == 1) {
            btnDelete.remove()
            if (edtst != "img") {
                btnEdit.remove()
            }

        }



    } else if (history[editnum].sender == "system") {
        console.log("Системное сообщение : меню не доступно")
        OvlayHide()
    } else {
        let uid = history[editnum].uid

        console.log("Меню для чужого сообщения")
        btnText = createButton(history[editnum].value)
        btnText.position(windowWidth / 10, 50);
        btnText.size(windowWidth - windowWidth / 10 - windowWidth / 10, 25)
        btnText.style('position', 'fixed');
        btnText.style('z-index', '101');
        btnText.style('border-radius', '8px');
        ButtonStyling(btnText)
        if (history[editnum].type == "img") {
            btnEdit = createButton('Открыть (как картинку)');
            btnEdit.mousePressed(() => {
                window.location.href = history[editnum].value;
            });
            btnEdit.position(0, 100);
            btnEdit.size(windowWidth, 50)
            btnEdit.style('position', 'fixed');
            btnEdit.style('z-index', '101');
            btnEdit.style('background-color', '#3366cc');
            superstyler(btnEdit, '#3366cc')
        }



        if (history[editnum].type == "file") {
            btnOpen = createButton('Открыть (этот файл)')
        } else {
            btnOpen = createButton('Открыть (как ссылку)')
        }
        btnOpen.mousePressed(() => {
            function getLink(text) {
                // Сначала ищем ссылку с http/https
                const httpRegex = /https?:\/\/[^\s]+/i;
                const httpMatch = text.match(httpRegex);
                if (httpMatch) return httpMatch[0];

                // Если не найдено — ищем по доменам
                const domainRegex = /\b(?:www\.)?[^\s]+\.(?:io|com|by|ru|site|org|net)\b[^\s]*/i;
                const domainMatch = text.match(domainRegex);
                if (domainMatch) return domainMatch[0];

                // Если ничего не найдено
                return "NO";
            }

            if (getLink(history[editnum].value) != "NO") {
                setCookie2("safeurl", getLink(history[editnum].value))
                window.location.href = "safeweb.html";
            } else {
                alert("Ссылок нету!")
            }

        });
        btnOpen.position(0, 150);
        btnOpen.size(windowWidth, 50)
        btnOpen.style('position', 'fixed');
        btnOpen.style('z-index', '101');
        btnOpen.style('background-color', '#3366cc');
        superstyler(btnOpen, '#3366cc')

        btnCopy = createButton('Копировать');
        btnCopy.position(0, 250);
        btnCopy.size(windowWidth, 50)
        btnCopy.style('position', 'fixed');
        btnCopy.style('z-index', '101');
        btnCopy.style('background-color', '#b3b3b3');
        superstyler(btnCopy, '#b3b3b3')
        btnCopy.mousePressed(() => {
            navigator.clipboard.writeText(history[editnum].value)
                .then(() => {
                    alert("Скопировано")
                })
                .catch(err => {
                    alerterr(err)
                });
        });

        btnCancel = createButton('Отмена');
        btnCancel.position(0, 300);
        btnCancel.size(windowWidth, 50)
        btnCancel.style('position', 'fixed');
        btnCancel.style('z-index', '101');
        btnCancel.style('background-color', '#b3b3b3');
        superstyler(btnCancel, '#b3b3b3')
        btnCancel.mousePressed(() => {
            OvlayHide()
        });
        if (level > 1) {
            btnDelete = createButton('Удалить');
            btnDelete.position(0, 200);
            btnDelete.size(windowWidth, 50)
            btnDelete.style('position', 'fixed');
            btnDelete.style('z-index', '101');
            btnDelete.style('background-color', '#ff5733');
            superstyler(btnDelete, '#b3b3b3')
            btnDelete.mousePressed(() => {
                history[editnum].prevsender = history[editnum].sender
                history[editnum].prevvalue = history[editnum].value
                history[editnum].sender = "system"
                history[editnum].value = "Удалено админом"
                history[editnum].type = "text"
                fetch("https://sebain.pythonanywhere.com/changer?filename=chat_" + getCookie("chatid") + "&text=" + JSON.stringify(history[editnum]) + "&uid=" + uid + andpass)
                    .then(response => response.text())
                    .then(data => {
                        SoundEffect("push.mp3")
                        render()
                        OvlayHide()
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
            });
        }

    }
}