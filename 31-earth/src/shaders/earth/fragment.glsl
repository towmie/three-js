varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereColor;
uniform vec3 uAtmosphereTwilightColor;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // sun direction
    float sunOrientation = dot(uSunDirection, normal);
    color = vec3(sunOrientation);

    // day /night color
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
    vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, dayMix);


    // specular clouds color
    vec2 specularCloudColor= texture2D(uSpecularTexture, vUv).rg;

    float cloudMix = smoothstep(0.15, 1.0, specularCloudColor.g);
    cloudMix *= dayMix;
    color = mix(color, vec3(1.0), cloudMix);

    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // Atmpsphere
    float atmosphereMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereColor, atmosphereMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereMix);

    // Specular
    vec3 reflectionDirection = reflect(- uSunDirection, normal);
    float specularMix = smoothstep(0.0, 1.0, reflectionDirection.y);
    float specular = - dot(reflectionDirection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 10.0);
    specular *= specularCloudColor.r;

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;


  

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}