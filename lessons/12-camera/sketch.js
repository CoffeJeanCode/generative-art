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

let capture;
let tileSize;

function setup() {
  createCanvas(600, 500);
  pixelDensity(devicePixelRatio * 3);
  smooth();
  tileSize = width / 50;
  capture = createCapture(VIDEO);
  capture.size(width / tileSize, height / tileSize);
  capture.hide();
}

function draw() {
  background(51);
  capture.loadPixels();
  loadPixels();

  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      const index = (x + y * capture.width) * 4;
      const r = capture.pixels[index + 0];
      const g = capture.pixels[index + 1];
      const b = capture.pixels[index + 2];
      const bright = (r + g + b) / 3;
      const size = map(bright, 0, 255, tileSize * 2, 0);

      push();
      fill(r, g, b);
      translate(x * tileSize, y * tileSize);
      heart(0, 0, size / 2);
      pop();
    }
  }
}
