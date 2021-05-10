
var travellerImg,traveller,traveller_collided;
var ground, invisiGround, groundImg,backgroundImg;
var  obstacle, obstacleImage,gameOverImg,restartImg;
var obstacleGroup;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  backgroundImg=loadImage("Images/Jungle.png")
  travellerImg=loadAnimation("Images/Traveller1.png","Images/Traveller1.png","Images/Traveller2.png","Images/Traveller3.png","Images/Traveller5.png","Images/Traveller6.png","Images/Traveller7.png","Images/Traveller8.png")
  gameOverImg=loadImage("Images/Game Over.png")
  restartImg=loadImage("Images/restart.png")
  traveller_collided=loadImage("Images/Traveller2.png")

  

  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();

 
  traveller = createSprite(80,230,10,10);
  traveller.scale = 0.9;
  traveller.addAnimation("explorer", travellerImg);
  traveller.addAnimation("collide", traveller_collided);
  
    
  ground = createSprite(300,340,600,10);
  ground.velocityX = -(6 + 3*score/100);
  ground.scale = 1;

  
  invisiGround = createSprite(300,247,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  background(backgroundImg);
  background.setVelocityXEach=-10

  fill("white");
  textSize(25)
  text("SURVIVAL TIME: "+score, 370, 30);

   
  if (gameState === PLAY){
    obstacles();
 
    score = score + Math.round(getFrameRate()/10);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("up") && traveller.y >= 150) {
      traveller.velocityY = -13; 
    }

    
    traveller.velocityY = traveller.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

    
    if (traveller.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    traveller.y = 235;

    traveller.changeAnimation("collide", traveller_collided);
    
    obstacleGroup.setVelocityXEach(0);
 
    obstacleGroup.setLifetimeEach(-1);
   
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("yellow");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){

      obstacleGroup.destroyEach();
      traveller.changeAnimation("explorer", travellerImg);
      score = 0;

      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  traveller.collide(invisiGround);
}

  


function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.10 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






