screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";
draw_apple = ""

var speechRecognition = window.webkitSpeechRecognition;
 var recognition = new speechRecognition();

function preload()
{
  apple = loadImage("apple.png");
}

function starting()
 {
    document.getElementById("status").innerHTML = "System is Listening please speak";
    recognition.start();
 }

 recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("status").innerHTML = "Speech has been recognized as" + content;
    to_number = Number(content);
    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started drawing apples";
      draw_apple = "set";

    }else
    {
      document.getElementById("status").innerHTML = "The speech has not recognized a number";
    }
 
  }

function setup()
{
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(0,150);
}

function draw()
{
  if(draw_apple == "set"){
    for(i=1; i<= to_number; i++){
      x = Math.floor(Math.random()*700);
      y = Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
    }
      document.getElementById("status").innerHTML = to_number + " apples drawn";
      speak_data = to_number + "Apples drawn";
      speak();
      draw_apple = "";
  }
  

}

function speak()
{

 var synth = window.speechSynthesis;
  utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}