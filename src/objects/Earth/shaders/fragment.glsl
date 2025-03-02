precision highp float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float time;
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 uSunDirection = vec3(0.0, 0.0, 1.0);
    float sunOrientation = dot(uSunDirection, normal);

    vec3 color = vec3(vUv, 1.0);

    color = vec3(sunOrientation);

    gl_FragColor = vec4(color, 1.0);
}