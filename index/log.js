function log_func() {
    let login = prompt("Логин (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");
    let pass = prompt("Пароль (Используйте только буковки, циферки, @ и . )(Другие симолы нельзя)");
    fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_reg")
        .then(response => response.text())
        .then(data => {
            let globalresx = data; // вызываем только после получения данных
            if (globalresx == "yes") {
                fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_pp")
                    .then(response => response.text())
                    .then(data => {
                        globalres2 = data; // вызываем только после получения данных
                        setCookie2("pp", globalres2)
                        fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_ss")
                            .then(response => response.text())
                            .then(data => {
                                globalres3 = data; // вызываем только после получения данных
                                setCookie2("ss", globalres3)
                                let ps = String(getCookie("pp")) + String(getCookie("ss"))
                                setCookie2("ps", ps)
                                setCookie2("IsReg", "1")
                                alert("Вход успешен")
                                window.location.href = "index.html";
                            })
                            .catch(error => {
                                alert("Ошибка3")
                                window.location.href = "index.html";

                            });
                    })
                    .catch(error => {

                        alert("Ошибка2")
                        window.location.href = "index.html";
                    });


            } else {
                alert("Ошибка1")
                window.location.href = "index.html";
            }
        })
        .catch(error => {
            alert("Ошибка")
            alert(error)
            window.location.href = "index.html";
        });
}