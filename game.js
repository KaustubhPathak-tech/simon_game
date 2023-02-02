window.alert("This game can be played only on desktop/laptop !");

var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userchoosencolor = $(this).attr("id");
  userclickedpattern.push(userchoosencolor);
  buttonAnimation(userchoosencolor);
  playSound(userchoosencolor);
  checkanswer(userclickedpattern.length - 1);
});

function nextSequence() {
  userclickedpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomchosencolor = buttoncolors[randomnumber];
  gamepattern.push(randomchosencolor);

  $("#" + randomchosencolor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomchosencolor);
}

function checkanswer(currentlevel) {
  if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {
    if (gamepattern.length === userclickedpattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }
}

function startover() {
  level = 0;
  gamepattern = [];
  started = false;
}

function buttonAnimation(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
