precision highp float;

uniform float uTime;
uniform float uDuration;
uniform float uPointSizeBase;
// The pointer's ray in local space (localRay.ts).
uniform vec3 uRayOrigin;
uniform vec3 uRayDir;
uniform float uRepelRadius;
uniform float uRepelStrength;

// Click shockwaves: the tap's local ray, and (age01, intensity) with
// age01 < 0 = inactive.
uniform vec3 uPulseOrigins[2];
uniform vec3 uPulseDirs[2];
uniform vec2 uPulses[2];
uniform float uPulseStrength;
uniform float uMaxRadius;
uniform float uRingThick;
uniform float uTurbulence;

attribute float aOffset;
attribute vec3 aStartPosition;
attribute vec3 aControlPoint1;
attribute vec3 aControlPoint2;
attribute vec3 aEndPosition;
attribute vec4 aAxisAngle;
attribute vec3 aColor;
attribute float aAlpha;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t) {
  float tn = 1.0 - t;
  return tn * tn * tn * p0 + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * p1;
}

// The part of `p` square to the ray: its length is the distance from the ray,
// the same at every depth along the cursor's line of sight.
vec3 awayFromRay(vec3 p, vec3 origin, vec3 dir) {
  vec3 toRay = p - origin;
  return toRay - dir * dot(toRay, dir);
}

vec4 quatFromAxisAngle(vec3 axis, float angle) {
  float halfAngle = angle * 0.5;
  return vec4(axis * sin(halfAngle), cos(halfAngle));
}

vec3 rotateVector(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

float pulseEnv(float t) {
  if (t < 0.0 || t >= 1.0) return 0.0;
  float attack = smoothstep(0.0, 0.08, t);
  float release = 1.0 - smoothstep(0.5, 1.0, t);
  return attack * release;
}

void main() {
  float tProgress = mod((uTime + aOffset), uDuration) / uDuration;

  float angle = aAxisAngle.w * tProgress;
  vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);

  vec3 pos = rotateVector(tQuat, position);
  pos += cubicBezier(aStartPosition, aControlPoint1, aControlPoint2, aEndPosition, tProgress);

  // ---- Continuous mouse repel (desktop hover) ----------------------------
  // The stream runs tens of units deep, so a plane through it would put the
  // hole beside the cursor everywhere but the middle of the screen.
  vec3 away = awayFromRay(pos, uRayOrigin, uRayDir);
  float influence = smoothstep(uRepelRadius, 0.0, length(away));
  if (influence > 0.001) {
    vec3 dir = normalize(away + 0.001);
    vec3 tangent = cross(dir, uRayDir);
    float drift = sin(aOffset * 31.4) * 0.4;
    pos += (dir + tangent * drift) * influence * uRepelStrength;
    pos -= uRayDir * influence * 1.5;
  }

  // ---- Click-driven shockwave pulses --------------------------------------
  float pulseTotalEnv = 0.0;
  float wavefrontFlash = 0.0;
  float jitter = fract(aOffset * 17.13); // per-particle phase delay


  for (int i = 0; i < 2; i++) {
    float age = uPulses[i].x;
    if (age < 0.0) continue;
    float ageJ = age - jitter * 0.04;
    float env = pulseEnv(ageJ);
    if (env <= 0.0) continue;

    pulseTotalEnv += env;

    // Expanding wavefront with damped oscillation.
    float radius = uMaxRadius * (0.18 + 0.82 * ageJ)
                 + sin(ageJ * 16.0) * exp(-ageJ * 4.0) * 0.45;

    vec3 dP = awayFromRay(pos, uPulseOrigins[i], uPulseDirs[i]);
    float dPlen = length(dP);
    // Ring band: nonzero only inside [radius - thick, radius + thick].
    float ringIn  = smoothstep(radius - uRingThick, radius, dPlen);
    float ringOut = 1.0 - smoothstep(radius, radius + uRingThick, dPlen);
    float ring = ringIn * ringOut;

    float force = ring * env * uPulses[i].y * uPulseStrength;
    if (force > 0.001) {
      vec3 dir = normalize(dP + 0.0001);
      vec3 tangent = cross(dir, uPulseDirs[i]);
      float drift = sin(aOffset * 31.4) * 0.4;
      pos += (dir + tangent * drift) * force;
      pos -= uPulseDirs[i] * force * 0.35;
    }

    // Impact flash for very young pulses.
    wavefrontFlash += env * (1.0 - smoothstep(0.0, 0.18, ageJ));
  }

  // Curl-noise-ish turbulence during the pulse window.
  if (pulseTotalEnv > 0.001 && uTurbulence > 0.0) {
    float n1 = sin(pos.x * 0.45 + uTime * 1.3) * cos(pos.y * 0.4 - uTime * 1.1);
    float n2 = sin(pos.y * 0.42 - uTime * 1.4) * cos(pos.z * 0.5 + uTime * 0.9);
    pos += vec3(n2, -n1, n1 * 0.5) * pulseTotalEnv * uTurbulence;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  float sizeBoost = 1.0 + wavefrontFlash * 0.6;
  gl_PointSize = uPointSizeBase * aSize * sizeBoost * (300.0 / -mvPosition.z);

  float fadeIn = smoothstep(0.0, 0.08, tProgress);
  float fadeOut = smoothstep(1.0, 0.85, tProgress);
  vAlpha = aAlpha * fadeIn * fadeOut;

  float pulse = 0.9 + 0.1 * sin(tProgress * 6.2831 * 3.0 + aOffset * 10.0);
  vColor = aColor * pulse * (1.0 + wavefrontFlash * 0.5);

  gl_Position = projectionMatrix * mvPosition;
}
