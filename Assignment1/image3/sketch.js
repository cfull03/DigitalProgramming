function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(0);

  fill(255, 255, 0);
  arc(150, 200, 150, 150, PI / 6, -PI / 6, PIE);

  fill(255, 0, 0);
  arc(250, 200, 100, 100, PI, 0, CHORD);
  rect(200, 200, 100, 50);

  fill(255);
  ellipse(230, 190, 20, 30);
  ellipse(270, 190, 20, 30);

  fill(0, 0, 255);
  ellipse(230, 195, 10, 11);
  ellipse(270, 195, 10, 10);
}

