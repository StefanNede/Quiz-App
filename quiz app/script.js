let totalQuestions = 0;
const nextQuestionButton = document.querySelector(".enter");
let displayScore = document.querySelector(".score");
let endScreen = document.querySelector(".endScreen");
let questionScreen = document.querySelector(".questionScreen");
let displayHighScore = document.querySelector(".high-score");
let displayCardSetName = document.querySelector(".cardSetName");
let questions = [];
const selectOptionButtons = document.querySelectorAll(".option");
const playAgainButton = document.querySelector(".playAgain");

if (document.querySelector(".scienceQuestions")){
    localStorage.removeItem("card set");
    localStorage.setItem("card set", "science");
    questions = [['What is the fourth planet from the Sun?', ['Earth', 'Mars', 'Saturn', 'Mercury'], 'Mars'], ['What is the biggest organ in the human body that is not the skin?', ['brain', 'heart', 'intestines', 'liver'], 'liver'], ['What is the chemical formula for salt?', ['NaCl', 'Sa', 'So', 'H2O'], 'NaCl'], ['Do red blood cells have a nucleus?', ['yes', 'no', '', ''], 'no'], ['What is the speed of sound?', ['343 m/s', '300 m/s', '100 m/s', '300 000 000 m/s'], '343 m/s']];
}
if (document.querySelector(".mathQuestions")){
    localStorage.removeItem("card set");
    localStorage.setItem("card set", "math");
    questions = [['What is 6mod3?', ['1', '0', '3', '2'], '0'], ['What is 3+4x2?', ['14', '3.5', '7', '11'], '11'], ['What is 3÷4x4?', ['3', '3/16', '4', '12'], '3'], ['What is 15÷3?', ['1', '3', '5', '2'], '5'], ['What is 2+2?', ['5', '22', '4', 'window'], '4']];
}
if (document.querySelector(".historyQuestions")){
    localStorage.removeItem("card set");
    localStorage.setItem("card set", "history");
    questions = [['When did world war one start?', ['1914', '1915', '1913', '1936'], '1914'], ['When did world war one end?', ['1914', '1918', '1913', '1939'], '1918'], ['Who was the first human to journey into space?', ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Alan Shepard'], 'Yuri Gagarin'], ["Who was Henry VIII's last wife?", ['Catherine Parr', 'Anne of Cleves', 'Catherine of Aragon', 'Jane Seymour'], 'Catherine Parr'], ['Which popular fast food chain restaurant was first opened in 1955?', ["Domino's", "Wendy's", 'Burger King', "McDonald's"], "McDonald's"]];
}

// question results from user
function displayQuestion(n, currentScore){
    if (n=== 5){
        document.location.href = "endScreen.html";
        localStorage.setItem("score", currentScore);
        return;
    }
    let selectedOption = "";
    let correctAnswerButton = "";
    let question = questions[n][0];
    let options = questions[n][1];
    let correctAnswer = questions[n][2];
    document.querySelector(".question").innerHTML = question;
    for (let j=0;j<options.length;j++){
        selectOptionButtons[j].innerHTML = options[j];
    }
    selectOptionButtons.forEach((optionButton)=>{
        if ($(optionButton).hasClass("selected")){
            optionButton.classList.remove("selected");
        }
        optionButton.addEventListener('click', function(){
            optionButton.classList.add("selected");
            selectOptionButtons.forEach((item)=>{
                if ($(item).hasClass("selected") && item !== optionButton){
                    item.classList.remove("selected");
                }
                if (item === optionButton){
                    selectedOption = item;
                }
            })
        })
    })
    nextQuestionButton.addEventListener('click', function(){
        if (selectedOption.innerHTML === correctAnswer){         
            return displayQuestion(n+1, currentScore+1);
        }
        else{
            return displayQuestion(n+1, currentScore); 
        }
    })
}

// assessing user score and writing to storage if necessary
const changeHighScore=()=>{
    if (localStorage.getItem("high score") == null){
        localStorage.setItem("high score", score);
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
    if (localStorage.getItem("high score") < score){
        localStorage.setItem("high score", score);
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
    else{
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
}
function mainApp(){
    if (questionScreen){
        displayQuestion(0,0);
    } 
}
mainApp();
let score = localStorage.getItem("score");

if (endScreen){
    displayCardSetName.innerHTML = localStorage.getItem("card set");
    displayScore.innerHTML = score;
    if (localStorage.getItem("high score") === null){
        localStorage.setItem("high score", score);
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
    if (localStorage.getItem("high score") < score){
        localStorage.setItem("high score", score);
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
    else{
        displayHighScore.innerHTML = localStorage.getItem("high score");
    }
    playAgainButton.addEventListener('click', function(){
        document.location.href = `${localStorage.getItem("card set")}Questions.html`;
        mainApp();
    })
}