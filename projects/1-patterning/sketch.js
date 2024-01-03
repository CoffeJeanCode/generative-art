const rowsNum = 10;
const colsNum = 5;
const circles = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  frameRate(2);
  const radius = width / rowsNum;

  const totalWidth = colsNum * radius;
  const totalHeight = rowsNum * radius;

  const centerX = width / 2 - totalWidth / 2;
  const centerY = height / 2 - totalHeight / 2;

  for (let i = 0; i < colsNum; i++) {
    for (let j = 0; j < rowsNum; j++) {
      const angle = random([0, 90, 180, 270]);
      const end = random([90, 180, 270]);

      const x = i * radius + radius / 2 + centerX;
      const y = j * radius + radius / 2 + centerY;

      circles.push({ x, y, radius, angle, end });
    }
  }
}

function draw() {
  background(21);
  stroke(255);

  noStroke();
  circles.forEach((circle) => {
    const { x, y, radius, angle, end } = circle;
    push();
    translate(x, y);
    rotate((frameCount * 45) / 2);
    rotate(angle);
    arc(0, 0, radius, radius, 0, end);
    pop();
  });
}
