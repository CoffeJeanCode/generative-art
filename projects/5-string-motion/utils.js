function floatRange(min, max, step) {
  const result = [];
  for (let i = min; i <= max; i += step) {
    result.push(i);
  }
  return result;
}

function sinusoidalInterpolation(t, a, b) {
  return a + (1 - Math.cos(t * Math.PI)) * 0.5 * (b - a);
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function mirrorInterpolation(interpolationFunction) {
  return function (t, a, b) {
    if (t < 0.5) {
      return interpolationFunction(t * 2, a, b);
    } else {
      return interpolationFunction((1 - t) * 2, a, b);
    }
  };
}

function offsetVectorList(baseVectorList, offsetList, falloff) {
  if (baseVectorList.length !== offsetList.length) {
    throw new Error(
      "Las listas de vectores base y de offset deben tener la misma longitud."
    );
  }

  const resultVectors = [];

  for (let i = 0; i < baseVectorList.length; i++) {
    const baseVector = baseVectorList[i].copy();
    const offsetVector = offsetList[i].copy().mult(falloff);
    const newVector = p5.Vector.add(baseVector, offsetVector).copy();
    resultVectors.push(newVector);
  }

  return resultVectors;
}

function checkCircleIntersection(circle1, circle2) {
  const distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  const radiiSum = circle1.radius + circle2.radius;
  const radiiDiff = abs(circle1.radius - circle2.radius);

  return distance < radiiSum && distance > radiiDiff;
}
