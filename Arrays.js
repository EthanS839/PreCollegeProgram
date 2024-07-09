let squareNums = [25,36,49,64,81,100]

function setup(){
	createCanvas(windowWidth, windowHeight)

	print(squareNums[0])

	background(255)

	for(let i = 0; i<squareNums.length; i++){
		let posX = random(100, windowWidth-100)
		let posY = random(100, windowHeight-100)

		fill(255,0,0)
		ellipse(posX, posY, squareNums[i], squareNums[i])

		fill(0)
		textSize(20)
		text(squareNums[i], posX-10, posY)
	}
}

function draw(){

}