function setup() {
  createCanvas(600, 600);
  background(21);

  strokeWeight(6);
  smooth();
  stroke(20, 50, 100);
  line(20, height / 2, width - 20, height / 2);

  let xStep = 10;
  let yStep = 10;

  let lastX = 20;
  let lastY = height / 2;

  let y = height / 2;
  let borderX = 20;
  let borderY = 1;

  for (let x = 10; x <= width - borderX; x += xStep) {
    /**
     * y = random(borderY, height - 2 * borderY) its same to
     * y = borderY + random(height - 2 * borderY)
     */

    yStep = random(20) - 10; // range -10 to 10
    y += yStep;

    stroke(255, 70);
    line(x, y, lastX, lastY);

    lastX = x;
    lastY = y;
  }
}
