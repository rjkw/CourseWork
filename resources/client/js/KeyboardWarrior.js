var canvas;
var canvasContext;
let x=20;
var string;
let score = 0;
let highscore = 0;
var lives = 3;
var WordID;
var difficultyWordID



window.onload = function(){
    canvas = document.getElementById('typingCanvas');
    var typeval = document.getElementById("typingValue"); 		//user typed value.
    canvasContext = canvas.getContext('2d');

    let fps=40;
    setInterval(function(){
        if(x==20){
            string = getWord()
        }
        moveEverything()
        drawEverything(x,string);
        if(x>900 || check()){
            x=20;
            document.getElementById("val").value = ''; 		//if inputed value get match then blank the input box.
            no++;

        }
    },1000/fps)


}

function drawEverything(x,string ){
    canvasContext.fillStyle='black';		//  background colour
    canvasContext.border="white"
    canvasContext.fillRect(20,20,canvas.width,canvas.height);
    drawString(x,string);
    scoreBoard(score);
    highScoreBoard(highscore);
}

function moveEverything(){
    x+=4; // movement speed of the word
}

let no= Math.floor(Math.random()*3+2); 		//random number between 3 to 5.

function drawString(x,string) {
    canvasContext.font="30px Verdana";
    canvasContext.fillStyle='gray';
    canvasContext.fillText(string,x,280);  // place of text appearing.
}

function getWord(WordID) {
    WordID = Math.floor(Math.random()*30) +1
    difficultyWordID = WordID
    console.log("start" + WordID);
    if (WordID === null) {

    } else
        fetch("/words/single/" + WordID, {method: 'get'}
         ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);
        } else {
           string = responseData.Definition;


        }
    });
}


function check(WordID){
    var userVal = document.getElementById("val").value;
    if(userVal==string){
        return true;
    }
    return false;
}

function scoreVal(){
    if(check()){
        fetch("/words/single/"  + difficultyWordID, {method: 'get'}
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                let difficultyScore  = 1;
                difficultyScore = responseData.Difficulty;
                score=score + difficultyScore;

            }
        });
    }
}

function highScoreVal(){
    if(score>highscore){
        highscore=score;
    }
}

function scoreBoard(score){
    scoreVal(WordID);
    canvasContext.fillStyle = "White";
    canvasContext.font = "40px hot_sauceitalic";
    canvasContext.fillText("Your Score: ",50,60);
    canvasContext.fillStyle = "White";
    canvasContext.fillText(score, 250, 60);
}
function highScoreBoard(highscore){
    highScoreVal();
    canvasContext.fillStyle = "White";
    canvasContext.fillText("Your High Score:   ",510,60);
    canvasContext.fillStyle = "White";
    canvasContext.font = "40px hot_sauceitalic";
    canvasContext.fillText(highscore, 850, 60);
}