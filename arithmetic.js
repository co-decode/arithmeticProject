'use strict'

// Session Timer
document.getElementById('timeLimit').value ? document.getElementById('time').innerText = `Time: ${document.getElementById('timeLimit').value}` :
document.getElementById('time').innerText = `Time: 0`

let scoreLimitValue = document.getElementById('scoreLimit')
let scoreText = document.getElementById('score')
scoreLimitValue.value ? scoreText.innerText = `Correct: 0 out of ${scoreLimitValue.value}` : scoreText.innerText = `Correct: 0`;

let inSession = 1;
let sessSecs = 0;
let timeLimitSeconds = document.getElementById('timeLimit').value
let timerInterval
let sessStartTime

document.getElementById("answer").addEventListener("keypress", e => {
    if (inSession===1) {
        inSession = 0;
        sessStartTime = performance.now()
        document.getElementById('sessionResultST').innerText = `Score: ${sessScore} Time: 0`
        document.getElementById('sessionResultAv').innerText = `Speed: 0 s/q`
        timerInterval = setInterval(timer, 989)
        wipeMemory();
        document.getElementById("pulse").style.setProperty('display','block')
} } ); 

//Question Time



//Timing Function

const timer = () => {
    // console.log(performance.now())
    if (timeLimitSeconds) {
        if (timeLimitSeconds > 1) {
            document.getElementById('time').innerText = `Time: ${--timeLimitSeconds}`;
            timeResult = ++sessSecs;
            updateSessResult();
        }
        else {
            document.getElementById('time').innerText = `Time: ${--timeLimitSeconds}`;
            clearInterval(timerInterval);
            document.getElementById("pulse").style.setProperty('display','none');
            inSession = -1;
            timeResult = ++sessSecs;
            updateSessResult();
        }
    }
    else {
    document.getElementById('time').innerText = `Time: ${++sessSecs}`; 
        timeResult = sessSecs;
        updateSessResult();
    }
}

//Session Reset

function sessReset () {
    clearInterval(timerInterval)
    inSession = 1;
    sessSecs = 0;
    sessScore = 0;
    timeLimitSeconds = document.getElementById('timeLimit').value;
    // console.log(timeLimitSeconds)
    
    if (timeLimitSeconds) {
        document.getElementById('time').innerText = `Time: ${timeLimitSeconds}`;
    }
    else {
        document.getElementById('time').innerText = `Time: ${sessSecs}`;
    }

    document.getElementById("pulse").style.setProperty('display','none');
    if (scoreLimitValue.value) {
        document.getElementById('score').innerText = `Correct: ${sessScore} out of ${scoreLimitValue.value}`;
    }
    else {
    document.getElementById('score').innerText = `Correct: ${sessScore}`;
    }
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
        if (rightNumber > leftNumber) {
                temp = rightNumber;
                rightNumber = leftNumber;
                leftNumber = temp;
                document.getElementById('leftNo').innerText = `${leftNumber}`;
                document.getElementById('rightNo').innerText = `${rightNumber}`;
        }
    }
    let qEndTime = qBeginTime
    qBeginTime = performance.now()
    if (sessStartTime) {
        qTime=qBeginTime-sessStartTime;
        sessStartTime = false;
    }
    else {
    qTime = qBeginTime-qEndTime 
    }
    console.log(qBeginTime,qEndTime, qTime)
    console.log((qTime/1000).toFixed(1))
}
//      v For Question timing ^
let qBeginTime = 0;
let qTime

    // Build a decPrecision variable setting!! Done: false;
    // let decPrecision = ElementID.value
    

const qCheck = () => {
    let stringQ = `${leftNumber}` + opChosen + `${rightNumber}`;
    // console.log(stringQ)

    if (document.getElementById('answer').value === `${(eval(stringQ)).toFixed(0)}`) {
        document.getElementById('answer').value = ''
        if (inSession === 0) {
            if (scoreLimitValue.value) {
                document.getElementById('score').innerText = `Correct: ${++sessScore} out of ${scoreLimitValue.value}`
                updateSessResult();
                // console.log(inSession, typeof scoreLimitValue.value, typeof sessScore)
                if (Number(scoreLimitValue.value) === sessScore) {
                    clearInterval(timerInterval)
                    inSession = -1;
                    document.getElementById("pulse").style.setProperty('display','none')
                }      
            }
            else {
                document.getElementById('score').innerText = `Correct: ${++sessScore}`;
                updateSessResult()
            }
        }
        let stringQnA = `${leftNumber} ${opChosen} ${rightNumber} = ${(eval(stringQ)).toFixed(0)}`

        qGen();
        depositQ(stringQnA);
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
sWrapper.style.setProperty("display", "none")
const sClose = document.getElementById("settingsClose")


sButton.addEventListener("click", e => {
    sWrapper.style.setProperty("display", "initial")
    sWrapper.style.setProperty("z-index", "1000")
    sWrapper.style.setProperty("opacity", "1")

    untabUnderlay();

    sessReset();
} );

sClose.addEventListener("click", e => {
    closeNGen();
    sessReset();
    retabUnderlay();
    sWrapper.style.setProperty("display", "none")
} );
document.addEventListener("keypress", e => {
    if (window.getComputedStyle(sWrapper).display === 'block') {
        if (e.shiftKey && e.code === 'KeyS') {
            document.getElementById("settingsClose").focus();
            }
    }
    if (window.getComputedStyle(sWrapper).display === 'none') {
        if (e.shiftKey && e.code === 'KeyS') {
            document.getElementById("settingsButton").focus();
            }
    }
} );

function closeNGen() {
    sWrapper.style.setProperty("z-index", "998");
    sWrapper.style.setProperty("opacity", "0");
    qGen();
}


//initialise result elements
let timeResult = 0

let sessionResultST = document.createElement('li')
sessionResultST.setAttribute("id","sessionResultST")
document.getElementById('resultsList').appendChild(sessionResultST)
document.getElementById('sessionResultST').innerText = `Score: ${sessScore} Time: ${timeResult}`

let sessionResultAv = document.createElement('li')
sessionResultAv.setAttribute("id","sessionResultAv")
document.getElementById('resultsList').appendChild(sessionResultAv)
document.getElementById('sessionResultAv').innerText = `Speed: 0 s/q`

function updateSessResult() {
    document.getElementById('sessionResultST').innerText = `Score: ${sessScore} Time: ${timeResult}`;
    if (sessScore > 0) {
    document.getElementById('sessionResultAv').innerText = `Speed: ${(timeResult/sessScore).toFixed(1)} s/q`
    }
}

//Generate memory elements
function depositQ (qNa) {
    if (inSession === 0) {
    document.getElementById('memoryList').appendChild(document.createElement('li'))
    document.getElementById('memoryList').lastChild.innerText = `${qNa}\nTime: ${(qTime/1000).toFixed(1)}\n\n`
    }
}

//Memory Wipe

function wipeMemory() {
    let i = document.querySelectorAll('ol > li').length
    while (i-- > 0) {
        document.querySelector('#memoryList > li').remove()
    }
}

//Pull toggle
const pullableTab = document.getElementById('tab');
let tabPulled = false;
pullableTab.tabIndex = 0;

document.getElementById('tab').addEventListener("click",e=> {
    tabPull();   
})
document.getElementById('tab').addEventListener("keypress",e=> {
    if (e.code === "Enter") {
    tabPull();   
    }
})


function tabPull() {
    if (tabPulled === false) {
        pullableTab.style.setProperty('left','80%')
        pullableTab.style.setProperty('width','20%')
        
        document.getElementById('resultsBar').style.setProperty('opacity','1');
        document.getElementById('resultsBar').style.setProperty('width','calc(100%*19/20)');
        // document.getElementById('resultsBar').style.setProperty('left','88%');
        // document.getElementById('resultsBar').style.setProperty('width','100%');
        
        document.getElementById('container').style.setProperty('position','absolute')
        document.getElementById('container').style.setProperty('transform','translateX(-10%)')
        document.getElementById('settingsWrapper').style.setProperty('position','absolute')
        document.getElementById('settingsWrapper').style.setProperty('transform','translateX(-10%)')
        
        tabPulled = true;
    }
    else if (tabPulled ===  true) {
        
        pullableTab.style.setProperty('left','99%')
        pullableTab.style.setProperty('width','1%')
        document.getElementById('resultsBar').style.setProperty('opacity','0');
        document.getElementById('resultsBar').style.setProperty('width','0');
        document.getElementById('container').style.setProperty('transform','translateX(0)')
        document.getElementById('settingsWrapper').style.setProperty('transform','translateX(0)')
    
        tabPulled = false;
    }
}

// Tab container
function focusFirstElement() {
    document.getElementById('logo').focus();
}

// Session Reset : Shift R within 'answer' -- Explain this in the options menu: false;
document.getElementById('answer').addEventListener("keyup", e=> {
    if (e.shiftKey && e.code === 'KeyR') {
        sessReset();
        document.getElementById('answer').value = '';   
        document.getElementById('answer').focus();   
    }
    if (e.shiftKey && e.code==='KeyM') {
        if (sessScore > 0) {
            tabPull()
            document.getElementById('answer').value = '';   
        }
        else {
            tabPull()
            sessReset();
            document.getElementById('answer').value = '';   
        }
    }
})

// Untabble 'answer' and 'settingButton' when Settings wrapper is open:
function untabUnderlay() {
    document.getElementById('answer').tabIndex = -1;
    document.getElementById('settingsButton').tabIndex = -1;
}
function retabUnderlay() {
    document.getElementById('answer').tabIndex = 0;
    document.getElementById('settingsButton').tabIndex = 0;
}
