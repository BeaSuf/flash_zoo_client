// pages
const memory = document.querySelector('.memory-screen')
const gameScreen = document.querySelector('.game-screen')
const startPage = document.querySelector('.home')
const languageFlag = document.querySelector('.language')
const userCards = document.querySelector('.userCards')

// divs in all pages
const testScreen = document.querySelector('.test-screen')
const inputBox = document.querySelector('.input-box')
const startClick = document.querySelector('.start-button')
const learnClick = document.querySelector('.learn-button')
const playClick = document.querySelector('.play-button')
const cardScreen = document.querySelector('.card-screen')
const profile = document.querySelector('.profile')
const tests = document.querySelector('.test')
const scoreBoard = document.querySelector('.scoreBoard')

// to hide one page or all pages
const pages = [memory, gameScreen, startPage, languageFlag, userCards]
const hidePage = page => page.classList.add('hide')
const hideAllPages = () => pages.forEach(hidePage)

const domain = location.host === 'localhost' ? 'http://localhost:8080' : 'https://glacial-bayou-21611.herokuapp.com'

const getImage = function(word) {
    let url = `${domain}/api/words`
    console.log(word.id)
    // [
        //     {
        //       id: 287,
        //       english: 'Opossum',
        //       german: null,
        //       french: null,
        //       italian: null,
        //       image_url: 'https://images.unsplash.com/photo-1580533912476-4b3d4c160dff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExNjYyN30'
        //     }
        //   ]

    return axios(
        { url: url, 
            method: 'post', 
            data: { word_id: word.id }}
    ).then( res => {
        console.log('sdfsdfsdf', res.data.results);
        // add results here
        return res.data.results[0].image_url
    });
}

const getTranslation = function(word, userInfo) {
    let url = `${domain}/api/words/translate`
    console.log(word.id)
    console.log(userInfo.language)

    return axios(
        { url: url, 
            method: 'post', 
            data: { word_id: word.id, lang: userInfo.language }}
    ).then( res => res.data.results[0][userInfo.language]);
}

// memory page
const memoryScreen = function(data, userInfo) {

console.table(data)
console.log('length', data.length)

    hideAllPages()
    memory.classList.remove('hide')

    let child = cardScreen.lastElementChild;  
    while (child) { 
        cardScreen.removeChild(child); 
        child = cardScreen.lastElementChild
    }

    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');

        // getImage(data[i])
        getImage(data[i]).then(res => {
            console.log('xxx', res)
            let img = document.createElement('img')
            img.classList.add('imgMemory');
            data[i].image_url = res
            img.src = res
            card.appendChild(img)
        })
       
        getTranslation(data[i], userInfo).then(res => {
            let foreignLang = document.createElement('h2')
            foreignLang.classList.add('text');
            foreignLang.textContent = res
            card.appendChild(foreignLang)
            data[i].translation = res
        })

        let englishWord = document.createElement('h3')
        englishWord.classList.add('text');
        englishWord.textContent = data[i].english
        card.appendChild(englishWord)
        cardScreen.appendChild(card);
    }

    let childBtn = playClick.lastElementChild;  
    while (childBtn) { 
        playClick.removeChild(childBtn); 
        childBtn = playClick.lastElementChild
    }

    let playButton = document.createElement('button');
    playButton.textContent = 'PLAY'
    playButton.classList.add('play-btn');
    playClick.append(playButton);

    playButton.addEventListener('click', function(event){
        event.preventDefault()
        console.log(data)
        playCounter = 0
        correctScore = 0
        incorrectScore = 0
        playScreen(data)
    })
}

// language page
const supportedLanguages = function(userInfo) {

    hideAllPages()
    languageFlag.classList.remove('hide')

    let languages = ['german', 'french', 'italian']
    let flags = ['🇩🇪', '🇫🇷', '🇮🇹']

    if(languageFlag.childElementCount === 0) {
        languages.forEach((language, index) => {
            let chosenLang = document.createElement('div');
            chosenLang.setAttribute('data-lang', `${language}`);
            chosenLang.classList.add('languages');

            let img = document.createElement('h1')
            img.classList.add('flag-language');
            img.textContent = flags[index]
            chosenLang.appendChild(img)
            languageFlag.appendChild(chosenLang)

            img.addEventListener('click', function(event){
                event.preventDefault()
                userInfo[0].language = event.target.parentElement.dataset.lang
                userDataToSend = userInfo[0]

                console.log('english')
                // axios
                // .get(`${domain}/api/words`, userInfo)
                // .then(res => {
                //     memoryScreen(res.data)
                // })
                console.log(userInfo)
                axios.get(
                    `${domain}/api/words`,
                    { params: { userInfo: userDataToSend } }
                )
                .then(res => {
                    memoryScreen(res.data, userDataToSend)
                });
                    
            })
        })
    }
}

// add if statement user is on database to run the function
const showResults = function(data) {

    hideAllPages()
    userCards.classList.remove('hide')

    let child = profile.lastElementChild;  
    while (child) { 
        profile.removeChild(child); 
        child = profile.lastElementChild
    }

    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img')
        img.classList.add('imgMemory');
        img.src = data[i].image_url
        card.appendChild(img)

        let italianLang = document.createElement('h2')
        italianLang.classList.add('text');
        italianLang.textContent = data[i].translation
        card.appendChild(italianLang)

        let englishWord = document.createElement('h3')
        englishWord.classList.add('text');
        englishWord.textContent = data[i].english
        card.appendChild(englishWord)
        profile.appendChild(card);
    }

    let childScore = scoreBoard.lastElementChild;  
    while (childScore) { 
        scoreBoard.removeChild(childScore); 
        childScore = scoreBoard.lastElementChild
    }

    let correctScore = document.createElement('h3')
    correctScore.classList.add('text');
    correctScore.textContent = `correct answer is: ${data.correctScore === undefined ? 0 : data.correctScore}`
    scoreBoard.appendChild(correctScore)

    let incorrectScore = document.createElement('h3')
    incorrectScore.classList.add('text');
    incorrectScore.textContent = `wrong answer is: ${data.incorrectScore === undefined ? 0 : data.incorrectScore}`
    scoreBoard.appendChild(incorrectScore)

    let childBtn = learnClick.lastElementChild;  
    while (childBtn) { 
        learnClick.removeChild(childBtn); 
        childBtn = learnClick.lastElementChild
    }

    let learnButton = document.createElement('button');
    learnButton.textContent = 'LEARN'
    learnButton.classList.add('start-btn');
    learnClick.append(learnButton);

    learnButton.addEventListener('click', function(event){
        event.preventDefault()
    
        supportedLanguages()

    })
}
