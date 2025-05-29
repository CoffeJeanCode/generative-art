const MAX_LENGTH = 1000
let time = 0
const path = []

const xPath = []
const yPath = []

let fourierX = []
let fourierY = []
const radius = 150

function setup() {
  createCanvas(1200, 600)

  const drawPath = parseSVGPath(`
   M 0 200             L 10 200            L 10 160            L 30 140            L 50 160            L 50 200            L 30 200            L 30 185            L 20 185            L 20 200            L 30 200            L 40 200            L 40 170            L 45 170            L 45 175            L 40 175            L 40 170            L 40 200            L 50 200            L 50 160            L 30 140            L 30 130            L 35 130            L 35 145            L 30 145            L 30 140            L 10 160            L 10 200            L 70 200            L 70 170            L 85 155            L 100 170           L 100 200           L 85 200            L 85 190            L 80 190            L 80 200            L 85 200            L 90 200            L 90 180            L 93 180            L 93 183            L 90 183            L 90 180            L 90 200            L 100 200           L 100 170           L 85 155            L 85 145            L 88 145            L 88 158            L 85 158            L 85 155            L 70 170            L 70 200            L 120 200           L 120 175           L 135 160           L 150 175           L 150 200           L 135 200           L 135 190           L 130 190           L 130 200           L 135 200           L 150 200           L 150 175           L 135 160           L 120 175           L 120 200           L 180 200           Q 195 150 210 200   Q 230 130 250 200   L 250 170           Q 245 160 250 150   Q 255 160 250 170   L 250 200           Q 270 160 290 200   L 320 200           Q 330 210 340 200   Q 350 210 360 200   Q 370 210 380 200   L 380 190           L 390 190           L 395 195           L 375 195           L 380 190           L 385 170           L 400 180           L 385 180           L 385 170           L 380 190           L 380 200           L 420 200           L 420 100           C 410 90 410 110 420 120 C 430 110 430 90 420 100 L 425 95            L 430 90            L 425 95            L 415 95            L 410 90            L 415 95            L 425 105           L 430 110           L 425 105           L 415 105           L 410 110           L 415 105           L 420 100           L 420 200           L 460 200           L 460 150           Q 465 140 470 150   Q 475 140 480 150   L 480 200           L 500 200           L 500 150           Q 505 140 510 150   Q 515 140 520 150   L 520 200           L 540 200           L 540 150           Q 545 140 550 150   Q 555 140 560 150   L 560 200           L 600 200                
  `)

  const skip = 1
  for (let i = 0; i < drawPath.length - 1; i += skip) {
    xPath.push(drawPath[i][0])
    yPath.push(drawPath[i][1])

  }

  print(xPath, yPath)

  fourierX = discreteFourierTransform(xPath)
  fourierY = discreteFourierTransform(yPath)

}

function draw() {
  background(21)
  stroke(255)

  const vX = epiCycle(width / 2, height / 5, 0, fourierX)
  const vY = epiCycle(width / 5, height / 2, HALF_PI, fourierY)
  const vector = createVector(vX.x, vY.y)

  path.unshift(vector)

  strokeWeight(0.8)
  line(vX.x, vX.y, vector.x, vector.y)
  line(vY.x, vY.y, vector.x, vector.y)

  strokeWeight(1)
  beginShape()
  noFill()

  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y)
  }

  endShape()

  const deltaTime = TWO_PI / fourierY.length

  // time += 0.01
  time += deltaTime

  if (path.length > MAX_LENGTH) {
    path.pop()
  }
}

function epiCycle(_x, _y, rotation, fourier) {
  let x = _x
  let y = _y

  for (let i = 0; i < fourier.length; i++) {
    const prevX = x
    const prevY = y

    const { frequency, amplitude: radius, phase } = fourier[i]

    x += radius * cos(frequency * time + phase + rotation)
    y += radius * sin(frequency * time + phase + rotation)

    noFill()
    strokeWeight(0.5)
    ellipse(prevX, prevY, radius * 2)

    strokeWeight(2)
    line(prevX, prevY, x, y)
  }

  return createVector(x, y)
}

function discreteFourierTransform(values) {
  const X = []
  const N = values.length


  for (let k = 0; k < N; k++) {
    let real = 0
    let imaginary = 0

    for (let n = 0; n < N; n++) {
      const angle = (TWO_PI * k * n) / N
      real += values[n] * cos(angle)
      imaginary -= values[n] * sin(angle)

    }

    real = real / N
    imaginary = imaginary / N

    const frequency = k
    const amplitude = sqrt(real * real + imaginary * imaginary)
    const phase = atan2(imaginary, real)

    X[k] = { real, imaginary, frequency, amplitude, phase }
  }


  return X
}


function parseSVGPath(d) {
  const commands = d.match(/[A-Za-z][^A-Za-z]*/g);
  if (!commands) return [];

  const points = [];
  for (const command of commands) {
    const type = command.charAt(0);
    const args = command.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);

    if (type === 'M' || type === 'L') {
      for (let i = 0; i < args.length; i += 2) {
        points.push([args[i], args[i + 1]]);
      }
    } else if (type === 'Q') {
      for (let i = 0; i < args.length; i += 4) {
        points.push([args[i + 2], args[i + 3]]);
      }
    }
  };

  return points;
}
