uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

// hsv color
vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
    // normalize mouse position
    vec2 m = vec2(u_mouse.x * 2.0 -1.0, -u_mouse.y * 2.0 + 1.0);
    
    // normalize fragment position
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

   // mandelbrot
   int j = 0;
   vec2 x = p + vec2(-0.5, 0.0); // changing starting point
   float y = 1.5 * u_mouse.x * 0.15;
   vec2 z = vec2(0.0, 0.0);

   for(int i=0; i< 360; i++) {
       j++;
       if(length(z) > 2.0){break;}
       z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + x * y;
   }

   float h = mod(u_time * 20.0, 360.0) / 360.0;
   vec3 rgb = hsv(h, 1.0, 1.0);
   float t = float(j) / 360.0;
   gl_FragColor = vec4(rgb * t, 1.0);
}
