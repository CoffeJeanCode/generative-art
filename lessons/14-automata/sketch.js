class Cell {
  constructor(i, j, size) {
    this.i = i;
    this.j = j;
    this.size = size;
    this.state = 0;
  }

  get x() {
    return this.i * this.size;
  }

  get y() {
    return this.j * this.size;
  }

  show() {
    fill(this.state * random(255))
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  update(state) {
    this.state = state;
  }
}

const cells = [];
const cellSize = 10;
let cols;
let rows;
let currentRow = 0;
let ruleNumber;
const rules = [30, 54, 90, 110, 150, 184, 220, 254];
let ruleTable = {};

function setup() {
  createCanvas(600, 600);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  ruleNumber = random(rules)
  // Crear celdas vacías
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      cells.push(new Cell(i, j, cellSize));
    }
  }

  // Inicializar solo el centro de la primera fila
  const centerIndex = floor(cols / 2);
  cells[centerIndex].update(1);

  // Crear tabla de reglas de Wolfram
  ruleTable = getRuleTable(ruleNumber);
}

function draw() {
  if (currentRow >= rows - 1) {
    noLoop();
    return;
  }

  // Calcular siguiente fila
  for (let i = 0; i < cols; i++) {
    const neighbors = get1DNeighbors(i, currentRow);
    const pattern = neighbors.join('');
    const nextState = ruleTable[pattern] ?? 0;
    const nextCell = cells[i + (currentRow + 1) * cols];
    nextCell.update(nextState);
  }

  // Dibujar todas las celdas
  for (const cell of cells) {
    cell.show();
  }

  currentRow++;
}

function get1DNeighbors(i, j) {
  const left = (i === 0) ? 0 : cells[(i - 1) + j * cols].state;
  const center = cells[i + j * cols].state;
  const right = (i === cols - 1) ? 0 : cells[(i + 1) + j * cols].state;
  return [left, center, right];
}

function getRuleTable(ruleNum) {
  const bin = ruleNum.toString(2).padStart(8, "0");
  const patterns = [
    "111", "110", "101", "100",
    "011", "010", "001", "000"
  ];
  const table = {};
  for (let i = 0; i < 8; i++) {
    table[patterns[i]] = Number.parseInt(bin[i]);
  }
  return table;
}
