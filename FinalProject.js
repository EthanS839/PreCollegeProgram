let ship;
let shipX;
let shipY;
let sLaser;
let aLaser;
let flatlineSound;
let emulogicFont;

let sLasers = [];
let aLasers = [];
let enemies = [];
let boss;
let bossHealth = 100;

let Cold;
let HeatStroke;
let Flu;
let Cancer;

let ColdBackground;
let HeatStrokeBackground;
let FluBackground;
let CancerBackground;

let enemySpeed = 1;
let enemyDirection = 1;
let round = 1;
let maxRounds = 4;
let lives = 5;
let timer;
let roundTime = 35;
let waveTimer;
let waveInterval = 10;
let virusSpreadTextTime;
let coldSpawnRate = 2000;

let gameState = "start"; // Game states: start, play, transition, end, win
let startButton;
let continueButton;
let roundTransitionTimer;

function preload(){
    ship = loadImage('Syringe.png');  
    sLaser = loadImage('Antibody.png');
    aLaser = loadImage('Germ.png'); 
    Cold = loadImage('Cold.png'); 
    HeatStroke = loadImage('HeatStroke.png'); 
    Flu = loadImage('Flu.png'); 
    Cancer = loadImage('Cancer.png');
    ColdBackground = loadImage('ColdBackground.png');
    HeatStrokeBackground = loadImage('HeatStrokeBackground.png');
    FluBackground = loadImage('FluBackground.png');
    CancerBackground = loadImage('CancerBackground.png');
    flatlineSound = createVideo(['Flatline.mp4']);
    flatlineSound.hide();  // Hide the video element
    emulogicFont = loadFont('Emulogic-zrEw.ttf'); // Load the font
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textFont(emulogicFont);  // Set the font for all text
    shipX = windowWidth / 2;
    shipY = windowHeight - 50;
    timer = millis();
    waveTimer = millis();
    virusSpreadTextTime = -1;
    createEnemies();
    
    // Start screen button
    startButton = createButton('Start Game');
    startButton.position(width / 2 - startButton.width / 2, height / 2 + 50);
    startButton.mousePressed(startGame);
}

function draw(){
    background(0); // Black background for all screens

    if (gameState === "start") {
        drawStartScreen();
    } else if (gameState === "play") {
        playGame();
    } else if (gameState === "transition") {
        drawTransitionScreen();
    } else if (gameState === "end") {
        drawEndScreen();
    } else if (gameState === "win") {
        drawWinScreen();
    }
}

function drawStartScreen() {
    textAlign(CENTER);
    fill(255);
    textSize(50);
    text("Virus Defense", width / 2, height / 2 - 100);
    textSize(32);
    text("Defend your body from viruses!", width / 2, height / 2 - 50);
}

function startGame() {
    gameState = "transition";
    startButton.hide();
    roundTransitionTimer = millis();
}

function drawTransitionScreen() {
    let illness = getIllnessName(round);
    let message = `You have contracted ${illness}!`;
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text(message, width / 2, height / 2);
    text("Survive the time!", width / 2, height / 2 + 50);

    if (millis() - roundTransitionTimer > 3000) { // Transition for 3 seconds
        gameState = "play";
        timer = millis();
        waveTimer = millis();
        createEnemies();
    }
}

function playGame() {
    // Draw the appropriate background based on the current round and scale it to fit the screen
    if (round === 1) {
        image(ColdBackground, width / 2, height / 2, width, height);
    } else if (round === 2) {
        image(HeatStrokeBackground, width / 2, height / 2, width, height);
    } else if (round === 3) {
        image(FluBackground, width / 2, height / 2, width, height);
    } else if (round === 4) {
        image(CancerBackground, width / 2, height / 2, width, height);
    }

    // Draw the ship
    image(ship, shipX, shipY, 65, 65);

    // Timer
    let timeLeft = roundTime + (round - 1) * 10 - int((millis() - timer) / 1000);
    if (timeLeft <= 0) {
        if (round < maxRounds) {
            gameState = "continue";
            continueButton = createButton('Continue');
            displayMessage(`You have survived ${getIllnessName(round)}!`);
            continueButton.position(width / 2 - continueButton.width / 2, height / 2 + 50);
            continueButton.mousePressed(() => {
                round++;
                enemySpeed += 0.5; // Increase speed
                enemies = []; // Clear previous round enemies
                aLasers = []; // Clear previous round aLasers
                sLasers = []; // Clear previous round sLasers
                boss = null; // Clear boss if it was the cancer round
                bossHealth = 100; // Reset boss health
                roundTransitionTimer = millis();
                continueButton.remove();
                gameState = "transition";
            });
            return;
        } else {
            gameState = "win";
            return;
        }
    }

    // Add new wave of enemies every waveInterval seconds
    if (millis() - waveTimer > waveInterval * 1000) {
        if (round === 1) {
            // Increase the speed and spawn rate for cold viruses
            enemySpeed += 0.5;
            coldSpawnRate -= 200;
            if (coldSpawnRate < 500) {
                coldSpawnRate = 500; // Limit minimum spawn rate
            }
        }
        createEnemies();
        waveTimer = millis();
        virusSpreadTextTime = millis(); // Set the time when the text was last displayed
    }

    // Display "The virus is spreading!" text if it has been less than 3 seconds since it was triggered
    if (virusSpreadTextTime > 0 && millis() - virusSpreadTextTime < 3000) {
        displayMessage('The virus is spreading!');
    }

    // Move ship left or right depending on arrow keys
    if (keyIsDown(LEFT_ARROW) && shipX > 33) {
        shipX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && shipX < windowWidth - 32) {
        shipX += 5;
    }

    // Handle behavior based on the current round
    handleRoundBehavior();

    // Update and draw lasers
    updateLasers();

    // Update and draw enemy lasers
    updateEnemyLasers();

    // Check for collision between ship and enemies
    checkCollisions();

    // Display lives and timer
    displayStats();
}

function drawEndScreen() {
    displayMessage(`You have died of ${getIllnessName(round)}!`);
    let restartButton = createButton('Restart');
    restartButton.position(width / 2 - restartButton.width / 2, height / 2 + 50);
    restartButton.mousePressed(() => {
        location.reload(); // Reload the page to restart the game
    });
}

function drawWinScreen() {
    displayMessage(`You have defeated all the viruses!`);
    let restartButton = createButton('Restart');
    restartButton.position(width / 2 - restartButton.width / 2, height / 2 + 50);
    restartButton.mousePressed(() => {
        location.reload(); // Reload the page to restart the game
    });
}

function handleRoundBehavior() {
    if (round === 1) {
        // Cold viruses fall while spinning
        handleColdViruses();
    } else if (round === 2) {
        // Suns move left and right individually at the top of the screen and fire heat lasers
        handleHeatStroke();
    } else if (round === 3) {
        // Flu moves left, right, and down while firing at you
        handleFlu();
    } else if (round === 4) {
        // Cancer boss level
        handleCancer();
    }
}

function handleColdViruses() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed;
        enemies[i].angle += 0.1;
        push();
        translate(enemies[i].x, enemies[i].y);
        rotate(enemies[i].angle);
        image(enemies[i].type, 0, 0, 60, 60);
        pop();
        if (enemies[i].y > height) {
            enemies.splice(i, 1);
            lives--;
            if (lives <= 0) {
                loseGame();
                return;
            }
        }
    }
    // Spawn new cold viruses at the defined rate
    if (millis() - waveTimer > coldSpawnRate) {
        enemies.push({x: random(width), y: -50, type: Cold, speed: enemySpeed, angle: 0});
        waveTimer = millis();
    }
}

function handleHeatStroke() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].x += enemySpeed * enemies[i].direction;
        if (enemies[i].x > windowWidth - 30 || enemies[i].x < 30) {
            enemies[i].direction *= -1;
        }
        image(enemies[i].type, enemies[i].x, enemies[i].y, 60, 60);
        if (random(5) < 0.01 * round / 2) {
            aLasers.push({x: enemies[i].x, y: enemies[i].y, type: loadImage('Fire.png')});
        }
    }
}

function handleFlu() {
    for (let enemy of enemies) {
        enemy.x += enemySpeed * enemyDirection;
        if (enemy.x > windowWidth - 30 || enemy.x < 30) {
            enemyDirection *= -1;
            for (let enemy of enemies) {
                enemy.y += 40; // Move enemies down
            }
        }
        image(enemy.type, enemy.x, enemy.y, 60, 60);
        if (random(4) < 0.01 * round) {
            aLasers.push({x: enemy.x, y: enemy.y, type: loadImage('Germ.png')});
        }
    }
}

function handleCancer() {
    if (boss) {
        boss.x += cos(millis() / 1000) * enemySpeed;
        boss.y += sin(millis() / 1000) * enemySpeed;
        image(boss.type, boss.x, boss.y, 150, 150);
        if (random(1) < 0.05) {
            aLasers.push({x: boss.x, y: boss.y, type: loadImage('CancerCell.png')});
        }
        if (bossHealth <= 0) {
            gameState = "win";
            return;
        }
    }
}

function updateLasers() {
    for (let i = sLasers.length - 1; i >= 0; i--) {
        sLasers[i].y -= 10;  // Move laser up
        image(sLaser, sLasers[i].x - 3, sLasers[i].y - 10, 35, 40);

        // Check for collision with enemies
        if (round === 4) {
            if (dist(sLasers[i].x, sLasers[i].y, boss.x, boss.y) < 50) {
                bossHealth -= 1;
                sLasers.splice(i, 1);
                continue;
            }
        } else {
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (dist(sLasers[i].x, sLasers[i].y, enemies[j].x, enemies[j].y) < 35) {
                    enemies.splice(j, 1);  // Remove enemy if hit
                    sLasers.splice(i, 1); // Remove laser if hit
                    break;
                }
            }
        }

        // Remove laser if it goes off screen
        if (sLasers[i] && sLasers[i].y < 0) {
            sLasers.splice(i, 1);
        }
    }
}

function updateEnemyLasers() {
    for (let i = aLasers.length - 1; i >= 0; i--) {
        aLasers[i].y += 5;  // Move laser down
        image(aLasers[i].type, aLasers[i].x, aLasers[i].y, 20, 40);

        // Check for collision with ship
        if (dist(aLasers[i].x, aLasers[i].y, shipX, shipY) < 35) {
            aLasers.splice(i, 1);
            lives--;
            if (round === 2) {
                // Slow down ship due to heat exhaustion
                shipX += (keyIsDown(LEFT_ARROW) ? -2 : 0);
                shipX += (keyIsDown(RIGHT_ARROW) ? 2 : 0);
            }
            if (lives <= 0) {
                loseGame();
                return;
            }
        }

        // Remove laser if it goes off screen
        if (aLasers[i] && aLasers[i].y > height) {
            aLasers.splice(i, 1);
        }
    }
}

function checkCollisions() {
    // Check for collision between ship and enemies
    for (let enemy of enemies) {
        if (dist(enemy.x, enemy.y, shipX, shipY) < 35) {
            loseGame();
            return;
        }
    }
}

function createEnemies() {
    let enemyType;
    if (round === 4) {
        boss = {x: windowWidth / 2, y: 100, type: Cancer};
    } else if (round === 1) {
        // For cold round, initially spawn enemies at random positions
        for (let i = 0; i < 5; i++) {
            enemies.push({x: random(width), y: -60, type: Cold, speed: enemySpeed, angle: 0, direction: random([-1, 1])});
        }
    } else {
        let rows = 2;
        let cols = 10;
        let spacing = 80;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * spacing + spacing / 2;
                let y = row * spacing + spacing / 2 + 50;
                if (round === 2) {
                    enemyType = HeatStroke;
                    enemies.push({x: x, y: y, type: enemyType, direction: 1});
                } else if (round === 3) {
                    enemyType = Flu;
                    enemies.push({x: x, y: y, type: enemyType});
                }
            }
        }
    }
}

function keyPressed() {
    // Add a new laser at the ship's position
    if (key === ' ') {
        sLasers.push({x: shipX, y: shipY});
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getIllnessName(round) {
    if (round === 1) return 'a Cold';
    if (round === 2) return 'Heat Stroke';
    if (round === 3) return 'the Flu';
    if (round === 4) return 'Cancer';
    return '';
}

function displayMessage(message) {
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text(message, width / 2, height / 2);
}

function displayStats() {
    textSize(24);
    fill(255);
    text(`Lives: ${lives}`, 100, 50);
    text(`Time: ${roundTime + (round - 1) * 10 - int((millis() - timer) / 1000)}`, 100, 80);
    if (round === 4) {
        text(`Boss Health: ${bossHealth}`, 50, 110);
    }
}

function loseGame() {
    noLoop();
    alasers = []
    sLasers = []
    enemies = []
    displayMessage(`You have died of ${getIllnessName(round)}!`);
    gameState = "end";
    flatlineSound.play();
     let restartButton = createButton('Restart');
    restartButton.position(width / 2 - restartButton.width / 2, height / 2 + 50);
    restartButton.mousePressed(() => {
        location.reload(); // Reload the page to restart the game
    });
}