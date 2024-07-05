let furby 
let redVar
let greenVar
let blueVar

function preload(){
  furby = loadImage('furby.png')
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  imageMode(CENTER)
  background(random(255), random(255), random(255))
  redVar = random(0,255)
  greenVar = random(0,255)
  blueVar = random(0,255)
}



function draw(){
  // if(mouseIsPressed == true){
  //   background(255, 0, 0)
  //   image(furby, 400, 300)
  // }else{
  //   background(0,0,255)
  // }


  background(redVar, greenVar, blueVar)

  for(let i=0; i<1000; i=i+10){
    line(0, 0, i, windowHeight)
  }

  for(let i=0; i<windowHeight; i=i+10){
    line(0,i,windowHeight,i)
  }

  // for(let i=0; i<100; i++){
  //   ellipse(random(windowWidth), random(windowHeight), 20,20)
  // }


  ellipse(mouseX, mouseY, 50, 50)

  textSize(40)
  text('Hello World!', 100, 200)
}

function mouseClicked(){
  redVar = random(0,255)
  greenVar = random(0,255)
  blueVar = random(0,255)
}

function windowRezized(){
  resizeCanvas(windowWidth, windowHeight)
} 