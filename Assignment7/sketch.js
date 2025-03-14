let lightningImg;
let playThunder = false;
let audioStarted = false;
let osc, noise, env, filter, lfo;
let imgLoaded = false;

function preload() {
    lightningImg = loadImage('lightning.png', 
        () => { console.log("✅ Image loaded successfully"); imgLoaded = true; },
        () => console.error("❌ Error loading image! Check file path.")
    );
}

function setup() {
    createCanvas(600, 400);
    textSize(20);
    textAlign(CENTER, CENTER);

    let startButton = createButton("Enable Audio");
    startButton.position(width / 2 - 50, height - 50);
    startButton.mousePressed(initAudio);
}

function initAudio() {
    if (!audioStarted) {
        userStartAudio();

        osc = new p5.Oscillator('sine');
        noise = new p5.Noise('white');
        env = new p5.Envelope();
        filter = new p5.LowPass();

        env.setADSR(0.05, 0.2, 0.3, 2.5);
        env.setRange(0.8, 0);

        osc.freq(50);
        osc.amp(0);
        osc.disconnect();
        osc.connect(filter);
        filter.freq(200); 

        noise.disconnect();
        noise.connect(filter);
        noise.amp(0);

        osc.start();
        noise.start();

        audioStarted = true;
        console.log("🎵 Audio Initialized");
    }
}

function draw() {
    background(0);
    fill(255);

    if (playThunder && imgLoaded) {
        image(lightningImg, 100, 50, 400, 300);
    } else {
        text("Click to summon lightning!", width / 2, height / 2);
    }
}

function mousePressed() {
    if (!audioStarted) {
        console.warn("⚠️ Audio not initialized. Click 'Enable Audio' first.");
        return;
    }

    playThunder = true;
    setTimeout(() => { playThunder = false; }, 1000);

    env.play(noise);
    env.play(osc);
}
