let palletes = [
  ["#11009E", "#4942E4", "#E6B9DE", "#FAE7F3"],
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];

function setup() {
  createCanvas(600, 600);
  noLoop();
  frameRate(2);

  colors = random(palletes);
}

function draw() {
  background(random(colors));

  noStroke();

  // small circles
  for (let i = 0; i < 200; i++) {
    fill(random(colors));
    circle(random(width), random(height), random(2, 10));
  }

  // lines
  for (let i = 0; i < 200; i++) {
    const x = random(width);
    const y = random(height);
    stroke(random(colors));
    line(x, y, x + random(-12, 12), y + random(-12, 12));
  }

  // large circles
  for (let i = 0; i < 25; i++) {
    fill(random(colors));
    circle(random(width), random(height), random(20, 50));
  }

  // curves
  noFill();
  for (let i = 0; i < random(2, 8); i++) {
    beginShape();
    stroke(random(colors));
    for (let i = 0; i < random(2, (i + 1) * 2); i++) {
      const x = random(width);
      const y = random(height);
      curveVertex(x, y);
    }
    endShape();
  }
}
