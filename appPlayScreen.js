// play page
let playScreen = function(data) {

    memory.classList.add('hide')
    let shuffledImg = _.shuffle(data)
    let shuffledLang = _.shuffle(data)

    for (let i = 0; i < shuffledImg.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img')
        img.classList.add('img');
        img.src = shuffledImg[i].image_url
        card.appendChild(img)

        testScreen.appendChild(card);
    }

    for (let i = 0; i < shuffledLang.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');

        let foreignLang = document.createElement('h2')
        foreignLang.classList.add('text');
        foreignLang.textContent = shuffledLang[i].foreignLang
        card.appendChild(foreignLang)

        tests.appendChild(card);
    }
}