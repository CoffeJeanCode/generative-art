const stringText = "Jean";
const num = 100;
let textImg;
let points = [];
let size;

function setup() {
  createCanvas(600, 600);

  noLoop();
  smooth();
  pixelDensity(devicePixelRatio * 4);
  setupText();
  background(21);
  angleMode(DEGREES);
  size = floor(width / num);

  for (let y = 0; y < textImg.height; y += size) {
    for (let x = 0; x < textImg.width; x += size) {
      const index = (x + y * textImg.width) * 4;
      const r = textImg.pixels[index + 0];

      if (r > 128) {
        points.push({
          ...createVector(x, y),
          rotation: floor(random(4)) * 90,
          type: random(2.2),
        });
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
  textImg.textSize(200);
  textImg.text(stringText, width / 2, height / 2);
  textImg.loadPixels();
}

function draw() {
  background(21);

  stroke(255);
  for (let i = 0; i < points.length; i++) {
    const { x, y, rotation, type } = points[i];
    noFill();
    push();

    translate(x, y);

    rotate(rotation);

    if (type < 1.8) {
      arc(size / 2, -size / 2, size, size, 90, 180);
      arc(-size / 2, size / 2, size, size, -90, 0);
    } else if (type < 2) {
      line(-size / 2, 0, size / 2, 0);
      line(0, -size / 2, 0, size / 2);
    } else {
      line(-size / 2, 0, size / 2, 0);
      point(0, -size / 2);
      point(0, size / 2);
    }

    pop();

    // push();
    // stroke(255, 0, 0);
    // square(x, y, size);
    // pop();
  }
}
