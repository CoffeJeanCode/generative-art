let _shader;
const MAX_EXPLOSIONS = 15;
let explosions = [];

const glsl = string => string;

const vertShader = glsl`
    precision highp float;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;

    void main() {
        vTexCoord = aTexCoord;
        vec4 positionVec4 = vec4(aPosition, 1.0);
        gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
    }
`;

const fragShader = glsl`
    #define NUM_PARTICLES 300.0
    #define NUM_EXPLOSIONS 15.0

    precision mediump float;

    uniform float u_explosionTimes[15];
    uniform float u_explosionX[15];
    uniform float u_explosionY[15];
    uniform float u_explosionSize[15];
    uniform float u_explosionType[15];

    uniform vec2 u_resolution;
    uniform float u_time;

    vec2 Hash12(float t) {
        float x = fract(sin(t * 674.3) * 453.2);
        float y = fract(sin((t + x) * 714.3) * 263.2);
        return vec2(x, y);
    }

    vec2 Hash12_polar(float t) {
        float a = fract(sin(t * 674.3) * 453.2) * 6.2832;
        float d = fract(sin((t + a) * 714.3) * 263.2);
        return vec2(sin(a), cos(a)) * d;
    }

    float Explosion(vec2 uv, float time, float explosionType, float size) {
        float sparks = 0.0;

        float expansion = time * 1.1;

        for (float i = 0.0; i < NUM_PARTICLES; i++) {
            vec2 direction;

            if (explosionType < 0.33) {
                direction = Hash12_polar(i + 1.0) * size;
            } else if (explosionType < 0.66) {
                float t = (i / NUM_PARTICLES) * 6.2832 * 2.0;
                float heart_x = 16.0 * pow(sin(t), 3.0);
                float heart_y = 13.0 * cos(t) - 5.0 * cos(2.0*t) - 2.0 * cos(3.0*t) - cos(4.0*t);
                direction = vec2(heart_x, heart_y) * 0.01 * size;
            } else {
                float angle = (i / NUM_PARTICLES) * 6.2832;
                float radius = (sin(angle * 5.0) * 0.5 + 1.0) * size;
                direction = vec2(cos(angle), sin(angle)) * radius;
            }

            vec2 particlePos = direction * expansion;

            particlePos.y -= time * time * 0.15;

            float dist = length(uv - particlePos);

            float brightness = 0.0015;

            if (time < 0.1) {
                brightness *= smoothstep(0.0, 0.5, time) * 1.2;
            } else {
                brightness *= smoothstep(1.5, 0.5, time) * 1.0;
            }

            brightness *= sin(time  + i * 0.1) * 0.2 + 0.8;

            if (time < 0.2 && dist < 0.05) {
                brightness += 0.003 / (dist + 0.02);
            }

            sparks += brightness / (dist + 0.003);
        }

        return sparks;
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec3 col = vec3(0.0);

        for(float i = 0.0; i < NUM_EXPLOSIONS; i++) {
            float time = u_time - u_explosionTimes[int(i)];

            if (time >= 0.0 && time < 1.5) {
                vec3 color1 = sin(vec3(2.0, 4.0, 6.0) * u_explosionTimes[int(i)] + vec3(0.0, 2.0, 4.0)) * 0.3 + 0.4;
                vec3 color2 = sin(vec3(3.0, 5.0, 7.0) * u_explosionTimes[int(i)] + vec3(1.0, 3.0, 5.0)) * 0.3 + 0.4;
                vec3 color = mix(color1, color2, sin(u_time * 1.5) * 0.5 + 0.5);

                color = pow(color, vec3(1.2));

                vec2 offset = vec2(u_explosionX[int(i)], u_explosionY[int(i)]);
                offset.x *= u_resolution.x / u_resolution.y;

                float explosionResult = Explosion(uv - offset, time, u_explosionType[int(i)], u_explosionSize[int(i)]);
                col += explosionResult * color;
            }
        }

        col *= 1.8;
        col = pow(col, vec3(1.1));

        gl_FragColor = vec4(col, 1.0);
    }
`;

function setup() {
  createCanvas(800, 800, WEBGL);

  _shader = createShader(vertShader, fragShader);
  shader(_shader);

  _shader.setUniform("u_resolution", [width, height]);
}

function draw() {
  background(0);

  let t = millis() / 1000.0;
  _shader.setUniform("u_time", t);

  let times = new Array(MAX_EXPLOSIONS).fill(-10);
  let posX = new Array(MAX_EXPLOSIONS).fill(0);
  let posY = new Array(MAX_EXPLOSIONS).fill(0);
  let sizes = new Array(MAX_EXPLOSIONS).fill(0.5);
  let types = new Array(MAX_EXPLOSIONS).fill(0);

  for (let i = 0; i < explosions.length && i < MAX_EXPLOSIONS; i++) {
    times[i] = explosions[i].time;
    posX[i] = explosions[i].pos[0];
    posY[i] = explosions[i].pos[1];
    sizes[i] = explosions[i].size;
    types[i] = explosions[i].type;
  }

  _shader.setUniform("u_explosionTimes", times);
  _shader.setUniform("u_explosionX", posX);
  _shader.setUniform("u_explosionY", posY);
  _shader.setUniform("u_explosionSize", sizes);
  _shader.setUniform("u_explosionType", types);

  noStroke();
  plane(width, height);

  explosions = explosions.filter(exp => (t - exp.time) < 2.5);
}

function mousePressed() {
  addExplosion(mouseX, mouseY);
}

function keyPressed() {
  if (key === ' ') {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        addExplosion(
          random(width * 0.2, width * 0.8),
          random(height * 0.2, height * 0.8)
        );
      }, i * 1000);
    }
  }
}

function addExplosion(x, y) {
  let normX = (x - width / 2) / height;
  let normY = -(y - height / 2) / height;

  let explosion = {
    pos: [normX, normY],
    time: millis() / 1000.0,
    size: random(0.09, 0.4),
    type: random()
  };

  explosions.push(explosion);

  if (explosions.length > MAX_EXPLOSIONS) {
    explosions.shift();
  }
}
