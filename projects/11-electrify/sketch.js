const points = [];
const numPoints = 500
const mouse = { x: 0, y: 0, radius: 50 }

function setup() {
  createCanvas(600, 600);


  for (let i = 0; i < numPoints; i++) {
    points.push({ x: random(width), y: random(height) })
  }

  pixelDensity(2)
}

function draw() {
  background(21);

  mouse.x = mouseX
  mouse.y = mouseY

  stroke(255)
  // ellipse(mouse.x, mouse.y, mouse.radius * 2)

  for (const p of points) {
    const { x, y } = p
    push()
    noStroke()
    ellipse(x, y, 3)
    if (pointCollitionCircle(p, mouse)) {
      stroke(255)
      randomLine(x, y, mouse.x, mouse.y)
      // line(x, y, mouse.x, mouse.y)
    }
    pop()

  }
}

function randomLine(x1, y1, x2, y2, divisions = 20, variance = 5) {
  beginShape();
  for (let i = 0; i <= divisions; i++) {
    const t = i / divisions;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    // Añadir variación aleatoria controlada
    x += random(-variance, variance);
    y += random(-variance, variance);

    vertex(x, y);
  }
  endShape();
}

function pointCollitionCircle(point, circle) {
  return dist(point.x, point.y, circle.x, circle.y) < circle.radius
}
