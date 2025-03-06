precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 world;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 worldViewProjection;

varying vec3 vNormal;
// varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vec4 modelPosition = world * vec4(position, 1.0);
    gl_Position = projection * view * modelPosition;

    vec3 modelNormal = (world * vec4(normal, 0.0)).xyz;

    vNormal = modelNormal;
    vUv = vec2(1.0 - uv.x, 1.0 - uv.y);
}
