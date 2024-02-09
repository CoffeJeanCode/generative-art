const letter = "O";
let textImg = null;
let font = null;
let points = [];
let cellSize = 10;
let contour = [];
let reachedBorder = false;

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var direction = EAST;

let posX;
let posY;
let posXcross;
let posYcross;

function preload() {
  font = loadFont("./Kanit-Black.ttf");
}

function setup() {
  createCanvas(600, 600);

  // noLoop();
  smooth();
  pixelDensity(devicePixelRatio * 4);

  const { pixels: textPixels, contour: rawContour } = setupText(letter);

  contour = rawContour;

  if (posX > 0) {
    direction = WEST;
  } else if (posX < 0) {
    direction = EAST;
  }

  if (posY > 0) {
    direction = NORTH;
  } else if (posY < 0) {
    direction = SOUTH;
  }

  angle = getRandomAngle(direction);
  background(21);
}

function setupText(word, fontSize = 300) {
  textImg = createGraphics(width, height);

  textImg.pixelDensity(1);
  textImg.background(0);

  const wx = width / 2;
  const wy = height / 2;

  let bounds = font.textBounds(word, wx, wy, fontSize);
  const contour = font
    .textToPoints(word, wx, wy, fontSize, {
      smapleFactor: 0.9,
    })
    .map((pt) => ({
      x: pt.x - bounds.x - bounds.w / 2,
      y: pt.y - bounds.y - bounds.h / 2,
    }));

  textImg.noFill();
  textImg.stroke(255, 0, 0);
  textImg.strokeWeight(5);
  textImg.beginShape();

  textImg.translate(wx, wy);

  contour.forEach(({ x, y }) => {
    textImg.vertex(x, y);
  });
  textImg.endShape();

  const randomPoint = random(contour);

  posX = randomPoint.x;
  posY = randomPoint.y;
  posXcross = posX;
  posYcross = posY;

  // textImg.rect(-fontSize / 2, fontSize / 2, fontSize, -fontSize);
  textImg.push();
  textImg.fill(255, 0, 0);
  textImg.circle(posX, posY, 5);
  textImg.pop();

  return { pixels: textImg.pixels, contour };
}

function draw() {
  // image(textImg, 0, 0, width, height);

  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i <= 50; i++) {
    point(posX, posY);

    posX += cos(radians(angle)) / 40;
    posY += sin(radians(angle)) / 40;
  }

  if (posX > 10) {
    direction = WEST;
  } else if (posX < 10) {
    direction = EAST;
  }

  if (posY > 10) {
    direction = NORTH;
  } else if (posY < 10) {
    direction = SOUTH;
  }

  textImg.loadPixels();
  const currentPixel = textImg.get(
    floor(posX + width / 2),
    floor(posY + height / 2)
  );

  stroke(255);
  if (currentPixel[0] === 255) {
    angle = getRandomAngle(direction);

    posXcross = posX;
    posYcross = posY;

    point(posX, posY);
    line(posX, posY, posXcross, posYcross);
  }
}

function getRandomAngle(currentDirection, angleCount = 5) {
  var a = ((floor(random(-angleCount, angleCount)) + 0.5) * 90) / angleCount;
  if (currentDirection == NORTH) return a - 90;
  if (currentDirection == EAST) return a;
  if (currentDirection == SOUTH) return a + 90;
  if (currentDirection == WEST) return a + 180;
  return 0;
}
