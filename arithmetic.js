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
let elapsed

document.getElementById("answer").addEventListener("keypress", e => {
    if (inSession===1) {
        inSession = 0;
        document.getElementById('sessionResultST').innerText = `Score: ${sessScore} Time: 0`
        document.getElementById('sessionResultAv').innerText = `Speed: 0 s/q`
        window.requestAnimationFrame(function timerInterval(timestamp) { 
            if (inSession !== 0) return
            if (!sessStartTime) sessStartTime = timestamp
            elapsed = timestamp - sessStartTime
            if (timeLimitSeconds) {
                if (timeLimitSeconds > elapsed/1000) {
                    document.getElementById('time').innerText = `Time: ${Math.ceil(timeLimitSeconds - elapsed/1000)}`;
                    updateSessResult();
                    window.requestAnimationFrame(timerInterval)
                }
                else {
                    document.getElementById('time').innerText = `Time: ${Math.ceil(timeLimitSeconds - elapsed/1000)}`;
                    document.getElementById("pulse").style.setProperty('display','none');
                    sessStartTime = 0
                    inSession = -1;
                    updateSessResult();
                    return;
                }
            }
            else {
                document.getElementById('time').innerText = `Time: ${Math.floor(elapsed/1000)}`; 
                updateSessResult();
                window.requestAnimationFrame(timerInterval)
            }
            


        })
        wipeMemory();
        document.getElementById("pulse").style.setProperty('display','block')
} } ); 

//Session Reset

function sessReset () {
    // clearInterval(timerInterval)
    inSession = 1;
    sessStartTime = 0;
    sessScore = 0;
    qBeginTime = 0
    timeLimitSeconds = document.getElementById('timeLimit').value;
    // console.log(timeLimitSeconds)
    // qGen()
    
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
    opChosen ? document.getElementById('operand').innerText = opChosen : opChosen = '+';

    //Division, Subtraction fix
    if (opChosen === '/' && decPrecision === 0) {
        leftNumber =  leftNumber * rightNumber;
        document.getElementById('leftNo').innerText = `${leftNumber}`
    }
    if (opChosen === '-' && subNegatives === 0) {
        let temp;
        if (rightNumber > leftNumber) {
                temp = rightNumber;
                rightNumber = leftNumber;
                leftNumber = temp;
                document.getElementById('leftNo').innerText = `${leftNumber}`;
                document.getElementById('rightNo').innerText = `${rightNumber}`;
        }
    }
    if (sessStartTime) {
        qTime=elapsed-qBeginTime;
        qBeginTime = elapsed
    }
}
//      v For Question timing ^
let qBeginTime = 0;
let qTime

    // For decPrecision;
let decPrecision = 0;
let subNegatives = 0    

const qCheck = () => {
    let stringQ = `${leftNumber}` + opChosen + `${rightNumber}`;

    if (document.getElementById('answer').value === `${(eval(stringQ)).toFixed(decPrecision)}`) {
        document.getElementById('answer').value = ''
        if (inSession === 0) {
            if (scoreLimitValue.value) {
                document.getElementById('score').innerText = `Correct: ${++sessScore} out of ${scoreLimitValue.value}`
                updateSessResult();
                // console.log(inSession, typeof scoreLimitValue.value, typeof sessScore)
                if (Number(scoreLimitValue.value) === sessScore) {
                    setTimeout(()=> inSession = -1,0);
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
            e.preventDefault();
            document.getElementById("settingsClose").focus();
            }
    }
    if (window.getComputedStyle(sWrapper).display === 'none' && 
        document.getElementById('optionsWrapper').style.getPropertyValue('display') === 'none') {
        if (e.shiftKey && e.code === 'KeyS') {
            e.preventDefault()
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
    document.getElementById('sessionResultST').innerText = `Score: ${sessScore} Time: ${(Math.floor(elapsed/100)/10).toFixed(1)} s`;
    if (sessScore > 0) {
        document.getElementById('sessionResultAv').innerText = `Speed: ${(Math.floor(elapsed/1000)/sessScore).toFixed(1)} s/q`
    }
}

//Generate memory elements
function depositQ (qNa) {
    console.log('hit', inSession)
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
// document.getElementById('answer').addEventListener("keyup", e=> {
document.addEventListener("keydown", e=> {
    if (e.shiftKey && e.code === 'KeyR') {
        if (document.getElementById('settingsWrapper').style.getPropertyValue('display') === 'none') {
            e.preventDefault();
            sessReset();
            document.getElementById('answer').value = '';   
            document.getElementById('answer').focus();   
        }
    }
    if (e.shiftKey && e.code==='KeyM') {
        e.preventDefault()
        if (sessScore > 0) {
            tabPull()
            document.getElementById('answer').value = '';   
        }
        else {
            tabPull()
            // sessReset();
            document.getElementById('answer').value = '';   
        }
    }
    if (e.shiftKey && e.code==='KeyO'){
        e.preventDefault();
        menuToggle();
        sessReset();
    }
})

// Untabable 'answer' and 'settingButton' when Settings wrapper is open:
function untabUnderlay() {
    document.getElementById('answer').tabIndex = -1;
    document.getElementById('settingsButton').tabIndex = -1;
}
function retabUnderlay() {
    document.getElementById('answer').tabIndex = 0;
    document.getElementById('settingsButton').tabIndex = 0;
}

// Setting up Options menu toggle
document.getElementById('optionsWrapper').style.setProperty('display','none')

document.getElementById('logo').addEventListener("click", e=>{  
    // console.log(document.getElementById('optionsWrapper').style.getPropertyValue("display"))
    document.getElementById('optionsWrapper').style.setProperty('display','grid')
    }
)
document.getElementById('logo').addEventListener("keypress", e=>{
    if (e.code === "Enter") {
        menuToggle()
    }
})
function menuToggle() {
    if (document.getElementById('optionsWrapper').style.getPropertyValue('display') === 'none') {
        document.getElementById('optionsWrapper').style.setProperty('display','grid')
        document.getElementById('settingsWrapper').style.setProperty('display','none')
        document.getElementById('answer').tabIndex = -1;
        document.getElementById('settingsButton').tabIndex = -1;
    }
    else if (document.getElementById('optionsWrapper').style.getPropertyValue('display') === 'grid') {
        document.getElementById('optionsWrapper').style.setProperty('display','none')
        document.getElementById('answer').tabIndex = 0;
        document.getElementById('settingsButton').tabIndex = 0;
    }
}

// Decorations Toggle
function toggleDecorations() {
    const decorations = document.getElementById('decorations')
    if (decorations.innerText === 'off') {
        decorations.innerText = 'subtle';
        document.getElementById('decBack').style.setProperty('opacity','4%')
        document.getElementById('decBack').style.setProperty('display','block')
    }
    else if (decorations.innerText === 'subtle') {
        decorations.innerText = 'on';
        document.getElementById('decBack').style.setProperty('opacity','8%')
        document.getElementById('decBack').style.setProperty('display','block')
    }
    else if (decorations.innerText === 'on') {
        decorations.innerText = 'off';
        document.getElementById('decBack').style.setProperty('opacity','0')
        setTimeout(x=>document.getElementById('decBack').style.setProperty('display','none'),1000);
    }
}

// Themes, variable changer;
function initTheme() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg",localStorage.getItem("--bg"));
    htmlEl.style.setProperty("--sub",localStorage.getItem("--sub"));
    htmlEl.style.setProperty("--text",localStorage.getItem("--text")); 
}
initTheme();


function changeThemeDefault() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","rgb(32,34,37)");
    htmlEl.style.setProperty("--sub","#646669");
    htmlEl.style.setProperty("--text","#e2b714");
    localStorage.setItem("--bg","rgb(32,34,37)");
    localStorage.setItem("--sub","#646669");
    localStorage.setItem("--text","#e2b714");
}
function changeThemeDark() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","black");
    htmlEl.style.setProperty("--sub","#444");
    htmlEl.style.setProperty("--text","grey");
    localStorage.setItem("--bg","black");
    localStorage.setItem("--sub","#444");
    localStorage.setItem("--text","grey");
}
function changeThemeLight() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","white");
    htmlEl.style.setProperty("--sub","slategray");
    htmlEl.style.setProperty("--text","black");
    localStorage.setItem("--bg","white");
    localStorage.setItem("--sub","slategray");
    localStorage.setItem("--text","black");
}
function changeTheme8008() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#333a45");
    htmlEl.style.setProperty("--sub","#939eae");
    htmlEl.style.setProperty("--text","#f44c7f");
    localStorage.setItem("--bg","#333a45");
    localStorage.setItem("--sub","#939eae");
    localStorage.setItem("--text","#f44c7f");
}
function changeThemeBotanical() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#7b9c98");
    htmlEl.style.setProperty("--sub","#495755");
    htmlEl.style.setProperty("--text","#eaf1f3");
    localStorage.setItem("--bg","#7b9c98");
    localStorage.setItem("--sub","#495755");
    localStorage.setItem("--text","#eaf1f3");
}
function changeThemeFrooChew() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#d6d3d6");
    htmlEl.style.setProperty("--sub","#b49cb5");
    htmlEl.style.setProperty("--text","#5c1e5f");
    localStorage.setItem("--bg","#d6d3d6");
    localStorage.setItem("--sub","#b49cb5");
    localStorage.setItem("--text","#5c1e5f");
}
function changeThemeMatrix() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#000");
    htmlEl.style.setProperty("--sub","#003b00");
    htmlEl.style.setProperty("--text","#15ff00");
    localStorage.setItem("--bg","#000");
    localStorage.setItem("--sub","#003b00");
    localStorage.setItem("--text","#15ff00");
}
function changeThemePaper() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#eee");
    htmlEl.style.setProperty("--sub","#b2b2b2");
    htmlEl.style.setProperty("--text","#444");
    localStorage.setItem("--bg","#eee");
    localStorage.setItem("--sub","#b2b2b2");
    localStorage.setItem("--text","#444");
}
function changeThemeMiami() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#18181a");
    htmlEl.style.setProperty("--sub","#47bac0");
    htmlEl.style.setProperty("--text","#e4609b");
    localStorage.setItem("--bg","#18181a");
    localStorage.setItem("--sub","#47bac0");
    localStorage.setItem("--text","#e4609b");
}
function changeThemeDragon() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#1a0b0c");
    htmlEl.style.setProperty("--sub","#e2a528");
    htmlEl.style.setProperty("--text","#ff3a32");
    localStorage.setItem("--bg","#1a0b0c");
    localStorage.setItem("--sub","#e2a528");
    localStorage.setItem("--text","#ff3a32");
}
function changeThemeRyujin() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#081426");
    htmlEl.style.setProperty("--sub","#ffbc90");
    htmlEl.style.setProperty("--text","#f17754");
    localStorage.setItem("--bg","#081426");
    localStorage.setItem("--sub","#ffbc90");
    localStorage.setItem("--text","#f17754");
}
function changeThemeSewing() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#241963");
    htmlEl.style.setProperty("--sub","#446ad5");
    htmlEl.style.setProperty("--text","#f2ce83");
    localStorage.setItem("--bg","#241963");
    localStorage.setItem("--sub","#446ad5");
    localStorage.setItem("--text","#f2ce83");
}
function changeThemeStrawberry() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#f37f83");
    htmlEl.style.setProperty("--sub","#e53c58");
    htmlEl.style.setProperty("--text","#fcfcf8");
    localStorage.setItem("--bg","#f37f83");
    localStorage.setItem("--sub","#e53c58");
    localStorage.setItem("--text","#fcfcf8");
}
function changeThemeAlpine() {
    const htmlEl = document.getElementById('html');
    htmlEl.style.setProperty("--bg","#6c687f");
    htmlEl.style.setProperty("--sub","#9994b8");
    htmlEl.style.setProperty("--text","#fff");
    localStorage.setItem("--bg","#6c687f");
    localStorage.setItem("--sub","#9994b8");
    localStorage.setItem("--text","#fff");
}

// Operation Options

function permitDecPrecision() {
    const decPrecisionEl = document.getElementById('decPrecision')
    if (decPrecision === 0) {
        decPrecision = 1;
        decPrecisionEl.innerHTML = 'Division<br><br><span>Decimal Precision:</span><br>range inputs are numerator and denominator';
    }
    else if (decPrecision === 1) {
        decPrecision = 2;
        decPrecisionEl.innerHTML = 'Division<br><br><span>2 Decimal Precision:</span><br>Are you sure?';
    }
    else if (decPrecision === 2) {
        decPrecision = 0;
        decPrecisionEl.innerHTML = 'Division<br><br><span>default:</span> range inputs are factors';
    }
}


function permitNegatives() {
    const subNegativesEl = document.getElementById('subNegatives')
    if (subNegatives === 0) {
        subNegatives = 1;
        subNegativesEl.innerHTML = 'Subtraction<br><br><span>Negatives:</span> permit negatives';
    }
    else if (subNegatives === 1) {
        subNegatives = 0;
        subNegativesEl.innerHTML = 'Subtraction<br><br><span>DEFAULT:</span> no negatives';
    }
}