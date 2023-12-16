let rope;

function setup() {
  createCanvas(600, 600);

  rope = new Rope(createVector(0, 200), createVector(0, -200), 14);
}

function draw() {
  background(21);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();

  rope.update();
  rope.draw();
}
