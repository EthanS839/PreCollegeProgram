let ship;
let shipX;
let shipY;
let sLaser;

let sLasers = [];
let aliens = [];

let Alien1;
let Alien2;

let alienSpeed = 1;
let alienDirection = 1;
let round = 1;
let maxRounds = 4;

function preload(){
	ship = loadImage('Ship.png');
	sLaser = loadImage('Lazer.png');
	Alien1 = loadImage('Alien1.png');
	Alien2 = loadImage('Alien2.png');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	shipX = windowWidth / 2;
	shipY = windowHeight - 50;
	createAliens();
}

function draw(){
	background(0);
	image(ship, shipX, shipY, 65, 65);
	
	// Move ship left or right depending on arrow keys
	if (keyIsDown(LEFT_ARROW) && shipX > 33) {
		shipX -= 5;
	}
	if (keyIsDown(RIGHT_ARROW) && shipX < windowWidth - 32) {
		shipX += 5;
	}

	// Update and draw lasers
	for (let i = sLasers.length - 1; i >= 0; i--) {
		sLasers[i].y -= 10;  // Move laser up
		image(sLaser, sLasers[i].x - 3, sLasers[i].y - 10, 70, 70);

		// Check for collision with aliens
		for (let j = aliens.length - 1; j >= 0; j--) {
			if (dist(sLasers[i].x, sLasers[i].y, aliens[j].x, aliens[j].y) < 35) {
				aliens.splice(j, 1);  // Remove alien if hit
				sLasers.splice(i, 1); // Remove laser if hit
				break;
			}
		}

		// Remove laser if it goes off screen
		if (sLasers[i] && sLasers[i].y < 0) {
			sLasers.splice(i, 1);
		}
	}

	// Move aliens left and right
	let hitWall = false;
	for (let alien of aliens) {
		alien.x += alienSpeed * alienDirection;
		if (alien.x > windowWidth - 30 || alien.x < 30) {
			hitWall = true;
		}
	}
	if (hitWall) {
		alienDirection *= -1;
		for (let alien of aliens) {
			alien.y += 40; // Move aliens down
		}
	}

	// Draw aliens
	for (let alien of aliens) {
		image(alien.type, alien.x, alien.y, 60, 60);
	}

	// Check if all aliens are destroyed
	if (aliens.length === 0) {
		if (round < maxRounds) {
			round++;
			alienSpeed += 0.5; // Increase difficulty
			createAliens();
		} else {
			textAlign(CENTER);
			fill(255);
			textSize(32);
			text('You Win!', width / 2, height / 2);
			noLoop();
		}
	}
}

function createAliens() {
	aliens = [];
	let rows = 4;
	let cols = 10;
	let alienWidth = 60;
	let alienHeight = 60;
	let spacing = 80;

	// Set up Aliens in 4 rows of 10 and space them out accordingly
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let x = col * spacing + spacing / 2;
			let y = row * spacing + spacing / 2 + 50;
			let type = (row % 2 === 0) ? Alien1 : Alien2;
			aliens.push({x: x, y: y, type: type});
		}
	}
}

function keyPressed() {
	// Add a new laser at the ship's position
	if (key === ' ') {
		sLasers.push({x: shipX, y: shipY});
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}