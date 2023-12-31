const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine,world;
var ground,ball;
var box1,box2;
var bg;
var backgroundImg;
var gamestates = "onsling";
var score = 0;
var birdsCount = 5;
var birds = []


function preload(){
  bg = loadImage("sprites/bg.png");
}

function setup(){
  createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(600,595,1200,10);
  box1 = new Box(800,550);
  box2 = new Box(1000,550);
  box3 = new Box(800,450);
  box4 = new Box(1000,450);
  box5 = new Box(900,350);
  pig1 = new Pig(900,550)
  pig2 = new Pig(900,450)
  angleMode(RADIANS)
  log1 = new Log(900,480,20,300,PI/2)
  log2 = new Log(900,380,20,300,PI/2)
  log3 = new Log(820,340,20,140,PI/7)
  log4 = new Log(980,350,20,140,-PI/7)
  bird = new Bird(200,180);
  bird1 = new Bird(150,350);
  bird2 = new Bird(100,350);
  bird3 = new Bird(50,350);
  birds.push(bird3);
  birds.push(bird2);
  birds.push(bird1);
  birds.push(bird);
  platform = new Ground(160,460,320,260);
  sling = new Slingshot(birds[birds.length-1].body,{x:200,y:163})

  
}
function draw(){
  background(bg);
  Engine.update(engine);
  textSize(30);
  fill("black");
  stroke("blue");
  text("score "+score,600,100)
  //text("chances "+birdsCount,600,300)
  //text("target "+"100",600,200);
  
  console.log(birdsCount)
  if(score === 100){
    gamestates = "win";
    
  }
  if(gamestates != "win"){
    
    
  rectMode(CENTER);
  ground.display();
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  log1.display();
  log2.display();
  log3.display();
  log4.display();
  pig1.display();
  pig1.score();
  pig2.display();
  pig2.score();
  bird.display();
  bird1.display();
  bird2.display();
  bird3.display();
  platform.display();
 
  sling.display();
}
if(gamestates === "win"){
  textSize(30)
    fill("black");
    stroke("blue");
    text("YOU DID IT",600,400);
    if(birds.length === 3){
      text("3 Stars",650,350)
    }
    if(birds.length === 2){
      text("2 Stars",650,350)
    }
    if(birds.length <= 1){
      text("1 Stars",650,350)
    }
}
}
function mouseDragged(){
  if(gamestates != "flying"){
  Matter.Body.setPosition(birds[birds.length-1].body,{x:mouseX,y:mouseY})
  Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:-5})
}
}
function mouseReleased(){
  sling.fly();
  gamestates = "flying";
  birds.pop()
}
function keyPressed(){
  
  if(keyCode === 32&& birdsCount >0){
    birdsCount = birdsCount -1;
    Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:200})
    sling.attach(birds[birds.length-1].body);
    gamestates = "onsling"
    bird.traj = []
    bird1.traj = []
    bird2.traj = []
    bird3.traj = []
  }
}
 async function ChangeBackground(){
 var timeFetch = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
 var timeJson = await timeFetch.json()
 var dt = timeJson.datetime;
 var hour = dt.slice(11,13)
 if(hour>6&&hour<18){
   bg = "sprites/bg.png";
 }
 else{
   bg = "sprites/bg2.jpg"
 }
 backgroundImg = loadImage(bg);
}
