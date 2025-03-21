let bugs = [];
let squishedImage;
let bugSpritesheet;
let squishSound, missSound, skitterSound, bgMusic, gameOverSound;
let synth;
let numFrames = 7;
let timer = 30;
let score = 0;
let gameOver = false;
let spawnRate = 5000;
let frameWidth = 50;
let frameHeight = 50;
let frameRateSpeed = 0.2;
let maxBugs = 10;
let tempoInterval;

function preload() {
    bugSpritesheet = loadImage('bug.png');
    squishedImage = loadImage('bug_squished.png');
    soundFormats('mp3', 'wav');
    squishSound = loadSound('assets/244494__zimbot__squish.wav');
    missSound = loadSound('assets/471427__juaner__23_miss_hit.wav');
    skitterSound = loadSound('assets/629445__puppetmaster685719__skittering.wav');
    bgMusic = loadSound('assets/squish-107555.mp3'); // Assuming this is your bg music
    gameOverSound = loadSound('assets/232444__afleetingspeck__game-over-sounds-1.wav');
}

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 5; i++) {
        bugs.push(new Bug(random(width), random(height)));
    }

    bgMusic.loop();
    skitterSound.loop();
    skitterSound.setVolume(0.2);

    synth = new p5.MonoSynth();

    setInterval(() => {
        if (timer > 0) {
            timer--;
        } else {
            gameOver = true;
            bgMusic.stop();
            skitterSound.stop();
            gameOverSound.play();
        }
    }, 1000);

    setInterval(() => {
        if (!gameOver && bugs.length < maxBugs) {
            bugs.push(new Bug(random(width), random(height)));
            synth.triggerAttackRelease('E4', 0.1);
        }
    }, spawnRate);

    tempoInterval = setInterval(() => {
        if (!gameOver) {
            bgMusic.rate(bgMusic.rate() + 0.05);
            skitterSound.setVolume(min(1.0, skitterSound.getVolume() + 0.1));
            synth.triggerAttackRelease('G4', 0.1);
        }
    }, 10000);
}

function draw() {
    background(200, 230, 255); 

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
    text(`Bugs: ${bugs.length}`, 10, 90);
}

function mousePressed() {
    if (gameOver) {
        restartGame();
        return;
    }

    let hit = false;
    for (let bug of bugs) {
        if (!bug.squished && bug.clicked(mouseX, mouseY)) {
            bug.squish();
            score++;
            squishSound.play();
            synth.triggerAttackRelease('C5', 0.1);
            hit = true;
        }
    }
    if (!hit) {
        missSound.play();
        synth.triggerAttackRelease('A3', 0.1);
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
    bgMusic.rate(1);
    bgMusic.loop();
    skitterSound.loop();
    skitterSound.setVolume(0.2);
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
