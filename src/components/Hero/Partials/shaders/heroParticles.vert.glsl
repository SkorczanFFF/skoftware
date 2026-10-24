precision highp float;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec3 uRayOrigin;
uniform vec3 uRayDir;
uniform float uRepelRadius;
uniform float uRepelStrength;

attribute vec3 offset;
attribute vec2 sampleUv;
attribute float pindex;
attribute float intensity;

varying vec2 vUv;
varying vec2 vTexUv;
varying float vIntensity;

float rand(float n) {
  return fract(sin(n) * 43758.5453123);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec3 displaced = offset;

  float r = rand(pindex);
  // Static per-particle; adding uTime would re-roll every frame and jitter Z.
  float n = hash(sampleUv * 37.0 + vec2(pindex * 0.07, pindex * 0.001));
  displaced.xy += vec2(r - 0.5, rand(offset.x + pindex) - 0.5) * uRandom * (0.5 + intensity);
  displaced.z += ((n - 0.5) + sin(uTime * 0.6 + pindex * 0.035) * 0.25) * uDepth;

  float phase = pindex * 0.037;
  displaced.x += sin(uTime * 0.15 + phase) * 0.012;
  displaced.y += cos(uTime * 0.12 + phase * 1.3) * 0.010;
  displaced.z += sin(uTime * 0.1 + phase * 0.7) * 0.006;

  // Coherent traveling wave: phase driven by world-space offset, not pindex.
  float waveArg = uTime * 1.1 - offset.x * 0.55 + offset.y * 0.2;
  displaced.z += sin(waveArg) * 0.12;
  displaced.y += cos(waveArg * 0.9) * 0.035;

  // Distance to the pointer's ray (localRay.ts), pushed square to it: from the
  // camera the hole opens round the cursor wherever the portrait sits.
  vec3 toRay = displaced - uRayOrigin;
  vec3 away = toRay - uRayDir * dot(toRay, uRayDir);
  float influence = smoothstep(uRepelRadius, 0.0, length(away));
  if (influence > 0.001) {
    vec3 dir = normalize(away + 0.001);
    vec3 tangent = cross(dir, uRayDir);
    float drift = sin(pindex * 31.4) * 0.35;
    displaced += (dir + tangent * drift) * influence * uRepelStrength;
    displaced -= uRayDir * influence * 0.15;
  }

  float psize = (sin(uTime * 0.8 + pindex * 0.17) + 2.0);
  psize *= max(intensity, 0.18);
  psize *= uSize;

  vec3 transformed = displaced + vec3(position.xy * psize, 0.0);

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
  vTexUv = sampleUv;
  vIntensity = intensity;
}
