function makeGrid(cols, rows) {
  const len = cols * rows;
  const arr = new Array(len).fill(0);

  const get = (col, row) => arr[row * cols + col];
  const set = (val, col, row) => {
    arr[row * cols + col] = val;
  };

  return { data: arr, get, set };
}

let grid;
let w = 15,
  h = 15;
let cols, rows;

function setup() {
  createCanvas(600, 600);
  pixelDensity(devicePixelRatio * 2);
  smooth();

  cols = width / w;
  rows = height / h;

  grid = makeGrid(cols, rows);

  for (let i = 0; i < grid.data.length; i++) {
    grid.data[i] = 0;
  }

  grid.set(1, 3, 2);
}

function draw() {
  background(21);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const c = grid.get(i, j) * random(255);
      fill(c);
      stroke(c);
      let x = i * w;
      let y = j * h;
      square(x, y, w);
    }
  }

  let nextGrid = makeGrid(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid.get(i, j);
      if (state === 1) {
        let below = grid.get(i, j + 1);

        if (below === 0 && j < rows - 1) {
          nextGrid.set(1, i, j + 1);
        } else {
          nextGrid.set(1, i, j);
        }
      }
    }
  }
  grid = nextGrid;

  if (mouseIsPressed) {
    let col = floor(mouseX / w);
    let row = floor(mouseY / h);
    grid.set(1, col, row);
  }
}
