let lineGroups = [];
let currentGroup = [];
let prevPoint = null;

const minLength = 100; // Longitud mínima de la línea
const divisions = 5; // Número de divisiones por línea

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(21);

  if (mouseIsPressed) {
    if (
      !prevPoint ||
      dist(prevPoint[0], prevPoint[1], mouseX, mouseY) >= minLength
    ) {
      if (prevPoint) {
        const segmentLength =
          dist(prevPoint[0], prevPoint[1], mouseX, mouseY) / divisions;
        const angle = atan2(mouseY - prevPoint[1], mouseX - prevPoint[0]);

        let groupLines = [];
        for (let i = 0; i < divisions; i++) {
          const newX = prevPoint[0] + cos(angle) * segmentLength * (i + 1);
          const newY = prevPoint[1] + sin(angle) * segmentLength * (i + 1);
          groupLines.push([prevPoint, [newX, newY]]);
        }

        currentGroup.push(groupLines);
      }
      prevPoint = [mouseX, mouseY];
    }
  } else if (prevPoint) {
    lineGroups.push(currentGroup);
    currentGroup = [];
    prevPoint = null;
  }

  for (let groupIndex = 0; groupIndex < lineGroups.length; groupIndex++) {
    let group = lineGroups[groupIndex];
    for (let linesIndex = 0; linesIndex < group.length; linesIndex++) {
      let lines = group[linesIndex];
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        let lineCoords = lines[lineIndex];
        stroke(255);
        line(
          lineCoords[0][0],
          lineCoords[0][1],
          lineCoords[1][0],
          lineCoords[1][1]
        );

        circle(lineCoords[1][0], lineCoords[1][1], 5);

        if (
          groupIndex > 0 &&
          linesIndex < lineGroups[groupIndex - 1].length &&
          lineIndex < lineGroups[groupIndex - 1][linesIndex].length
        ) {
          let prevLine = lineGroups[groupIndex - 1][linesIndex];
          let prevLineCoords = prevLine[lineIndex];

          line(
            lineCoords[1][0],
            lineCoords[1][1],
            prevLineCoords[1][0],
            prevLineCoords[1][1]
          );
        }
      }
    }
  }

  if (prevPoint) {
    push();
    noStroke();
    fill(255);
    circle(prevPoint[0], prevPoint[1], 5);
    pop();
  }
}
