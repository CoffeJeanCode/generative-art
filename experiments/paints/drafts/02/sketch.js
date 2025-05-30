let palletes = [
  ["#11009E", "#404234"],
  ["#5F8670", "#FF9800"],
  ["#7D0A0A", "#BF3131"],
];
let colors = [];
const curves = [];
const MARGIN = 20;

function setup() {
  createCanvas(600, 600);
  noLoop();
  pixelDensity(4);

  colors = random(palletes);

  for (let i = 0; i < random(3, 10); i++) {
    const coords = [];
    for (let j = 0; j < random(2, 7); j++) {
      const x = random(MARGIN, width - MARGIN);
      const y = random(MARGIN, height - MARGIN);
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
    const col = random(colors);
    const currentCurve = curves[i];
    strokeWeight(random(2, 6));
    stroke(col);

    beginShape();

    for (let i = 0; i < currentCurve.length; i++) {
      const { x, y } = currentCurve[i];
      if (random() > 0.5) curveVertex(x, y);
      else vertex(x, y);
    }
    const lastCoord = currentCurve[currentCurve.length - 1];
    const nextLastCoord = currentCurve[currentCurve.length - 2];

    const dxLast = lastCoord.x - nextLastCoord.x
    const dyLast = lastCoord.y - nextLastCoord.y

    vertex(lastCoord.x, lastCoord.y);
    endShape();

    const size = 10;
    const angle = atan2(dxLast, dyLast);


    push();
    translate(lastCoord.x, lastCoord.y);

    fill(col);
    noStroke();
    rotate(angle);
    beginShape();
    vertex(size, -size);
    vertex(-size * 2, 0);
    vertex(size, size);
    endShape(CLOSE);

    pop();
  }
}
