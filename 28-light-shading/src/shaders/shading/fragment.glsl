uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPosition;


vec3 ambientLight(vec3 lightColor, float lightIntensity){
    return lightColor * lightIntensity;
}
vec3 directionalLight(
    vec3 lightColor, 
    float lightIntensity, 
    vec3 normal, 
    vec3 lightPosition,
    vec3 viewDirection,
    float specularPower
    ) {
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(-lightDirection, normal);

    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);  

    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);  
    specular = pow(specular, specularPower);

    // return vec3(specular);
    return lightColor * lightIntensity * (shading + specular);
}

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;
    vec3 light = vec3(0.0);

    light += ambientLight(vec3(1.0), 0.1);
    color *= light;
    light += directionalLight(vec3(
        0.1, 0.1, 1.0),
        1.0,
        normal,
        vec3(0.0, 0.0, 3.0),
        viewDirection,
        1.0
        );
    color *= light;


    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}