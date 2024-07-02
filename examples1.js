
let furby;

function preload(){
  img = loadImage('furby.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imagemMde(CENTER)
}

function draw() {

  if(mouseIsPressed == true){
    background(255,0,0)
  }

  else{
    background(0,0,255)
    image(furby,200,200)
  }
}