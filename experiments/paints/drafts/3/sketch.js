let num;
let palletes = [
  ["#11009E", "#4942E4", "#E6B9DE", "#FAE7F3"],
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];

function setup() {
  createCanvas(600, 600);
  smooth();
  pixelDensity(4);

  colors = random(palletes);
  num = 10;

  angleMode(DEGREES);
}

function draw() {
  background(21);
  stroke(255);

  const originalSize = 200;
  const strokeW = originalSize / 25;
  const [x, y] = [300, 200];

  push();
  translate(x, y);
  drawRecursiveArcs(originalSize, strokeW, num);
  pop();

  if (mouseIsPressed) {
    textSize(10);
    text(`(${floor(mouseX)}, ${floor(mouseY)})`, mouseX, mouseY);
  }
}

function drawRecursiveArcs(size, strokeW, remaining) {
  if (remaining <= 0) {
    return;
  }

  const currentSize = size * 0.2 * (num - remaining);
  push();

  ellipseMode(CENTER);
  rectMode(CENTER);

  const indexColor = remaining % 4;
  stroke(colors[indexColor]);
  noFill();
  strokeWeight(strokeW);

  arc(0, 0, currentSize, currentSize, 180, 0);
  line(-currentSize / 2, 0, -currentSize / 2, size / 2);
  line(currentSize / 2, 0, currentSize / 2, size / 2);

  pop();

  drawRecursiveArcs(size, strokeW, remaining - 1);
}
