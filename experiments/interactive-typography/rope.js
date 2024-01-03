class Rope {
  constructor(from, to, divisions) {
    this.from = from;
    this.to = to;

    this.divisions = divisions;
    this.segments = this.setSegments();
    this.originalSegements = [...this.segments];

    this.hovered = false;
    this.hoverStartTime = 0;
    this.decayRate = 0.002;
  }

  setSegments() {
    const lineLength = p5.Vector.sub(this.to, this.from);
    const spacing = lineLength.div(this.divisions);

    return range(0, this.divisions, 1).map((i) => {
      const x = this.from.x + spacing.x * i;
      const y = this.from.y + spacing.y * i;
      return createVector(x, y);
    });
  }

  draw() {
    beginShape();

    curveVertex(this.segments[0].x, this.segments[0].y);

    this.segments.forEach((segment) => {
      curveVertex(segment.x, segment.y);
    });

    curveVertex(
      this.segments[this.segments.length - 1].x,
      this.segments[this.segments.length - 1].y
    );

    endShape();
  }

  update(x, y, radius) {
    const currentTime = Date.now();

    if (this.isHovered(x, y, radius)) {
      this.handleHover(currentTime);
    } else {
      this.handleNoHover();
    }
  }

  handleHover(currentTime) {
    if (!this.hovered) {
      this.hovered = true;
      this.hoverStartTime = currentTime;
    }

    const elapsedTime = currentTime - this.hoverStartTime;

    const decay = Math.exp(-this.decayRate * elapsedTime);

    const fallOff = Math.sin(frameCount / 2.5) * decay;

    const offsetVectors = range(0, this.divisions, 1).map((offset) =>
      createVector(
        mirrorInterpolation(sinusoidalInterpolation)(
          offset / this.segments.length,
          0,
          1
        ),
        0
      )
    );

    const modifiedList = offsetVectorList(
      this.segments,
      offsetVectors,
      fallOff
    );

    this.segments = modifiedList;
  }

  handleNoHover() {
    this.hovered = false;
    this.segments = this.originalSegements;
  }

  isHovered(x, y, radius = 10) {
    const mouseXPos = x;
    const mouseYPos = y;

    let isHovering = false;

    for (let i = 0; i < this.segments.length - 1; i++) {
      const p1 = this.segments[i];
      const p2 = this.segments[i + 1];

      const d1 = dist(mouseXPos, mouseYPos, p1.x, p1.y);
      const d2 = dist(mouseXPos, mouseYPos, p2.x, p2.y);

      const d = distToSegment(mouseXPos, mouseYPos, p1.x, p1.y, p2.x, p2.y);

      if (d < radius || d1 < radius || d2 < radius) {
        isHovering = true;
        break;
      }
    }

    return isHovering;
  }
}
