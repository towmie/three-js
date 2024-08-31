uniform vec2 uResolution;
uniform float uSize;
attribute vec3 aPositionTarget;
uniform float uProgress;

#include ../includes/simplexNoise.glsl

varying vec3 vColor;

void main()
{
    float noiseOrigin = simplexNoise3d(position);
    float noiseTarget = simplexNoise3d(aPositionTarget);
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1.0, 1.0, noise);

    float duration = 0.4;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;

    float progress = smoothstep(delay, end, uProgress );
    vec3 mixedPosition = mix(position, aPositionTarget, progress);


    // Final position
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = vec3(noise);
}