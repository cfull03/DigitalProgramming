let characters = [];
let spriteSheet;
const spriteSize = 80;
const numFrames = 4;
const speed = 2;
const frameDelay = 6;

function preload() {
    spriteSheet = loadImage('SpelunkyGuy.png');
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
    constructor(x, y, spriteSheet, row) {
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.row = row;
        this.frame = 0;
        this.direction = "right";
        this.moving = false;
    }

    getSprite() {
        return this.spriteSheet.get(this.frame * spriteSize, this.row * spriteSize, spriteSize, spriteSize);
    }

    move(direction) {
        this.direction = direction;
        this.moving = true;
    }

    stop() {
        this.moving = false;
    }

    update() {
        if (this.moving) {
            if (frameCount % frameDelay === 0) {
                this.frame = (this.frame + 1) % numFrames;
            }
            this.x += (this.direction === "right" ? speed : -speed);
        } else {
            this.frame = 0;
        }
    }

    show() {
        let sprite = this.getSprite();
        push();
        if (this.direction === "left") {
            translate(this.x + spriteSize, this.y);
            scale(-1, 1);
            image(sprite, 0, 0);
        } else {
            image(sprite, this.x, this.y);
        }
        pop();
    }
}
