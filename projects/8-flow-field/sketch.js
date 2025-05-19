class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = random(effect.width);
    this.y = random(effect.width);
    this.speedX = 0;
    this.speedY = 0;
    this.speedMondifier = random(1, 5);
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = random(100) + 10;
    this.angle = 0;
    this.timer = this.maxLength * 2;
  }

  draw() {
    beginShape();
    moveTo(this.history[0].x, this.history[0].y);
    stroke(255);
    noFill();
    this.history.forEach((element) => {
      vertex(element.x, element.y);
    });
    endShape();
  }

  update() {
    this.timer -= 1;

    if (this.timer >= 1) {
      let x = floor(this.x / this.effect.cellSize);
      let y = floor(this.y / this.effect.cellSize);
      let index = y * this.effect.cols + x;
      this.angle = this.effect.flowField[index];

      this.speedX = cos(this.angle);
      this.speedY = sin(this.angle);
      this.x += this.speedX * this.speedMondifier;
      this.y += this.speedY * this.speedMondifier;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = this.maxLength * 2;
  }
}

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberParticles = 200;
    this.cellSize = 20;
    this.rows = 0;
    this.cols = 0;
    this.flowField = [];
    this.curve = 1;
    this.zoom = 0.2;
  }

  init() {
    this.cols = floor(this.width / this.cellSize);
    this.rows = floor(this.height / this.cellSize);
    this.flowField = [];
    this.particles = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let angle = (cos(x * this.zoom) + sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }

    for (let i = 0; i < this.numberParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  drawGrid() {
    push();
    strokeWeight(0.4);
    stroke(250, 0, 0);
    for (let c = 0; c < this.cols; c++) {
      line(this.cellSize * c, 0, this.cellSize * c, this.height);
    }
    for (let r = 0; r < this.cols; r++) {
      line(0, this.cellSize * r, this.width, this.cellSize * r);
    }
    pop();
  }

  render() {
    this.drawGrid();
    this.particles.forEach((particle) => {
      particle.draw();
      particle.update();
    });
  }
}

let effect;

function setup() {
  createCanvas(600, 600);

  effect = new Effect(width, height);
  effect.init();
}

function draw() {
  background(21);
  effect.render();
}
