let time = 0
const wave = []

let slider = null;

function setup() {
  createCanvas(1200, 600)

  slider = createSlider(1, 50, 10);
}

function draw() {
  background(21)

  textSize(30)
  text(slider.value(), 50, 50)
  translate(width / 4, height / 2)
  stroke(255)

  let x = 0;
  let y = 0;
  let radius = 0;


  for (let i = 0; i < slider.value(); i++) {
    const prevX = x
    const prevY = y

    const n = (i * 2) + 1
    radius = 100 * (4 / (n * PI))

    x += radius * cos(n * time)
    y += radius * sin(n * time)

    noFill()
    strokeWeight(0.5)
    ellipse(prevX, prevY, radius * 2)

    strokeWeight(2)
    line(prevX, prevY, x, y)
  }

  wave.unshift(y)

  translate(width / 4, 0)

  line(x - width / 4, y, 0, wave[0])
  beginShape()
  noFill()

  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i])
  }

  endShape()



  time += 0.02

  if (wave.length > 500) {
    wave.pop()
  }
}