// alert("hi");
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var usrClickedPtrn = [];

var started = "false";
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

function checkAns(currentLevel) {

  if (gamePattern[currentLevel] === usrClickedPtrn[currentLevel]) {
    if (usrClickedPtrn.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}



function nextSequence() {
  usrClickedPtrn = [];
  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randChosCol = buttonColors[randomNumber];
  gamePattern.push(randChosCol);


  $("#" + randChosCol).fadeIn(100).fadeOut(100).fadeIn(100);

  // var audio = new Audio("sounds/" + randChosCol + ".mp3");
  // audio.play();
  playSound(randChosCol);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

$(".btn").click(function() {
  var usrChosenCol = $(this).attr("id");
  usrClickedPtrn.push(usrChosenCol);
  // console.log(usrClickedPtrn);
  playSound(usrChosenCol);
  animatePress(usrChosenCol);

  checkAns(usrClickedPtrn.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
