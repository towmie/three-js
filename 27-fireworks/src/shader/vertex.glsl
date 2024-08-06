uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}


void main(){
    vec3 newPosition = position;

    float explosion = remap(uProgress, 0.0, 0.1, 0.0, 1.0);
    explosion = clamp(explosion, 0.0, 1.0);
    explosion = 1.0 - (1.0 - pow(explosion, 3.0));
    newPosition *= explosion;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;


    gl_PointSize = uSize * uResolution.y * aSize;
    gl_PointSize *= 1.0 / - viewPosition.z;
}