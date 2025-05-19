function setup() {
  createCanvas(600, 600);
  background(21);
  strokeWeight(0.5);
  smooth();

  let centX = width / 2;
  let centY = height / 2;
  let x, y;

  for (let i = 0; i < 100; i++) {
    let lastx = -999;
    let lasty = -999;
    let radius = 10;
    let radiusNoise = random(radius);
    let startangle = int(random(360));
    let endangle = startangle * 5 + int(random(1440));
    let anglestep = 5 + int(random(3));

    stroke(i, y, x);
    for (let ang = startangle; ang <= endangle; ang += anglestep) {
      radiusNoise += 0.05;
      radius += 0.5;

      let thisRadius = radius + noise(radiusNoise) * 200 - 100;
      let rad = radians(ang);
      x = centX + thisRadius * cos(rad);
      y = centY + thisRadius * sin(rad);

      if (lastx > -999) {
        line(x, y, lastx, lasty);
      }

      lastx = x;
      lasty = y;
    }
  }
}
