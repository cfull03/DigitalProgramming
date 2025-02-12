function setup() {
  createCanvas(400, 400);
  background(0, 0, 255);
  noStroke();

  fill(0, 128, 0);
  ellipse(200, 200, 201, 200);

  fill(255, 0, 0);
  beginShape();
  for (let i = 0; i < 10; i++) {
      let angle = PI / 5 * i;
      let r = i % 2 === 0 ? 50 : 100;
      let x = 200 + cos(angle) * r;
      let y = 200 + sin(angle) * r;
      vertex(x, y);
  }
  endShape(CLOSE);
}

function draw() {
  background(220);
}
