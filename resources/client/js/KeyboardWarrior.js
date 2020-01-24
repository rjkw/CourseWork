var canvas;
var canvasContext;
let x=20;
var string;
let score = 0;
let highscore = 0;
var lives = 3;
var WordID;
var difficultyWordID
var bg = new Image();
var canvas2Context;
var canvas2
bg.src = "client/img/stars.jpg";



// change this onload to a while loop in a minute good sir.
window.onload = function(){

    canvas = document.getElementById('typingCanvas');
    var typeval = document.getElementById("typingValue"); 		//user typed value.
    canvasContext = canvas.getContext('2d');
    canvas2=document.getElementById('backgroundIMG')
    canvas2Context = canvas2.getContext('2d');
    document.getElementById("Button2").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("scoreText").style.display = "none";
    let fps=40;
    setInterval(function(){
        if(x==20){
            string = getWord()
        }
        moveEverything()
        drawEverything(x,string);

        if (x>900) {
            lives--;
        } else if (lives<1) {
              canvas.style.display="none";
            document.getElementById("Button2").style.display = "block";
            document.getElementById("GameTable").style.display = "none";
            document.getElementById("gameHR2").style.display = "none";
            document.getElementById("gameHR3").style.display = "none";
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("scoreText").style.display = "block";
            document.getElementById("GameHeading").textContent = "Results below: ";
            document.getElementById("scoreText").textContent = "Your Score: " + score;


            function updateUserScore() {

                fetch("/leaderboard/update", {method: 'post', body: formData}
                ).then(response => response.json()
                ).then(responseData => {

                    if (responseData.hasOwnProperty('error')) {
                        alert(responseData.error);
                    } else {


                    }
                });
            }

        }


        if(x>900 || check()){
            x=20;
            document.getElementById("val").value = ''; 		//if inputed value get match then blank the input box.


        }
    },1000/fps)

}



function drawEverything(x,string ){
    canvasContext.fillStyle="rgb(0,0,200,0";//  background colour
    canvasContext.border="white"
    canvasContext.fillRect(20,20,canvas.width,canvas.height);
    drawString(x,string);
    scoreBoard(score);
    highScoreBoard(highscore);


}

function moveEverything(){
    x+=4; // movement speed of the word
}


 //random number between 3 to 5.

function drawString(x,string) {
    canvasContext.font="30px Verdana";
    canvasContext.fillStyle='gray';
    canvasContext.fillText(string,x,280);  // place of text appearing.
}

  function Background(){
    this.x = 0, this.y = 0, this.w = bg.width, this.h = bg.height;
    this.render = function(){
        canvas2Context.drawImage(bg, this.x--, 0);
        if(this.x <= -499){
            this.x = 0;
        }
    }
}


var background = new Background();
function animate(){
    background.render();

}
var animateInterval = setInterval(animate, 40);


function getWord(WordID) {
    WordID = Math.floor(Math.random()*30) +1
    difficultyWordID = WordID

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
    canvasContext.fillText("Lives:",750,60);
    canvasContext.fillStyle = "White";
    canvasContext.font = "40px hot_sauceitalic";
    canvasContext.fillText(lives, 850, 60);
}