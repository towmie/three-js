uniform vec3 uColor;
varying vec3 vNormal;

vec3 ambientLight(vec3 lightColor, float lightIntensity){
    return lightColor * lightIntensity;
}
vec3 directionalLight(
    vec3 lightColor, 
    float lightIntensity, 
    vec3 normal, 
    vec3 lightPosition
    ) {
    vec3 lightDirection = normalize(lightPosition);
    float shading = dot(normal, lightDirection);

    return vec3(shading);
    // return lightColor * lightIntensity;
}

void main()
{
    vec3 color = uColor;

    vec3 light = vec3(0.0);
    // light += ambientLight(vec3(1.0), 0.03);
    // color *= light;
    light += directionalLight(vec3(
        0.1, 0.1, 1.0),
        1.0,
        vNormal,
        vec3(0.0, 0.0, 1.0));
    color *= light;


    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}