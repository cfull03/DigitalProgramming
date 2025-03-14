let lightningImg;
let playThunder = false;
let osc, noise, env, filter, lfo;
let imgLoaded = false;
let audioStarted = false;

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

    let startAudioButton = createButton("Enable Audio");
    startAudioButton.position(width / 2 - 50, height - 50);
    startAudioButton.mousePressed(initAudio);
}

function initAudio() {
    if (!audioStarted) {
        audioStarted = true;

        osc = new p5.Oscillator('sine');
        noise = new p5.Noise('white');
        env = new p5.Envelope();
        filter = new p5.Filter('lowpass');
        lfo = new p5.Oscillator('sine');

        env.setADSR(0.05, 0.2, 0.3, 2.5);
        env.setRange(0.8, 0);

        osc.freq(50);
        osc.amp(0);
        osc.disconnect();
        osc.connect(filter);

        noise.amp(0);
        noise.disconnect();
        noise.connect(filter);

        filter.freq(200);
        
        lfo.freq(0.3);
        lfo.amp(150);
        lfo.start();
        lfo.disconnect();
        lfo.connect(filter.freq);
        
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

    noise.start();
    env.play(noise);

    osc.start();
    env.play(osc);
}
