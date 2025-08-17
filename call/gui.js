//(window.innerWidth   x   , window.innerHeight   y   )
let xh = 72

function crtgui() {
    let theem = createButton("theem - звонок")
    theem.style('background-color', '#000');
    theem.style('color', '#fff');
    theem.style("border-width", "0px");
    theem.style('font-size', "35" + 'px');

    plsenmic = createButton("Включи микро")
    plsenmic.style('background-color', '#000');
    plsenmic.style('color', '#f00');
    plsenmic.style("border-width", "0px");
    plsenmic.style('font-size', "27" + 'px');
    plsenmic.position(window.innerWidth / 2 - 100, window.innerHeight - xh - xh)

    select('body').style('background-color', '#000')
    b_mic.style('background-image', 'url("/call/mic_di.png")')
    b_mic.style('background-size', 'cover'); // масштабирует на всю кнопку
    b_mic.style('background-repeat', 'no-repeat'); // не повторяет
    b_mic.style('background-position', 'center'); // центрирует изображение
    b_mic.mousePressed(() => {
        mic = !mic
    });
    b_spk.style('background-image', 'url("/call/sound_en.png")')
    b_spk.style('background-size', 'cover'); // масштабирует на всю кнопку
    b_spk.style('background-repeat', 'no-repeat'); // не повторяет
    b_spk.style('background-position', 'center'); // центрирует изображение
    b_spk.mousePressed(() => {
        spk = !spk
    });
    b_end.style('background-image', 'url("/call/end_call.png")')
    b_end.style('background-size', 'cover'); // масштабирует на всю кнопку
    b_end.style('background-repeat', 'no-repeat'); // не повторяет
    b_end.style('background-position', 'center'); // центрирует изображение
    b_mic.size(xh, xh)
    b_spk.size(xh, xh)
    b_end.size(xh, xh)
        //tips

    b_mic_tips.size(xh, 20)
    b_mic_tips.style('font-size', "9" + 'px');
    b_spk_tips.size(xh, 20)
    b_spk_tips.style('font-size', "9" + 'px');
    b_end_tips.size(xh, 20)
    b_end_tips.style('font-size', "9" + 'px');
    b_mic_tips.style('pointer-events', 'none');
    b_spk_tips.style('pointer-events', 'none');
    b_end_tips.style('pointer-events', 'none');

}

function updategui() {
    b_mic.position(72, window.innerHeight - xh)
    b_spk.position(window.innerWidth / 2 - xh / 2, window.innerHeight - xh)
    b_end.position(window.innerWidth - 72 - xh, window.innerHeight - xh)
    b_mic_tips.position(72, window.innerHeight - xh - 18)
    b_spk_tips.position(window.innerWidth / 2 - xh / 2, window.innerHeight - xh - 18)
    b_end_tips.position(window.innerWidth - 72 - xh, window.innerHeight - xh - 18)
}