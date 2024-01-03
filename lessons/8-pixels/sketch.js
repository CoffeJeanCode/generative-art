const stringText = "404";
let textImg;
let type;

function setup() {
  createCanvas(500, 500);
  type = random();
  noLoop();
  frameRate(3);
  pixelDensity(1);
  setupText();
}

function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textAlign(CENTER, CENTER);
  textImg.textSize(200);
  textImg.text(stringText, width / 2, height / 2);
  textImg.loadPixels();
}

function draw() {
  background(255);

  for (let x = 0; x < textImg.width; x += 5) {
    for (let y = 0; y < textImg.height; y += 5) {
      const index = (x + y * textImg.width) * 4;
      const r = textImg.pixels[index + 0];
      if (r < 128) {
        if (type < 0.5) {
          push();
          const d = random();
          noStroke();
          translate(x, y);
          stroke(0);
          if (d < 0.5) {
            line(0, 0, 5, 5);
          } else {
            line(0, 5, 5, 0);
          }
          pop();
        } else {
          push();
          noStroke();
          fill(0);
          translate(x, y);
          const rad = random(2, 6);
          circle(0, 0, rad);
          pop();
        }
      }
    }
  }
}
