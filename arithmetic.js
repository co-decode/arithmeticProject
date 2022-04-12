'use strict'

// Session Timer
document.getElementById('timeLimit').value ? document.getElementById('time').innerText = `Time: ${document.getElementById('timeLimit').value}` :
document.getElementById('time').innerText = `Time: 0`
let inSession = 1;
let sessSecs = 0;
let timeLimitSeconds = document.getElementById('timeLimit').value
let timerInterval

document.getElementById("answer").addEventListener("keypress", e => {
    if (inSession===1) {
        inSession = 0;
        timerInterval = setInterval(timer, 989)
        document.getElementById("pulse").style.setProperty('display','block')
} } ); 

const timer = () => {
    // console.log(performance.now())
        console.log(timeLimitSeconds)
    if (timeLimitSeconds) {
        if (timeLimitSeconds > 1) {
        document.getElementById('time').innerText = `Time: ${--timeLimitSeconds}`;
    }
    else {
            document.getElementById('time').innerText = `Time: ${--timeLimitSeconds}`;
            clearInterval(timerInterval);
            document.getElementById("pulse").style.setProperty('display','none');
            inSession = -1;
        }
    }
    else {
    document.getElementById('time').innerText = `Time: ${++sessSecs}`; 
    }
}

function sessReset () {
    clearInterval(timerInterval)
    inSession = 1;
    sessSecs = 0;
    sessScore = 0;
    timeLimitSeconds = document.getElementById('timeLimit').value;
    console.log(timeLimitSeconds)
    
    if (timeLimitSeconds) {
        document.getElementById('time').innerText = `Time: ${timeLimitSeconds}`;
    }
    else {
        document.getElementById('time').innerText = `Time: ${sessSecs}`;
    }

    document.getElementById("pulse").style.setProperty('display','none')    
    document.getElementById('score').innerText = `Correct: ${sessScore}`;
}

// Question Generator
let leftNumber; 
let rightNumber;
let opChosen;
let sessScore = 0



const qGen = () => {
    //Parameter check
    let leftMin = document.querySelector("#sMLtop > input").value;
    let leftMax = document.querySelector("#sMLbot > input").value;
    let rightMin = document.querySelector("#sMRtop > input").value;
    let rightMax = document.querySelector("#sMRbot > input").value;
    
    //Number generation
    leftNumber = parseInt(Math.random()*(1+Math.abs(leftMax-leftMin)) + Number(leftMin));
    rightNumber = parseInt(Math.random()*(1+Math.abs(rightMax-rightMin)) + Number(rightMin));
    document.getElementById('leftNo').innerText = `${leftNumber}`;
    document.getElementById('rightNo').innerText = `${rightNumber}`;
    // console.log("qGen",leftNumber,document.getElementById('leftNo').innerText,leftMin)
    
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
    // console.log(opChosen,opSelected,opSelected.length)
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
    // console.log(stringQ)

    if (document.getElementById('answer').value === `${(eval(stringQ)).toFixed(0)}`) {
        document.getElementById('answer').value = ''
        if (inSession === 0) {
        document.getElementById('score').innerText = `Correct: ${++sessScore}`;
        }
        qGen();
    }
}

document.getElementById('answer').addEventListener('keyup', e => {
    qCheck()
})
qGen()

// Session Score


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
    sessReset()
    sWrapper.style.setProperty("display", "none")
} );
document.addEventListener("keypress", e => {
    if (window.getComputedStyle(sWrapper).display === 'block') {
        if (e.shiftKey && e.code === 'Enter') {
            // console.log("that tickles!")
                // closeNGen()
            document.getElementById("settingsClose").focus();
            }
    }
    if (window.getComputedStyle(sWrapper).display === 'grid') {
        if (e.shiftKey && e.code === 'Enter') {
            // console.log("that tickles!")
                // closeNGen()
            document.getElementById("settingsButton").focus();
            }
    }
} );

function closeNGen() {
    sWrapper.style.setProperty("z-index", "998");
    sWrapper.style.setProperty("opacity", "0");
    qGen();
}


//