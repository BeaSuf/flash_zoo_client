
const createScreen = () => { 

    // hideAllPages()
    startPage.classList.remove('hide')

    let userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('placeholder', 'Your Name');
    inputBox.appendChild(userInput);
    
    let startButton = document.createElement('button');
    startButton.textContent = 'START'
    startButton.classList.add('start-btn');
    inputBox.append(startButton);

    let welcomeMsg = document.createElement('h2')
    welcomeMsg.classList.add('text');
    welcomeMsg.textContent = 'Welcome to flashzoo'
    welcome.appendChild(welcomeMsg)
}

const handleStart = e => {
    e.preventDefault();

    const handleUserStart = res => {
       
        let userInfo = res.data.user
        console.log(userInfo)

        supportedLanguages(userInfo);
    }

    axios(
        { url: `${domain}/api/user`, 
        method: 'post', 
        data: { email: inputBox[0].value }}
    ).then(handleUserStart);
    
}
inputBox.addEventListener('submit', handleStart);
createScreen();