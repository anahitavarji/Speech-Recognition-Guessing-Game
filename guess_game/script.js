//Access the DOM element 'msg' 
const msgEl = document.getElementById('msg');

//Create a Random Number
const randomNum = getRandomNumber();

//Function getRandom Number
function getRandomNumber(){
 return Math.floor(Math.random()*100) + 1;   
}

console.log('Number: ' + randomNum);

//Lines 15 - 23 are utilizing the code from the API
//Initialize the Speech Recognition Object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


//Create a new instance called recognition 
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

//Capture the input form the user's speech
function onSpeak(e){
    // console.log(e)
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg);

}

//Display user's input into the UI/ write what the user speaks
function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You said: </div>
    <span class="box">${msg}</span>
    `;
}

//Check the user's guess against the number
function  checkNumber(msg){
    const num = +msg;
//adding a plus sign in the front turns that string into a number

//Check number to see if it's valid

if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
}

//Check if the number is range 
//So the number needs to be between 1 and 100

if (num > 100 | num < 1){
    msgEl.innerHTML += `<div>Number must be between 1 and 100<div>`;
    return;
}

//Check the number
if(num === randomNum){
    //Let the user they have won
    document.body.innerHTML = `
    <h2> Congrats! You have guessed the number!<br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again"> Play Again  
    </button>
    `;
} else if (num > randomNum){
    msgEl.innerHTML += `<div> GO LOWER </div>`;

} else{
    msgEl.innerHTML += `<div> GO HIGHER </div>`;

}
}


//End Speech Recognition Service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again')
    window.location.reload();
})
