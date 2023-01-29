window.alert("This game can be played only on desktop/laptop !")


var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

$(".btn").click(function () {
  var userchoosencolor = this.id;
  userclickedpattern.push(userchoosencolor);
  buttonAnimation(userchoosencolor);
  playSound(userchoosencolor);
  if(gamepattern.length===userclickedpattern.length){checkanswer(level);}
  
});

function nextSequence() {
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
  var trueevent=0;
  for(var i=0;i<currentlevel;i++){
    if(gamepattern[i]===userclickedpattern[i]){
        trueevent++;
    }
  }
  
  
  if (trueevent===currentlevel) {
    console.log("success");
    if (gamepattern.length === userclickedpattern.length) {
      setTimeout(function () {
        nextSequence();
        userclickedpattern = [];
      }, 1000);
    }
  } else {
    
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startover();
    
  }
}

function startover() {
  level = 0;
  started = false;
  gamepattern = [];
  userclickedpattern=[];
}



function buttonAnimation(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}
