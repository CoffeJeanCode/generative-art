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
      drawLine(x, y, customNoise(xnoise, ynoise));
    }
  }
}

function customNoise(x, y) {
  let x0 = Math.floor(x);
  let y0 = Math.floor(y);
  let x1 = x0 + 1;
  let y1 = y0 + 1;

  let sx = x - x0;
  let sy = y - y0;

  let n0, n1, ix0, ix1, value;

  ix0 = gradientDotProduct(x0, y0, x, y);
  ix1 = gradientDotProduct(x1, y0, x, y);
  n0 = lerp(ix0, ix1, sx);

  ix0 = gradientDotProduct(x0, y1, x, y);
  ix1 = gradientDotProduct(x1, y1, x, y);
  n1 = lerp(ix0, ix1, sx);

  value = lerp(n0, n1, sy);
  return value;
}

function gradientDotProduct(ix, iy, x, y) {
  let dx = x - ix;
  let dy = y - iy;

  let random =
    2920 *
    Math.sin(ix * 21942 + iy * 171324 + 8912) *
    Math.cos(ix * 23157 * iy * 217832 + 9758);
  let gradient = { x: Math.cos(random), y: Math.sin(random) };

  let distanceVec = { x: dx, y: dy };
  return gradient.x * distanceVec.x + gradient.y * distanceVec.y;
}

function drawSquare(x, y, noiseFactor) {
  const len = 10 * noiseFactor;
  rect(x, y, len, len);
}

function drawLine(x, y, noiseFactor) {
  push();
  translate(x, y);
  rotate(noiseFactor * radians(360));

  // Mapear el valor del ruido a una paleta de colores
  colorMode(HSB, 100);
  strokeWeight(map(noiseFactor, 0, 1, 0.25, 1)); // Mapear el grosor del trazo según el ruido
  stroke(21); // Establecer el color mapeado como color de trazo
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
