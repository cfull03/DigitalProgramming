// File: sketch.js

let zombies = [];
let robots = [];
let explosions = [];
let spriteSheets = [];
const spriteSize = 128;
const numFrames = 4;
const speed = 2;
let score = 0;
let lives = 3;
let gameState = 'start';
let gameStartTime = 0;
let spawnInterval = 120;
let spawnTimer = 0;
let lastRobotSpawnTime = 0;
const robotCooldown = 1000; // ms

let introMusic, gameMusic, gameOverMusic;

let port, reader, writer;
let decoder = new TextDecoderStream();
let encoder = new TextEncoder();
let serialBuffer = '';

function preload() {
    spriteSheets.push(loadImage('assets/zombie.png'));
    spriteSheets.push(loadImage('assets/robot.jpg'));
    spriteSheets.push(loadImage('assets/explosion.jpeg'));
    introMusic = loadSound('assets/intro.wav');
    gameMusic = loadSound('assets/horror.mp3');
    gameOverMusic = loadSound('assets/gameover.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gameStartTime = millis();
    introMusic.loop();

    let connectButton = createButton('Connect Serial');
    connectButton.position(10, 10);
    connectButton.mousePressed(connectSerial);
}

function draw() {
    drawBackground();

    if (gameState === 'start') {
        drawTitleScreen();
    } else if (gameState === 'playing') {
        runGame();
        displayStats();
        if (lives <= 0) {
            gameState = 'gameover';
            sendSerial('GAME_OFF');
            gameMusic.stop();
            gameOverMusic.play();
        }
    } else if (gameState === 'gameover') {
        drawGameOverScreen();
    }

    for (let e = explosions.length - 1; e >= 0; e--) {
        explosions[e].update();
        explosions[e].show();
        if (explosions[e].done()) explosions.splice(e, 1);
    }
}

function runGame() {
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
        zombies.push(new Zombie(spriteSheets[0]));
        spawnTimer = 0;
    }

    for (let r = robots.length - 1; r >= 0; r--) {
        robots[r].update();
        robots[r].show();
    }

    for (let z = zombies.length - 1; z >= 0; z--) {
        zombies[z].update();
        zombies[z].show();

        for (let r = robots.length - 1; r >= 0; r--) {
            if (robots[r].hits(zombies[z])) {
                explosions.push(new Explosion(zombies[z].x, zombies[z].y, spriteSheets[2]));
                zombies.splice(z, 1);
                sendSerial('ENEMY_HIT');
                score++;
                break;
            }
        }

        if (zombies[z] && zombies[z].x >= width) {
            zombies.splice(z, 1);
            lives--;
            sendSerial('PLAYER_HIT');
        }
    }
}

function keyPressed() {
    if (gameState === 'start' || gameState === 'gameover') {
        if (keyCode === ENTER) {
            startGame();
        }
    } else if (key === 'A') {
        tryDeployRobot();
    }
}

function tryDeployRobot() {
    if (millis() - lastRobotSpawnTime > robotCooldown) {
        const robotSheet = spriteSheets[1];
        const robot = new Robot(robotSheet);
        robots.push(robot);
        lastRobotSpawnTime = millis();
        console.log("🤖 Robot spawned from right → walking left");
    } else {
        console.log("⏳ Robot still on cooldown");
    }
}

function startGame() {
    gameState = 'playing';
    lives = 3;
    score = 0;
    zombies = [];
    robots = [];
    explosions = [];
    spawnTimer = 0;
    gameStartTime = millis();
    sendSerial('GAME_ON');

    introMusic.stop();
    gameOverMusic.stop();
    gameMusic.loop();
}

function drawBackground() {
    background(10, 10, 30);
    noStroke();
    fill(200, 50, 50);
    ellipse(width - 100, 100, 80, 80);
    fill(34, 139, 34);
    rect(0, height * 0.75, width, height * 0.25);
}

function drawTitleScreen() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Zombie vs Robots', width / 2, height / 2 - 20);
    textSize(18);
    text('Press ENTER to start', width / 2, height / 2 + 20);
}

function drawGameOverScreen() {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Game Over', width / 2, height / 2 - 20);
    textSize(18);
    text('Final Score: ' + score, width / 2, height / 2 + 20);
    text('Press ENTER to restart', width / 2, height / 2 + 60);
}

function displayStats() {
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text('Score: ' + score, 10, 40);
    text('Lives: ' + lives, 10, 60);
    let seconds = int((millis() - gameStartTime) / 1000);
    text('Time: ' + seconds + 's', 10, 80);
}

class Zombie {
    constructor(sheet) {
        this.x = 0;
        this.y = random(height * 0.75, height - spriteSize);
        this.sheet = sheet.get(0, 0, spriteSize * numFrames, spriteSize);
        this.frame = 0;
        this.moving = true;
    }

    update() {
        if (this.moving) {
            this.x += speed;
        }
    }

    show() {
        let sx = 0;
        push();
        translate(this.x, this.y);
        image(this.sheet, 0, 0, spriteSize, spriteSize, sx, 0, spriteSize, spriteSize);
        pop();
    }
}

class Robot {
    constructor(sheet) {
        this.x = width;
        this.y = random(height * 0.75, height - spriteSize);
        this.sheet = sheet.get(0, 0, spriteSize * numFrames, spriteSize);
        this.frame = 0;
        this.cooldown = 30;
        this.speed = 2;
    }

    update() {
        this.cooldown--;
        this.x -= this.speed;
        if (frameCount % 6 === 0) {
            this.frame = (this.frame + 1) % numFrames;
        }
    }

    hits(zombie) {
        return this.cooldown <= 0 && dist(this.x, this.y, zombie.x, zombie.y) < spriteSize;
    }

    show() {
        let sx = this.frame * spriteSize;
        push();
        translate(this.x, this.y);
        image(this.sheet, 0, 0, spriteSize, spriteSize, sx, 0, spriteSize, spriteSize);
        pop();
    }
}

class Explosion {
    constructor(x, y, sheet) {
        this.x = x;
        this.y = y;
        this.sheet = sheet;
        this.frame = 0;
        this.timer = 0;
        this.maxFrames = 6;
    }

    update() {
        this.timer++;
        if (this.timer % 4 === 0) this.frame++;
    }

    show() {
        let sx = this.frame * spriteSize;
        image(this.sheet, this.x, this.y, spriteSize, spriteSize, sx, 0, spriteSize, spriteSize);
    }

    done() {
        return this.frame >= this.maxFrames;
    }
}

async function connectSerial() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        port.readable.pipeTo(decoder.writable);
        reader = decoder.readable.getReader();

        const output = port.writable;
        writer = output.getWriter();

        readSerialLoop();
        console.log('✅ Serial connected');
    } catch (err) {
        console.error('Serial connection failed:', err);
    }
}

async function readSerialLoop() {
    while (port.readable) {
        try {
            const { value, done } = await reader.read();
            if (done) break;
            if (value) handleSerialLine(value);
        } catch (err) {
            console.error('Read error:', err);
            break;
        }
    }
}

function handleSerialLine(line) {
    const data = line.trim();
    console.log('📥', data);
    if (!isNaN(data) && parseInt(data) < 300) {
        tryDeployRobot();
    } else if (data === 'PLAYER_HIT') lives--;
    else if (data === 'ENEMY_HIT') score++;
    else if (data === 'GAME_ON') startGame();
    else if (data === 'GAME_OFF') gameState = 'gameover';
}

function sendSerial(msg) {
    if (writer) writer.write(encoder.encode(msg + '\n'));
}
