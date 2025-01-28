function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(255);
  drawPattern1();
  drawPattern2();
  drawPattern3();
}

function drawPattern1() {
  noStroke();
  fill(255, 0, 0); 
  ellipse(200, 200, 150, 150);
  fill(0, 0, 255);
  ellipse(300, 200, 100, 100);
}

function drawPattern2() {
  noFill();
  stroke(0); 
  strokeWeight(2);

  for (let x = 52; x < 750; x += 100) {
    for (let y = 51; y < 750; y += 100) {
      rect(x, y, 80, 80);
    }
  }
}

function drawPattern3() {
  noFill();
  stroke(0);
  strokeWeight(3);

  for (let i = 51; i <= 750; i += 50) {
    line(i, 50, i, 750);
  }

  for (let i = 100; i <= 700; i += 100) {
    arc(i, 400, 100, 100, 0, PI);
  }
}
