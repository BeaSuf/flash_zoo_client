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

// to hide one page or all pages
const pages = [memory, gameScreen, startPage, languageFlag, userCards]
const hidePage = page => page.classList.add('hide')
const hideAllPages = () => pages.forEach(hidePage)

const domain = 'http://localhost:8080'

//  Dummy Data Solution
let data = [
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        foreignLang: 'nick',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
        foreignLang: 'batia',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        foreignLang: 'pouyan',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        foreignLang: 'philip',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        foreignLang: 'foreign',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1495594059084-33752639b9c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80',
        foreignLang: 'foreign',
        english: 'eng'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        foreignLang: 'foreign',
        english: 'eng'
    }
]

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
    ).then( res => res.data.results[0].image_url);
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

console.log(data)

    hideAllPages()
    memory.classList.remove('hide')

    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');

        // getImage(data[i])
        getImage(data[i]).then(res => {
            let img = document.createElement('img')
            img.classList.add('img');
            
            img.src = res
            card.appendChild(img)
        })
       
        getTranslation(data[i], userInfo).then(res => {
            let foreignLang = document.createElement('h2')
            foreignLang.classList.add('text');
            foreignLang.textContent = res
            card.appendChild(foreignLang)
        })

        let englishWord = document.createElement('h3')
        englishWord.classList.add('text');
        englishWord.textContent = data[i].english
        card.appendChild(englishWord)
        cardScreen.appendChild(card);
    }

    let playButton = document.createElement('button');
    playButton.textContent = 'PLAY'
    playButton.classList.add('play-btn');
    playClick.append(playButton);

    playButton.addEventListener('click', function(event){
        event.preventDefault()
        playScreen(data)
    })
}


// language page
const supportedLanguages = function(userInfo) {

    hideAllPages()
    languageFlag.classList.remove('hide')

    let languages = ['german', 'french', 'italian']
    let flags = ['🇩🇪', '🇫🇷', '🇮🇹']

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

//  Dummy Data Solution
let userLang = [
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        english: 'en',
        german: 'ger',
        french: 'fre',
        italian: 'ita'

    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        english: 'en',
        french: 'fre',
        italian: 'ita'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        english: 'en',
        italian: 'ita'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1495594059084-33752639b9c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80',
        english: 'en',
        german: 'ger',
    },
    {
        image_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
        english: 'en',
        french: 'fre',
        italian: 'ita'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        english: 'en',
        german: 'ger',
        french: 'fre',
    }
]

// add if statement user is on database to run the function
const makeProfile = function(data) {

    hideAllPages()
    userCards.classList.remove('hide')

    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img')
        img.classList.add('img');
        img.src = data[i].image_url
        card.appendChild(img)

        let germanLang = document.createElement('h2')
        germanLang.classList.add('text');
        germanLang.textContent = data[i].german
        card.appendChild(germanLang)

        let frenchLang = document.createElement('h2')
        frenchLang.classList.add('text');
        frenchLang.textContent = data[i].french
        card.appendChild(frenchLang)

        let italianLang = document.createElement('h2')
        italianLang.classList.add('text');
        italianLang.textContent = data[i].italian
        card.appendChild(italianLang)

        let englishWord = document.createElement('h2')
        englishWord.classList.add('text');
        englishWord.textContent = data[i].english
        card.appendChild(englishWord)
        profile.appendChild(card);

    }

    let learnButton = document.createElement('button');
    learnButton.textContent = 'LEARN'
    learnButton.classList.add('start-btn');
    learnClick.append(learnButton);

    learnButton.addEventListener('click', function(event){
        event.preventDefault()
    
        // axios
        // .get('')
        // .then(res => {
        //     chooseLanguage(res.data)
        // })
    })
}

makeProfile(userLang)

