function reg_func() {
    let name = prompt("Как тебя зовут? (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");
    let login = prompt("Придумай логин, например:" + name + getRandomFromRange(1111, 9999) + " (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");
    let pass1 = prompt("Придумай и запомни пароль (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");
    let pass2 = prompt("Повтори пароль (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)")
    let mail = "Ох великий суп наварили!"
    if (name === "" || login === "" || pass1 === "" || mail === "") {
        alert("Не все данные введены");
    } else {
        if (pass1 == pass2) {
            let pp = String(getRandomFromRange(11111, 99999))
            let ss = String(getRandomFromRange(11111, 99999))
            let ps = String(pp) + String(ss)
            let globalcan = 0
            fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_mail&text=" + mail)
                .then(response => response.text())
                .then(data => {
                    globalres = data; // вызываем только после получения данных
                    console.log(globalres);
                    fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_profn&text=" + name)
                        .then(response => response.text())
                        .then(data => {
                            globalres = data; // вызываем только после получения данных
                            console.log(globalres);
                            fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_pp&text=" + pp)
                                .then(response => response.text())
                                .then(data => {
                                    globalres = data; // вызываем только после получения данных
                                    console.log(globalres);
                                    fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_ss&text=" + ss)
                                        .then(response => response.text())
                                        .then(data => {
                                            globalres = data; // вызываем только после получения данных
                                            console.log(globalres);
                                            fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_reg&text=yes")
                                                .then(response => response.text())
                                                .then(data => {
                                                    globalres = data; // вызываем только после получения данных
                                                    console.log(globalres); // выводим уже присвоенное значение
                                                    setCookie2('pp', pp);
                                                    setCookie2('ss', ss);
                                                    setCookie2('ps', ps);
                                                    setCookie2('IsReg', "1");
                                                    alert("Успешно зарегестрировано")
                                                    window.location.href = "index.html"; // выводим уже присвоенное значение
                                                    globalcan = 1
                                                })
                                                .catch(error => {
                                                    alert("Ошибка")
                                                    window.location.href = "index.html";
                                                });

                                        })
                                        .catch(error => {
                                            alert("Ошибка")
                                            window.location.href = "index.html";
                                        }); // выводим уже присвоенное значение
                                })
                                .catch(error => {
                                    alert("Ошибка")
                                    window.location.href = "index.html";
                                }); // выводим уже присвоенное значение
                        })
                        .catch(error => {
                            alert("Ошибка")
                            window.location.href = "index.html";
                        }); // выводим уже присвоенное значение
                })
                .catch(error => {
                    alert("Ошибка")
                    window.location.href = "index.html";

                });




        } else {
            alert("Разные пароли")
        }
    }

}