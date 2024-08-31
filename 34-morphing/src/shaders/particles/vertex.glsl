uniform vec2 uResolution;
uniform float uSize;
attribute vec3 aPositionTarget;
uniform float uProgress;

void main()
{

    float progress = uProgress;
    vec3 mixedPosition = mix(position, aPositionTarget, progress);
    // Final position
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);
}