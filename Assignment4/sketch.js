let bugs = [];
let squishedImage;
let bugSpritesheet;
let squishSound;
let numFrames = 7;
let timer = 30;
let score = 0;
let gameOver = false;
let spawnRate = 5000;
let frameWidth = 50;
let frameHeight = 50;
let frameRateSpeed = 0.2;

function preload() {
    bugSpritesheet = loadImage('bug.png');
    squishedImage = loadImage('bug_squished.png');
}

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 5; i++) {
        bugs.push(new Bug(random(width), random(height)));
    }
    setInterval(() => {
        if (timer > 0) {
            timer--;
        } else {
            gameOver = true;
        }
    }, 1000);
    setInterval(() => {
        if (!gameOver) bugs.push(new Bug(random(width), random(height)));
    }, spawnRate);
}

function draw() {
    background(220);
    
    if (gameOver) {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(`Game Over! Score: ${score}`, width / 2, height / 2 - 20);
        text("Click to Restart", width / 2, height / 2 + 20);
        return;
    }
    
    for (let bug of bugs) {
        bug.update();
        bug.display();
    }
    
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
    text(`Time: ${timer}`, 10, 60);
}

function mousePressed() {
    if (gameOver) {
        restartGame();
        return;
    }
    for (let bug of bugs) {
        if (!bug.squished && bug.clicked(mouseX, mouseY)) {
            bug.squish();
            score++;
            squishSound.play();
        }
    }
}

function restartGame() {
    timer = 30;
    score = 0;
    gameOver = false;
    bugs = [];
    for (let i = 0; i < 5; i++) {
        bugs.push(new Bug(random(width), random(height)));
    }
}

class Bug {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(1, 3);
        this.direction = p5.Vector.random2D();
        this.squished = false;
        this.squishTimer = 0;
        this.frame = 0;
    }
    
    update() {
        if (!this.squished) {
            this.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;
            this.bounce();
            this.frame = (this.frame + frameRateSpeed) % numFrames;
        } else if (frameCount - this.squishTimer > 30) {
            this.respawn();
        }
    }
    
    display() {
        if (this.squished) {
            image(squishedImage, this.x, this.y, frameWidth, frameHeight);
        } else {
            let spriteX = floor(this.frame) * frameWidth;
            image(bugSpritesheet, this.x, this.y, frameWidth, frameHeight, spriteX, 0, frameWidth, frameHeight);
        }
    }
    
    clicked(mx, my) {
        return dist(mx, my, this.x + frameWidth / 2, this.y + frameHeight / 2) < frameWidth / 2;
    }
    
    squish() {
        this.squished = true;
        this.squishTimer = frameCount;
    }
    
    respawn() {
        this.x = random(50, width - 50);
        this.y = random(50, height - 50);
        this.speed += 0.3;
        this.direction = p5.Vector.random2D();
        this.squished = false;
    }
    
    bounce() {
        if (this.x < 0 || this.x > width) this.direction.x *= -1;
        if (this.y < 0 || this.y > height) this.direction.y *= -1;
    }
}
