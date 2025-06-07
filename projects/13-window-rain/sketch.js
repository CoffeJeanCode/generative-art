
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
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

struct Ray {
    vec3 origin;
    vec3 direction;
};


float hash(float t) {
  return fract(sin(t * 3656.0) * 4353.0);
}

vec4 hash14(float t) {
  return fract(sin(t * vec4(53453.32, 54354.2, 8765316.87, 43656.0)) * vec4(4353.0, 34534.43, 42765.34, 87656.419));
}

Ray createRay(vec2 uv, vec3 cameraPosition, vec3 target, float zoom) {
    Ray ray;
    ray.origin = cameraPosition;

    vec3 forward = normalize(target - ray.origin);
    vec3 right = cross(vec3(0.0, 1.0, 0.0), forward);
    vec3 up = cross(forward, right);

    vec3 center = ray.origin + forward * zoom;
    vec3 imagePlanePoint = center + uv.x * right + uv.y * up;

    ray.direction = normalize(imagePlanePoint - ray.origin);
    return ray;
}

vec3 closestPointOnRay(Ray ray, vec3 point) {
    return ray.origin + max(0.0, dot(point - ray.origin, ray.direction)) * ray.direction;
}

float distanceToRay(Ray ray, vec3 point) {
    return length(point - closestPointOnRay(ray, point));
}

float bokehEffect(Ray ray, vec3 point, float radius, float blur) {
    float dist = distanceToRay(ray, point);
    radius *= length(point);
    float strength = smoothstep(radius, radius * (1.0 - blur), dist);
    strength *= mix(0.7, 1.0, smoothstep(radius * 0.8, radius, dist));
    return strength;
}

vec3 renderStreetlights(Ray ray, float time) {
    float isLeftSide = step(ray.direction.x, 0.0);
    ray.direction.x = abs(ray.direction.x);
    
    const float stepSize = 1.0 / 10.0;
    float mask = 0.0;

    for (float i = 0.0; i < 1.0; i += stepSize) {
        float currentTime = fract(time + i + isLeftSide * stepSize * 0.5);
        vec3 lightPosition = vec3(2.0, 2.0, 100.0 - currentTime * 100.0);
        
        mask += bokehEffect(ray, lightPosition, 0.05, 0.1) * pow(currentTime, 3.0);
    }

    return vec3(1.0, 0.7, 0.3) * mask;
}

vec3 renderEnviromentlights(Ray ray, float time) {
    float isLeftSide = step(ray.direction.x, 0.0);
    ray.direction.x = abs(ray.direction.x);
    
    const float stepSize = 1.0 / 10.0;
    vec3 mask = vec3(0.0);

    for (float i = 0.0; i < 1.0; i += stepSize) {
        float currentTime = fract(time + i + isLeftSide * stepSize * 0.5);
        
        vec4 rand = hash14(i + isLeftSide * 100.0);

        float x = mix(2.5, 10.0, rand.x); 
        float y = mix(0.1, 1.5, rand.y);

        float fade = pow(currentTime, 3.0);
        float occlusion = sin(currentTime * 6.28 * 10.0 * rand.x) * 0.5 + 0.5;

        fade = occlusion;

        vec3 color = rand.wzy;

        vec3 lightPosition = vec3(x, y, 50.0 - currentTime * 50.0);
        
        mask += bokehEffect(ray, lightPosition, 0.05, 0.1) * fade * color * 0.5;
    }

    return mask;
}

vec3 renderHeadlights(Ray ray, float time) {
    time *= 2.0; 
    const float halfWidth = 0.25;
    const float wideOffset = halfWidth * 1.2;
    const float stepSize = 1.0 / 30.0;
    float mask = 0.0;

    for (float i = 0.0; i < 1.0; i += stepSize) {
        float rand = hash(i);
        if (rand > 0.1) continue;

        float currentTime = fract(time + i);
        float z = 100.0 - currentTime * 100.0;
        float fade = pow(currentTime, 5.0);
        float focus = smoothstep(0.9, 1.0, currentTime);
        float size = mix(0.05, 0.03, focus);

        mask += bokehEffect(ray, vec3(-1.0 - halfWidth, 0.15, z), size, 0.1) * fade;
        mask += bokehEffect(ray, vec3(-1.0 + halfWidth, 0.15, z), size, 0.1) * fade;

        mask += bokehEffect(ray, vec3(-1.0 - wideOffset, 0.15, z), size, 0.1) * fade;
        mask += bokehEffect(ray, vec3(-1.0 + wideOffset, 0.15, z), size, 0.1) * fade;

        float reflections = 0.0;
        reflections += bokehEffect(ray, vec3(-1.0 - wideOffset, -0.15, z), size * 3.0, 1.0) * fade;
        reflections += bokehEffect(ray, vec3(-1.0 + wideOffset, -0.15, z), size * 3.0, 1.0) * fade;

        mask += reflections * focus;
    }

    return vec3(0.9, 0.9, 1.0) * mask;
}

vec3 renderTaillights(Ray ray, float time) {
    time *= 0.25;
    const float halfWidth = 0.25;
    const float wideOffset = halfWidth * 1.2;
    const float stepSize = 1.0 / 15.0;
    float mask = 0.0;
    
    for (float i = 0.0; i < 1.0; i += stepSize) {
        float rand = hash(i);
        if (rand > 0.5) continue;

        float currentTime = fract(time + i);
        float lane = step(0.25, rand);
        float laneShift = smoothstep(1.0, 0.96, currentTime);
        float x = 1.5 - lane * laneShift;
        float z = 100.0 - currentTime * 100.0;

        float fade = pow(currentTime, 5.0);
        float focus = smoothstep(0.9, 1.0, currentTime);
        float size = mix(0.05, 0.03, focus);
        float blink = step(0.0, sin(time * 1000.0)) * 7.0 * lane * step(0.96, currentTime);

        mask += bokehEffect(ray, vec3(x - halfWidth, 0.15, z), size, 0.1) * fade;
        mask += bokehEffect(ray, vec3(x + halfWidth, 0.15, z), size, 0.1) * fade;
        mask += bokehEffect(ray, vec3(x - wideOffset, 0.15, z), size, 0.1) * fade;
        mask += bokehEffect(ray, vec3(x + wideOffset, 0.15, z), size, 0.1) * fade * (1.0 + blink);

        float reflections = 0.0;
        reflections += bokehEffect(ray, vec3(x - wideOffset, -0.15, z), size * 3.0, 1.0) * fade;
        reflections += bokehEffect(ray, vec3(x + wideOffset, -0.15, z), size * 3.0, 1.0) * fade * (1.0 + blink * 0.1);

        mask += reflections * focus;
    }

    return vec3(1.0, 0.1, 0.03) * mask;
}

vec2 addRain(vec2 uv, float time) { 
    time *= 40.0;
    vec2 aspectRatio = vec2(3.0, 1.0);
    vec2 st = uv * aspectRatio;
    vec2 id = floor(st);

    st.y += time * 0.22;
    float rand = fract(sin(id.x * 714.21) * 768.32);
    st.y += rand;
    uv.y += rand;

    id = floor(st);
    st = fract(st) - 0.5;

    time += fract(sin(id.x * 74.21 + id.y * 1453.43) * 734.54) * 6.834;
    float y = -sin(time + sin(time + sin(time) * 0.5)) * 0.43;
    vec2 point = vec2(0.0, y);
    vec2 offset1 = (st - point) / aspectRatio;
    float dist = length(offset1);
    float mask1 = smoothstep(0.07, 0.0, dist);

    vec2 offset2 = (fract(uv * aspectRatio.x * vec2(1.0, 2.0)) - 0.5) / vec2(1.0, 2.0);
    dist = length(offset2);
    float mask2 = smoothstep(0.3 * (0.5 - st.y), 0.0, dist) * smoothstep(-0.1, 0.1, st.y - point.y);

    return vec2(mask1 * offset1 * 30.0 + mask2 * offset2 * 10.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 mouseNormalized = u_mouse / u_resolution;
    float time = u_time * 0.08 + mouseNormalized.x;

    vec3 cameraPosition = vec3(0.5, 0.2, 0.0);
    vec3 cameraTarget = vec3(0.5, 0.2, 1.0);

    vec2 rainDistortion = addRain(uv * 5.0, time) * 0.5;
    rainDistortion += addRain(uv * 7.0, time) * 0.5;

    Ray ray = createRay(uv + rainDistortion, cameraPosition, cameraTarget, 1.0);

    vec3 color = vec3(0.0);
    color += renderStreetlights(ray, time);
    color += renderHeadlights(ray, time);
    color += renderTaillights(ray, time);
    color += renderEnviromentlights(ray, time);

    color = pow(color, vec3(1.0 / 2.2)); // gamma correction

    gl_FragColor = vec4(color, 1.0);
}

`;

let _shader = null;

function setup() {
    createCanvas(600, 600, WEBGL);

    _shader = createShader(vertShader, fragShader);
    shader(_shader);

    _shader.setUniform("u_resolution", [width, height]);
}

function draw() {
    background(0);

    let t = millis() / 1000.0;
    _shader.setUniform("u_time", t);
    _shader.setUniform("u_mouse", [mouseX, mouseY]);

    noStroke();
    plane(width, height);

}
