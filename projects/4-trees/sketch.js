const leafColors = [
  [80, 120, 40],
  [172, 105, 188],
  [172, 91, 57],
];

let leafPalette;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  background(255);
  randomSeed(3);
  leafPalette = generateLeafPalette();
  translate(0, height / 4, 0);
  branch(100);
}

function draw() {
  rotateY(frameCount);
}

function branch(len) {
  stroke(70, 40, 20);
  strokeWeight(map(len, 10, 100, 0.5, 8));
  line(0, 0, 0, 0, -len - 2, 0);
  translate(0, -len, 0);

  if (len > 10) {
    for (let i = 0; i < 3; i++) {
      rotateY(random(100, 160));

      push();
      rotateZ(random(20, 60));
      branch(len * 0.7);
      pop();
    }
  } else {
    const [r, g, b] = leafPalette;
    fill(r, g, b, 100);
    noStroke();

    translate(5, 0, 0);
    rotateZ(90);

    beginShape();
    let rad = random(5, 10);
    for (let i = 45; i < 135; i++) {
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    for (let i = 135; i > 45; i--) {
      let x = rad * cos(i);
      let y = rad * sin(-i) + 10;
      vertex(x, y);
    }
    endShape();
  }
}

function generateLeafPalette() {
  const color = leafColors[floor(random(leafColors.length))];

  let r = color[0] + random(-20, 20);
  let g = color[1] + random(-20, 20);
  let b = color[2] + random(-20, 20);
  return [r, g, b];
}
