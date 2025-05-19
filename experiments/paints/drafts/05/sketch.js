let palletes = [
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];

function setup() {
  createCanvas(600, 600);
  smooth();
  pixelDensity(4);

  noLoop();

  colors = random(palletes);

  angleMode(DEGREES);
}

function draw() {
  background(21);

  const rows = 120;
  const cols = 5;

  const gapX = floor(width / rows);
  const gapY = floor(height / cols);

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      const x = i * gapX + gapX / 5;
      const y = j * gapY + gapY / 5;

      push();
      translate(x, y);

      stroke(255);
      beginShape();
      noFill();
      stroke(random(colors));
      strokeWeight(random());
      for (let z = 0; z < gapY / 1.5; z++) {
        const x = random(-1, 1);
        const y = z;
        vertex(x, y);
      }
      endShape();

      // rect(0, 0, 20, 50);

      noFill();
      stroke(255, 0, 0);
      // square(0, 0, 10);
      pop();
    }
  }
}
