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

function shortenText(text) {
    return text.length <= 50 ? text : text.slice(0, 50) + '..';
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