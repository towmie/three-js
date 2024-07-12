uniform vec3 uTopColor;
uniform vec3 uDepthColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
     vec3 mixedColor = mix(uDepthColor, uTopColor, mixStrength);
    gl_FragColor = vec4(mixedColor, 1.0);

    // #include <colorspace_fragment>
} 