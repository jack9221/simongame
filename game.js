buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
index = 0;

$(document).on("keydown", function () {
    if (level == userClickedPattern.length) {
        updateLevel();
    }
})

$(".btn").on("click", function () {
    if (check(this.id, index)) {
        index++;
        animatePress(this.id);
        playSound(this.id);
        userClickedPattern.push(this.id);
        if(level == userClickedPattern.length) {
            updateLevel();
            userClickedPattern = [];
            index = 0;
        }
    }
    else {
        wrong();
        startOver();
    }
});



function check(color, index) {
    return color == gamePattern[index];
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    index = 0;
    $(document).on("keydown", function() {
        if (level == userClickedPattern.length) {
            updateLevel();
        }
    })
}

function wrong() {
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}




function updateLevel() {
    level++;
    setTimeout(function(){
        $("#level-title").text("Level " + level);
    }, 1000);
    var randC = randomColor();
    setTimeout(function(){
        activateColor(randC);
    }, 2000);
    gamePattern.push(randC);
}

function randomColor() {
    var randomNumber = Math.floor((Math.random() * 4));
    randomChosenColor = buttonColors[randomNumber];
    return randomChosenColor;
}

function activateColor(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
}



// $(document).on("keydown", function () {
//     nextSequence();

//     $(".btn").on("click", function () {
//         while (userClickedPattern.length < level && continueGame) {
//             userChosenColor = this.id;
//             userClickedPattern.push(userChosenColor);
//             console.log(gamePattern);
//             checkAnswer(userClickedPattern.length);
//             animatePress(userChosenColor);
//             playSound(userChosenColor);
//         }
//         userClickedPattern = [];
//         setInterval(nextSequence(), 1000);
//     })

// })

// // Responsible for animation, sound, and appends to gamePattern
// function nextSequence() {
//     $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColor);
//     gamePattern.push(randomChosenColor);
// }

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// function checkAnswer(currentLevel) {
//     if (gamePattern[currentLevel - 1] != userClickedPattern[currentLevel - 1]) {
//         alert("Wrong!");
//         continueGame = false;
//     }
// }