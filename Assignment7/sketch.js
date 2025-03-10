let lightningImg;
let playThunder = false;
let osc, noise, env, filter, lfo;

function preload() {
  lightningImg = loadImage('Lightning.jpeg');
}

function setup() {
  createCanvas(600, 400);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  osc = new p5.Oscillator('sine');
  noise = new p5.Noise('white'); 
  env = new p5.Envelope();
  filter = new p5.Filter('lowpass');
  lfo = new p5.Oscillator('sine');
  
  env.setADSR(0.05, 0.2, 0.3, 1.5);
  env.setRange(0.8, 0);
  
  osc.freq(50);
  osc.amp(0);
  osc.disconnect();
  osc.connect(filter);
  
  noise.amp(0);
  noise.disconnect();
  noise.connect(filter);
  
  filter.freq(200);
  
  lfo.freq(0.5);
  lfo.amp(100);
  lfo.start();
  lfo.disconnect();
  lfo.connect(filter.freq);
}

function draw() {
  background(0);
  fill(255);
  if (playThunder) {
    image(lightningImg, 100, 50, 400, 300);
  } else {
    text("Click to summon lightning!", width / 2, height / 2);
  }
}

function mousePressed() {
  playThunder = true;
  setTimeout(() => { playThunder = false; }, 300);
  
  noise.start();
  env.play(noise);
  
  osc.start();
  env.play(osc);
}
