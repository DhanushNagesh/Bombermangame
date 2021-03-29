var wall
var Owall,Owall2,Owall3,Owall4;
var bomberMan
var bomb
var inWall
var ghost

function preload(){
 brickImage=loadImage("images/brick.jpg");
 staticImage=loadImage("images/staticBrick.png");
 bombermanFront=loadAnimation("images/bomberman move/tile007.png");
 bombermanRight=loadAnimation("images/bomberman move/tile003.png", 
 "images/bomberman move/tile004.png", "images/bomberman move/tile005.png")
 bombermanUp=loadAnimation("images/bomberman move/tile009.png", 
 "images/bomberman move/tile010.png", "images/bomberman move/tile011.png")
 bombermanDown=loadAnimation("images/bomberman move/tile006.png", 
 "images/bomberman move/tile007.png", "images/bomberman move/tile008.png")
 bombermanLeft=loadAnimation("images/bomberman move/tile000.png","images/bomberman move/tile001.png",
 "images/bomberman move/tile002.png")
 bombAnim=loadAnimation("images/bomb1.png","images/bomb2.png","images/bomb3.png",
 "images/bomb1.png","images/bomb2.png","images/bomb3.png",
 "images/bomb1.png","images/bomb2.png","images/bomb3.png",
 "images/bomb4.png")
 ghostAnim = loadAnimation("images/tile001.png","images/tile002.png","images/tile003.png",
 "images/tile004.png","images/tile005.png")
}

function setup() {
  createCanvas(displayHeight,displayHeight)
  wallGroup=new Group();
  bombGroup = new Group();
  inWallGroup = new Group();
  obstaclesGroup=new Group();
  spawnObstacles(); 


  for(var e = 232; e<height-50;e=e+70){
    for(var o = 232; o<height-50;o=o+70){
      var num=Math.round(random(0,1.5))
      switch(num){
        case 0: inWall = createSprite(e,o,40,40)
                inWall.addImage(brickImage)
                inWall.scale = 0.14;
                inWallGroup.add(inWall)
          break;
        case 1:break;
      }
    }
  }

for(var i = 160; i < height;i+=140){
  for(var e = 160; e < 620; e+=140){
  wall = createSprite(i,e,70,70)
  wall.addImage(staticImage)
  wall.scale = 0.5
  wallGroup.add(wall)
  }
}
    Owall=createSprite(height/2,25,height,70)
    Owall.shapeColor="black"
    Owall2=createSprite(height/2,715,height,70)
    Owall2.shapeColor="black"
    Owall3 = createSprite(30,height/2,60,height)
    Owall3.shapeColor="black"
    Owall4 = createSprite(width-10,height/2,60,height)
    Owall4.shapeColor="black"

    bomberMan = createSprite( 100,100,50,50 )
    bomberMan.scale=3.5
    bomberMan.addAnimation("front",bombermanFront)
    bomberMan.addAnimation("left",bombermanLeft)
    bomberMan.addAnimation("right",bombermanRight)
    bomberMan.addAnimation("up",bombermanUp)
    bomberMan.addAnimation("down",bombermanDown)

  for(var o = 80; o<height;o+=height/10){
    Owall=createSprite(o,25,50,60)
    Owall.addImage(staticImage)
    Owall.scale=0.5
    Owall2=createSprite(o,715,50,60)
    Owall2.addImage(staticImage)
    Owall2.scale=0.5
    Owall3=createSprite(25,o,50,60)
    Owall3.addImage(staticImage)
    Owall3.scale=0.5
    Owall4=createSprite(715,o,50,60)
    Owall4.addImage(staticImage)
    Owall4.scale=0.5

    wallGroup.add(Owall)
    wallGroup.add(Owall2)
    wallGroup.add(Owall3)
    wallGroup.add(Owall4)

  }

  
  

  
}

function draw() {
  background("green");  
  //World.frameRate=20;
  if(keyDown(LEFT_ARROW)){
    bomberMan.x=bomberMan.x-3
    bomberMan.changeAnimation("left",bombermanLeft)
  }
  if(keyDown(RIGHT_ARROW)){
    bomberMan.x=bomberMan.x+3
    bomberMan.changeAnimation("right",bombermanRight)
  } 
  if(keyDown(UP_ARROW)){
    bomberMan.y=bomberMan.y-3
    bomberMan.changeAnimation("up",bombermanUp)
  }
  if(keyDown(DOWN_ARROW)){
    bomberMan.y=bomberMan.y+3
    bomberMan.changeAnimation("down",bombermanDown)
  }

  if(keyWentUp(DOWN_ARROW)||keyWentUp(UP_ARROW)||keyWentUp(LEFT_ARROW)||keyWentUp(RIGHT_ARROW)){
    bomberMan.changeAnimation("front",bombermanFront)
  }

  if(bomberMan.isTouching(obstaclesGroup)){
    
  }
    
  bomberMan.collide(wallGroup)
  bomberMan.collide(inWallGroup)
  obstaclesGroup.bounceOff(wallGroup)
  obstaclesGroup.bounceOff(inWallGroup)
  
  drawSprites();
}

function keyPressed(){
  if(keyCode===32 && bombGroup.length==0){
    bomb = createSprite(bomberMan.x,bomberMan.y,20,20)
    bomb.addAnimation("bomb",bombAnim)
    bomb.scale = 2
    bombGroup.add(bomb)
    bomb.lifetime=200;

  }
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    for(var e = 232; e<height-50;e=e+68){
      for(var o = 232; o<height-50;o=o+68){
        var num=Math.round(random(0,5))
        switch(num){
          case 0: ghost = createSprite(e,o,40,40)
                  ghost.scale = 3.5;
                  ghost.setVelocity(-4,-4)
                  ghost.addAnimation("ghost",ghostAnim)
                  obstaclesGroup.add(ghost)
            break;
          case 1:break;
        }
      }
    }
  }
}