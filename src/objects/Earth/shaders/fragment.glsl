precision highp float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float time;
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;

void main() {
    // Normalize the normal vector to get a proper direction
    vec3 normal = normalize(vNormal);
    // This is the sun direction in world space
    vec3 uSunDirection = vec3(0.0, 0.0, 1.0);
    // Dot product between the sun direction and the normal to determine how directly lit a point is
    float sunOrientation = dot(uSunDirection, normal);
    // Compute a blend factor based on the dot product (sunOrientation).
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
    // Mix between nightColor and dayColor using the dayMix factor (0.0 -> fully night, 1.0 -> fully day)
    vec3 color = mix(nightColor, dayColor, dayMix);

    gl_FragColor = vec4(color, 1.0);
}