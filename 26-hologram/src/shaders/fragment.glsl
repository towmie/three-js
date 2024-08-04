varying vec3 vPosition;
uniform float uTime;
varying vec3 vNormal;


void main() {

    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing){
        normal *= -1.0;
    }

    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
    stripes = pow(stripes, 3.0);

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    float holographic = fresnel * stripes;
    holographic += fresnel * 1.25; 
    gl_FragColor = vec4(1.0, 1.0, 1.0, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}