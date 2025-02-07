let colors = [];
let selectedColor = 'black';
let paletteWidth = 50;

function setup() {
  createCanvas(800, 600);
  background(255);

  colors = [
    { color: 'red', y: 11 },
    { color: 'orange', y: 40 },
    { color: 'yellow', y: 70 },
    { color: 'green', y: 100 },
    { color: 'cyan', y: 130 },
    { color: 'blue', y: 161 },
    { color: 'magenta', y: 190 },
    { color: 'brown', y: 220 },
    { color: 'white', y: 250 },
    { color: 'black', y: 281 }
  ];
}

function draw() {
  drawPalette();

  if (mouseIsPressed && mouseX > paletteWidth) {
    stroke(selectedColor);
    strokeWeight(5);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function drawPalette() {
  for (let c of colors) {
    fill(c.color);
    stroke(0);
    rect(10, c.y, 30, 30);
  }
}

function mousePressed() {
  for (let c of colors) {
    if (mouseX > 10 && mouseX < 40 && mouseY > c.y && mouseY < c.y + 30) {
      selectedColor = c.color;
    }
  }
}

