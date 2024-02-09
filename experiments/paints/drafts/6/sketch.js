let palletes = [
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];
let circles = [];

function setup() {
  createCanvas(600, 600);
  smooth();
  pixelDensity(4);

  noLoop();
  angleMode(DEGREES);

  colors = random(palletes);

  for (let i = 0; i < random(8, 18); i++) {
    const rad = random(30, 200);
    const x = random(-rad, width + rad);
    const y = random(-rad, height + rad);
    circles.push({ x, y, rad });
  }
}

function draw() {
  background(21);

  circles.forEach(({ x, y, rad }) => {
    let num = random(30, 70);
    strokeWeight(1);

    stroke(255);
    if (random() > 0.5) {
      for (let i = 0; i < num; i++) {
        const m = map(i, 0, num - 1, num / (num / 10), 180 - num / (num / 10));
        const lx = cos(m) * rad + x;
        const ly0 = sin(m) * rad + y;
        const ly1 = -sin(m) * rad + y;

        line(lx, ly1, lx, ly0);
      }
    } else {
      for (let i = 0; i < num; i++) {
        const m = map(
          i,
          0,
          num - 1,
          270 + num / (num / 10),
          90 - num / (num / 10)
        );
        const ly = sin(m) * rad + y;
        const lx0 = cos(m) * rad + x;
        const lx1 = -cos(m) * rad + x;

        line(lx0, ly, lx1, ly);
      }
    }
  });
}
