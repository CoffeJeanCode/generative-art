const palletes = [
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];
const points = [];
const INTERNAL_RADIUS = 150;
const EXTERNAL_RADIUS = 500;

function setup() {
  createCanvas(600, 600);
  smooth();
  pixelDensity(4);

  colors = random(palletes);


  for (let i = 0; i < width * height; i += 100) {
    const x = random(width)
    const y = random(height)
    const radius = random(3)
    const distance = dist(width / 2, height / 2, x, y)
    if (distance < EXTERNAL_RADIUS)
      points.push([x, y, radius])
  }

  noLoop();
}



function draw() {
  background(21);


  for (let i = 0; i < points.length; i++) {
    const [x, y, radius] = points[i]
    const distance = dist(x, y, width / 2, height / 2)

    const ratio = map(distance, 0, 500, 3, 0)

    if (distance > INTERNAL_RADIUS) {
      noStroke()
      fill(colors[i % colors.length])
      ellipse(x, y, radius * ratio)
    }
  }
}
