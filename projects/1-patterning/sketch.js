function setup() {
  createCanvas(600, 600);
  background(21);
  noLoop();
  smooth();
  strokeWeight(0.5);

  let yNoise = random(20);

  push();
  translate(width / 2, height / 2);
  noFill();
  let centX = 0;
  let centY = 0;
  let radius = 200;

  for (let ang = 0; ang <= 360 * 5; ang += 5) {
    radius += 0.5;
    yNoise += 0.5;

    let rad = radians(ang);
    let x = centX + radius * cos(rad);
    let y = centY + radius * sin(rad);
    let x2 = centX + radius * cos(rad - random(0.5));
    let y2 = centY + radius * sin(rad - random(0.5));

    // stroke(200 - x, 200 - y, 200 - y * x);
    stroke(255);
    line(x, y, x2, y2);

    radius -= noise(yNoise) * 3;
  }
  pop();
}
