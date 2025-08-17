function addfromserver() {
    function addchat(newchats) {
        fetch("https://sebain.pythonanywhere.com/saveget?filename=" + pp + "_chats")
            .then(response => response.text())
            .then(data => {
                globalres = data
                console.log(globalres)
                let chats = JSON.parse(globalres)
                let num = newchats.length - 1
                while (num > -1) {
                    chats.push({
                        target: newchats[num].target,
                        chatid: newchats[num].chatid
                    });
                    num--
                }
                let exportJson = JSON.stringify(chats)
                console.log(exportJson)
                fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_chats" + "&text=" + exportJson)
                    .then(response => response.text())
                    .then(data => {
                        globalres = data; // вызываем только после получения данных
                        console.log(globalres); // выводим уже присвоенное значение
                        window.location.href = "homepage.html";
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
                let chats = []
                let num = newchats.length - 1
                while (num > -1) {
                    chats.push({
                        target: newchats[num].target,
                        chatid: newchats[num].chatid
                    });
                    num--
                }
                let exportJson = JSON.stringify(chats)
                fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_chats" + "&text=" + exportJson)
                    .then(response => response.text())
                    .then(data => {
                        globalres = data; // вызываем только после получения данных
                        console.log(globalres); // выводим уже присвоенное значение
                        window.location.href = "homepage.html";
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
            });
    }
    // Загружаем новые чаты
    fetch("https://sebain.pythonanywhere.com/get?filename=newchats_" + pp)
        .then(response => response.text())
        .then(data => {
            globalres = data; // вызываем только после получения данных
            console.log(globalres); // выводим уже присвоенное значение
            try {
                let newchats = JSON.parse(globalres)
                addchat(newchats)
                fetch("https://sebain.pythonanywhere.com/set?filename=newchats_" + pp + "&text=voidblank1")
                    .then(response => response.text())
                    .then(data => {
                        globalres = data; // вызываем только после получения данных
                        console.log(globalres); // выводим уже присвоенное значение
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                    });
            } catch {
                console.log("Если это не джсон то там ничё нет")
            }
        })
        .catch(error => {
            console.error("Собственно если файла с чатами нет то зачем нам чтото делать ", error);
        });
}