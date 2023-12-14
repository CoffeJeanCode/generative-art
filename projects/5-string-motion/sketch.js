class Rope {
  constructor(from, to, divisions) {
    this.from = from;
    this.to = to;
    this.divisions = divisions;
    this.splits = [];

    this.init();
  }

  init() {
    const delta = p5.Vector.sub(this.to, this.from);
    const diff = delta.div(this.divisions);

    for (let i = 0; i < this.divisions + 1; i++) {
      const x = this.from.x + diff.x * i;
      const y = this.from.y + diff.y * map(i, 0, 1, 0, random(3));

      this.splits.push(createVector(x, y));
    }
  }

  draw() {
    line(this.from.x, this.from.y - 50, this.to.x, this.to.y - 50);
    beginShape();

    curveVertex(this.splits[0].x, this.splits[0].y);

    this.splits.forEach((split, i0) => {
      const { x, y } = split;
      circle(x, y, 5);
      print(x, y, i0);
      curveVertex(x, y);
    });
    curveVertex(
      this.splits[this.splits.length - 1].x,
      this.splits[this.splits.length - 1].y
    );
    // map(sin(radians(value)), 0, 1, 0, 5);

    endShape();
  }
}

let rope;

function setup() {
  createCanvas(600, 600);

  rope = new Rope(
    createVector(100, height / 2),
    createVector(width - 100, height / 2 - 100),
    8
  );
  noLoop();
}

function draw() {
  background(21);
  stroke(255);
  noFill();

  rope.draw();
}
