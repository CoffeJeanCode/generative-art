class Rope {
  constructor(from, to, divisions) {
    this.from = from;
    this.to = to;
    this.divisions = divisions;
    const deltaLine = p5.Vector.sub(this.to, this.from);
    const diffSplit = deltaLine.div(this.divisions);
    this.splits = floatRange(0, this.divisions, 1).map((i) => {
      const x = this.from.x + diffSplit.x * i;
      const y = this.from.y + diffSplit.y * i;
      return createVector(x, y);
    });
  }

  draw() {
    beginShape();

    curveVertex(this.splits[0].x, this.splits[0].y);

    this.splits.forEach((split) => {
      const { x, y } = split;
      curveVertex(x, y);
    });

    curveVertex(
      this.splits[this.splits.length - 1].x,
      this.splits[this.splits.length - 1].y
    );

    endShape();
  }

  update() {
    const fallOff = sin(frameCount / 2) * 1;
    const offsetList = floatRange(0, this.divisions, 1).map((offset) =>
      createVector(
        mirrorInterpolation(sinusoidalInterpolation)(
          offset / this.splits.length,
          0,
          1
        ),
        0
      )
    );

    const modifiedList = offsetVectorList(this.splits, offsetList, fallOff);
    if (mouseIsPressed) {
      this.splits = modifiedList;
    }
  }
}
