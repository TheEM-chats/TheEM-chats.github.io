// Cookie lib

function getCookie(name, json = false) {
    if (!name) {
        return undefined;
    }
    /*
    Returns cookie with specified name (str) if exists, else - undefined
    if returning value is JSON and json parameter is true, returns json, otherwise str
    */
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    if (matches) {
        var res = decodeURIComponent(matches[1]);
        if (json) {
            try {
                return JSON.parse(res);
            } catch (e) {}
        }
        return res;
    }

    return undefined;
}

function setCookieOLD(name, value, options = { path: '/' }) {
    /*
    Sets a cookie with specified name (str), value (str) & options (dict)

    options keys:
      - path (str) - URL, for which this cookie is available (must be absolute!)
      - domain (str) - domain, for which this cookie is available
      - expires (Date object) - expiration date&time of cookie
      - max-age (int) - cookie lifetime in seconds (alternative for expires option)
      - secure (bool) - if true, cookie will be available only for HTTPS.
                        IT CAN'T BE FALSE
      - samesite (str) - XSRF protection setting.
                         Can be strict or lax
                         Read https://web.dev/samesite-cookies-explained/ for details
      - httpOnly (bool) - if true, cookie won't be available for using in JavaScript
                          IT CAN'T BE FALSE
    */
    if (!name) {
        return;
    }

    options = options || {};

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    if (value instanceof Object) {
        value = JSON.stringify(value);
    }
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (var optionKey in options) {
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function devareCookie(name) {
    /*
    Devares a cookie with specified name.
    Returns true when cookie was successfully devared, otherwise false
    */
    setCookieOLD(name, null, {
        expires: new Date(),
        path: '/'
    })
}
//My libs
var banwords = new Set();

function filterTextWithBanwords(inputText) {
    if (banwords.size === 0) {
        console.warn('Список banwords ещё не загружен');
        return inputText;
    }

    // Разбиваем на слова, пробелы и знаки препинания
    const tokens = inputText.match(/[\wа-яА-ЯёЁ]+|[^\w\s]|[\s]+/g);

    const filtered = tokens.map(token => {
        const normalized = token.toLowerCase().replace(/[^а-яa-z0-9]/gi, '');
        return banwords.has(normalized) ? '(мат)' : token;
    });

    return filtered.join('');
}
// Загружаем banwords.txt при старте
fetch('/banword.txt')
    .then(res => res.text())
    .then(text => {
        text
            .split(/\r?\n/)
            .map(w => w.trim().toLowerCase())
            .forEach(w => {
                if (w.length > 0) banwords.add(w);
            });
        console.log(`Загружено ${banwords.size} запрещённых слов`);
    });
if (getCookie("captcha") == "yes") {
    alert("Пройдите капчу")
    window.location.href = "captcha.html"
}

function Crypt(text) {
    return encodeURIComponent(text);
}

function Decrypt(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        return text;
    }
}

function setCookie2(name, value, options) {
    setCookieOLD(name, value, {
        expires: new Date('2035-12-31T23:59:59Z'),
        path: '/',
        secure: true,
        samesite: 'strict',
        ...options // если есть свои параметры — они переопределят дефолтные
    });
}

function getRandomBrightColor() {
    const brightColors = [
        'FF5733', 'FF8C00', 'FFD700', 'ADFF2F', '00FF7F', '00FFFF', '1E90FF', '4169E1',
        '9932CC', 'FF69B4', 'FF1493', 'FF4500', '32CD32', '00CED1', 'DC143C', '8A2BE2',
        'FF6347', 'FFA07A', 'FF7F50', 'FFB6C1', 'FA8072', 'F08080', 'F0E68C', 'EEE8AA',
        'DAA520', 'B8860B', 'D2691E', 'CD5C5C', '8B0000', 'A52A2A', 'B22222', 'BC8F8F',
        'FF00FF', '8B008B', '9400D3', 'BA55D3', '9370DB', '7B68EE', '6A5ACD', '483D8B',
        '6495ED', '40E0D0', '48D1CC', '00BFFF', '87CEFA', '87CEEB', '4682B4', '5F9EA0',
        '00FA9A', '00FF00', '7FFF00', '7CFC00', '32CD32', '98FB98', '90EE90', '8FBC8F',
        '3CB371', '2E8B57', '228B22', '006400', '66CDAA', '20B2AA', '008B8B', '008080',
        'B0E0E6', 'AFEEEE', 'ADD8E6', 'B0C4DE', '778899', '708090', 'BEBEBE', 'D3D3D3',
        'C0C0C0', 'A9A9A9', '808080', '696969', '2F4F4F', '000000', 'FFFFFF', 'F5F5F5',
        'FFE4B5', 'FFEBCD', 'FFF0F5', 'FFFACD', 'FAFAD2', 'FFEFD5', 'FFDAB9', 'E6E6FA',
        'D8BFD8', 'DDA0DD', 'EE82EE', 'DA70D6', 'FF00FF', 'C71585', 'DB7093', 'FF1493',
        'FF69B4', 'FFC0CB', 'FFA07A', 'FF7F50', 'FF6347', 'FF4500', 'FF8C00', 'FFA500',
        'FFD700', 'FFFF00', 'FFFFE0', 'F0E68C', 'EEDD82', 'DAA520', 'BDB76B', 'B8860B'
    ];
    const randomIndex = Math.floor(Math.random() * brightColors.length);
    return brightColors[randomIndex];
}


function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shortenText(text, count = 50) {
    return text.length <= count ? text : text.slice(0, count) + '..';
}

function alerterr(text) {
    setTimeout(() => {
        alert("Произошла ошибка: " + text);
    }, 1000);
    SoundEffect("err.mp3")
}

function SoundEffect(filename) {
    const audio = new Audio(filename);
    audio.play();
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function hexToRGBValues(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    return `${r},${g},${b}`;
}


//Дизайн либы

function ButtonStyling(btn) {
    btn.style('color', '#ffffff');
    btn.style('background', 'rgba(120, 160, 255, 0.18)'); // мягкий синий
    btn.style('border', '1px solid rgba(255, 255, 255, 0.25)');
    btn.style('border-radius', '999px'); // таблетка!
    btn.style('backdrop-filter', 'blur(6px)');
    btn.style('-webkit-backdrop-filter', 'blur(6px)');
    btn.style('box-shadow', '0 2px 6px rgba(0, 0, 0, 0.15)');
    btn.style('cursor', 'pointer');
    btn.style('transition', 'all 0.2s ease');
    btn.mouseOver(() => {
        btn.style('background', 'rgba(140, 180, 255, 0.25)');
        btn.style('box-shadow', '0 3px 10px rgba(0, 0, 0, 0.25)');
    });

    btn.mouseOut(() => {
        btn.style('background', 'rgba(120, 160, 255, 0.18)');
        btn.style('box-shadow', '0 2px 6px rgba(0, 0, 0, 0.15)');
    });
}

function BackStyling() {
    var lgnstyle = document.createElement('style');
    lgnstyle.innerHTML = `
    input::placeholder {
      color: var(--placeholder-color);
      font-weight: bold;
      opacity: 1; /* делаем его полностью видимым */
    }
  `;
    document.head.appendChild(lgnstyle);

    function setBodyStyles() {
        document.body.style.backgroundImage = "url('back2.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.height = window.innerHeight + 'px';
        document.body.style.margin = "0";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
    }

    window.addEventListener('resize', setBodyStyles);
    window.addEventListener('orientationchange', setBodyStyles);
    setBodyStyles();

    //Анимация загрузки
    let loader = createImg('loading.gif', 'загрузка');
    loader.size(100, 35);
    loader.position(0, 0)
    loader.style('position', 'fixed');
    loader.style('z-index', '9999');
    let loadertext = createButton("")
    loadertext.position(0, 35)
    loadertext.style('position', 'fixed');
    loadertext.style('z-index', '9999');
    ButtonStyling(loadertext)
    loadertext.mouseOver(() => {});
    loadertext.mouseOut(() => {});
    loadertext.style('cursor', 'default')
    loader.hide()
    loadertext.hide()
    setInterval(() => {
        if (InProcess > 0) {
            loader.show()
            loadertext.show()
            loadertext.html(InProcess + " запросов")
        } else {
            loader.hide()
            loadertext.hide()
        }
    }, 500)

}

var InProcess = 0


var xAlert = function(text, callback = "ohno") {
    let btn = createButton("");
    ButtonStyling(btn);
    btn.position((window.innerWidth - 250) / 2, (window.innerHeight - 100) / 2);
    btn.size(250, 100);
    btn.mouseOver(() => {});
    btn.mouseOut(() => {});
    btn.style('cursor', 'default')
    btn.style('border-radius', '8px')
    btn.style('z-index', '1001')
    btn.style('position', 'absolute')
    let btn21 = createButton("Ок");
    ButtonStyling(btn21);
    btn21.position((window.innerWidth + 140) / 2, (window.innerHeight + 60) / 2);
    btn21.size(50, 12);
    btn21.style('border-radius', '8px')
    btn21.style('z-index', '1002')
    btn21.style('position', 'absolute')
    btn21.mousePressed(() => {
        btn.remove()
        btnP.remove()
        btnX.remove()
        btn21.remove()
        try {
            callback()
        } catch {
            console.log("Колбек не передан")
        }
    });
    let btnP = createP(text)
    btnP.position((window.innerWidth - 240) / 2, (window.innerHeight - 110) / 2)
    btnP.size(250, 70)
    btnP.style('z-index', '1003')
    btnP.style('position', 'absolute')
    btnP.style('color', '#ffffff')

    let btnX = createButton("");
    ButtonStyling(btnX);
    btnX.position(0, 0)
    btnX.size(window.innerWidth, window.innerHeight);
    btnX.mouseOver(() => {});
    btnX.mouseOut(() => {});
    btnX.style('cursor', 'default')
    btnX.style('border-radius', '8px')
    btnX.style('z-index', '1000')
    btnX.style('position', 'absolute')
    btnX.style('background', 'rgba(120, 160, 255, 0)')

};

var xPrompt = function(text, callback = "ohno") {
    let btn = createButton("");
    ButtonStyling(btn);
    btn.position((window.innerWidth - 250) / 2, (window.innerHeight - 100) / 2);
    btn.size(250, 100);
    btn.mouseOver(() => {});
    btn.mouseOut(() => {});
    btn.style('cursor', 'default')
    btn.style('border-radius', '8px')
    btn.style('z-index', '1001')
    btn.style('position', 'absolute')
    let btn21 = createButton("Ввод");
    ButtonStyling(btn21);
    btn21.position((window.innerWidth + 140) / 2, (window.innerHeight + 60) / 2);
    btn21.size(50, 12);
    btn21.style('border-radius', '8px')
    btn21.style('z-index', '1002')
    btn21.style('position', 'absolute')
    btn21.mousePressed(() => {
        btn.remove()
        btnP.remove()
        btnX.remove()
        btn21.remove()
        btnInput.remove()
        if (btnInput.value() != "") {
            try {
                callback(btnInput.value())
            } catch {
                console.log("Колбек не передан")
            }
        }

    });
    let btnP = createP(text)
    btnP.position((window.innerWidth - 240) / 2, (window.innerHeight - 110) / 2)
    btnP.size(250, 70)
    btnP.style('z-index', '1003')
    btnP.style('position', 'absolute')
    btnP.style('color', '#ffffff')

    let btnX = createButton("");
    ButtonStyling(btnX);
    btnX.position(0, 0)
    btnX.size(window.innerWidth, window.innerHeight);
    btnX.mouseOver(() => {});
    btnX.mouseOut(() => {});
    btnX.style('cursor', 'default')
    btnX.style('border-radius', '8px')
    btnX.style('z-index', '1000')
    btnX.style('position', 'absolute')
    btnX.style('background', 'rgba(120, 160, 255, 0)')

    btnInput = createInput()
    btnInput.position(0, window.innerHeight / 3 * 2)
    btnInput.size(window.innerWidth - 5, 25)
    btnInput.style('z-index', '1003')
    btnInput.style('position', 'absolute')
    btnInput.attribute('placeholder', 'Ответ:');
    btnInput.elt.style.setProperty('--placeholder-color', '#cccccc')
    ButtonStyling(btnInput)

};