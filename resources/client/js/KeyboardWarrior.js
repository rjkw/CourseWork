var canvas;
var canvasContext;
let x=20;
var string;
let score = 0;
let highscore = 0;
var lives = 3;
let wh;
let WordID = 3




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
    drawString(x,string, wh);
    scoreBoard(score);
    highScoreBoard(highscore);
}

function moveEverything(){
    x+=4; // movement speed of the word
}

let no= Math.floor(Math.random()*3+2); 		//random number between 3 to 5.

function drawString(x,string)
{
    getWord(Math.floor(Math.random()*4) +1);

    canvasContext.font="30px Verdana";
    canvasContext.fillStyle='gray';
    canvasContext.fillText(string,x,280);  // place of text appearing.
}

function getWord() {
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

 /* let wh = Math.floor(Math.random()*canvas.height)
alert(wh) */

/* function str(len){
    let random_str='';
    let random_ascii;
    for(let i=0;i<=len;i++){
        random_ascii=Math.floor((Math.random()*25)+97);
        random_str+=String.fromCharCode(random_ascii);

    }
    return random_str;
} */

function check(){
    var userVal = document.getElementById("val").value;
    if(userVal==string){
        return true;
    }
    return false;
}

function scoreVal(){
    if(check()){
        score++;
    }
}

function highScoreVal(){
    if(score>highscore){
        highscore=score;
    }
}

function scoreBoard(score){
    scoreVal();
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