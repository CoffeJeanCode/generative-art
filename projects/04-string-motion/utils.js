function range(min, max, step) {
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

function distToSegment(x, y, x1, y1, x2, y2) {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return sqrt(dx * dx + dy * dy);
}
