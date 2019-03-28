$( document ).ready(function() {
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
    var accuracy = 0;
    var questionsArr = [];
    var timeRemaining = "";
    var selector = 0;
    var bootstrapDiv = "<div class='row text-center justify-content-center'><div class='col col-md-8 justify-content-center'>";

    function gameStart() {
        correct = 0;
        incorrect = 0;
        // Array of question objects. Reset between games, as we eliminate entries from the question array to keep order random.
        //Each array item has 4 answer options, the question itself, and a variable to identify the actual answer.
        questionsArr = [
            {question: "In \"The Race\", what is the name of Jerry's high school racing nemesis?",
                option1: "Duncan Meyer",
                option2: "Kramer",
                option3: "Elaine Benes",
                option4: "Jackie Chiles",
                answer: "Duncan Meyer"
            },
            {question: "What number of dates requires a \"face-to-face\" break-up, according to Jerry?",
                option1: "Two",
                option2: "Five",
                option3: "Seven",
                option4: "Ten",
                answer: "Seven"
            },
            {question: "In \"The Comeback\", what was the store out of?",
                option1: "Toilets",
                option2: "Jerks",
                option3: "Shrimp",
                option4: "Insults",
                answer: "Jerks"
            },
            {question: "At one point, Jerry dates a Miss America Contestant. What state was she from?",
                option1: "New York",
                option2: "Georgia",
                option3: "Texas",
                option4: "Rhode Island",
                answer: "Rhode Island"
            },
            {question: "Kramer created a coffee table book. What was the book about?",
                option1: "Foreign Fruits",
                option2: "The Circus",
                option3: "Coffee Tables",
                option4: "Cars",
                answer: "Coffee Tables"
            },
            {question: "Jerry had a favorite yellow T-shirt. What did he call it?",
                option1: "Old Faithful",
                option2: "Golden Boy",
                option3: "Baby Blue",
                option4: "Old Short Sleeve",
                answer: "Golden Boy"
            },
            {question: "Elaine goes to a nail salon where the employees gossip in Korean. Who does she get to translate?",
            option1: "Father Curtis",
            option2: "Rachel Goldstein",
            option3: "Slippery Pete",
            option4: "Frank Costanza",
            answer: "Frank Costanza"
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
            $("#contentArea").append(bootstrapDiv + "<h1 id='timeRemaining' style='color: #1d8fa5;'></h1></div></div>");
            $("#contentArea").append(bootstrapDiv + "<h2 id='question' style='margin-bottom: 20px;'></h2></div></div>");
            $("#contentArea").append(bootstrapDiv + "<button type='button' class='btn btn-primary' id='option1'></button></div></div>");
            $("#contentArea").append(bootstrapDiv + "<button type='button' class='btn btn-primary' id='option2'></button></div></div>");
            $("#contentArea").append(bootstrapDiv + "<button type='button' class='btn btn-primary' id='option3'></button></div></div>");
            $("#contentArea").append(bootstrapDiv + "<button type='button' class='btn btn-primary' id='option4'></button></div></div>");
            // use this to have a consistent index to associate questions and options.
            selector = Math.floor(questionsArr.length * Math.random()); 
            currentQuestion = questionsArr[selector].question;
            option1 = questionsArr[selector].option1;
            option2 = questionsArr[selector].option2;
            option3 = questionsArr[selector].option3;
            option4 = questionsArr[selector].option4;
            answer = questionsArr[selector].answer;
            // Reset the DOM at the beginning of each new question.
            time = 30;
            // Display the selected question and associated answers by calling question, option1, option2, etc...
            $("#timeRemaining").text(time);
            $("#question").text(currentQuestion);
            $("#option1").text(option1);
            $("#option2").text(option2);
            $("#option3").text(option3);
            $("#option4").text(option4);
            // Event handlers for clicks on answers while timer is running. Pass into checkAnswer function.
            $("#option1").click(function(){
                clearInterval(timeRemaining); 
                setTimeout(checkAnswer(option1), 200);
            })
            $("#option2").click(function(){
                clearInterval(timeRemaining); 
                setTimeout(checkAnswer(option2), 200);
            })
            $("#option3").click(function(){
                clearInterval(timeRemaining); 
                setTimeout(checkAnswer(option3), 200);
            })
            $("#option4").click(function(){
                clearInterval(timeRemaining); 
                setTimeout(checkAnswer(option4), 200);
            })
            clockrunning = true; // set clock running to true before setInterval
            timeRemaining = setInterval(startRound, 1000); // Decrease time remaining by one every one second (30 second timer for each question)
        }
    }

    function startRound() {
        if (clockrunning === true) {
            time--;
            $("#timeRemaining").text(time);

            // Time Runs out Scenario
            if (time === 0) {
                incorrect++; // Player did not answer question fast enough; increase their incorrect score.
                clockrunning = false; // turn the timer off.
                $("#contentArea").html("");
                // show that the user got the the wrong answer and show them the correct one.
                $("#contentArea").html(bootstrapDiv + "<h3 style='color: #b70000;'>Time's up!</h3><h3>The right answer was:" + "<h3 style='color: #1d8fa5;'>" + answer + "</h3></div></div>");
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
            $("#contentArea").html(bootstrapDiv + "<h3 style='color: #1a8200;'>Correct!</h3></div></div>");
            // remove the current question from questionsArr
            questionsArr.splice(selector, 1);
            // wait a few seconds before showing the next question.
            setTimeout(newQuestion, 1500);
        }
        // ===== INCORRECT ANSWER =====
        else if (selection !== answer) {
            incorrect++;
            // If time runs out, clear the content area to show the correct answer
            $("#contentArea").html("");
            // show that the user got the the wrong answer and show them the correct one.
            $("#contentArea").html(bootstrapDiv + "<h3 style='color: #b70000;'>Incorrect!</h3><h3>The correct answer was:</h3>" + "<h3 style='color: #1d8fa5;'>" + answer + "</h3>" + "</div></div>");
            // remove the current question from questionsArr
            questionsArr.splice(selector, 1);
            // wait a few seconds before showing the next question.
            setTimeout(newQuestion, 2500);
        }
    }

    function gameEnd() {
        clearInterval(timeRemaining); 
        // calculate percentage correct
        accuracy =  Math.round((correct / (correct + incorrect)) * 100);
        // clear content area before re-establishing format.
        $("#contentArea").html("");
        // Rebuid the content area with each new question because we clear it to show if the user was right or wrong after each guess.
        $("#contentArea").append(bootstrapDiv + "<h2>The game has ended!</h2></div></div>");
        $("#contentArea").append(bootstrapDiv + "<h3 style='color: #1d8fa5;'>Let's see how you did.</h3></div></div>");
        $("#contentArea").append(bootstrapDiv + "<h4>Correct Answers: " + correct + "</h4></div></div>");
        $("#contentArea").append(bootstrapDiv + "<h4>Incorrect Answers: " + incorrect + "</h4></div></div>");
        $("#contentArea").append(bootstrapDiv + "<h3 style='color: #1a8200;'>" + accuracy + "%</h3></div></div>");
        $("#contentArea").append(bootstrapDiv + "<button type='button' id='start' class='btn btn-success'>Start Game Over</button></div></div>");
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
});