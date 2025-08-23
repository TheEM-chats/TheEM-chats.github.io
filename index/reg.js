function reg_func(login, pass) {
    let name = login
    let pass1 = pass
    let pass2 = pass
    let mail = "Заглушка!"
    if (name === "" || login === "" || pass1 === "" || mail === "") {
        alert("Не все данные введены");
    } else {
        if (pass1 == pass2) {

            let globalcan = 0
            InProcess = 6
            fetch("https://sebain.pythonanywhere.com/generator")
                .then(response => response.text())
                .then(data => {
                    InProcess--
                    data = JSON.parse(data)
                    let pp = data.pp
                    let ss = data.ss
                    let ps = String(pp) + String(ss)
                    fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_mail&text=" + mail)
                        .then(response => response.text())
                        .then(data => {
                            InProcess--
                            globalres = data; // вызываем только после получения данных
                            console.log(globalres);
                            fetch("https://sebain.pythonanywhere.com/saveset?filename=" + ps + "_profn&text=" + name)
                                .then(response => response.text())
                                .then(data => {
                                    InProcess--
                                    globalres = data; // вызываем только после получения данных
                                    console.log(globalres);
                                    fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_pp&text=" + pp)
                                        .then(response => response.text())
                                        .then(data => {
                                            InProcess--
                                            globalres = data; // вызываем только после получения данных
                                            console.log(globalres);
                                            fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_ss&text=" + ss)
                                                .then(response => response.text())
                                                .then(data => {
                                                    InProcess--
                                                    globalres = data; // вызываем только после получения данных
                                                    console.log(globalres);
                                                    fetch("https://sebain.pythonanywhere.com/set?filename=" + login + pass1 + pass2 + "_reg&text=yes")
                                                        .then(response => response.text())
                                                        .then(data => {
                                                            InProcess--
                                                            globalres = data; // вызываем только после получения данных
                                                            console.log(globalres); // выводим уже присвоенное значение
                                                            setCookie2('pp', pp);
                                                            setCookie2('ss', ss);
                                                            setCookie2('ps', ps);
                                                            setCookie2('IsReg', "1");
                                                            xAlert("Успешно зарегистрировано!", gohome)
                                                            globalcan = 1
                                                        })
                                                        .catch(error => {
                                                            xAlert("Ошибка", rethis)
                                                        });

                                                })
                                                .catch(error => {
                                                    xAlert("Ошибка", rethis)
                                                }); // выводим уже присвоенное значение
                                        })
                                        .catch(error => {
                                            xAlert("Ошибка", rethis)
                                        }); // выводим уже присвоенное значение
                                })
                                .catch(error => {
                                    xAlert("Ошибка", rethis)
                                }); // выводим уже присвоенное значение
                        })
                        .catch(error => {
                            xAlert("Ошибка", rethis)

                        });
                })
                .catch(error => {
                    xAlert("Ошибка", rethis)
                });





        } else {
            alert("Разные пароли")
        }
    }

}