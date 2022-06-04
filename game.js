let generatedSequence = new Array();
let userSequence = new Array();

let score = 0;
let gameRunning = false;
let selectionDone = true;

let highScore = 0;

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
    document.getElementById("red").setAttribute("id","red-active");
    setTimeout(() => {document.getElementById("red-active").setAttribute("id","red")},1000)
}

function lightGreen(){
    document.getElementById("green").setAttribute("id","green-active");
    setTimeout(() => {document.getElementById("green-active").setAttribute("id","green")},1000)
}

function lightYellow(){
    document.getElementById("yellow").setAttribute("id","yellow-active");
    setTimeout(() => {document.getElementById("yellow-active").setAttribute("id","yellow")},1000)
}

function lightBlue(){
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

    for(i=0;i<userSequence.length;i++){
        console.log("Comparing " + generatedSequence[i] + " and " +  userSequence[i]);
        if(generatedSequence[i] != userSequence[i]){
            gameRunning = false;
            gameOver();
            break;
        }
    }

    if(selectionDone==true) {
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
    
}

function startGame() {
    generatedSequence = new Array();
    userSequence = new Array();

    score = 0;
    gameRunning = false;
    selectionDone = true;
    showLoopCounter = 0;

    document.getElementById("score").innerHTML = "Score: 0";
    document.getElementById("gameOverBox").innerHTML = "";

    generatedSequence.push(generateRandomColour());
    gameRunning=true;
    gameLoop();
}

function gameOver() {
    document.getElementById("score").innerHTML = "Score: " + score;

    if(score > highScore) {
        highScore = score;
    }
    document.getElementById("highScore").innerHTML = "High Score: " + highScore;

    document.getElementById("gameOverBox").innerHTML = "Game Over";
    score = 0;
}