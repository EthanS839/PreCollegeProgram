let isDay = true;

let car
let carX = 800
let carY = 575

let Xspeed = 3
let Yspeed = 3
function preload(){
  car = loadImage('car.png')
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  imageMode(CENTER)

}

function draw() {
  if (isDay) {
    background(55, 193, 240);
  } else {
    background(20, 24, 82);
  }

  //Sun or Moon
  if (isDay) {
    fill(253, 184, 19);
  } else {
    fill(255, 255, 255);
  }
  noStroke();
  ellipse(0, 0, 150);

  //Road
  fill(138, 135, 128);
  rect(500, 625, 1000, 150);

  fill(253, 218, 22);
  rect(50, 630, 50, 15);
  rect(250, 630, 50, 15);
  rect(450, 630, 50, 15);
  rect(650, 630, 50, 15);

  //Car
  image(car, carX , carY, 100,100)


  carX = carX - Xspeed

  if(carX <= -50)
    carX = 900
  //House 1
  stroke(0);
  fill(247, 210, 100);
  rect(275, 400, 200, 300);

  // Windows
  if (isDay) {
    fill(255, 255, 255);
  } else {
    fill(253, 218, 22);
  }
  rect(225, 340, 50, 70, 3);
  rect(325, 340, 50, 70, 3);
  rect(225, 465, 50, 70, 3);
  rect(325, 465, 50, 70, 3);

  fill(120, 50, 25);
  triangle(175, 250, 275, 150, 375, 250);

  // House 2
  fill(193, 194, 199);
  rect(500, 350, 200, 400);
  rect(500, 145, 175, 10);
  rect(500, 135, 135, 10);
  rect(500, 125, 95, 10);
  rect(500, 115, 55, 10);
  rect(500, 72, 15, 75);

  // Windows
  if (isDay) {
    fill(255, 255, 255);
  } else {
    fill(253, 218, 22);
  }
  rect(500, 225, 160, 30);
  rect(500, 300, 160, 30);
  rect(500, 375, 160, 30);
  rect(500, 450, 160, 30);
}

function mousePressed() {
  // Check if the mouse is clicked on the sun
  let d = dist(mouseX, mouseY, 0, 0);
  if (d < 75) {
    isDay = !isDay;
  }
}

function windowRezized(){
  resizeCanvas(windowWidth, windowHeight)
} 