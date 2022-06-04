let generatedSequence = new Array();
let userSequence = new Array();

let score = 0;
let gameRunning = false;
let selectionDone = true;


function generateRandomColour(){
    randomNumber = Math.floor(Math.random() * 4);
    switch(randomNumber){
        case 0: return "red";
        case 1: return "green";
        case 2: return "yellow";
        case 3: return "blue";
    }
}

function lightRed(){
    console.log("red");
    document.getElementById("red").setAttribute("id","red-active");
    setTimeout(() => {document.getElementById("red-active").setAttribute("id","red")},1000)
}

function lightGreen(){
    console.log("green");
    document.getElementById("green").setAttribute("id","green-active");
    setTimeout(() => {document.getElementById("green-active").setAttribute("id","green")},1000)
}

function lightYellow(){
    console.log("yellow");
    document.getElementById("yellow").setAttribute("id","yellow-active");
    setTimeout(() => {document.getElementById("yellow-active").setAttribute("id","yellow")},1000)
}

function lightBlue(){
    console.log("blue");
    document.getElementById("blue").setAttribute("id","blue-active");
    setTimeout(() => {document.getElementById("blue-active").setAttribute("id","blue")},1000)
}


function redClicked(){
    userSequence.push("red");
}

function greenClicked(){
    userSequence.push("green");
}

function yellowClicked(){
    userSequence.push("yellow");
}

function blueClicked(){
    userSequence.push("blue");
}

function showOneElement(colour){
    switch(colour){
        case "red": setTimeout(() => lightRed(),showLoopCounter * 1500);break;
        case "green": setTimeout(() => lightGreen(),showLoopCounter * 1500);break;
        case "yellow": setTimeout(() => lightYellow(),showLoopCounter * 1500);break;
        case "blue": setTimeout(() => lightBlue(),showLoopCounter * 1500);break;
        
    }
}

let showLoopCounter = 0;

function showLoopIteration(){
    console.log("show loop iteration");
    showOneElement(generatedSequence[showLoopCounter]);
    if(showLoopCounter<generatedSequence.length){
        showLoopCounter++;
        showLoop();
    }
    selectionDone = false;

}

function showLoop(){
    window.setTimeout(showLoopIteration(),1000);

}

function gameLoop() {
    if(gameRunning===true){
        window.setTimeout(gameLoop,1000);
    }

    if(selectionDone==true) {
        console.log("showing sequence");
        showLoop();

        showLoopCounter = 0;
    }

    if(userSequence.length == generatedSequence.length && generatedSequence.length != 0){
        score = userSequence.length;
        document.getElementById("score").innerHTML = "Score: " + score;
        if(gameRunning) {
            score++;
            generatedSequence.push(generateRandomColour());
            userSequence = new Array();
            selectionDone = true;
        }
    }

    for(i=0;i<userSequence.length;i++){
        if(generatedSequence[i] != userSequence[i]){
            gameRunning = false;
            gameOver();
            break;
        }
    }
}

function startGame() {
    generatedSequence = new Array();
    userSequence = new Array();

    score = 0;
    gameRunning = false;
    selectionDone = true;
    showLoopCounter = 0;
    document.getElementById("gameOverBox").innerHTML = "";

    generatedSequence.push(generateRandomColour());
    gameRunning=true;
    gameLoop();
}

function gameOver() {
    score = score - 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("gameOverBox").innerHTML = "Game Over";
}