let characters = [];
let spriteSheets = [];
let spriteSize = 80;
let numFrames = 4;
let speed = 2;

function preload() {
    spriteSheets.push(loadImage('Green.png'));
}

function setup() {
    createCanvas(800, 600);
    
    for (let i = 0; i < 6; i++) {
        let sheet = spriteSheets[i % spriteSheets.length];
        characters.push(new Character(random(width - spriteSize), random(height - spriteSize), sheet));
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
    constructor(x, y, sheet) {
        this.x = x;
        this.y = y;
        this.sheet = sheet;
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
            if (frameCount % 6 === 0) {
                this.frame = (this.frame + 1) % numFrames;
            }
            this.x += this.direction === "right" ? speed : -speed;
        } else {
            this.frame = 0;
        }
    }

    show() {
        let sx = this.frame * spriteSize;
        let sy = 0;

        if (this.direction === "left") {
            push();
            translate(this.x + spriteSize, this.y);
            scale(-1, 1);
            image(this.sheet, 0, 0, spriteSize, spriteSize, sx, sy, spriteSize, spriteSize);
            pop();
        } else {
            image(this.sheet, this.x, this.y, spriteSize, spriteSize, sx, sy, spriteSize, spriteSize);
        }
    }
}
