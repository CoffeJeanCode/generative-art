const ropes = [];
let mouse;

function setup() {
  createCanvas(600, 600);
  mouse = { pos: createVector(0, 0), rad: 20 };
  noCursor();
  for (let i = 0; i < 6; i++) {
    const x = i * 20 - 50;
    const y = 200;
    ropes.push(new Rope(createVector(x, y), createVector(x, -y), 50));
  }
}

function draw() {
  background(21);
  translate(width / 2, height / 2);

  mouse.pos.set(mouseX - width / 2, 0);

  fill(255);
  stroke(255);
  circle(mouse.pos.x, mouse.pos.y, mouse.rad * 2);

  ropes.forEach((rope) => {
    noFill();
    rope.draw();
    rope.update(mouseX, mouseY, mouse.rad);
  });
}
