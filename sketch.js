var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGrp
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var score = 0;
var bullets = 10;
var gameState ="PLAY"


function preload(){

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  bulletGroup = new Group()
  zombieGrp = new Group();

  heart1 = createSprite(displayWidth-150, 70, 20, 20)
  heart1.addImage(heart1Img)
  heart1.scale = 0.5
  heart1.visible = false;

  heart2 = createSprite(displayWidth-150, 70, 20, 20)
  heart2.addImage(heart2Img)
  heart2.scale = 0.5
  heart2.visible = false;

  heart3 = createSprite(displayWidth-150, 70, 20, 20)
  heart3.addImage(heart3Img)
  heart3.scale = 0.5
  heart3.visible = true;

}

function draw() {
  background(0);
  fill("white")
  textSize(25)
  text('lives = '+ life ,displayWidth-200, 150 );

  text('scores = '+ score ,displayWidth-200, 200 );

  text('bullet = '+ bullets ,displayWidth-200, 250 );

  if (gameState === "PLAY") {

  if (life === 3) {
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }

  if (life === 2) {
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = false;
  }

  if (life === 1) {
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }

if (life === 0) {
  gameState = "LOST"
}

if (score === 50) {
  gameState = "WON"
}


if (bullets === 0) {
  gameState = "bullets"
}


if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")){
  player.x = player.x-30
}
if(keyDown("RIGHT_ARROW")){
  player.x = player.x+30
}

if(keyWentDown("SPACE")){
  player.addImage(shooter_shooting)
  bullet = createSprite(displayWidth-1150,player.y, 40, 10)
  bullet.velocityX = 25

  bulletGroup.add(bullet)
  bullets = bullets-1
  
}
else if(keyWentUp("SPACE")){
  player.addImage(shooterImg)
}

if(zombieGrp.isTouching(player)){

for(var i = 0;i<zombieGrp.length;i++){

if (zombieGrp[i].isTouching(player)){
  life = life-1

 zombieGrp[i].destroy()

}

}

}


if(zombieGrp.isTouching(bulletGroup)){

  for(var i = 0;i<zombieGrp.length;i++){
  
  if (zombieGrp[i].isTouching(bulletGroup)){
    score = score+2
  
   zombieGrp[i].destroy();
   bulletGroup.destroyEach();
  }
  
  }
  
  }

spawnZombie();
}
if (gameState === "LOST") {
  background("black")
  textSize(100)
  text('you lost' , displayWidth/2 , displayHeight/2)
  zombieGrp.destroyEach();
  player.destroy();
  bg.destroy();
}

if (gameState === "WON") {
  background("black")
  fill("yellow")
  textSize(100)
  text('you won' , displayWidth/2 , displayHeight/2)
  zombieGrp.destroyEach();
  player.destroy();
  bg.destroy();
}

else if(gameState === "bullets"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

drawSprites();

}
function spawnZombie(){
  if (frameCount%55 === 0){

    zombie = createSprite(random(1000,2000),random(100,600),10,10)
    zombie.addImage(zombieImg)
    zombie.scale = 0.2

    zombie.velocityX =-3 
    zombie.lifetime = 700

    zombieGrp.add(zombie)

  }
  
}
  