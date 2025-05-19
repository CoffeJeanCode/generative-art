function setup() {
  createCanvas(600, 600);
  background(21);
  noiseDetail(8, 0.65); // Ajusta el nivel de detalle del ruido Perlin

  noFill();
  stroke(255);
  beginShape();
  for (let x = 0; x < width; x++) {
    let noiseVal = noise(x * 0.01) * 0.05;

    // Mapea el valor de ruido entre 0 y la altura del lienzo para obtener la altura del punto
    let y = map(noiseVal, 0, 1, 0, height);

    // Dibuja un vértice en la posición (x, y)
    vertex(x, y);
  }
  endShape();
}
