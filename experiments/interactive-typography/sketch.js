const stringText = "Jean";
let textImg;
let points = [];
let columnGroups = {};
let xCoords = [];
let yCoords = [];
let ropes = [];

function setup() {
  createCanvas(500, 500);

  smooth();
  setupText();
  for (let y = 0; y < textImg.height; y += 5) {
    for (let x = 0; x < textImg.width; x += 5) {
      const index = (x + y * textImg.width) * 4;
      const r = textImg.pixels[index + 0];

      if (r > 128) {
        xCoords.push(x);
        yCoords.push(y);
      }
    }
  }

  for (let i = 0; i < xCoords.length; i++) {
    let x = xCoords[i];
    let y = yCoords[i];
    let closestCol = Math.round(x / 5) * 5;

    if (!columnGroups[closestCol]) {
      columnGroups[closestCol] = [];
    }

    columnGroups[closestCol].push({ x, y });
  }

  for (let col in columnGroups) {
    if (columnGroups.hasOwnProperty(col)) {
      let points = columnGroups[col];

      if (points.length > 1) {
        points.sort((a, b) => a.y - b.y);

        let minY = points[0].y;
        let maxY = points[points.length - 1].y;
        ropes.push(
          new Rope(
            createVector(Number(col), minY),
            createVector(Number(col), maxY),
            15
          )
        );
      }
    }
  }
}

function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(0);
  textImg.fill(255);
  textImg.textAlign(CENTER, CENTER);
  textImg.textSize(150);
  textImg.text(stringText, width / 2, height / 2);
  textImg.loadPixels();
}

function draw() {
  background(21);
  stroke(255);
  noFill();
  circle(mouseX, mouseY, 20);
  ropes.forEach((rope) => {
    rope.draw();
    rope.update(mouseX, mouseY, 10);
  });
}
