let bugs = [];
let squishedImage;
let bugSpritesheet;
let numFrames = 7;
let timer = 30;
let score = 0;
let gameOver = false;

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
        }else{
            gameOver = true;
        }
    }, 1000);
}

function draw() {
    background(220);
    
    if (gameOver) {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(`Game Over! Score: ${score}`, width / 2, height / 2);
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
    for (let bug of bugs) {
        if (!bug.squished && bug.clicked(mouseX, mouseY)) {
            bug.squish();
            score++;
        }
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
            this.frame = (this.frame + 0.2) % numFrames;
        } else if (frameCount - this.squishTimer > 30) {
            this.respawn();
        }
    }
    
    display() {
        if (this.squished) {
            image(squishedImage, this.x, this.y, 50, 50);
        } else {
            let spriteX = floor(this.frame) * 50;
            image(bugSpritesheet, this.x, this.y, 50, 50, spriteX, 0, 50, 50);
        }
    }
    
    clicked(mx, my) {
        return dist(mx, my, this.x + 25, this.y + 25) < 25;
    }
    
    squish() {
        this.squished = true;
        this.squishTimer = frameCount;
    }
    
    respawn() {
        this.x = random(width);
        this.y = random(height);
        this.speed += 0.5;
        this.direction = p5.Vector.random2D();
        this.squished = false;
    }
    
    bounce() {
        if (this.x < 0 || this.x > width) this.direction.x *= -1;
        if (this.y < 0 || this.y > height) this.direction.y *= -1;
    }
}
