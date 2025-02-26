function preload() {
  samples = {
      sound1: loadSound("sine_wave_440Hz.wav"),
      sound2: loadSound("C5_523Hz.wav"),
      sound3: loadSound("D5_587Hz.wav"),
      sound4: loadSound("E5_659Hz.wav")
  };
}

function setup() {
  createCanvas(400, 300);
  textAlign(CENTER, CENTER);
  
  reverb = new p5.Reverb();
  
  for (let key in samples) {
      samples[key].connect(reverb);
  }
  
  createButton('Kick').position(50, 200).mousePressed(() => playSample('sound1'));
  createButton('Snare').position(110, 200).mousePressed(() => playSample('sound2'));
  createButton('HiHat').position(180, 200).mousePressed(() => playSample('sound3'));
  createButton('Clap').position(250, 200).mousePressed(() => playSample('sound4'));
  
  let reverbSlider = createSlider(0, 1, 0.5, 0.1);
  reverbSlider.position(50, 250);
  reverbSlider.input(() => adjustReverb(reverbSlider.value()));
}

function draw() {
  background(200);
  text('Click buttons to play sounds', width / 2, height / 2 - 50);
  text('Adjust Reverb:', width / 2, 230);
}

function playSample(name) {
  if (samples[name]) {
      samples[name].play();
  }
}

function adjustReverb(value) {
  reverb.drywet(value);
}
