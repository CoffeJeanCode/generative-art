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

  noLoop();

  colors = random(palletes);
  num = random(8, 12);

  angleMode(DEGREES);
}

function draw() {
  // background(255);
  background(21);

  translate(width / 2, height / 2);

  const startSize = floor(random(width / 5, width / 2));

  noFill();
  for (let i = 0; i < num; i++) {
    const size = floor(startSize * random(1, 1.5));
    const start = random(240, 260);
    const end = random(100, 120);
    const radius = size / 2;
    const angle = floor(random(-20, 20));

    noFill();
    rotate(angle);
    stroke(255);
    arc(0, 0, size, size, start, end);

    const numSmall = random(10);
    const numMedium = random(6);
    const numLarge = random(3);
    noStroke();

    for (let i = 0; i < numSmall; i++) {
      const cr = random(1, 3);
      const cAngle = floor(
        random([random(start + 10, start + 40), random(end + 10, end - 40)])
      );
      push();
      fill(colors[0]);
      rotate(cAngle);
      circle(radius, 0, cr * 2);
      pop();
    }

    for (let i = 0; i < numMedium; i++) {
      const cr = random(4, 8);
      const cAngle = floor(
        random([random(start + 40, start + 70), random(end - 40, end - 70)])
      );
      push();
      fill(colors[1]);
      rotate(cAngle);
      circle(radius, 0, cr * 2);
      pop();
    }

    for (let i = 0; i < numLarge; i++) {
      const cr = random(9, 11);
      const cAngle = floor(
        random([random(start + 80, start + 100), random(end - 80, end - 100)])
      );
      push();
      fill(colors[2]);
      rotate(cAngle);
      circle(radius, 0, cr * 2);
      pop();
    }

    // push();
    // noFill();
    // stroke(255, 0, 0);
    // circle(0, 0, size);
    // pop();
  }
}
