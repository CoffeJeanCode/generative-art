let xstart, xnoise, ynoise;

function setup() {
  createCanvas(600, 600, WEBGL);
  smooth();
  background(0);

  xstart = random(10);
  ystart = random(10);
}

function draw() {
  background(0);
  translate(-width / 2, 0, height / 2);
  noStroke();
  xstart += 0.01;
  ystart += 0.01;
  xnoise = xstart;
  ynoise = ystart;

  xnoise = xstart;
  ynoise = ystart;

  for (let y = 0; y <= height; y += 5) {
    ynoise += 0.1;
    xnoise = xstart;

    for (let x = 0; x <= width; x += 5) {
      xnoise += 0.1;
      drawSphere(x, y, noise(xnoise, ynoise));
    }
  }
}

function drawSphere(x, y, noiseFactor) {
  push();
  translate(x, 250 - y, -y);
  let sphereSize = noiseFactor * 35;
  let grey = 150 + noiseFactor * 120;
  let alph = 150 + noiseFactor * 120;
  fill(grey, alph);
  sphere(sphereSize);
  pop();
}
