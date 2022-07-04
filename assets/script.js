var startBtn = document.getElementById("gameStart");
var restartBtn = document.getElementById("reloadGame");

var questions = [
    ["What keyword does conditional statements have?", "if"], 
    ["What operator means 'equal to'", "==="], 
    ["What operator means 'not equal to' ", "!="],
    ["What function holds data in localStorage", "localStorage.setItem()"],
    ["What function allows you to retrieve data from localStorage", "localStorage.getItem()"],
    ["What number of the first index in an array ", "0"]
];


var questionNo = 1;
var score = 0;

var timeLeft = 60;
var interval;

// QUIZ CONTENT
// initialize the submit button to start the game, check for correct/incorrect answers, and change question
function clickButton(){
    check();
    questions.shift();
    questionNo++;
    setup();
};

// function to create quiz
function setup(){   

// begin countdown on click
    startBtn.addEventListener("click", function(){
        interval = setInterval(countdown, 1000);
        let elem = document.getElementById("timer");

        document.getElementById("titleScreen").remove();
        document.getElementById("subTitleScreen").remove();

        startBtn.classList.add("hide");
        document.getElementById("questionBox").classList.remove("hide");

// if timer runs out, stop quiz
        function countdown() {
            if (timeLeft == -1) {
                clearInterval(interval);
                elem.innerHTML = "Time's up!";
                document.getElementById("timer").textContent = "Time's up!";
                document.getElementById("questionNo").innerHTML = "You're out of time!";
                document.getElementById("question").innerHTML = "Your score is: " + score;
                document.getElementById("text-field").remove();
                document.getElementById("button").remove();
                // show button to reload page
                restartBtn.classList.remove("hide");
                restartBtn.addEventListener("click", function() {
                    window.location.reload();
                });
                document.body.append(restartBtn);
            } else {
                elem.innerHTML = timeLeft + " seconds remaining";
                timeLeft--
            } 
        }
    });

// loop through questions length until 0
    if (questions.length != 0){
        document.getElementById("question").innerHTML = questions[0][0];
        document.getElementById("questionNo").innerHTML = "Question " + questionNo;
        } else if (questions.length === 0) {
        clearInterval(interval);
        document.getElementById("questionNo").innerHTML = "You're done!"
        document.getElementById("question").innerHTML = "Your score is: " + score;
        document.getElementById("text-field").remove();
        document.getElementById("button").remove();

// save the new username and score modal event
        var btn = document.createElement("button");
        btn.innerHTML = "Save Your Score!"
        btn.classList.add("btn", "btn-outline-dark");
        document.body.append(btn);
        
        btn.addEventListener("click", function() {
            var submitName = prompt("Enter your name:");
            var setData = {
                submitName,
                score 
            };
// saves name and score to local storage
            localStorage.setItem("newscore", JSON.stringify(Object.values(setData)));
        });        
    }; 
};

// question check
function check(){
    if (document.getElementById("text-field").value === questions[0][1]) {
        console.log("correct");
        score += 2;
        document.getElementById("text-field").value = "";
    } else if (document.getElementById("text-field").value !== questions[0][1]) {
        console.log("incorrect");
        score--;
        timeLeft -= 3;
        document.getElementById("text-field").value = "";
    }
};

// SCORE MODAL
// set variables for modal
var modal = document.getElementById("scoreModal");
var btn = document.getElementById("viewScores");

// set variables for retrieved score, and parse the retrieved score so it can be read
var retrieveScores = localStorage.getItem("newscore");
var thisScore = JSON.parse(retrieveScores);
// console.log(thisScore);

// show modal when clicked/hide when closed
var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
        document.getElementById("scoresHere").innerHTML = thisScore + "!";
    };

    span.onclick = function() {
        modal.style.display = "none"
    };