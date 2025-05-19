class Element {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.size = size;
  }

  draw() {
    noStroke()
    fill(0, 50)
    ellipse(this.position.x, this.position.y, this.size * 2, this.size * 2);
  }

  update(rule) {
    const [a, b, c, d, e, f] = rule.rule;
    const x = this.position.x;
    const y = this.position.y;
    const newX = a * x + b * y + e;
    const newY = c * x + d * y + f;
    this.position.set(newX, newY);
  }
}

class IFS {
  constructor(rules) {
    this.rules = rules;
    this.current = new Element(random(), random(), 0.01);
  }

  iterate(n = 50) {
    for (let i = 0; i < n; i++) {
      const rule = this.getRule();
      this.current.update(rule);
      this.current.draw();
    }
  }

  getRule() {
    let r = random();
    for (const rule of this.rules) {
      if (r < rule.weight) return rule;
      r -= rule.weight;
    }
  }
}

let ifs;

function setup() {
  createCanvas(600, 600);
  background(255);
  ifs = new IFS([
    { weight: 0.01, rule: [0.0, 0.0, 0.0, 0.16, 0.0, 0.0] },
    { weight: 0.85, rule: [0.85, 0.04, -0.04, 0.85, 0.0, 1.6] },
    { weight: 0.07, rule: [0.2, -0.26, 0.23, 0.22, 0.0, 1.6] },
    { weight: 0.07, rule: [-0.15, 0.28, 0.26, 0.24, 0.0, 0.44] },
  ]);
}

function draw() {
  translate(width / 2, height);
  scale(60, -60)
  ifs.iterate(100);
}
