precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;

varying vec2 vUv;

void main() {
    gl_Position = worldViewProjection * vec4(position, 1.0);

    vUv = vec2(1.0 - uv.x, 1.0 - uv.y);
}
