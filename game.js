
var buttonColors = ["red","blue","yellow","green"];

var gamePattern = [];
var userClickedPattern = [];

var level=0;

function nextSequence(){

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var randomChosenColorID = "#"+randomChosenColor;
    $(randomChosenColorID).fadeOut(100);
    $(randomChosenColorID).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("h1").text("Level  " + level);
}

var click =0;
$(".btn").click(function(event){
    click++;
    var userChosenColor = $(this).attr("id")    // difference between this and $(this)???
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    if(userChosenColor!==gamePattern[click-1]){
        gameEnd();
    }

    if(click===gamePattern.length && click!==0){
        setTimeout(nextSequence,500);
        click=0;
        userClickedPattern = [];
    }
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function(){
    if(gamePattern.length===0){
        nextSequence();
    }
});

function gameEnd(){
    userClickedPattern = [];
    gamePattern = [];
    level=0;
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    })
    $("h1").text("Game Over, Press any Key to Restart");
    click=0;
}
