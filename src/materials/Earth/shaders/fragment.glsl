precision highp float;

layout(std140) uniform myGlobal {
    vec4 time;
    vec4 sunPosition;
};

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform vec3 earthPosition;
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;

void main() {
    // Normalize the normal vector to get a proper direction
    vec3 normal = normalize(vNormal);
    // Dot product between the sun direction and the normal to determine how directly lit a point is
    float sunOrientation = dot(normal, normalize(sunPosition.xyz - earthPosition));
    // Compute a blend factor based on the dot product (sunOrientation).
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
    // Mix between nightColor and dayColor using the dayMix factor (0.0 -> fully night, 1.0 -> fully day)
    vec3 color = mix(nightColor, dayColor, dayMix);

    gl_FragColor = vec4(color, 1.0);
}