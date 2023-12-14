// let rubikFont;
// let fontSize = 120;

// function preload() {
//   rubikFont = loadFont("./rubik_bubbles.ttf");
// }

// function setup() {
//   createCanvas(600, 600);
//   textFont(rubikFont);
//   textSize(fontSize);
//   textAlign(CENTER);
//   let textArray = rubikFont.textToPoints("J", 20, height / 2, fontSize, {
//     sampleFactor: 0.2,
//   });

//   const wordArray = textArray.map((word, index) => {
//     let randomPoint = randomArrayItem(textArray);
//     const originalX = word.x;
//     const originalY = word.y;
//     const otherPoints = textArray.filter((_, i) => i !== index);

//     for (let i = 0; i < otherPoints.length; i++) {
//       const { x: x1, y: y1 } = word;
//       // const { x: x2, y: y2 } = otherPoints[i];
//       let attempts = 0;

//       while (
//         linePointIntersect(
//           originalX,
//           originalY,
//           randomPoint.x,
//           randomPoint.y,
//           x1,
//           y1
//         ) &&
//         attempts < 50
//       ) {
//         randomPoint = randomArrayItem(
//           otherPoints.filter((_, idx) => idx !== i)
//         );
//         attempts++;
//       }

//       if (attempts < 50) break;
//     }

//     return [word.x, word.y, randomPoint.x, randomPoint.y];
//   });

//   fill(255, 0, 20);
//   noFill();
//   beginShape();
//   wordArray.forEach(([x1, y1, x2, y2]) => {
//     stroke(0);
//     // print(x1, y1, x2, y2);
//     circle(x1, y1, 1);
//     line(x1, y1, x2, y2);
//   });

//   endShape();
//   noLoop();
// }

// function randomArrayItem(array) {
//   const randomIdx = floor(random(array.length - 1));
//   return array[randomIdx];
// }

// function linePointIntersect(x1, y1, x2, y2, x3, y3) {
//   // Calcula la distancia entre el punto y la línea
//   const d = dist(x1, y1, x2, y2);
//   const d1 = dist(x1, y1, x3, y3);
//   const d2 = dist(x2, y2, x3, y3);

//   // Si la suma de las distancias d1 y d2 es igual a la distancia d, el punto está en la línea
//   return d1 + d2 <= d + 0.2; // Agregar una pequeña tolerancia para evitar intersecciones exactas
// }

let font;
let points;

function preload() {
  font = loadFont("./rubik_bubbles.ttf");
}

function setup() {
  createCanvas(400, 400);
  textFont(font);
  textSize(200);
  points = font.textToPoints("J", 100, 250, 200);
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  // beginShape();
  // for (let i = 0; i < points.length; i++) {
  //   vertex(points[i].x, points[i].y);
  // }
  // endShape();

  stroke(0, 100);
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const closestPoint = getClosestPointOnEdge(p.x, p.y);
    line(p.x, p.y, closestPoint.x, closestPoint.y);
  }
}

function getClosestPointOnEdge(x, y) {
  let closest = createVector(0, 0);
  let closestDist = Infinity;

  for (let i = 0; i < points.length; i++) {
    const nextIndex = (i + 1) % points.length;
    const a = points[i];
    const b = points[nextIndex];
    const edge = createVector(b.x - a.x, b.y - a.y);
    const edgeNormal = createVector(-edge.y, edge.x).normalize();

    const ap = createVector(x - a.x, y - a.y);
    const proj = ap.dot(edgeNormal);
    let closestOnEdge;

    if (proj <= 0) {
      closestOnEdge = a;
    } else if (proj >= edge.mag()) {
      closestOnEdge = b;
    } else {
      const projVector = edgeNormal.copy().mult(proj);
      closestOnEdge = createVector(a.x + projVector.x, a.y + projVector.y);
    }

    const d = dist(x, y, closestOnEdge.x, closestOnEdge.y);
    if (d < closestDist) {
      closestDist = d;
      closest = closestOnEdge;
    }
  }

  return closest;
}
