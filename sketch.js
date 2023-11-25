//Variables Globales
var score = 0;
var estado_juego = "play"
var gruponubes 
var grupoobstaculos
var trex ,trex_running;
var ground ,grounds;
var tamaño_ground
var invisible_ground
var cloud, clouds;
var aleatorio
var obstaculos;
var obstaculo1 
var obstaculo2
var obstaculo3
var obstaculo4
var obstaculo5
var obstaculo6
var trex_collided
var game_over, juego_terminado;
var restart, reset;
var die_audio;
var jump;
var checkpoint;

function preload(){
  die_audio = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  checkpoint = loadSound("checkPoint.mp3")
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  grounds = loadImage("ground2.png")
  clouds = loadImage("cloud.png")
  juego_terminado = loadImage("gameOver.png")
  reset = loadImage("restart.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")

}

function setup(){
  createCanvas(500,500)
  
  gruponubes = createGroup()
  grupoobstaculos = createGroup()

  //Crea el sprite del Trex

  trex = createSprite(50,170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.6
  trex.setCollider("circle",0,0,40)
  trex.debug = false;
  ground = createSprite(0,210,490,20)
  ground.addImage("piso", grounds)
  invisible_ground = createSprite(0,220,490,20)
  invisible_ground.visible = false
  game_over = createSprite(210, 65, 10,10)
  game_over.addImage("pantalla_game_over", juego_terminado)
  game_over.scale = 1
  game_over.visible = false
  restart = createSprite(210, 120, 10, 10)
  restart.addImage("boton_reset", reset)
  restart.scale = 0.6
  restart.visible = false
  
}

function draw(){
  background("white")
  drawSprites();  
  if (estado_juego === "play") {
  contador()
  trex.changeAnimation("running", trex_running)
  trex.collide(invisible_ground)
  console.log(estado_juego)
  movepiso()
  salto()
  movenube()
  obstaculosf()
  colicion()
  
  }
  if (estado_juego === "end"){
  console.log(estado_juego)
  if (mousePressedOver(restart)) {
    reiniciar_juego()
  }
  }
}
function salto() {

if (keyDown("SPACE")&&trex.y>=150) {
    trex.velocityY = -9
    jump.play()
    
}
trex.velocityY = trex.velocityY+0.6
}

function movepiso(){
  ground.velocityX = -6
  tamaño_ground = ground.width
  console.log(tamaño_ground)
  if (ground.x < 0) {
    console.log("entro")
    ground.x = ground.width/2
  }
}
function movenube() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(600, 65, 10, 10)
  cloud.addImage("nube", clouds)
  cloud.scale = 1.3;
  cloud.velocityX = -8
  gruponubes.add(cloud)
  }


}
function obstaculosf() {
  if (frameCount % 100 == 0) {
    obstaculos = createSprite(550, 190, 10, 10)

    numero_aleatorio()
    switch (aleatorio) {
      case 1:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el 
        obstaculos.addImage(obstaculo1)
        break;
      case 2:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        obstaculos.addImage(obstaculo2)

        break;
      case 3:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        obstaculos.addImage(obstaculo3)

        break;
        case 4:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        obstaculos.addImage(obstaculo4)

        break;
        case 5:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        obstaculos.addImage(obstaculo5)

        break;
        case 6:
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        obstaculos.addImage(obstaculo6)

        break;
      default:
        break;
    }
  obstaculos.scale = 0.7
  obstaculos.velocityX = -6
  grupoobstaculos.add(obstaculos)
  
  }

}
function numero_aleatorio() {
  aleatorio = Math.round(random(1,6))
  console.log(aleatorio)
}
function colicion() {
    if (trex.isTouching(grupoobstaculos)) {
    console.log("entro a colision")
    die_audio.play()
    game_over.visible = true
  restart.visible = true
  juego_over()
  }
}
function juego_over() {
  console.log("entro a juego_over")
  grupoobstaculos.setVelocityXEach(0)
  gruponubes.setVelocityXEach(0)
  trex.velocityX = 0
  trex.velocityY = 0
  ground.velocityX = 0
  trex.changeAnimation("collided",trex_collided)
  
  estado_juego = "end"
}
function reiniciar_juego() {
  
  game_over.visible = false
  restart.visible = false
  trex.changeAnimation("running", trex_running)
  grupoobstaculos.destroyEach()
  gruponubes.destroyEach()
  estado_juego = "play"
  score = 0
}
function contador() {
  score = score + Math.round(getFrameRate()/60)
  //evaluacion con sonido
  if (score > 0 && score % 100 === 0) {
    console.log("sonido")
    checkpoint.play()
  }
  soe = "score: " + score;
  text(soe, 400, 50)
}