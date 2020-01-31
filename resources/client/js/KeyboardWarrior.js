let canvas;
let canvasContext;
let x=20;
let string;
let score = 0;
let highscore = 0;
let lives = 3;
let WordID;
let difficultyWordID
let bg = new Image();
bg.src = "client/img/stars.jpg";
let UserID;
let UserHighScore;
// This is where I define all the variables that I will use throughout the page, both for my API's and the javascript.



function pageLoad() { // This function is called upon as soon as the page is loaded, this is due to my body having a onload attribute that calls this function.
    document.getElementById("HighScoreNotif").style.display="none" // Next we have a document.getElementID call this in short this gets a html element and allows me to edit the style in my javascript, this will allow me to hide some elements on the page until a certain clause is met, in this case it will be a game over clause.
    canvas = document.getElementById('typingCanvas');
    canvasContext = canvas.getContext('2d');
    document.getElementById("Button2").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("scoreText").style.display = "none";
    // The lines above are all used to set some variables as my actual canvas as well as defining the perspective of the canvas, so in this case 2D. After this we have some more hidden elements.
    let fps=40;
    setInterval(function(){
        if(x==20){
            string = getWord()
        } // The function above is called at a set interval, this interval is worked out by dividing my fps by 1000, so in this case 1000/40 which is 25. This needs to be called every 25 frames to ensure that the Word is past the X axis point 20, so that it does not keep getting the Word for the String.
        moveEverything()
        drawEverything(x,string);
// These two functions are essential for my game to actually operate these both, are called when x!=20 every 25 frames, this is what actually moves the word and redraws everything when the word moves to ensure that there is no collisions.
        if (x>900) {
            lives--;
        } else if (lives==0) {
            lives=-1; canvas.style.display = "none";fps=0;x=0;
            document.getElementById("Button2").style.display = "block";
            document.getElementById("GameTable").style.display = "none";
            document.getElementById("gameHR2").style.display = "none";
            document.getElementById("gameHR3").style.display = "none";
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("scoreText").style.display = "block";
            document.getElementById("GameHeading").textContent = "Results below: ";
            document.getElementById("scoreText").textContent = "Your Score: " + score;
            getUserID()
        } // Next we have a death clause, when x is greater then 900 the user will lose a life, this is due to the canvas width being 900, so when the word is offscreen the user will lose a life.
        // Eventually the lives will be equal to 0, when this happens the else if clause will be ran. This sets the lives to -1 to stop the statement being ran over and over again as it is being checked every 25 frames.
        // It then hides the canvas and some of the elements to do with the canvas, and displays the game over screen which displays score.
        if(x>900 || check()){
            x=20;
            document.getElementById("val").value = '';
        } // The next if statement is similar to the one above but instead clears the text box where the user will enter the words into, by clearing it when the word is either typed correctly (check) or leaves the screen it allows the user to easily begin typing the new word and not get confused.
    },1000/fps)
 // This is where the interval is set - 1000/40 = 25
}

function GetUserHighScore() { // Function that gets the users Highscore
    if (UserID === undefined|| UserID === null) {
        document.getElementById("HighScoreNotif").style.display="block"
        document.getElementById("HighScoreNotif").textContent = "Consider signing up to save your score!"
        // First of all I have a if statement to catch if the UserID is null / undefined and if this is the case it will display the "HighScoreNotif"
    } else {
        fetch("/leaderboard/score/" + UserID, {method: 'get'}
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
                // Error catching
            } else {
                UserHighScore = responseData.Score
                //Next we have the actual API that is getting the data from the SQL Database, this is done by calling my java with the fetch command and then inputting the path to it. This API will return the users Highscore which I then assign to a global variable allowing me to use it throughout the js file.

                if (UserHighScore === null || UserHighScore === undefined) {
                    NewLeaderBoardEntry();
                } else {
                    UpdateLeaderboards();
                    // Finally a if statement to check if the User has a highscore, if it does not the NewLeaderBoardEntry function will be called to create a new entry, on the end if they do it will call the UpdateLeaderboards.
                }

            }
        });
    }
}

function NewLeaderBoardEntry() {
    let formData = new FormData();
    formData.append("Score", score)
    formData.append("UserID", UserID)

        fetch("/leaderboard/new", {method: 'post', body: formData}
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
// This is my NewLeaderBoardEntry function that will create a new entry to my database, this is done by appending the formData that is needed to pass to the API as this is a post API,and in this case it will pass the Score and UserID and the Placement will be automatically done.
            }
        });
    }



function UpdateLeaderboards() {
    let formData = new FormData();
    formData.append("Score", score)
    formData.append("UserID", UserID)
// This is the other function that UpdatesLeaderBoards rather than creating a new entry depending on if the user has a existing Highsccore.
    if (UserHighScore < score) { // First a if statement to ensure that the highscore is lower then score achieved, if this is the case the API will be ran and update the SQL
        fetch("/leaderboard/update", {method: 'post', body: formData}
        ).then(response => response.json()
        ).then(responseData => {
            document.getElementById("HighScoreNotif").style.display="block"
            document.getElementById("HighScoreNotif").textContent = "New high score : )" // Next we have the end screen and it will display a "New High score" String to show that the leaderboards have been updated
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
            }
        });
    } else{
        document.getElementById("HighScoreNotif").style.display="block"
        document.getElementById("HighScoreNotif").textContent = "No New high score : ("
        // If the Highscore is not less than the score this will be run instead and the Leaderboards will not be updated and it will display "No New high sore"
    }
}



function getUserID(){
    // This is a simple function that allows me to get the users UserID with the use of the sessionToken cookie, this is how I get the Users Highscore in an earlier function as it reliant on the UserID
    let sessionToken = Cookies.get("sessionToken") // Sets a variable to the Cookie called sessionToken
        fetch("/users/UserID/"  + sessionToken, {method: 'get'} // Adds the sessionToken to the API path so it can find the correct data record.
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                UserID = responseData.UserID
                GetUserHighScore(UserID)
                // Returns the UserID as a global variable and calls the GetUserHighScore function and passes the Variable

            }
        });
}



function drawEverything(x,string ){
    canvasContext.fillStyle="black";
    canvasContext.border="white";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    drawString(x,string);
    scoreBoard(score);
    Lives()
// This is my drawEverything function I mentioned earlier this function is called every 25 frames.
    // It fills the canvas with a rectangle which has a fillstyle of black and a border of White this is my actual "Play area"
    // After this it calls drawString, this function gets the actual WordID and Definition to display to the user to type.
    // Then after this it calls the Scoreboard function which is involved in updating the users score.
    // Finally it calls my Lives function which is involved with displaying lives remaining.
}

function moveEverything(){
    x+=4; // movement speed of the word - This means that the word moves right 4 pixels a frame.
}

function drawString(x,string) {
    canvasContext.font="30px Verdana"; // This is the font and size of the word
    canvasContext.fillStyle='gray'; // Fillstyle of the word
    canvasContext.fillText(string,x,280);  // place of text appearing.
}

function getWord(WordID) { // Function to get the WordID
    WordID = Math.floor(Math.random()*1000) +1 // Random Number generator between 1 and 1000 as I have 1000 entries in my database.
    difficultyWordID = WordID // Assigns a variable to do with the WordID difficulty

    if (WordID === null) { // Validation

    } else
        fetch("/words/single/" + WordID, {method: 'get'}
         ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')) {
            alert(responseData.error);
        } else {
           string = responseData.Definition;
           // This is my API function to get the Word definition  and is called by the WordID to get a single word.
            // Returns string as variable = to responseData.Definition

        }
    });
}


function check(WordID){ // Function that checks what the user has entered is equal to the word that they have been given.
    let userVal = document.getElementById("val").value;
    if(userVal==string){
        return true;
    }
    return false;
}

function scoreVal(){ // Function to get the difficulty of the word.
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
                // This is a get API that requires a ID to get the difficulty of that Word, which is why we have the WordID function to get the WordID.
                // Returns the difficulty as DifficultyScore variable which is then added to the score if the Word entered is correct.

            }
        });
    }
}



 function scoreBoard(score){ // This function draws my Scoreboard in the topleft of canvas.
    scoreVal(WordID); // Calls the scoreVal API and passes the WordID
    canvasContext.fillStyle = "White"; // Fill style
    canvasContext.font = "40px hot_sauceitalic"; // Font and size
    canvasContext.fillText("Your Score: ",50,60); // Text and position
    canvasContext.fillStyle = "White"; // Color of the text
    canvasContext.fillText(score, 250, 60); // Draws in the actual score further along the x axis.
}

function Lives(){ // This function draws my lives in the topright of canvas.
    canvasContext.fillStyle = "White"; // Fill style
    canvasContext.fillText("Lives:",750,60); // Text and position
    canvasContext.fillStyle = "White"; // Colour of font.
    canvasContext.font = "40px hot_sauceitalic"; // Font and size of text.
    canvasContext.fillText(lives, 850, 60); // Position of the lives variable.
}
