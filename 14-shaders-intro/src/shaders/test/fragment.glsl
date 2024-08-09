varying vec2 vUv;
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

#define PI 3.1415926535897932384626433832795;

vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
void main()
{
    // ====  horizontal gradient ==== 
    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ==== vertical gradient ==== 
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ==== rapid vertical gradient ==== 
    // float strength = mod(vUv.y *10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ====  step effect ==== 
    // float strength = mod(vUv.y *10.0, 1.0);
    // strength = step(0.2, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ==== cage effect ==== 
    // float strength = step(0.8, mod(vUv.y *10.0, 1.0));
    // strength += step(0.8, mod(vUv.x *10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ====  cage of dots effect ==== 
    // float strength = step(0.8, mod(vUv.y *10.0, 1.0));
    // strength *= step(0.8, mod(vUv.x *10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ====  cage of logn dots effect ==== 
    // float strength = step(0.8, mod(vUv.y *10.0, 1.0));
    // strength *= step(0.2, mod(vUv.x *10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ==== cage of cage with empty space on the cross effect ==== 
    // float barX = step(0.8, mod(vUv.y *10.0 - 0.2, 1.0));
    // barX *= step(0.2, mod(vUv.x *10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x *10.0 -0.2, 1.0));
    // barY *= step(0.2, mod(vUv.y *10.0, 1.0));

    // float strength = barY + barX;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    //  ====crosses effect ==== 
    // float barX = step(0.8, mod(vUv.y *10.0 + 0.3, 1.0));
    // barX *= step(0.2, mod(vUv.x *10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x *10.0 +0.3, 1.0));
    // barY *= step(0.2, mod(vUv.y *10.0, 1.0));

    // float strength = barY + barX;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== gradient cross in the center ====
    // float strength = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== square ==== 
    // float strength = step(0.2, max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== hard gradient ==== 
    // float strength = floor(vUv.x * 10.0)/ 10.0;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== hard horizontal+vert gradient ==== 
    // float x = floor(vUv.x * 10.0)/ 10.0;
    // float y = floor(vUv.y * 10.0)/ 10.0;

    // float strength = x*y;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== noise ==== 
    // float strength = random(vUv);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== grid noise ==== 
    // vec2 grid = vec2(floor(vUv.x * 10.0)/ 10.0, floor(vUv.y * 10.0)/ 10.0);
    // float strength = random(grid);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== radial gradient of from the corner ==== 
    // float strength = length(vUv);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== radial gradient of from the center ==== 
    // float strength = distance(vUv, vec2(0.5));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== reverse radial gradient of from the center ==== 
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== reverse radial gradient of from the center with concentrated center point ==== 
    // float strength = 0.01 / distance(vUv, vec2(0.5));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== circle in the center ==== 

    // float strength = step(0.25,distance(vUv, vec2(0.5)));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== gradient circle in the center vol 2.0 ==== 

    // float strength =abs(distance(vUv, vec2(0.5))- 0.25);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ====  circle in the center vol 2.0 ==== 

    // float strength =step(0.01, abs(distance(vUv, vec2(0.5))- 0.25));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== waved circle ==== 
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );

    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5))- 0.25));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== waved circle in the center vol 2.0 ==== 
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );

    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5))- 0.25));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== waved circle in the center vol 3.0 ==== 
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );

    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5))- 0.25));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== gradient angle ==== 
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== radial gradient ==== 
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI ;
    // angle += 0.5;

    // float strength = angle;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== radial step gradient ==== 
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= 2.0 * PI ;
    // angle += 0.5;
    // angle *= 20.0;
    // angle = mod(angle, 1.0);

    // float strength = angle;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== perlin noise  ==== 
    // float strength = cnoise(vUv * 10.0);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== sharp perlin noise  ==== 
    // float strength = step(0.0, cnoise(vUv * 10.0));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // ==== sharp perlin noise  ==== 
    // float strength = sin(cnoise(vUv * 10.0) *20.0);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);


    // ==== Colored sharp perlin noise  ==== 
    float strength = sin(cnoise(vUv * 10.0) *20.0);
    vec3 blackColor = vec3(0.0);
    vec3 colored = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, colored, strength);


    gl_FragColor = vec4(mixedColor, 1.0);
}