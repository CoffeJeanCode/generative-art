let cellSize = 40;
let cellNum = 10;
let isDebug = false;
function setup() {
  createCanvas(600, 600);
  noLoop();
  angleMode(DEGREES);
  // cellSize = width / random(10, 40);
  cellSize = width / cellNum;
}

function draw() {
  background(21);

  stroke(255);
  noFill();

  strokeWeight(8);
  for (let i = 0; i < cellNum + 1; i++) {
    for (let j = 0; j < cellNum + 1; j++) {
      const x = i * cellSize;
      const y = j * cellSize;

      push();
      translate(x, y);
      rotate(floor(random(4)) * 90);
      strokeWeight(random([1, 3, 5, 7]));

      let type = random(2.2);

      if (type < 1.8) {
        arc(cellSize / 2, -cellSize / 2, cellSize, cellSize, 90, 180);
        arc(-cellSize / 2, cellSize / 2, cellSize, cellSize, -90, 0);
      } else if (type < 2) {
        line(-cellSize / 2, 0, cellSize / 2, 0);
        line(0, -cellSize / 2, 0, cellSize / 2);
      } else {
        circle(cellSize / 2, cellSize / 2, 10);
      }
      pop();

      if (isDebug) {
        push();
        strokeWeight(1);
        stroke(255, 0, 0);
        line(x, 0, x, height);
        line(0, y, width, y);
        pop();
      }
    }
  }
}
