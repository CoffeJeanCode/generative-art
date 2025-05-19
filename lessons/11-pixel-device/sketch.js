const cnvWidth = 600;
const cnvHeight = 600;
const resizeCnv = resized(cnvHeight, cnvHeight);

function resized(width, height) {
  return (pixelRatio) => {
    return [width * pixelRatio, height * pixelRatio];
  };
}

const s1 = (sketch) => {
  sketch.setup = () => {
    const [width, height] = resizeCnv(devicePixelRatio);
    const canvas1 = sketch.createCanvas(width, height, sketch.WEBGL);
    canvas1.position(0, 0);
  };
  sketch.draw = () => {
    //for canvas 1
    sketch.background(100);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateZ(sketch.frameCount * 0.01);
    sketch.cone(30, 50);
  };

  sketch.windowResized = () => {
    const [width, height] = resizeCnv(devicePixelRatio);

    resizeCanvas(width, height);
  };
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);

const s2 = (sketch) => {
  sketch.setup = () => {
    const canvas2 = sketch.createCanvas(cnvWidth, cnvHeight, sketch.WEBGL);
    canvas2.position(cnvWidth, 0);
  };
  sketch.draw = () => {
    //for canvas 2
    sketch.background(100);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateZ(sketch.frameCount * 0.02);
    sketch.cone(30, 50);
  };
};

// create the second instance of p5 and pass in the function for sketch 2
new p5(s2);
