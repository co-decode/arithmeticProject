'use strict'

// Session Timer
const startSess = new Date().getTime()
const timer = () => {
    let now = new Date().getTime()
    document.getElementById('time').innerText = `Time: ${parseInt((now - startSess)/1000)}`
}
setInterval(timer, 1000)

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
    leftNumber = parseInt(Math.random()*leftMax + Number(leftMin));
    rightNumber = parseInt(Math.random()*rightMax + Number(rightMin));
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
        else {opSelected.push('+')}
    }

    //Operand generation
    opChosen = opSelected[parseInt(Math.random()*opSelected.length)]
    // console.log(opChosen,opSelected,opSelected.length)
    opChosen ? document.getElementById('operand').innerText = opChosen : document.getElementById('operand').innerText = '+';
    if (opChosen === '/') {
        leftNumber =  leftNumber * rightNumber;
        document.getElementById('leftNo').innerText = `${leftNumber}`
    }
}

// Build a decPrecision variable setting!! Done: false;
// let decPrecision = ElementID.value


const qCheck = () => {
    let stringQ = `${leftNumber}` + opChosen + `${rightNumber}`;

    if (document.getElementById('answer').value === `${(eval(stringQ)).toFixed(0)}`) {
        document.getElementById('answer').value = ''
        document.getElementById('score').innerText = `Correct: ${++scoreSession}`;
        qGen();
    }
}

document.getElementById('answer').addEventListener('keyup', e => {
    qCheck()
})
qGen()

// Session Score
let scoreSession = 0


// Settings Button
const sButton = document.getElementById("settingsButton")
const sWrapper = document.getElementById("settingsWrapper")

const sClose = document.getElementById("settingsClose")


sButton.addEventListener("click", e => {
    sWrapper.style.setProperty("display", "initial")
    sWrapper.style.setProperty("z-index", "1000")
    sWrapper.style.setProperty("opacity", "1")
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