const waves = [];

function setup() {
  createCanvas(600, 600);

  pixelDensity(4)

  waves.push(new Wave(random(height / 3), random(300, 600), random(TAU)))
}

function draw() {
  background(21);

  if (mouseIsPressed) {
    waves.push(new Wave(random(height / 10), random(200, 400), random(TAU)))
  }

  translate(0, height / 2)

  beginShape()
  noFill()
  stroke(255)

  for (let x = 0; x < width; x++) {
    let y = 0;
    for (const wave of waves) {
      y += wave.evaluate(x)
    }
    vertex(x, y)
  }
  endShape()

  for (const wave of waves) {
    wave.update()
  }
}

class Wave {
  constructor(amplitude, period, phase) {
    this.amplitude = amplitude
    this.period = period
    this.phase = phase
  }

  evaluate(x) {
    return sin(this.phase + TAU * x / this.period) * this.amplitude
  }

  update() {
    this.phase -= 0.05
  }
}
