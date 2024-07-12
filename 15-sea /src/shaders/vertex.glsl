varying vec2 vUv;
uniform float uTime;
uniform float uElevation;
uniform vec2 uFrequency;
uniform float uSpeed;

varying float vElevation;

void main() {
    vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime * uSpeed) * sin(modelPosition.z * uFrequency.y + uTime * uSpeed) * uElevation;
    
    modelPosition.y += elevation;

    gl_Position = projectionMatrix * modelPosition;

    vElevation = elevation;

}