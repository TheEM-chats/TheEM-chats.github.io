function gohome() {
    window.location.href = "index.html"
}

function rethis() {
    location.reload()
}

function log_func(login, pass) {
    InProcess = 3
    fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_reg")
        .then(response => response.text())
        .then(data => {
            InProcess--
            let globalresx = data; // вызываем только после получения данных
            if (globalresx == "yes") {
                fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_pp")
                    .then(response => response.text())
                    .then(data => {
                        InProcess--
                        globalres2 = data; // вызываем только после получения данных
                        setCookie2("pp", globalres2)
                        fetch("https://sebain.pythonanywhere.com/get?filename=" + login + pass + pass + "_ss")
                            .then(response => response.text())
                            .then(data => {
                                InProcess--
                                globalres3 = data; // вызываем только после получения данных
                                setCookie2("ss", globalres3)
                                let ps = String(getCookie("pp")) + String(getCookie("ss"))
                                setCookie2("ps", ps)
                                setCookie2("IsReg", "1")
                                xAlert("Вход успешен", gohome)

                            })
                            .catch(error => {
                                xAlert("Ошибка", rethis)

                            });
                    })
                    .catch(error => {
                        xAlert("Ошибка", rethis)
                    });


            } else {
                xAlert("Ошибка", rethis)
            }
        })
        .catch(error => {
            xAlert("Ошибка", rethis)
        });
}