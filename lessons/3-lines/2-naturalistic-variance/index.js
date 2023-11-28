function setup() {
  createCanvas(600, 600);
  background(21);

  strokeWeight(5);
  smooth();

  stroke(0, 30);
  stroke(20, 50, 70);
  line(20, height / 2, width - 20, height / 2);

  let step = 10;
  let lastx = -999;
  let lasty = -999;
  let ynoise = random(20);
  let y;

  for (let x = 20; x <= width - 20; x += step) {
    ynoise = noise(ynoise) * 100;
    y = ynoise + height / 2.35;
    if (lastx > -999) {
      stroke(255, 70);
      line(x, y, lastx, lasty);
    }
    lastx = x;
    lasty = y;
    ynoise += 0.1;
  }
}
