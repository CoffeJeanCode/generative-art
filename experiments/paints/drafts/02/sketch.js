let palletes = [
  ["#11009E", "#404234"],
  ["#5F8670", "#FF9800"],
  ["#7D0A0A", "#BF3131"],
];
let colors = [];
const curves = [];

function setup() {
  createCanvas(600, 600);
  // frameRate(2);
  noLoop();
  pixelDensity(4);

  colors = random(palletes);

  for (let i = 0; i < random(1, 10); i++) {
    const coords = [];
    for (let j = 0; j < random(2, 7); j++) {
      const x = random(20, width - 20) * sin(random());
      const y = random(20, height - 20);
      coords.push({ x, y });
    }
    curves.push(coords);
  }
}
function draw() {
  background(random([21, 255]));

  // curves
  noFill();
  for (let i = 0; i < curves.length; i++) {
    const c = random(colors);
    const currentCurve = curves[i];
    strokeWeight(random(1, 8));
    stroke(c);
    beginShape();
    for (let j = 0; j < currentCurve.length; j++) {
      const { x, y } = currentCurve[j];
      if (random() > 0.5) curveVertex(x, y);
      else vertex(x, y);
    }
    const lastCoord = currentCurve[currentCurve.length - 1];
    vertex(lastCoord.x, lastCoord.y);
    const size = 10;
    const angle = atan2(lastCoord.y, lastCoord.x);
    endShape();
    push();
    fill(c);
    noStroke();
    translate(lastCoord.x, lastCoord.y);
    rotate(angle);
    beginShape();
    vertex(size, -size);
    vertex(-size * 2, 0);
    vertex(size, size);
    endShape(CLOSE);
    pop();
  }
}
