const shapes = [];
const points = [];
const word = "Jean";
const size = 3;
let textGraphic = null;

function setupText(x, y, word, fontSize) {
  textGraphic = createGraphics(width, height);

  textGraphic.background(0);
  textGraphic.fill(255);
  textGraphic.pixelDensity(1);
  textGraphic.textAlign(CENTER, CENTER);
  textGraphic.textSize(fontSize);
  textGraphic.text(word, x, y);
  textGraphic.loadPixels();

  return textGraphic.pixels;
}

function heart(x, y, size) {
  push();
  noStroke();
  translate(x, y - size / 2);
  rotate(radians(45));
  square(0, 0, size);
  circle(size / 2, 0, size);
  circle(0, size / 2, size);
  pop();
}

function newShape() {
  const randomShape = random(points);
  const { x, y } = randomShape;
  let isValid = true;

  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    const d = dist(x, y, s.x, s.y);

    if (d < s.r) {
      isValid = false;
      break;
    }
  }

  return isValid ? new Shape(x, y, 1) : null;
}

class Shape {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.isGrowing = true;
  }

  show() {
    fill(255, 0, 0);
    heart(this.x, this.y, this.r / 1.5);
  }

  grow() {
    if (this.isGrowing) {
      this.r += 0.2;
    }
  }
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(devicePixelRatio * 3);

  const pxs = setupText(width / 2, height / 2, word, 160);

  for (let y = size; y < width; y += size) {
    for (let x = size; x < width; x += size) {
      const index = (x + y * width) * 4;
      const r = pxs[index + 0];

      if (r > 128) {
        points.push({ x, y });
      }
    }
  }
}

function draw() {
  background(21);

  const total = 1;
  let count = 0;
  let attempts = 0;

  while (count < total) {
    const s = newShape();
    if (s !== null) {
      shapes.push(s);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      break;
    }
  }

  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    if (s.isGrowing) {
      for (let j = 0; j < shapes.length; j++) {
        const os = shapes[j];
        if (i !== j) {
          const d = dist(s.x, s.y, os.x, os.y);
          if (d - 2 < s.r + os.r) {
            s.isGrowing = false;
            break;
          }
        }
      }
    }
    s.grow();
    s.show();
  }
}
