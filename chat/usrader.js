function addbyid(addid, chatid, target, callback = "no") {
    InProcess++
    fetch("https://sebain.pythonanywhere.com/saveget?filename=" + addid + "_profn")
        .then(response => response.text())
        .then(data => { // вызываем только после получения данных
            InProcess--
            console.log(data);
            if (data == "Файл не найден в save") {
                xAlert("НЕВЕРНЫЙ ID")
            }
            InProcess++
            fetch("https://sebain.pythonanywhere.com/addnewchat?myss=" + ss + "&itpp=" + addid + "&target=" + target + "&chatid=" + chatid)
                .then(response => response.text())
                .then(data => {
                    InProcess--
                    try {
                        callback()
                    } catch {
                        console.log("Не удалось вызвать колбек")
                    }
                })
                .catch(error => {
                    InProcess--
                    xAlert("Произошла ошибка" + error)
                }); // выводим уже присвоенное значение
        })
        .catch(error => {
            InProcess--
            console.error("Ошибка при получении данных:", error);
            xAlert("Не верный ID")
        });

}