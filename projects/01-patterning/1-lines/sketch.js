const lines = [];
const numCols = 50
const numRows = 10


function setup() {
  createCanvas(600, 600);
  const colSize = round(width / numCols)
  const rowSize = round(height / numRows)
  const maxCol = random(numCols)

  for (let rows = 0; rows < numRows; rows++) {
    for (let cols = 0; cols < numCols; cols++) {
      const x1 = cols * colSize + colSize / 2
      const y1 = rows * rowSize

      lines.push({
        point: { x: x1, y: y1 },
        hght: rowSize,
        colr: color(255),
        angle: cols < maxCol ? 0 : map(Math.random(), 0, 1, PI / 4, -PI / 4)
      })
    }
  }

  pixelDensity(2)
}

function draw() {
  background(21);

  for (const _line of lines) {
    const { point, hght, angle, colr } = _line

    const x = point.x
    const y = point.y + hght / 4

    push()
    translate(x, y)
    strokeCap(SQUARE);
    strokeWeight(3);
    stroke(colr)
    rotate(angle)
    line(0, 0, 0, hght - hght / 2);
    pop()
  }

}
