function setup() {
  createCanvas(600, 600);
  background(255);
  smooth();

  let xstart = random(10);

  let xnoise = xstart;
  let ynoise = random(10);

  for (let y = 0; y <= height; y += 5) {
    ynoise += 0.1;
    xnoise = xstart;

    for (let x = 0; x <= width; x += 5) {
      xnoise += 0.1;
      drawLine(x, y, noise(xnoise, ynoise));
    }
  }
}

function drawSquare(x, y, noiseFactor) {
  const len = 10 * noiseFactor;
  rect(x, y, len, len);
}

function drawLine(x, y, noiseFactor) {
  push();
  translate(x, y);
  rotate(noiseFactor * radians(360));
  stroke(0, 150);
  line(0, 0, 20, 0);
  pop();
}

function drawPoint(x, y, noiseFactor) {
  push();
  translate(x, y);
  rotate(noiseFactor * radians(360));
  let edgeSize = noiseFactor * 40;
  let grey = 21 + noiseFactor * 120;
  let alph = 150 + noiseFactor * 120;
  noStroke();
  fill(grey, alph);
  ellipse(0, 0, edgeSize, edgeSize / 2);
  pop();
}
