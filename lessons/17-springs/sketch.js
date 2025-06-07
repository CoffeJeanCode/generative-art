const particles = []
const springs = []
const spacing = 1
let gravity = null
const k = 0.1

function setup() {
  createCanvas(600, 600)

  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(width / 2, i * spacing))

    if (i !== 0) {
      const a = particles[i]
      const b = particles[i - 1]
      const spring = new Spring(k, spacing, a, b)
      springs.push(spring)
    }
  }
  particles[0].isLocked = true

  gravity = createVector(0, 0.1)
}

function draw() {
  background(21)

  for (const spring of springs) {
    spring.update()
    // spring.show()
  }

  noFill()
  stroke(255)
  beginShape()

  const head = particles[0]

  curveVertex(head.position.x, head.position.y)

  for (const particle of particles) {
    particle.applyForce(gravity)
    particle.update()
    curveVertex(particle.position.x, particle.position.y)
    // particle.show()
  }

  const tail = particles[particles.length - 1]

  curveVertex(tail.position.x, tail.position.y)

  endShape()

  if (mouseIsPressed) {
    tail.position.set(mouseX, mouseY)
    tail.velocity.set(0, 0)
  }

}

class Spring {
  constructor(k, len, objA, objB) {
    this.k = k
    this.len = len
    this.objA = objA
    this.objB = objB
  }

  update() {
    const force = p5.Vector.sub(this.objB.position, this.objA.position)
    const x = force.mag() - this.len

    force.normalize()

    force.mult(this.k * x)
    this.objA.applyForce(force)
    force.mult(-1)
    this.objB.applyForce(force)

  }

  show() {
    strokeWeight(4)
    stroke(255)

    line(this.objA.position.x, this.objA.position.y, this.objB.position.x, this.objB.position.y)
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.acceleration = createVector(0, 0)
    this.velocity = createVector(0, 0)
    this.mass = 1

    this.isLocked = false;
  }

  applyForce(force) {
    const f = force.copy()

    f.div(this.mass)
    this.acceleration.add(f)
  }

  update() {
    if (!this.isLocked) {
      this.velocity.mult(0.99)
      this.velocity.add(this.acceleration)
      this.position.add(this.velocity)
      this.acceleration.mult(0)
    }
  }

  show() {
    fill(255)
    circle(this.position.x, this.position.y, 10)
  }

}