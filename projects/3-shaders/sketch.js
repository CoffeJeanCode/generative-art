let _shader;

function setup() {
  createCanvas(600, 600, WEBGL);

  // Shader
  const vertShader = `
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

  const fragShader = `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
            
        return a + b * cos(6.28*(c*t+d)); 
    }

    void main() {
        vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        uv.x *= u_resolution.x / u_resolution.y;
        
        for (float i = 0.0; i < 3.0; i++) {

          uv = fract(uv * 1.5) - 0.5;
          
          float d = length(uv);
          
          vec3 col = palette(length(uv0) + u_time * .4);    
          
          d = sin(d * 8. + u_time ) / 8.;
          d = abs(d);    
          
          d = 0.02 / d;
          
          finalColor += col * d;
        }

        gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  _shader = createShader(vertShader, fragShader);
  shader(_shader);
  _shader.setUniform("u_resolution", [width, height]);
}

function draw() {
  _shader.setUniform("u_time", millis() / 1000.0);
  _shader.setUniform("u_mouse", [mouseX, mouseY]);
  noStroke();
  plane(width, height);
}
