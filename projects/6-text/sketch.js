let silkscreenFont;
let rubikFont;
let myFont;

function preload() {
  silkscreenFont = loadFont("./silkscreen.ttf");
  rubikFont = loadFont("./rubik_bubbles.ttf");
}

function setup() {
  createCanvas(600, 600);
  myFont = new LetterFont("Artist", 50, 100, {
    font: silkscreenFont,
    fontSize: 100,
  });
  noLoop();
}

function draw() {
  background(21);
  myFont.draw();
}
