#include "./noise.glsl"
uniform float uOffset;
uniform float uTime;
uniform float uStrength;

void main(){
    vec3 pos = position;
    float flatnessAmpl = pow(1.0 - abs(uv.x - 0.5) * 2.0 , 3.5) * uStrength;
    
    pos.y += cnoise(vec2(pos.x + uOffset, uTime) * 50.0) * 0.018;
    pos.y += pow(cnoise(vec2(pos.x + uOffset, uTime) * 2.5) + 1.0, 1.2) * 0.55 * flatnessAmpl;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}  