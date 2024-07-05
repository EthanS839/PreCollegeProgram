
let furby

let furbyX
let furbyY

let Xspeed = 3
let Yspeed = 3

let score = 0

let mouseDist

let startBool = true
let winBool = false

function preload(){
  furby = loadImage('furby.png')
}


function setup(){
  createCanvas(windowWidth, windowHeight)

  furbyX = windowWidth/2
  furbyY = windowHeight/2
  imageMode(CENTER)
}

function draw(){
  if(startBool == true){
    startGame()
  }
  if(winBool == true){
    winGame()
  }
}

//Function for game
function startGame(){
  background(0)
  fill(255)
  textSize(40)
  text('Tag the Furby! score: '+ score + ' points', 25, 100)

  image(furby, furbyX, furbyY, 50, 50)
  mouseDist = dist(mouseX, mouseY, furbyX, furbyY)

  furbyX = furbyX + Xspeed
  furbyY = furbyY + Yspeed

  if(furbyX >= windowWidth-25 || furbyX <= 25){
    Xspeed = Xspeed * -1
  }

  if(furbyY >= windowHeight-25 || furbyY <= 25){
    Yspeed = Yspeed * -1
  }

  if(mouseDist < 25){
    score++
    furbyX = random(26, windowWidth - 26)
    furbyY = random(26, windowHeight - 26)

    Xspeed = Xspeed * 1.2
    Yspeed = Yspeed * 1.2
  }
    if(score == 5){
      startBool = false
      winBool = true
    }
}

//function for win screen
function winGame(){
  background(0)
  fill(255)
  textSize(40)
  text("You Won!", 10, 100)
  image(furby, windowWidth/2, windowHeight/2)
}

function windowRezized(){
  resizeCanvas(windowWidth, windowHeight)
}