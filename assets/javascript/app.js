// Initialize Variables
var currentQuestion = "";
var option1 = "";
var option2 = "";
var option3 = "";
var option4 = "";
var answer = "";
var time = 10;
var correct = 0;
var incorrect = 0;
var questionsArr = [];
var nextRound = "";
var timeRemaining = "";
var selector = 0;

function gameStart() {
    correct = 0;
    incorrect = 0;
    // Array of question objects. Reset between games, as we eliminate entries from the question array to keep order random.
    //Each array item has 4 answer options, the question itself, and a variable to identify the actual answer.
    questionsArr = [
        {question: "What is the meaning of life?",
            option1: "Being cool",
            option2: "Not answer",
            option3: "Not answer",
            option4: "Not answer",
            answer: "Being cool"
        },
        {question: "What is Cody's favorite color?",
            option1: "Not answer",
            option2: "Not answer",
            option3: "Blue",
            option4: "Not answer",
            answer: "Blue"
        },
        {question: "What is the best sandwich?",
            option1: "Not answer",
            option2: "Subway Veggie Delight",
            option3: "Not answer",
            option4: "Not answer",
            answer: "Subway Veggie Delight"
        }
    ];
}

// Function to randomly select a question and the associated set of possible answers from the array.
function newQuestion() {
    // Check to see if the game is over before continuing
    if (questionsArr.length === 0) {
        clearInterval(timeRemaining);
        gameEnd();
    }
    // if the game is not over, keep playing.
    else {
        // ensure the timer interval is cleared out before starting a new question
        clearInterval(timeRemaining); 
        // clear content area before re-establishing format.
        $("#contentArea").html("");
        // Rebuid the content area with each new question because we clear it to show if the user was right or wrong after each guess.
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h3 id='timeRemaining'></h3></div></div>");
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h2 id='question'></h2></div></div>");
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><button id='option1'></button></div></div>");
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><button id='option2'></button></div></div>");
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><button id='option3'></button></div></div>");
        $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><button id='option4'></button></div></div>");
        // use this to have a consistent index to associate questions and options.
        selector = Math.floor(questionsArr.length * Math.random()); 
        currentQuestion = questionsArr[selector].question;
        option1 = questionsArr[selector].option1;
        option2 = questionsArr[selector].option2;
        option3 = questionsArr[selector].option3;
        option4 = questionsArr[selector].option4;
        answer = questionsArr[selector].answer;
        // Reset the DOM at the beginning of each new question.
        time = 10;
        // Display the selected question and associated answers by calling question, option1, option2, etc...
        $("#timeRemaining").text(time);
        $("#question").text(currentQuestion);
        $("#option1").text(option1);
        $("#option2").text(option2);
        $("#option3").text(option3);
        $("#option4").text(option4);
        clockrunning = true; // set clock running to true before setInterval
        timeRemaining = setInterval(startRound, 1000); // Decrease time remaining by one every one second (30 second timer for each question)
    }
}

function startRound() {
    if (clockrunning === true) {
        time--;
        $("#timeRemaining").text(time);

        // Event handlers for clicks on answers while timer is running. Pass into checkAnswer function.
        $("#option1").click(function(){
            setTimeout(checkAnswer(option1), 200);
        })
        $("#option2").click(function(){
            setTimeout(checkAnswer(option2), 200);
        })
        $("#option3").click(function(){
            setTimeout(checkAnswer(option3), 200);
        })
        $("#option4").click(function(){
            setTimeout(checkAnswer(option4), 200);
        })

        // Time Runs out Scenario
        if (time === 0) {
            incorrect++; // Player did not answer question fast enough; increase their incorrect score.
            clockrunning = false; // turn the timer off.
            $("#contentArea").html("");
            // show that the user got the the wrong answer and show them the correct one.
            $("#contentArea").html("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h3>" + "Time's up! The right answer was " + answer + "!" + "</h3></div></div>");
            // remove the current question from questionsArr
            questionsArr.splice(selector, 1);
            // wait a few seconds before showing the next question.
            setTimeout(newQuestion, 3000);
        }
    }
}

function checkAnswer(selection) {
    // ===== CORRECT ANSWER =====
    if (selection === answer) {
        correct++;
        // clear the content area to show whether the player got the question right or wrong.
        $("#contentArea").html("");
        // show that the user got the correct answer.
        $("#contentArea").html("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h3>Correct!</h3></div></div>");
        // remove the current question from questionsArr
        questionsArr.splice(selector, 1);
        // wait a few seconds before showing the next question.
        setTimeout(newQuestion, 3000);
    }
    // ===== INCORRECT ANSWER =====
    else if (selection !== answer) {
        incorrect++;
        // If time runs out, clear the content area to show the correct answer
        $("#contentArea").html("");
        // show that the user got the the wrong answer and show them the correct one.
        $("#contentArea").html("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h3>" + "Incorrect! The right answer was " + answer + "!" + "</h3></div></div>");
        // remove the current question from questionsArr
        questionsArr.splice(selector, 1);
        // wait a few seconds before showing the next question.
        setTimeout(newQuestion, 3000);
    }
}

function gameEnd() {
    clearInterval(timeRemaining); 
    // clear content area before re-establishing format.
    $("#contentArea").html("");
    // Rebuid the content area with each new question because we clear it to show if the user was right or wrong after each guess.
    $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h3>The game has ended!</h3></div></div>");
    $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h2>Let's see how you did.</h2></div></div>");
    $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h4>Correct Answers: " + correct + "</h4></div></div>");
    $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><h4>Incorrect Answers: " + incorrect + "</h4></div></div>");
    $("#contentArea").append("<div class='row text-center justify-content-center'><div class='col justify-content-center'><button id='start'>Start Game Over</button></div></div>");
    // Allow user to start game over by clicking the start button
    $("#start").click(function(){
        gameStart();
        $("#contentArea").html(""); // Clear the game over screen
        $("#start").hide(); // After the button is hit, hide the button 
        newQuestion();
    })
}

// Have a jquery listening event for clicking the start game button (this section is for the first start of the game only!)
$("#start").click(function(){
    gameStart();
    $("#start").hide(); // After the button is hit, hide the button 
    newQuestion();
})