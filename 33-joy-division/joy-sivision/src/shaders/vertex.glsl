#include "./noise.glsl"
uniform float uOffset;

void main(){
    vec3 pos = position;
    float flatnessAmpl = pow(1.0 - abs(uv.x - 0.5) * 2.0 , 3.5);
    
    pos.y += cnoise(vec2(pos.x + uOffset, 0.0) * 50.0) * 0.018;
    pos.y += pow(cnoise(vec2(pos.x + uOffset, 0.0) * 2.5) + 1.0, 1.2) * 0.55 * flatnessAmpl;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}  