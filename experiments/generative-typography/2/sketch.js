const letter = "X";
let font;
let contour = [];

// Posición actual
let posX;
let posY;
// Posición anterior para dibujar líneas
let prevX;
let prevY;
let angle;

// Para comprobar si estamos dentro del contorno
let isInsideContour = false;
// Color para las líneas
let lineColor;
// Variable para controlar la aleatoriedad
let randomFactor = 0.2;
// Paletas de colores
const palettes = [
  ["#11009E", "#4942E4", "#E6B9DE", "#FAE7F3"],
  ["#5F8670", "#FF9800", "#B80000", "#820300"],
  ["#7D0A0A", "#BF3131", "#EAD196", "#F3EDC8"],
];
// Paleta actual
let currentPalette;

function preload() {
  font = loadFont("./Kanit-Black.ttf");
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(21);

  // Configurar el contorno de la letra
  const { contour: rawContour } = setupText(letter);
  contour = rawContour;

  // Encontrar un punto inicial garantizado dentro del contorno
  findStartingPointInside();

  // Inicializar la posición anterior igual a la actual
  prevX = posX;
  prevY = posY;

  // Inicializar ángulo aleatorio
  angle = random(360);

  // Variables para controlar la aleatoriedad
  frameRate(60);

  // Seleccionar una paleta aleatoria
  currentPalette = random(palettes);

  // Color aleatorio inicial de la paleta seleccionada
  lineColor = color(random(currentPalette));

  // Ajustar el factor de aleatoriedad basado en la complejidad de la letra
  randomFactor = map(contour.length, 30, 200, 0.1, 0.3);
  randomFactor = constrain(randomFactor, 0.1, 0.3);
}

function findStartingPointInside() {
  // Encontrar el centro aproximado del contorno
  let sumX = 0;
  let sumY = 0;
  for (const pt of contour) {
    sumX += pt.x;
    sumY += pt.y;
  }

  // Colocar el punto inicial en el centro del contorno
  posX = sumX / contour.length;
  posY = sumY / contour.length;

  // Verificar si realmente está dentro
  if (!isPointInPolygon(posX, posY, contour)) {
    // Si no está dentro, buscar un punto aleatorio dentro
    let found = false;
    let attempts = 0;

    // Calcular el cuadro delimitador del contorno
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = -Number.POSITIVE_INFINITY;
    let maxY = -Number.POSITIVE_INFINITY;

    for (const pt of contour) {
      minX = min(minX, pt.x);
      minY = min(minY, pt.y);
      maxX = max(maxX, pt.x);
      maxY = max(maxY, pt.y);
    }

    // Intentar encontrar un punto interior
    while (!found && attempts < 100) {
      const testX = random(minX, maxX);
      const testY = random(minY, maxY);

      if (isPointInPolygon(testX, testY, contour)) {
        posX = testX;
        posY = testY;
        found = true;
      }

      attempts++;
    }

    // Si aún no se encuentra un punto, usar el centro como último recurso
    if (!found) {
      posX = (minX + maxX) / 2;
      posY = (minY + maxY) / 2;
    }
  }

  isInsideContour = true;
}

function setupText(word, fontSize = 300) {
  const textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(0);

  const wx = width / 2;
  const wy = height / 2;

  const bounds = font.textBounds(word, wx, wy, fontSize);
  const contour = font
    .textToPoints(word, wx, wy, fontSize, {
      sampleFactor: 0.1, // Mayor densidad de puntos para mejor detección
    })
    .map((pt) => ({
      x: pt.x - bounds.x - bounds.w / 2,
      y: pt.y - bounds.y - bounds.h / 2,
    }));

  return { contour };
}

function draw() {
  translate(width / 2, height / 2);

  // Guardar posición anterior
  prevX = posX;
  prevY = posY;

  // Calcular siguiente posición
  const step = 30;
  const nextX = posX + cos(radians(angle)) * step;
  const nextY = posY + sin(radians(angle)) * step;

  // Verificar colisión con el contorno
  let didBounce = false;
  const bouncePoint = { x: 0, y: 0 };

  // Ocasionalmente (0.5% de probabilidad) cambiar a otra paleta de colores
  if (random() < 0.005) {
    currentPalette = random(palettes);
  }

  for (let i = 0; i < contour.length - 1; i++) {
    const a = contour[i];
    const b = contour[i + 1];

    const intersection = lineIntersection(
      posX, posY, nextX, nextY,
      a.x, a.y, b.x, b.y
    );

    if (intersection) {
      // Calcular normal del segmento del contorno
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const length = sqrt(dx * dx + dy * dy);
      const normalX = -dy / length; // Normal apuntando hacia adentro
      const normalY = dx / length;

      // Reflejar dirección
      const vx = cos(radians(angle));
      const vy = sin(radians(angle));
      const dot = 2 * (vx * normalX + vy * normalY);
      const rx = vx - dot * normalX;
      const ry = vy - dot * normalY;

      // Añadir variación aleatoria al ángulo de rebote
      angle = degrees(atan2(ry, rx));

      // Variación proporcional al randomFactor (entre -25 y 25 grados)
      const variationRange = 25 * randomFactor * (1 + sin(frameCount * 0.01) * 0.5);
      angle += random(-variationRange, variationRange);

      // Ocasionalmente (10% de probabilidad) hacer un cambio más radical
      if (random() < 0.1) {
        angle += random(-90, 90) * randomFactor;
      }

      // Colocar el punto justo en el punto de colisión
      bouncePoint.x = intersection.x;
      bouncePoint.y = intersection.y;

      didBounce = true;
      break;
    }
  }

  // Si hubo rebote, dibujar línea hasta el punto de rebote
  if (didBounce) {
    // Dibujar línea desde la posición anterior hasta el punto de rebote
    stroke(lineColor);
    line(prevX, prevY, bouncePoint.x, bouncePoint.y);

    // Actualizar posición actual al punto de rebote
    posX = bouncePoint.x;
    posY = bouncePoint.y;

    // Mover ligeramente el punto hacia el interior para evitar quedar atrapado
    const insetStep = 0.1;
    posX += cos(radians(angle)) * insetStep;
    posY += sin(radians(angle)) * insetStep;

    // Verificar si el nuevo punto sigue dentro del contorno
    if (!isPointInPolygon(posX, posY, contour)) {
      // Si quedó fuera, intentar corregir
      posX -= cos(radians(angle)) * insetStep * 2;
      posY -= sin(radians(angle)) * insetStep * 2;
    }

    // Cambiar el color de la línea a otro color de la paleta actual
    lineColor = color(random(currentPalette));

    // Añadir algo de transparencia
    lineColor.setAlpha(random(150, 220));
  } else {
    // Si no hubo rebote, verificar si el siguiente punto está dentro
    if (isPointInPolygon(nextX, nextY, contour)) {
      // Dibujar línea desde la posición anterior hasta la nueva
      stroke(lineColor);
      line(prevX, prevY, nextX, nextY);

      // Actualizar posición
      posX = nextX;
      posY = nextY;

      // Ocasionalmente añadir una pequeña variación a la dirección (5% de probabilidad)
      if (random() < 0.05) {
        angle += random(-5, 5);
      }
    } else {
      // Si el próximo punto estaría fuera, cambiar a una dirección aleatoria
      angle = random(360);
    }
  }

  // Visualizar el contorno para depuración
  // if (frameCount === 1) {
  //   // Dibujar el contorno de la letra con un color de la paleta actual
  //   noFill();
  //   stroke(color(currentPalette[0]));
  //   strokeWeight(1);
  //   beginShape();
  //   for (const pt of contour) {
  //     vertex(pt.x, pt.y);
  //   }
  //   endShape(CLOSE);
  // }

  // Mostrar el punto actual
  // stroke(255);
  // strokeWeight(4);
  // point(posX, posY);
}

// Función para verificar si un punto está dentro de un polígono (algoritmo ray-casting)
function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;

    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Función para encontrar la intersección entre dos segmentos de línea
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Cálculo usando la ecuación paramétrica de la línea
  const den = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Si las líneas son paralelas, no hay intersección
  if (abs(den) < 0.0001) return null;

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / den;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den;

  // Verificar si la intersección está en ambos segmentos
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1)
    };
  }

  return null;
}