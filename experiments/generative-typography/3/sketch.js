let circles = [];
let points = [];
let word = "Jean";
let textGraphic = null;
let size = 2;

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

function newCircle() {
  const randomCircle = random(points);
  const { x, y } = randomCircle;
  let isValid = true;

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    const d = dist(x, y, c.x, c.y);

    if (d < c.r) {
      isValid = false;
      break;
    }
  }

  return isValid ? new Circle(x, y, 1) : null;
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.isGrowing = true;
  }

  show() {
    fill(255, 0, 0);
    heart(this.x, this.y, this.r / 1.5);

    // noFill();
    // stroke(255);
    // circle(this.x, this.y, this.r);
  }

  grow() {
    if (this.isGrowing) {
      this.r += 0.2;
    }
  }
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(devicePixelRatio * 3);

  const pxs = setupText(width / 2, height / 2, word, 200);

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
    const c = newCircle();
    if (c !== null) {
      circles.push(c);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    if (c.isGrowing) {
      for (let j = 0; j < circles.length; j++) {
        const oc = circles[j];
        if (i !== j) {
          const d = dist(c.x, c.y, oc.x, oc.y);
          if (d - 2 < c.r + oc.r) {
            c.isGrowing = false;
            break;
          }
        }
      }
    }
    c.grow();
    c.show();
  }
}
