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
    this.originalList = [...this.splits];
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
    const fallOff = sin(frameCount / 2);
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

    if (this.isHovered()) {
      this.splits = modifiedList;
    } else {
      this.splits = this.originalList;
    }
  }

  isHovered() {
    const mouseXPos = mouseX - width / 2;
    const mouseYPos = mouseY - height / 2;

    let isInside = false;

    for (let i = 0; i < this.splits.length - 1; i++) {
      const p1 = this.splits[i];
      const p2 = this.splits[i + 1];

      const d1 = dist(mouseXPos, mouseYPos, p1.x, p1.y);
      const d2 = dist(mouseXPos, mouseYPos, p2.x, p2.y);

      const d = this.distToSegment(
        mouseXPos,
        mouseYPos,
        p1.x,
        p1.y,
        p2.x,
        p2.y
      );

      if (d < 10 || d1 < 10 || d2 < 10) {
        // Define aquí un umbral para la distancia
        isInside = true;
        break;
      }
    }

    return isInside;
  }

  distToSegment(x, y, x1, y1, x2, y2) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return sqrt(dx * dx + dy * dy);
  }
}
