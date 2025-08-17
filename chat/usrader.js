function addbyid(addid, chatid, target, callback = "no") {
    if (true) {
        fetch("https://sebain.pythonanywhere.com/saveget?filename=" + addid + "_profn")
            .then(response => response.text())
            .then(data => { // вызываем только после получения данных

                console.log(data);
                if (data == "Файл не найден в save") {
                    alert("НЕВЕРНЫЙ ID")
                    window.href.location = "homepage.html"
                }

                function sent(chats, addid, chatid) {
                    chats.push({
                        target: target,
                        chatid: chatid
                    });

                    let targetJSON = JSON.stringify(chats)
                    fetch("https://sebain.pythonanywhere.com/set?filename=newchats_" + addid + "&text=" + targetJSON)
                        .then(response => response.text())
                        .then(data => {
                            console.log("Пытаемя вызвать колбек")
                            try {
                                callback()
                            } catch {
                                console.log("Не удалось вызвать колбек!")
                            }
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
                            sent(chats, addid, chatid)
                        } catch {
                            console.log(error);
                            let chats = []
                            sent(chats, addid, chatid)

                        } // выводим уже присвоенное значение
                    })
                    .catch(error => {
                        console.log(error)
                        let chats = []
                        sent(chats, addid, chatid)
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