
let furby

let furbyBrushbool = false
let ellipseBrushbool = false
function preload(){
  furby = loadImage('furby.png')
}
function setup(){
  createCanvas(windowWidth, windowHeight)
  background(255)
  imageMode(CENTER)
}

function draw(){
  if(furbyBrushbool == true){
    furbyBrush()
  }
  if(ellipseBrushbool == true){
    ellipseBrush()
  }
}

function furbyBrush(){
  image(furby, mouseX, mouseY, 50, 50)
}

function ellipseBrush(){
  fill(random(255), random(255), random(255))
  ellipse(mouseX, mouseY, 50, 50)
}

function keyPressed(){
  if(key === 'q'){
    furbyBrushbool = true
    ellipseBrushbool = false
  }

  if(key === 'w'){
    furbyBrushbool = false
    ellipseBrushbool = true
  }
}

function mouseDragged(){
  // if(furbyBrushbool == true){
  //    furbyBrush()
  //  }
  //  if(ellipseBrushbool == true){
  //    ellipseBrush()
  //  }
}

function windowRezized(){
  resizeCanvas(windowWidth, windowHeight)
}