function addbyid() {
    canreload = false
    let globalres = ""
    let addid = prompt("Введите id вашего собеседника")
    if (addid != pp || addid != "" || addid != "1") {
        fetch("https://sebain.pythonanywhere.com/saveget?filename=" + addid + "_profn")
            .then(response => response.text())
            .then(data => { // вызываем только после получения данных

                console.log(data);
                if (data == "Файл не найден в save") {
                    alert("НЕВЕРНЫЙ ID")
                    window.href.location = "homepage.html"
                }
                let chatid = String(getRandomFromRange(11111, 99999))

                function sent(chats, addid, chatid, pp) {
                    chats.push({
                        target: pp,
                        chatid: chatid
                    });

                    let targetJSON = JSON.stringify(chats)
                    let our = [{
                        target: addid,
                        chatid: chatid
                    }];
                    let ourJSON = JSON.stringify(our)
                    let placeholder = [{
                        type: 'text',
                        value: "А вы знали что?: если нажать в списке чатов на колокол , затем нажать разрешить и ещё раз разрешить то вы будете получать уведомления в ваших чатах!",
                        sender: "system",
                        time: Math.floor(Date.now() / 1000)
                    }];
                    let placeholderJSON = JSON.stringify(placeholder)
                    fetch("https://sebain.pythonanywhere.com/set?filename=chat_" + chatid + "&text=" + placeholderJSON)
                        .then(response => response.text())
                        .then(data => {
                            data = data
                            fetch("https://sebain.pythonanywhere.com/set?filename=newchats_" + addid + "&text=" + targetJSON)
                                .then(response => response.text())
                                .then(data => {
                                    globalres = data;
                                    fetch("https://sebain.pythonanywhere.com/set?filename=newchats_" + pp + "&text=" + ourJSON)
                                        .then(response => response.text())
                                        .then(data => {
                                            globalres = data; // выводим уже присвоенное значение
                                            alert("Чат добавлен, успех!")
                                            window.location.href = "homepage.html"
                                        })
                                        .catch(error => {
                                            alert("АЛЁЁЁЁ, ВСЁ СЛАМАЛАСЯ")
                                        }); // выводим уже присвоенное значение
                                })
                                .catch(error => {
                                    alert("АЛЁЁЁЁ, ВСЁ СЛАМАЛАСЯ")
                                });
                        })
                        .catch(error => {
                            alert("АЛЁЁЁЁ, ВСЁ СЛАМАЛАСЯ")
                        });
                }
                fetch("https://sebain.pythonanywhere.com/get?filename=newchats_" + addid)
                    .then(response => response.text())
                    .then(data => {
                        globalres = data;
                        try {
                            let chats = JSON.parse(globalres)
                            sent(chats, addid, chatid, pp)
                        } catch {
                            console.log(error);
                            let chats = []
                            sent(chats, addid, chatid, pp)

                        } // выводим уже присвоенное значение
                    })
                    .catch(error => {
                        console.log(error)
                        let chats = []
                        sent(chats, addid, chatid, pp)
                    }); // выводим уже присвоенное значение
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
                alert("Не верный ID")
                window.location.href = "homepage.html";
            });
    } else {
        alert("Не верный Id")
    }
}