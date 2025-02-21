let bugs = [];
let bugImages = [], bugSquishedImage;
const BUG_SIZE = 50;
let squishCount = 0;
let timeLeft = 30;
let gameRunning = true;
let frame = 0;

function preload() {
    for (let i = 1; i <= 7; i++) { 
        bugImages.push(loadImage(`bug${i}.png`)); // Fix incorrect string interpolation
    }
    bugSquishedImage = loadImage("bug_squished.png");
}

class Bug {
    constructor() {
        this.x = random(0, width - BUG_SIZE);
        this.y = random(0, height - BUG_SIZE);
        this.squished = false;
        this.speed = random(1, 3);
        this.direction = random([-1, 1]);
        this.frameIndex = 0;
    }
    
    move() {
        if (!this.squished) {
            this.x += this.speed * this.direction;
            if (this.x < 0 || this.x > width - BUG_SIZE) {
                this.direction *= -1;  
            }
            if (frameCount % 10 === 0) {
                this.frameIndex = (this.frameIndex + 1) % bugImages.length;
            }
        }
    }
    
    draw() {
        push();
        translate(this.x + BUG_SIZE / 2, this.y + BUG_SIZE / 2);
        if (this.direction === -1) {
            scale(-1, 1);
        }
        imageMode(CENTER);
        if (this.squished) {
            image(bugSquishedImage, 0, 0, BUG_SIZE, BUG_SIZE);
        } else {
            image(bugImages[this.frameIndex], 0, 0, BUG_SIZE, BUG_SIZE);
        }
        pop();
    }
    
    checkClick(mx, my) {
        if (!this.squished) {
            if (mx > this.x && mx < this.x + BUG_SIZE && my > this.y && my < this.y + BUG_SIZE) {
                this.squished = true;
                squishCount++;
                this.speed += 0.5;
            }
        }
    }
}

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 5; i++) {
        bugs.push(new Bug());
    }
    setInterval(() => {
        if (gameRunning) {
            timeLeft--;
            if (timeLeft <= 0) {
                gameRunning = false;
            }
        }
    }, 1000);
}

function draw() {
    background(255);
    
    if (gameRunning) {
        for (let bug of bugs) {
            bug.move();
            bug.draw();
        }
    } else {
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2 - 20);
        text(`Bugs Squished: ${squishCount}`, width / 2, height / 2 + 20);
    }
    
    textSize(24);
    fill(0);
    textAlign(LEFT, TOP);
    text(`Time Left: ${timeLeft}`, 20, 30);
    text(`Bugs Squished: ${squishCount}`, 20, 60);
}

function mousePressed() {
    if (gameRunning) {
        for (let bug of bugs) {
            bug.checkClick(mouseX, mouseY);
        }
    }
}
