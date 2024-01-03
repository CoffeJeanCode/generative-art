const stringText = "M";
let textImg;
let type;
let points = [];
let xCoords = [];
let yCoords = [];

function setup() {
  createCanvas(500, 500);
  type = random();

  // noLoop();
  smooth();
  // frameRate(3);
  setupText();
  background(21);

  for (let y = 0; y < textImg.height; y += 10) {
    for (let x = 0; x < textImg.width; x += 10) {
      const index = (x + y * textImg.width) * 4;
      const r = textImg.pixels[index + 0];

      if (r > 128) {
        // Considerar un umbral para colocar puntos
        points.push(createVector(x, y)); // Agregar un punto dentro del píxel
      }
    }
  }
}

function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(0);
  textImg.fill(255);
  textImg.textAlign(CENTER, CENTER);
  textImg.textSize(300);
  textImg.text(stringText, width / 2, height / 2);
  textImg.loadPixels();
}

function draw() {
  background(221);
  // Mover puntos aleatoriamente sin salirse de los límites de la imagen
  for (let i = 0; i < points.length; i++) {
    let randomX = points[i].x + random(-1, 1) / 2;
    let randomY = points[i].y + random(-1, 1) / 2;

    // Verificar que el punto no se salga de la imagen
    if (
      randomX >= 0 &&
      randomX < textImg.width &&
      randomY >= 0 &&
      randomY < textImg.height
    ) {
      points[i].x = randomX;
      points[i].y = randomY;
    }
  }

  // Conectar puntos cercanos con líneas
  stroke(0); // Color de las líneas (negro en este caso)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d < 20) {
        strokeWeight(0.1);
        circle(points[i].x, points[i].y, 2);
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
}
