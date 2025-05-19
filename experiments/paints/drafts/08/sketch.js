const palletes = [
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
let colors = [];
const points = []

function setup() {
  createCanvas(600, 600);
  smooth();
  pixelDensity(4);

  // noLoop();

  colors = random(palletes);
  lineHeight = round(random(100, 700))
  // lineHeight = 600
  console.log(lineHeight)
  for (let i = 0; i < width; i++) {
    const x = i * width / 200
    const y1 = sin(i * lineHeight) * 100 + height / 2
    const y2 = -sin(i * lineHeight) * 100 + height / 2
    points.push({ x, y1, y2 })
  }
}



function draw() {
  background(21);

  stroke(255)
  for (let i = 0; i < points.length; i++) {
    const { x, y1, y2 } = points[i]
    stroke(colors[i % colors.length])
    strokeWeight(2)
    line(x, y1, x, y2)
    // line(x, y, nx, ny)
  }
}
