let synth;
let reverb;
let keys = {
  'A': 'C4', 'W': 'C#4', 'S': 'D4', 'E': 'D#4', 'D': 'E4',
  'F': 'F4', 'T': 'F#4', 'G': 'G4', 'Y': 'G#4', 'H': 'A4',
  'U': 'A#4', 'J': 'B4', 'K': 'C5'
};

function setup() {
  createCanvas(600, 400);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "square" },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.4, release: 1.2 }
  }).toDestination();
  
  reverb = new Tone.Reverb({ decay: 2, wet: 0.5 }).toDestination();
  synth.connect(reverb);
}

function draw() {
  background(30);
  fill(255);
  text("Press keys A-K to play notes", width / 2, height / 2);
}

function keyPressed() {
  let note = keys[key.toUpperCase()];
  if (note) {
    synth.triggerAttackRelease(note, "0.5");
  }
}
