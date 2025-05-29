let isPlaying = false;
let song;
let customFrameRate = 60;
let fft;
let angle, auxAngle;
let playButton;
let layer;

function preload() {
  song = loadSound("./song.mp3");
  isPlaying = false;
  angle = 0;
  customFrameRate = 60;
}

function setup() {
  createCanvas(600, 600);
  playButton = createButton("Play");
  song.setVolume(0.02);

  layer = createGraphics(width, height);
  fft = new p5.FFT(0, 256);

  frameRate(customFrameRate);

  angleMode(DEGREES);
  layer.angleMode(DEGREES);

  playButton.position(0, height);

  angle = 360 / (song.duration() * customFrameRate);
  auxAngle = angle;

  playButton.mouseClicked(() => {
    if (!isPlaying) {
      song.play();
    } else {
      song.pause();
    }
    isPlaying = !isPlaying;
  });
}

function draw() {
  background(21);
  layer.noFill();

  const spectrumA = fft.analyze();
  const spectrumB = spectrumA.reverse();
  spectrumB.splice(0, 60);

  push();
  noFill();
  translate(width / 2, height / 2);
  stroke(255, 0, 0);

  beginShape();

  for (let i = 0; i < spectrumB.length; i++) {
    const amp = spectrumB[i];
    const x = map(amp, 0, 256, -2, 2);
    const y = map(i, 0, spectrumB.length, 30, 215);

    vertex(x, y);
  }

  endShape();

  pop();

  push();

  translate(width / 2, height / 2);
  rotate(angle);

  layer.push();
  layer.translate(width / 2, height / 2);
  layer.rotate(-angle);

  for (let i = 0; i < spectrumB.length; i++) {
    layer.strokeWeight(0.018 * spectrumB[i]);
    layer.stroke(245, 132, 255 - spectrumB[i], spectrumB[i] / 40);
    layer.line(0, i, 0, i);
  }

  layer.pop();

  image(layer, -width / 2, -height / 2);
  pop();

  if (isPlaying) {
    angle += auxAngle;
  }
}
