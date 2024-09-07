#include ../includes/simplexNoise4d.glsl
uniform float uTime;
uniform sampler2D uBase;
uniform float uDeltaTime;
uniform float uInfluence;
uniform float uStrength;
void main() {
    float time = uTime * 0.2;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particles = texture2D(uParticles, uv);
    vec4 base = texture2D(uBase, uv);

    if (particles.a >= 1.0) {
        particles.a = mod(particles.a, 1.0);
        particles.xyz = base.xyz;
    } else {
        float strength = simplexNoise4d(vec4(base.xyz * 0.2, time + 1.0));
        float influence = (uInfluence - 0.5) * -2.0;
        strength = smoothstep(influence, 1.0, strength);

        vec3 flowField = vec3(
            simplexNoise4d(vec4(particles.xyz, time)),
            simplexNoise4d(vec4(particles.xyz + 1.0, time)),
            simplexNoise4d(vec4(particles.xyz + 2.0, time))
        );

        flowField = normalize(flowField);
        particles.xyz += flowField * uDeltaTime * strength * uStrength * 0.5;
        particles.a += uDeltaTime * 0.3;
    }

    // flow field


    gl_FragColor = particles;
}