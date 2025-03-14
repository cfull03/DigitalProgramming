let synth;
let reverb, distortion;
let filter, lfo;
let noteDisplay = "";
let keys = {
  'A': 'C4', 'S': 'D4', 'D': 'E4', 'F': 'F4', 
  'G': 'G4', 'H': 'A4', 'J': 'B4', 'K': 'C5'
};

let filterSlider, reverbSlider, distortionSlider;

function setup() {
  createCanvas(600, 400);
  textSize(20);
  textAlign(CENTER, CENTER);

  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  filter = new Tone.Filter(800, "lowpass").toDestination();
  synth.connect(filter);

  lfo = new Tone.LFO("4n", 200, 1500).start();
  lfo.connect(filter.frequency);

  reverb = new Tone.Reverb(2).toDestination();
  distortion = new Tone.Distortion(0.2).toDestination();
  synth.chain(reverb, distortion);

  filterSlider = createSlider(200, 2000, 800, 1);
  filterSlider.position(20, height - 80);
  reverbSlider = createSlider(0, 5, 2, 0.1);
  reverbSlider.position(20, height - 50);
  distortionSlider = createSlider(0, 1, 0.2, 0.05);
  distortionSlider.position(20, height - 20);

  createP("Filter Cutoff").position(160, height - 95);
  createP("Reverb").position(160, height - 65);
  createP("Distortion").position(160, height - 35);
}

function draw() {
  background(30);
  fill(255);
  text("Press Keys A-K to Play Synth", width / 2, height / 2 - 60);
  text("Current Note: " + noteDisplay, width / 2, height / 2);

  filter.frequency.value = filterSlider.value();
  reverb.decay = reverbSlider.value();
  distortion.distortion = distortionSlider.value();
}

function keyPressed() {
  let note = keys[key.toUpperCase()];
  if (note) {
    noteDisplay = note;
    synth.triggerAttack(note);
  }
}

function keyReleased() {
  let note = keys[key.toUpperCase()];
  if (note) {
    synth.triggerRelease(note);
  }
}
