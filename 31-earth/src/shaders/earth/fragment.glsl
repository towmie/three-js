varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularTexture;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // day /night color
    vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
    vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, vNormal.z);

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}