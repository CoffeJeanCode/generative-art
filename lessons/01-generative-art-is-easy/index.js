function setup() {
  createCanvas(600, 600, WEBGL);
  background(21);
  stroke(0, 50);
  fill(255, 200);

  const xStart = random(20);
  let yNoise = random(20);

  for (let y = -(height / 8); y <= height / 8; y += 3) {
    yNoise += 0.02;
    let xNoise = xStart;
    for (let x = -(width / 8); x <= width / 8; x += 3) {
      xNoise += 0.02;
      drawPoint(x, y, noise(xNoise, yNoise));
    }
  }
}

function drawPoint(x, y, noiseFactor) {
  push();
  translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);
  const edgeSize = noiseFactor * 26;
  noStroke();
  ellipse(0, 0, edgeSize, edgeSize);
  pop();
}
