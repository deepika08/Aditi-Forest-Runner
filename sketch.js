var bg,coin,sound,bg2
var ground,animal1,animal2,animal3,animal4
var fruit1,fruit2,fruit3,fruit4,fruit5
var fruitsG,tigerG,elephantG,tigerRunning
var boy,boy_img
var gameOver_img,restart_img
var obstacle,stone1,stone2,stone3,stone4
var strength=100
var score=0;
var scw =0;
var stw = 100;
var PLAY=1
var END=0
var gameState=PLAY; 
var restart,gameOver
var obstaclesG,coinG
var coinS
function preload(){
      boy_running = loadAnimation("boy/boy1.png","boy/boy2.png","boy/boy3.png","boy/boy4.png","boy/boy5.png","boy/boy6.png")
      boyImg = loadImage("boy.gif")
      bgfinal = loadImage("bg.png")
      bg1=loadImage("bg1.jpg")
      coin=loadImage("coin.png")
      sound=loadSound("coins sound.wav")
      bg2=loadImage("bg2.jpg")
      restart_img=loadImage("restart.png")
      gameOver_img=loadImage("gameover0.png")
      stone1=loadImage("stone/stone1.png")
      stone2=loadImage("stone/stone2.png")
      stone3=loadImage("stone/stone3.png")
      stone4=loadImage("stone/stone4.png")
      fruit1Img=loadImage("fruits/apple.png")
      fruit2Img=loadImage("fruits/grapes.png")
       tigerRunning = loadAnimation("tiger/sprite_0.png","tiger/sprite_1.png")
      fruit3Img=loadImage("fruits/banana.png")
      fruit4Img=loadImage("fruits/pineapple.png")
coinS=loadSound("coins sound.wav")
tigerImg = loadImage("tiger/sprite_0.png")
tigerSound = loadSound("tiger.mp3")
stoneSound= loadSound("stone.mp3")
backgroundSound = loadSound("background.mp3")
eatingSound = loadSound("eating.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  forest = createSprite(width/2, height/2)
  forest.addImage(bg1)
  forest.scale = 3.9
  forest.velocityY = 3;
  forest.y = forest.width/2
  ground=createSprite(width/2, height -3, width,20)
  ground.visible = false

  boy=createSprite(width/2,height-5,50,50)
  boy.addAnimation("running", boy_running)
  boy.debug=true
  boy.setCollider("rectangle",0,0,boy.width,boy.height)
  //boy.addImage(boyImg)
  boy.scale=0.5

  restart=createSprite(windowWidth/2,400,20,20)
  restart.addImage(restart_img)
  restart.scale=1.3
restart.visible=false
  gameOver=createSprite(200,300,20,20)
  gameOver.addImage(gameOver_img)
  gameOver.scale=1.3
gameOver.visible=false
obstaclesG=new Group ()
coinG=new Group()
fruitsG=new Group()
tigerG=new Group()
elephantG=new Group()
backgroundSound.loop();
}

function draw() {
  background("brown");  
if(gameState===PLAY){
  if(backgroundSound.isPaused()){
    backgroundSound.play()
  }
  if(forest.y > height-500)
  {
    forest.y = forest.height/2
  }
  camera.position.X=boy.X
  camera.position.Y=boy.Y

  boy.velocityY=boy.velocityY+0.8

    if(keyDown(UP_ARROW) && boy.y >height/2-100){
      boy.y-=2
      
    }
 
    if(keyDown(DOWN_ARROW)){
      boy.y+=2
      
    }
    if(keyDown(LEFT_ARROW)&& boy.x > width/2 -200){
      
      boy.x-=2
    }
    if(keyDown(RIGHT_ARROW) && boy.x < width/2 +200){
      
      boy.x+=2
    }
    stones()
    coins()
    fruits()
    tiger()
    for(var i=0;i<coinG.length;i++){
      if(boy.isTouching(coinG.get(i))){
        score+=5
        if(backgroundSound.isPlaying()){
          backgroundSound.pause()
          coinS.play()
        }
        scw = score
        coinG.get(i).destroy()
      }
    }
    for(var i=0;i<fruitsG.length;i++){
      if(boy.isTouching(fruitsG.get(i))){
        strength+=10
        if(backgroundSound.isPlaying()){
          backgroundSound.pause()
          eatingSound.play()
        }
        stw = strength
        fruitsG.get(i).destroy()
      }}

   for(var i=0;i<obstaclesG.length;i++){
    if(boy.isTouching(obstaclesG.get(i))){
      strength-=10
      if(backgroundSound.isPlaying()){
        backgroundSound.pause()
        stoneSound.play()
      }
      stw = strength
      obstaclesG.get(i).destroy()
     }
   }

   for(var i=0;i<tigerG.length;i++){
     if(boy.isTouching(tigerG.get(i))){
       strength-=50
       if(backgroundSound.isPlaying()){
        backgroundSound.pause()
        tigerSound.play()
      }
       stw = strength
       tigerG.get(i).destroy()
     }
   }
    if(strength<=0){
      gameState=END;
    }
}else if (gameState===END){
gameOver.visible=true
restart.visible=true
fruitsG.setLifetimeEach(-1)
obstaclesG.setLifetimeEach(-1)
coinG.setLifetimeEach(-1)
elephantG.setLifetimeEach(-1)
tigerG.setLifetimeEach(-1)

tigerG.setVelocityEach(0,0)
obstaclesG.setVelocityEach(0,0)
elephantG.setVelocityEach(0,0)
coinG.setVelocityEach(0,0)
fruitsG.setVelocityEach(0,0)
boy.velocityY=0
forest.velocityY=0
if(mousePressedOver(restart)){
  reset()
}
}
  boy.collide(ground)
  
  drawSprites();
  
  textSize(30)
  if(score>=100){
    score = 100
    scw = score
  }
  if(strength<=0){
    strength = 0
    stw = strength
  }

  fill ("blue")
  strokeWeight(7)
  text ("x"+mouseX+",y"+mouseY,50,50)
  text ("Score="+score,200,350)
  stroke("blue")
  line(200,370, 210+scw, 370)
  fill("red")
  noStroke()
  text ("Strength="+strength,200,420)
  stroke("red")
  line(200,440,210+ stw, 440)
}
function tiger(){
  if(frameCount % 160 ===0){
    var tiger=createSprite(width/2-300,height-50,50,50)
  //tiger.addAnimation(tigerRunning)
  tiger.addImage(tigerImg)
     tiger.velocityX=3
     tiger.scale=0.25
     tiger.lifetime = 300
     tiger.debug=true
     tiger.setCollider("circle",0,0,tiger.height-30)
     tigerG.add(tiger)
  }
}

function stones(){
  if(frameCount % 160 ===0){
   var obstacle=createSprite(Math.round(random(width/2-200, width/2+200)),height/2+200,50,50)
   var r = Math.round(random(1,4))
   switch(r){
      case 1:  obstacle.addImage(stone1);
              break;
      case 2:  obstacle.addImage(stone2);
              break;
      case 3:  obstacle.addImage(stone3);
              break;
      case 4:  obstacle.addImage(stone4);
              break;
      default: break;
   }
   
    obstacle.velocityY=3
    obstacle.scale=0.8
    obstacle.lifetime = 300
    obstacle.debug=true
    obstacle.setCollider("circle",0,0,40)
    obstaclesG.add (obstacle)
    
  }
  
  }
function fruits(){
  if(frameCount % 200===0){
  var fruits=createSprite(Math.round(random(width/2-200,width/2+200)),height/2+200,50,50)
  var i=Math.round(random(1,4))
  switch(i){
    case 1:fruits.addImage(fruit1Img)
    break;
    case 2:fruits.addImage(fruit2Img)
    break;
    case 3:fruits.addImage(fruit3Img)
    break;
    case 4:fruits.addImage(fruit4Img)
    break;
    
    default :break;
  }
   fruits.velocityY=3
    fruits.scale=0.15
    fruits.lifetime = 300
    fruits.debug=true
    fruits.setCollider("circle",0,0,40)
    fruitsG.add(fruits)
  }
  
}
  function coins(){
    if(frameCount% 300 ===0){
     var coins=createSprite(Math.round(random(width/2-200, width/2+200)),height/2+200,50,50)
      coins.addImage(coin)
        coins.scale=0.3
        coins.velocityY=3
        coins.lifetime = 300
        coins.debug=true
        coins.setCollider("circle",0,0,40)
coinS.play()
        coinG.add(coins)


    }
    
  }
  function keyPressed(){
    if(keyCode===32 && boy.y>height/2-300){
      boy.velocityY=-5
    }
  }
  function reset(){
gameState=PLAY
    strength=100
    score=0
    gameOver.visible=false
    restart.visible=false

    fruitsG.destroyEach()
    obstaclesG.destroyEach()
    coinG.destroyEach()
    elephantG.destroyEach()
    tigerG.destroyEach()
  }