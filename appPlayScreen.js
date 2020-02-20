// play page
let cardTestImg = document.querySelectorAll('.test-screen')
let cardTestWord = document.querySelectorAll('.test')

let playScreen = function(data) {
    memory.classList.add('hide')
    let shuffledImg = _.shuffle(data)
    let shuffledLang = _.shuffle(data)
    // debugger
    for (let i = 0; i < shuffledImg.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`${ shuffledImg[i].foreignLang }`);
        let img = document.createElement('img')
        img.classList.add('img');
        img.src = shuffledImg[i].image_url
        card.appendChild(img)

        testScreen.appendChild(card);
    }

    for (let i = 0; i < shuffledLang.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`${ shuffledLang[i].foreignLang }`);
        card.classList.add(`color${ i + 1 }`);   // assigns a class number from 1-7 to be able to assign them a color class after
        let foreignLang = document.createElement('h2')
        foreignLang.classList.add('text');
        foreignLang.textContent = shuffledLang[i].foreignLang
        card.appendChild(foreignLang)

        tests.appendChild(card);
    }
}

// Events listeners for the test
let wordClicked = false
let wordClass = ""
let imgClass = ""
let wordClassNumber = null

let imgCardClickHandle = function(event){
    if(wordClicked === true) {
        imgClass = event.target.closest('.card').classList[1]    
        wordClicked = false
        checkCorrect(wordClass, imgClass, wordClassNumber)
    } else {
        return
    }
}

cardTestImg.forEach(function(image){
    image.addEventListener('click', imgCardClickHandle);
});

let wordCardClickHandle = function(event){
    wordClass = event.target.closest('.card').classList[1]
    wordClassNumber = event.target.closest('.card').classList[2]
    wordClicked = true  
}

cardTestWord.forEach(function(word){
    word.addEventListener('click', wordCardClickHandle);
});

let checkCorrect = function(wordClass, imgClass) {
    let imgClicked = document.querySelector(`.${imgClass}`)
    if(wordClass === imgClass) {
        console.log(`correct`)
        imgClicked.classList.add(wordClassNumber);

    } else {
        console.log(`incorrect`)
        imgClicked.classList.add(0);
    }
}

