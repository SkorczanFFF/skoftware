import * as THREE from 'three';

const PARKED_ORIGIN = new THREE.Vector3(9999, 9999, 0);
const PARKED_DIRECTION = new THREE.Vector3(0, 0, -1);
const _toLocal = new THREE.Matrix4();

/**
 * The ray under a screen point, in `object`'s own space.
 *
 * The particle shaders push particles away from this line rather than from a
 * point where it crosses a plane. Everything the cursor covers lies on the
 * ray, at any depth; a plane hit only agrees with it where the ray runs along
 * the local z axis — the middle of the screen. Off-centre the camera looks in
 * at an angle, and a plane hit drifts off the cursor by the depth of the bio
 * stream and by the tilt Float and the yaw wobble give the portrait.
 */
export function localRay(
  raycaster: THREE.Raycaster,
  camera: THREE.Camera,
  ndc: THREE.Vector2,
  object: THREE.Object3D,
  out: THREE.Ray,
): THREE.Ray {
  raycaster.setFromCamera(ndc, camera);
  _toLocal.copy(object.matrixWorld).invert();
  return out.copy(raycaster.ray).applyMatrix4(_toLocal);
}

/** A ray far from every particle: the shaders' "no pointer". */
export function parkRay(out: THREE.Ray): THREE.Ray {
  return out.set(PARKED_ORIGIN, PARKED_DIRECTION);
}
