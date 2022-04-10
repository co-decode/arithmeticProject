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

const qGen = () => {
    leftNumber = parseInt(Math.random()*100) + 1;
    rightNumber = parseInt(Math.random()*100) + 1;
    document.getElementById('leftNo').innerText = `${leftNumber}`;
    document.getElementById('rightNo').innerText = `${rightNumber}`;
}
const qCheck = () => {
    console.log(document.getElementById('answer').value === `${leftNumber + rightNumber}`)
    console.log(document.getElementById('answer').value)
    console.log(`${leftNumber + rightNumber}`)
    if (document.getElementById('answer').value === `${leftNumber + rightNumber}`) {
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
