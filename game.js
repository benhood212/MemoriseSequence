let generatedSequence = new Array();
let userSequence = new Array();

let score = 0;
let gameRunning = false;
let selectionDone = true;
let highScore = 0;

let selectedGameMode = "";


let disableButtons = true;
if(document.getElementById("gameMode").innerHTML == "Normal") {
    if(localStorage.highScoreStorage) {
        // retrieve highscore from storage, and update displays
        highScore = parseInt(localStorage.highScoreStorage);
        setDisplays();
    }
}
else if(document.getElementById("gameMode").innerHTML == "3x3") {
    if(localStorage.high3x3ScoreStorage) {
        // retrieve highscore from storage, and update displays
        highScore = parseInt(localStorage.high3x3ScoreStorage);
        setDisplays();
    }
}

function setDisplays() {
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}

function generateRandomColour(){
    if(selectedGameMode=="normal") {
        randomNumber = Math.floor(Math.random() * 4);
        switch(randomNumber){
            case 0: return "red";
            case 1: return "green";
            case 2: return "yellow";
            case 3: return "blue";
        }
    }
    else if(selectedGameMode = "3x3"){
        randomNumber = Math.floor(Math.random() * 9);
        switch(randomNumber){
            case 0: return "red";
            case 1: return "green";
            case 2: return "yellow";
            case 3: return "blue";
            case 4: return "orange";
            case 5: return "lime";
            case 6: return "purple";
            case 7: return "pink";
            case 8: return "darkpink"
        }
    }
}

function lightColour(colour){
    // temporarily change css to show which colours are in sequence
    document.getElementById(colour).setAttribute("id",colour+"-active");
    setTimeout(() => document.getElementById(colour+"-active").setAttribute("id",colour),1000);
}

function colourClicked(colour){
    if(!disableButtons){
        userSequence.push(colour);
    }
}

function enableButton(){
    disableButtons = false;
}

function disableButton(){
    disableButtons = true;
}

function showOneElement(colour,loopCounter){
    setTimeout(() => lightColour(colour),loopCounter * 1500);
}

function displayColours() {
    // disable buttons until pattern has been shown
    setTimeout(() => enableButton(),generatedSequence.length * 1350);

    // logic for displaying pattern to memorise
    let displayColoursLoopCounter = 0;
    displayColoursLoop();
    function displayColoursLoop(){
        showOneElement(generatedSequence[displayColoursLoopCounter],displayColoursLoopCounter);
        if(displayColoursLoopCounter<generatedSequence.length){
            displayColoursLoopCounter++;
            displayColoursLoop();
        }
        selectionDone = false;
    }
}

function gameLoop() {
    if(gameRunning===true){
        window.setTimeout(gameLoop,1000);
    }

    for(i=0;i<userSequence.length;i++){
        // check if player has lost game
        if(generatedSequence[i] != userSequence[i]){
            gameRunning = false;
            gameOver();
        }
    }

    if(gameRunning) {
        if(selectionDone==true) {
            displayColours();
        }
    
        if(userSequence.length == generatedSequence.length && generatedSequence.length != 0){
            // add points if sequence is correct, and reset for next round
            disableButton();
            if(gameRunning) {
                score++;
                generatedSequence.push(generateRandomColour());
                userSequence = new Array();
                selectionDone = true;
            }
        }

        if(disableButtons){
            document.getElementById("commandDisplay").innerHTML = "Memorise!";
        }
        else {
            document.getElementById("commandDisplay").innerHTML = "Guess!";
        }
    }
    setDisplays();
}

function startGame(gameMode) {
    // set game variables then start main game loop
    generatedSequence = new Array();
    userSequence = new Array();
    selectedGameMode = gameMode;

    score = 0;
    gameRunning = false;
    selectionDone = true;
    document.getElementById("commandDisplay").style.color = "green";

    generatedSequence.push(generateRandomColour());
    gameRunning=true;
    gameLoop();
}

function gameOver() {
    // update display and disable game buttons
    if(score > highScore) {
        highScore = score;
        if(selectedGameMode == "normal") {
            localStorage.highScoreStorage = highScore;
        }
        else if(selectedGameMode == "3x3") {
            localStorage.high3x3ScoreStorage = highScore;
        }
    }
    setDisplays();
    document.getElementById("commandDisplay").innerHTML = "Game Over!";
    disableButton();
    document.getElementById("commandDisplay").style.color = "red";
}