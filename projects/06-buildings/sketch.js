const buildings = [];

let tileSize = 80;
let mouse = null;
let buildW = 0;
let buildH = 0;
let windowW = 0;
let windowH = 0;
let wrows = 0;
let wcols = 0;
let rotation = 0;

function setup() {
  c = createCanvas(windowWidth - 100, windowHeight - 100, WEBGL);
  angleMode(DEGREES);
  pixelDensity(devicePixelRatio * 2);

  tileSize = random(30, 45);
}

function mouseClicked() {
  buildings.push({
    x: mouse.x,
    y: mouse.y,
    z: mouse.z,
    buildW,
    buildH,
    windowW,
    windowH,
    wrows,
    wcols,
    rotation,
  });
}

function mouseMoved() {
  buildW = tileSize;
  buildH = -tileSize * random(2, 3);

  const windowNum = floor(random(3, 5));

  windowW = abs(buildW / windowNum);
  windowH = abs(buildH / windowNum);

  wrows = floor(buildW / windowW);
  wcols = abs(floor(buildH / windowH));

  const x = mouseX - width / 2 - buildW / 2;
  const y = mouseY - height / 2;
  const z = map(y / x, -height / 2, 0, -200, 100);

  mouse = { x: 0, y: 0, z: 0 };

  mouse.x = x;
  mouse.y = y;
  mouse.z = z;

  rotation = random([30, -30]);
}

function draw() {
  background(220);
  rotateX(-20);
  rotateY(30);

  if (mouse !== null) {
    push();
    translate(mouse.x, mouse.y, mouse.z);
    fill("black");
    beginShape();
    vertex(0, 0, 0);
    vertex(buildW, 0, 0);
    vertex(buildW, 0, buildW);
    vertex(0, 0, buildW);
    endShape(CLOSE);
    pop();
  }

  // push();
  // fill("red");
  // translate(-100, 0, -200);
  // box(10, 10);
  // pop();

  // push();
  // fill("green");
  // translate(100, 0, 100);
  // box(10, 10);
  // pop();

  // push();
  // fill("blue");
  // translate(0, 100, 0);
  // box(10, 10);
  // pop();

  // push();
  // fill("yellow");
  // translate(0, -100, 0);
  // box(10, 10);
  // pop();

  for (const building of buildings) {
    const { x, y, z, buildW, buildH, windowW, windowH, wrows, wcols, rotation } = building;
    push();
    translate(x, y, z);
    rotateY(rotation);
    // bottom
    fill("black");
    beginShape();
    vertex(0, 0, 0);
    vertex(buildW, 0, 0);
    vertex(buildW, 0, buildW);
    vertex(0, 0, buildW);
    endShape(CLOSE);

    // top
    fill("white");
    beginShape();
    vertex(0, buildH, 0);
    vertex(buildW, buildH, 0);
    vertex(buildW, buildH, buildW);
    vertex(0, buildH, buildW);
    endShape(CLOSE);

    // back
    fill("black");
    beginShape();
    vertex(0, 0, 0);
    vertex(buildW, 0, 0);
    vertex(buildW, buildH, 0);
    vertex(0, buildH, 0);
    endShape(CLOSE);

    // front
    fill("white");
    beginShape();
    vertex(0, 0, buildW);
    vertex(buildW, 0, buildW);
    vertex(buildW, buildH, buildW);
    vertex(0, buildH, buildW);
    endShape(CLOSE);

    // left
    fill("black");
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, buildW);
    vertex(0, buildH, buildW);
    vertex(0, buildH, 0);
    endShape(CLOSE);

    // right
    fill("black");
    beginShape();
    vertex(buildW, 0, 0);
    vertex(buildW, 0, buildW);
    vertex(buildW, buildH, buildW);
    vertex(tileSize, buildH, 0);
    endShape(CLOSE);

    // windows

    for (let i = 0; i < wcols; i++) {
      for (let j = 0; j < wrows; j++) {
        const x = i * windowW;
        const y = -j * windowH - windowH;
        fill(255);
        beginShape();
        vertex(x, y, buildW);
        vertex(x + windowW, y, buildW);
        vertex(x + windowW, y + windowH, buildW);
        vertex(x, y + windowH, buildW);
        vertex(x, y, buildW);
        endShape();
      }
    }
    pop();
  }
}
