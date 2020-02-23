// play page
let cardTestImg = document.querySelectorAll('.test-screen')
let cardTestWord = document.querySelectorAll('.test')
let dataPlayscreen = undefined

let playScreen = function(data) {
    hideAllPages()
    gameScreen.classList.remove('hide')

    let shuffledImg = _.shuffle(data)
    let shuffledLang = _.shuffle(data)

    let child = testScreen.lastElementChild;  
    while (child) { 
        testScreen.removeChild(child); 
        child = testScreen.lastElementChild
    }

    for (let i = 0; i < shuffledImg.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`wordID${ shuffledImg[i].id }`);
        let img = document.createElement('img')
        img.classList.add('img');
        img.src = shuffledImg[i].image_url
        card.appendChild(img)
        testScreen.appendChild(card);

        let emptyCard = document.createElement('div');
        emptyCard.classList.add('box'); 
        card.appendChild(emptyCard)
        testScreen.appendChild(card);
    }

    let childTest = tests.lastElementChild;  
    while (childTest) { 
        tests.removeChild(childTest); 
        childTest = tests.lastElementChild
    }

    for (let i = 0; i < shuffledLang.length; i++) {

        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`wordID${ shuffledLang[i].id }`);
        card.classList.add(`color${ i + 1 }`);   // assigns a class number from 1-7 to be able to assign them a color class after
        let foreignLang = document.createElement('h3')
        foreignLang.classList.add('text');
        foreignLang.textContent = shuffledLang[i].translation
        card.appendChild(foreignLang)

        tests.appendChild(card);
    }

    let childMessage = testIntruct.lastElementChild;  
    while (childMessage) { 
        testIntruct.removeChild(childMessage); 
        childMessage = testIntruct.lastElementChild
    }

    let message = document.createElement('h2');
    message.textContent = 'You have 10 clicks...click on any word & match it with the correct animal on the card...'
    message.classList.add('text');
    testIntruct.append(message);

    dataPlayscreen = data
}

// Events listeners for the test
let wordClicked = false
let wordClass = ""
let imgClass = ""
let wordClassNumber = null
let playCounter = 0

let imgCardClickHandle = function(event){
    if(wordClicked === true) {
        imgClass = event.target.closest('.card').classList[1]  
        wordClicked = false
        playCounter++
        checkCorrect(wordClass, imgClass, dataPlayscreen,)
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

let correctScore = 0
let incorrectScore = 0

function animateImg(imgClicked, animationName, duration){
    imgClicked.classList.add('vivify', animationName, duration)

    function handleAnimationEnd() {
        imgClicked.classList.remove('vivify', animationName, 'duration-900')
        imgClicked.removeEventListener('animationend', handleAnimationEnd)    
    }

    imgClicked.addEventListener('animationend', handleAnimationEnd)  
}

let checkCorrect = function(wordClass, imgClass, dataPlayscreen) {
    console.log(dataPlayscreen)
    let imgClicked = document.querySelector(`.${imgClass}`)
    
    if(wordClass === imgClass) {
        console.log(`correct`)

        animateImg(imgClicked, 'flip', 'duration-900')        

        correctScore++
        console.log(correctScore)
        imgClicked.classList.add(wordClassNumber);
        dataPlayscreen.correctScore = correctScore
        if(correctScore === 7 || playCounter === 10){
            console.log(`showResults`)
            showResults(dataPlayscreen)
        }
    } else {
        console.log(`incorrect`)

        animateImg(imgClicked, 'blink', 'duration-900')
        
        
        incorrectScore++
        console.log(incorrectScore)
        imgClicked.classList.add(0);
        dataPlayscreen.incorrectScore = incorrectScore
        if(correctScore === 7 || playCounter === 10){
            console.log(`showResults`)
            showResults(dataPlayscreen)
        }
    }
}

