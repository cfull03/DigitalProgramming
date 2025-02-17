let characters = [];
let spriteSheet;
let spriteSize = 80;
let numFrames = 4;
let speed = 2;

function preload() {
    spriteSheet = loadImage('Green.png');
}

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 3; i++) {
        characters.push(new Character(random(width - spriteSize), random(height - spriteSize), spriteSheet, i));
    }
}

function draw() {
    background(255);
    characters.forEach(char => {
        char.update();
        char.show();
    });
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        characters.forEach(char => char.move("right"));
    } else if (keyCode === LEFT_ARROW) {
        characters.forEach(char => char.move("left"));
    }
}

function keyReleased() {
    characters.forEach(char => char.stop());
}

class Character {
    constructor(x, y, Sheet, row) {
        this.x = x;
        this.y = y;
        this.Sheet = Sheet;
        this.row = row;
        this.frame = 0;
        this.direction = "right";
        this.moving = false;
    }

    move(dir) {
        this.direction = dir;
        this.moving = true;
    }

    stop() {
        this.moving = false;
    }

    update() {
        if (this.moving) {
            this.frame = (this.frame + 1) % numFrames;
            this.x += this.direction === "right" ? speed : -speed;
        } else {
            this.frame = 0;
        }
    }

    show() {
        let sx = this.frame * spriteSize;
        let sy = this.row * spriteSize;
        
        if (this.direction === "left") {
            push();
            translate(this.x + spriteSize, this.y);
            scale(-1, 1);
            image(this.Sheet, 0, 0, spriteSize, spriteSize, sx, sy, spriteSize, spriteSize);
            pop();
        } else {
            image(this.Sheet, this.x, this.y, spriteSize, spriteSize, sx, sy, spriteSize, spriteSize);
        }
    }
}
