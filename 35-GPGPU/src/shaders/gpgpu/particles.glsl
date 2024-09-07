void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particles = texture2D(uParticles, uv);
    gl_FragColor = particles;
}