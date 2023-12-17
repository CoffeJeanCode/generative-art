const ropes = [];
let rope;
let tap;
function setup() {
  createCanvas(600, 600);
  tap = { pos: createVector(0, 0), r: 20 };

  for (let i = 0; i < 6; i++) {
    const x = i * 20;
    const y = 200;
    ropes.push(new Rope(createVector(x, y), createVector(x, -y), 50));
  }
}

function draw() {
  background(21);
  translate(width / 2, height / 2);
  stroke(255);
  fill(255);

  tap.pos.set(mouseX - width / 2, 0);
  circle(tap.pos.x, tap.pos.y, tap.r);

  noFill();
  ropes.forEach((rope) => {
    rope.draw();
    rope.update();
  });
}
