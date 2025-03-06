precision highp float;

varying vec2 vUv;

uniform sampler2D textureSampler;

void main() {
    gl_FragColor = vec4(texture2D(textureSampler, vUv));
}