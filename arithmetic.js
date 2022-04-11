'use strict'

// Session Timer
let inSession = false;
let sessSecs = 0;
let timerInterval 
document.getElementById("answer").addEventListener("keypress", e => {
    if (inSession===false) {
        inSession = true;
        timerInterval = setInterval(timer, 989)
        document.getElementById("pulse").style.setProperty('display','block')
} } ); 

const timer = () => {
    // console.log(performance.now())
    document.getElementById('time').innerText = `Time: ${++sessSecs}`;
}

function sessReset () {
    clearInterval(timerInterval)
    inSession = false;
    sessSecs = 0;
    sessScore = 0;
    
    document.getElementById("pulse").style.setProperty('display','none')    
    document.getElementById('score').innerText = `Correct: ${sessScore}`;
    document.getElementById('time').innerText = `Time: ${sessSecs}`;
}

// Question Generator
let leftNumber; 
let rightNumber;
let opChosen;

let leftMin = document.querySelector("#sMLtop > input").value;
let leftMax = document.querySelector("#sMLbot > input").value;
let rightMin = document.querySelector("#sMRtop > input").value;
let rightMax = document.querySelector("#sMRbot > input").value;


const qGen = () => {
    //Number generation
    // console.log(leftMin,leftMax)
    leftNumber = parseInt(Math.random()*(1+Math.abs(leftMax-leftMin)) + Number(leftMin));
    rightNumber = parseInt(Math.random()*(1+Math.abs(rightMax-rightMin)) + Number(rightMin));
    document.getElementById('leftNo').innerText = `${leftNumber}`;
    document.getElementById('rightNo').innerText = `${rightNumber}`;
    
    //Operand check
    let opSpec = document.querySelector("#sMMinput > input").value;
    let opArray = ['\\+', '-', '\\*', '/'];
    let opSelected = [];
    
    for(let index = 0; index < opArray.length; index++) {
        if (opSpec.match(RegExp(opArray[index],'g'))){
            opSelected.push(opSpec.match(RegExp(opArray[index],'g'))['0'])
        }
    }
    
    //Operand generation
    opChosen = opSelected[parseInt(Math.random()*opSelected.length)]
    console.log(opChosen,opSelected,opSelected.length)
    opChosen ? document.getElementById('operand').innerText = opChosen : opChosen = '+';

    //Division, Subtraction fix
    if (opChosen === '/') {
        leftNumber =  leftNumber * rightNumber;
        document.getElementById('leftNo').innerText = `${leftNumber}`
    }
    if (opChosen === '-') {
        let temp;
        console.log(rightNumber > leftNumber)
        if (rightNumber > leftNumber) {
                temp = rightNumber;
                rightNumber = leftNumber;
                leftNumber = temp;
                document.getElementById('leftNo').innerText = `${leftNumber}`;
                document.getElementById('rightNo').innerText = `${rightNumber}`;
            }
        }
    }
    
    // Build a decPrecision variable setting!! Done: false;
    // let decPrecision = ElementID.value
    

const qCheck = () => {
    let stringQ = `${leftNumber}` + opChosen + `${rightNumber}`;
    console.log(stringQ)

    if (document.getElementById('answer').value === `${(eval(stringQ)).toFixed(0)}`) {
        document.getElementById('answer').value = ''
        document.getElementById('score').innerText = `Correct: ${++sessScore}`;
        qGen();
    }
}

document.getElementById('answer').addEventListener('keyup', e => {
    qCheck()
})
qGen()

// Session Score
let sessScore = 0


// Settings Button
const sButton = document.getElementById("settingsButton")
const sWrapper = document.getElementById("settingsWrapper")

const sClose = document.getElementById("settingsClose")


sButton.addEventListener("click", e => {
    sWrapper.style.setProperty("display", "initial")
    sWrapper.style.setProperty("z-index", "1000")
    sWrapper.style.setProperty("opacity", "1")

    sessReset();
} );

sClose.addEventListener("click", e => {
    closeNGen()
    sWrapper.style.setProperty("display", "none")
} );
document.addEventListener("keypress", e => {
    if (window.getComputedStyle(sWrapper).display === 'block') {
        if (e.shiftKey && e.code === 'Enter') {
            console.log("that tickles!")
                // closeNGen()
            document.getElementById("settingsClose").focus();
            }
    } } );

function closeNGen() {
    sWrapper.style.setProperty("z-index", "998");
    sWrapper.style.setProperty("opacity", "0");
    qGen();
}


//