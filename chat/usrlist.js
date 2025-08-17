let listExit
let listName
let listImg
let listObjs = []

let chatbuttons = []
let chatimgs = []

function CommitUserListFunc(btn, arr) {
    num = chatbuttons.length - 1
    while (num > -1) {
        try {
            chatbuttons[num].remove()
        } catch {}
        try {
            chatimgs[num].remove()
        } catch {}
        num--
    }
    btn.remove()
    console.log(arr)
    num = arr.length - 1
    let added = 0
    while (num > -1) {
        if (arr[num].target != "channel" && arr[num].target != "group") {
            addbyid(arr[num].target, chatid, targ2)
            added++
        }
        num--
    }
    alert("Добавлено " + added + " учасников, вы их увидите когда они зайдут в вашу группу/канал")
    reList()
}

function getProf(url) {
    fetch("https://sebain.pythonanywhere.com/set?filename=" + chatid + "_img&text=" + Crypt(url) + andpass)
        .then(response => response.text())
        .then(data => {
            alert("Картинка загружена, она будет отображатся в гл экране")
            syssent("У канала/группы новая иконка, посмотрите её в главном экране!")
        })
        .catch(error => {

        });
}

function uploadProf() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 512, 512);

                canvas.toBlob((blob) => {
                    if (blob.size > 10 * 1024 * 1024) {
                        alert("Файл слишком большой после сжатия (>10MB)");
                        return;
                    }

                    const formData = new FormData();
                    formData.append("image", blob);

                    // 🔐 Вставь свой API ключ imgbb ниже
                    const apiKey = "c77c07592cd1f730aacfb02824de3a17";
                    const uploadUrl = "https://api.imgbb.com/1/upload?key=" + apiKey;

                    fetch(uploadUrl, {
                            method: "POST",
                            body: formData
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                const imageUrl = data.data.url;
                                getProf(imageUrl); // 🚀 Вызов твоей функции с ссылкой
                            } else {
                                console.error("Ошибка загрузки:", data);
                                alert("Не удалось загрузить изображение");
                            }
                        })
                        .catch(err => {
                            console.error("Ошибка сети:", err);
                            alert("Ошибка загрузки изображения");
                        });

                }, 'image/jpeg', 0.9);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    input.click(); // 🔔 Запускаем выбор файла
}

function reList() {
    listext()
    listrender()
}

function getBanList() {
    let ret = ""
    let Tnum = bans.length - 1
    while (Tnum > -1) {
        if (bans[Tnum].state == "ban") {
            ret = ret + " " + bans[Tnum].id
        }
        Tnum--
    }
    return ret
}

function pushbans() {
    fetch("https://sebain.pythonanywhere.com/set?filename=" + chatid + "_ignore&text=" + JSON.stringify(bans) + andpass)
        .then(response => response.text())
        .then(data => {
            alert("Применено")
            reList()
        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
        });
}

function unBanMute(id) {
    bans = bans.filter(obj => obj.id !== id);
    pushbans()
    syssent("Теперь может писать:" + getAutor(id))
}

function mute(id) {
    bans.push({
        state: "mute",
        id: id
    });
    pushbans()
    syssent("Мут выдан:" + getAutor(id))
}

function ban(id) {
    bans.push({
        state: "ban",
        id: id
    });
    pushbans()
    syssent("Бан выдан:" + getAutor(id))
}

function ismuted(id) {
    Tnum = bans.length - 1
    while (Tnum > -1) {
        if (bans[Tnum].id == id && bans[Tnum].state == "mute") {
            return true
        }
        Tnum--
    }
    return false
}

function isbanned(id) {
    Tnum = bans.length - 1
    while (Tnum > -1) {
        if (bans[Tnum].id == id && bans[Tnum].state == "ban") {
            return true
        }
        Tnum--
    }
    return false
}

function pretty(btn) {
    btn.style('background-color', '#33adff'); // фон кнопки
    btn.style('border-radius', '24px');
    btn.style('z-index', '10');
}

function listext() {
    overlay.style('background', '#ffffff');
    overlay.style('z-index', '-100');
    listExit.remove()
    listAdd.remove()
    try {
        listName.remove()
        listImg.remove()
    } catch {
        console.log("НЕ удалены имя и картинка")
    }
    let Znum = listObjs.length - 1
    while (Znum > -1) {
        listObjs[Znum].remove()
        Znum--
    }

}

function listrender() {
    console.log("Отображаем список учаников!")
    overlay.style('background', 'rgba(0, 0, 0, 0.6)');
    overlay.style('z-index', '5');
    listExit = createButton("Назад <<< <<< <<<")
    listExit.position(0, 0)
    listExit.size(window.innerWidth, 40)
    listExit.mousePressed(() => {
        listext()
    });
    pretty(listExit)

    if (level == 3) {
        listName = createButton("Сменить название(требует перезаход)")
        listName.position(0, 40)
        listName.size(window.innerWidth, 40)
        listName.mousePressed(() => {
            let input = prompt("Введите новое название:  (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");

            if (input === null) {
                console.log("Пользователь нажал Отмена");
            } else if (input === "") {
                console.log("Пользователь нажал ОК, но ничего не ввёл");
            } else {
                fetch("https://sebain.pythonanywhere.com/set?filename=" + chatid + "_profn&text=" + input + andpass)
                    .then(response => response.text())
                    .then(data => {
                        alert("Название сохранено, оно отобразится после перезахода в канал/группу")
                        syssent("Название изменено, перезайдите чтобы увидеть его!")

                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
            }

        });
        pretty(listName)
        listImg = createButton("Сменить иконку")
        listImg.position(0, 80)
        listImg.size(window.innerWidth, 40)
        listImg.mousePressed(() => {
            uploadProf()
        });
        pretty(listImg)
    }

    num = ids.length - 1
    console.log(num)
    pos = 120
    fetch("https://sebain.pythonanywhere.com/get?filename=" + chatid + "_owner")
        .then(response => response.text())
        .then(data => {
            data = JSON.parse(data)
            while (num > -1) {
                console.log(ids[num])
                if (!isbanned(ids[num])) {
                    let xnum = num
                    let xpos = pos
                    let statusp
                    if (ids[xnum] == data[0]) {
                        statusp = "Гл Админ"
                    } else {
                        dvanum = data.length - 1
                        let found = false
                        while (dvanum > -1) {
                            if (data[dvanum] == ids[xnum]) {
                                found = true
                                statusp = "Модер"
                            }
                            dvanum--
                        }
                        if (!found) {
                            statusp = "Учасник"
                        }
                    }

                    xp = createP(getAutor(ids[xnum]).slice(0, 10) + " ID:" + ids[xnum] + " Статус:" + statusp)
                    xp.position(0, xpos)
                    xp.style('background-color', '#33adff');
                    xp.style('z-index', '10');
                    listObjs.push(xp)
                    if (level > 1 && ids[xnum] != data[0]) {
                        let muted = false
                        if (ismuted(ids[xnum])) {
                            muted = true
                            listMute = createButton("Размут")
                            listMute.style('background-color', '#00cc99')
                        } else {
                            listMute = createButton("Мут")
                            listMute.style('background-color', '#ff66cc')
                        }


                        listMute.position(285, xpos + 15)

                        listMute.style('z-index', '10');
                        listObjs.push(listMute)
                        listMute.mousePressed(() => {
                            if (muted) {
                                unBanMute(ids[xnum])
                            } else {
                                mute(ids[xnum])
                            }
                            reList()

                        });
                        if (level == 3) {
                            listBan = createButton("Бан")
                            listBan.position(350, xpos + 15)
                            listBan.style('background-color', '#ff3300')
                            listBan.style('z-index', '10');
                            listObjs.push(listBan)
                            listBan.mousePressed(() => {
                                ban(ids[xnum])
                            });
                        }




                    }
                    pos = pos + 20
                }
                num--

            }
            listBannedBtn = createButton("Список ID банов")
            pretty(listBannedBtn)
            listBannedBtn.position(0, pos + 20)
            listBannedBtn.mousePressed(() => {
                alert("Список банов:" + getBanList())
            });
            listObjs.push(listBannedBtn)
            if (level == 3) {
                listUNBannedBtn = createButton("Разбанить по ID")
                listObjs.push(listUNBannedBtn)
                pretty(listUNBannedBtn)
                listUNBannedBtn.position(110, pos + 20)
                listUNBannedBtn.mousePressed(() => {
                    let input = prompt("Введите ID того, кого надо разбанить!");

                    if (input === null) {
                        console.log("Пользователь нажал Отмена");
                    } else if (input === "") {
                        console.log("Пользователь нажал ОК, но ничего не ввёл");
                    } else {
                        unBanMute(input)
                    }
                });

            }
            if (level == 3) {
                GrantAndmin = createButton("Назначить модера по ID")
                pretty(GrantAndmin)
                GrantAndmin.position(0, pos + 50)
                GrantAndmin.mousePressed(() => {
                    let input = prompt("Введите ID того, кого надо назначить модером!");

                    if (input === null) {
                        console.log("Пользователь нажал Отмена");
                    } else if (input === "") {
                        console.log("Пользователь нажал ОК, но ничего не ввёл");
                    } else {
                        fetch("https://sebain.pythonanywhere.com/get?filename=" + chatid + "_owner")
                            .then(response => response.text())
                            .then(data => {
                                data = JSON.parse(data)
                                data.push(input)
                                data = JSON.stringify(data)
                                fetch("https://sebain.pythonanywhere.com/set?filename=" + chatid + "_owner&text=" + data + andpass)
                                    .then(response => response.text())
                                    .then(data => {
                                        fetch("https://sebain.pythonanywhere.com/addpass?filename=chat_" + chatid + "&2pass=" + input + andpass)
                                            .then(response => response.text())
                                            .then(data => {
                                                fetch("https://sebain.pythonanywhere.com/addpass?filename=" + chatid + "_ignore&2pass=" + input + andpass)
                                                    .then(response => response.text())
                                                    .then(data => {
                                                        alert("Новый модер назначен")
                                                        syssent(getAutor(input) + " назначен модером! Больше об ролях в списке обновлений(Обновление 0.1.4)")
                                                        reList()
                                                    })
                                                    .catch(error => {
                                                        console.error("Ошибка при получении данных:", error);
                                                    });
                                            })
                                            .catch(error => {
                                                console.error("Ошибка при получении данных:", error);
                                            });

                                    })
                                    .catch(error => {
                                        console.error("Ошибка при получении данных:", error);
                                    });
                            })
                            .catch(error => {
                                console.error("Ошибка при получении данных:", error);
                            });
                    }
                });
                listObjs.push(GrantAndmin)
                RemoveAdmin = createButton("Снять модера по ID")
                listObjs.push(RemoveAdmin)
                pretty(RemoveAdmin)
                RemoveAdmin.position(160, pos + 50)
                RemoveAdmin.mousePressed(() => {
                    let input = prompt("Введите ID того, кого надо раз модить!");

                    if (input === null) {
                        console.log("Пользователь нажал Отмена");
                    } else if (input === "") {
                        console.log("Пользователь нажал ОК, но ничего не ввёл");
                    } else {
                        fetch("https://sebain.pythonanywhere.com/get?filename=" + chatid + "_owner")
                            .then(response => response.text())
                            .then(data => {
                                data = JSON.parse(data)
                                data = data.filter(item => item !== input);
                                data = JSON.stringify(data)
                                fetch("https://sebain.pythonanywhere.com/set?filename=" + chatid + "_owner&text=" + data + andpass)
                                    .then(response => response.text())
                                    .then(data => {
                                        fetch("https://sebain.pythonanywhere.com/rempass?filename=chat_" + chatid + "&2pass=" + input + andpass)
                                            .then(response => response.text())
                                            .then(data => {
                                                fetch("https://sebain.pythonanywhere.com/rempass?filename=" + chatid + "_ignore&2pass=" + input + andpass)
                                                    .then(response => response.text())
                                                    .then(data => {
                                                        alert("Новый модер снят")
                                                        syssent(getAutor(input) + " лишён модерки!")
                                                        reList()
                                                    })
                                                    .catch(error => {
                                                        console.error("Ошибка при получении данных:", error);
                                                    });
                                            })
                                            .catch(error => {
                                                console.error("Ошибка при получении данных:", error);
                                            });
                                    })
                                    .catch(error => {
                                        console.error("Ошибка при получении данных:", error);
                                    });
                            })
                            .catch(error => {
                                console.error("Ошибка при получении данных:", error);
                            });
                    }
                });
            }
            listAdd = createButton("Добавить учасников")
            listAdd.position(0, pos + 70)
            listAdd.mousePressed(() => {
                listext()
                overlay.style('background', 'rgba(0, 0, 0, 0.6)');
                overlay.style('z-index', '5');
                load_chats(true)
            });
            listObjs.push(listAdd)
            pretty(listAdd)


        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
        });


}