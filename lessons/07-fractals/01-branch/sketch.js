const maxLevels = 7;
const numChildren = 2;
const noiseIncrement = 0.01;
let noiseVal = 0.0;
let _trunk;

class Branch {
  constructor(lev, idx, ex, why) {
    this.x = 0;
    this.y = 0;
    this.endx = 0;
    this.endy = 0;
    this.level = lev;
    this.idx = idx;
    this.children = [];

    this.strokeW = (1 - 1 / this.level) * 25;
    this.alph = 255 / this.level;
    this.len = (1 / this.level) * random(100);
    this.rot = random(360);
    this.lenChange = random(10) - 10;
    this.rotChange = random(10) - 10;

    this.update(ex, why);

    if (this.level < maxLevels) {
      for (let i = 0; i < numChildren; i++) {
        this.children.push(new Branch(this.level + 1, i, this.endx, this.endy));
      }
    }
  }

  draw() {
    strokeWeight(maxLevels - this.level + 1);
    line(this.x, this.y, this.endx, this.endy);
    ellipse(this.x, this.y, 5, 5);
    for (const child of this.children) {
      child.draw();
    }
  }

  update(ex, why) {
    this.x = ex;
    this.y = why;

    this.rot += this.rotChange;
    this.rot = this.rot > 360 ? (this.root < 0 ? 360 : 0) : this.rot;

    this.len -= (this.lenChange * 0.5) / this.len;
    this.lenChange *= this.len < 0 ? -1 : this.len > 200 ? -1 : 1;

    const radian = radians(this.rot);
    this.endx = this.x + this.len * cos(radian);
    this.endy = this.y + this.len * sin(radian);

    for (const child of this.children) {
      child.update(this.endx, this.endy)
    }
  }
}

function setup() {
  createCanvas(600, 600);
  background(255);
  noFill();
  smooth();

  if (frameCount > 100) {
    noLoop();
  }

  _trunk = new Branch(1, 0, width / 2, 50);
}

function draw() {
  noiseVal += noiseIncrement;
  background(255);
  _trunk.update(width / 2, height / 2);
  _trunk.draw(width / 2, height / 2);
}