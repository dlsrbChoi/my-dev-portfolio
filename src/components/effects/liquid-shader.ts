export const liquidVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const liquidFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  // 개선된 노이즈 함수 (Perlin-like)
  float hash(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float n0 = hash(i);
    float n1 = hash(i + vec3(1.0, 0.0, 0.0));
    float n2 = hash(i + vec3(0.0, 1.0, 0.0));
    float n3 = hash(i + vec3(1.0, 1.0, 0.0));
    float n4 = hash(i + vec3(0.0, 0.0, 1.0));
    float n5 = hash(i + vec3(1.0, 0.0, 1.0));
    float n6 = hash(i + vec3(0.0, 1.0, 1.0));
    float n7 = hash(i + vec3(1.0, 1.0, 1.0));

    float nx0 = mix(n0, n1, f.x);
    float nx1 = mix(n2, n3, f.x);
    float nxy0 = mix(nx0, nx1, f.y);

    float nx2 = mix(n4, n5, f.x);
    float nx3 = mix(n6, n7, f.x);
    float nxy1 = mix(nx2, nx3, f.y);

    return mix(nxy0, nxy1, f.z);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;

    // 다층 노이즈로 유체 시뮬레이션
    float n1 = fbm(vec3(uv * 2.0, uTime * 0.3));
    float n2 = fbm(vec3(uv * 4.0 + 10.0, uTime * 0.2 + 5.0));
    float n3 = fbm(vec3(uv * 6.0 + 20.0, uTime * 0.15 + 10.0));

    // 노이즈 혼합
    float mixedNoise = mix(n1, n2, 0.5);
    mixedNoise = mix(mixedNoise, n3, 0.3);

    // 색상 혼합
    vec3 color = mix(uColor1, uColor2, mixedNoise);

    // 투명도 그라디언트
    float alpha = 0.4 + 0.1 * mixedNoise;

    gl_FragColor = vec4(color, alpha);
  }
`
