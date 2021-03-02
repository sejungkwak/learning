var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$(document).one("keydown", function() {
    nextSequence();
});

function nextSequence() {

    emptyUserClickedPattern();

    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    
}

$(".btn").click(function() {

    var userChosenColour = this.id;
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {

    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColour) {
    
    $("." + currentColour).addClass("pressed");

    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {    
            nextSequence()}, 1000);
    }} else { 
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    $(document).one("keydown", function() {
        nextSequence();
    });
}

function emptyUserClickedPattern() {
    userClickedPattern.length = 0;
}