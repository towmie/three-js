#include ../includes/simplexNoise4d.glsl
varying vec2 vUv;
attribute vec4 tangent;
uniform float uTime;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uPositionFrequency;
uniform float uWrapPositionFrequency;
uniform float uWrapTimeFrequency;
uniform float uWrapStrength;
varying float vWobble;

float getWobble(vec3 position){
   vec3 warpedPosition = position;
   warpedPosition += simplexNoise4d(vec4(position * uWrapPositionFrequency, uTime * uWrapTimeFrequency)) * uWrapStrength;

   return simplexNoise4d(vec4(warpedPosition * uPositionFrequency, uTime * uTimeFrequency)) * uStrength;
}

void main() {
   vec3 biTangent = cross(normal, tangent.xyz);

   float shift = 0.01;
   vec3 positionA = csm_Position + tangent.xyz * shift;
   vec3 positionB = csm_Position + biTangent * shift;

   float wobble = getWobble(csm_Position);
   csm_Position += wobble * normal;
   positionA += getWobble(positionA) * normal;
   positionB += getWobble(positionB) * normal;

   vec3 toA = normalize(positionA - csm_Position);
   vec3 toB = normalize(positionB - csm_Position);

   csm_Normal = cross(toA, toB);
   vUv = uv;

   vWobble = wobble / uStrength;
}