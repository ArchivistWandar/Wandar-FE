import * as THREE from "three";

// 상수 정의
const DEG2RAD = Math.PI / 180.0;
const MIN_CAMERA_RADIUS = 0.1;
const MAX_CAMERA_RADIUS = 5;
const MIN_CAMERA_ELEVATION = 0;
const MAX_CAMERA_ELEVATION = 80;
const AZIMUTH_SENSITIVITY = 0.2;
const ELEVATION_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 0.002;
const PAN_SENSITIVITY = -0.01;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

export default class MobileCameraManager {
  constructor(camera) {
    this.camera = camera;
    this.cameraOrigin = new THREE.Vector3(8, 0, 8);
    this.cameraRadius = 0.5;
    this.cameraAzimuth = 225;
    this.cameraElevation = 45;

    this.initialTouch = null;
    this.initialDistance = null;
  }

  onTouchStart(event) {
    if (event.nativeEvent.touches.length === 1) {
      const touch = event.nativeEvent.touches[0];
      this.initialTouch = { x: touch.pageX, y: touch.pageY };
    } else if (event.nativeEvent.touches.length === 2) {
      this.initialDistance = this.getDistance(event.nativeEvent.touches);
    }
  }

  onTouchMove(event) {
    if (event.nativeEvent.touches.length === 1 && this.initialTouch) {
      // 한 손가락 터치: 패닝
      const touch = event.nativeEvent.touches[0];
      const deltaX = (touch.pageX - this.initialTouch.x) * PAN_SENSITIVITY;
      const deltaY = (touch.pageY - this.initialTouch.y) * PAN_SENSITIVITY;

      // 카메라 기준점 이동
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
        this.camera.quaternion
      );
      const left = new THREE.Vector3(-1, 0, 0).applyQuaternion(
        this.camera.quaternion
      );

      this.cameraOrigin.add(left.multiplyScalar(deltaX));
      this.cameraOrigin.add(forward.multiplyScalar(deltaY));

      this.initialTouch = { x: touch.pageX, y: touch.pageY };
    } else if (event.nativeEvent.touches.length === 2 && this.initialDistance) {
      const currentDistance = this.getDistance(event.nativeEvent.touches);
      const distanceDelta = currentDistance - this.initialDistance;

      this.cameraRadius = Math.max(
        Math.min(
          this.cameraRadius + distanceDelta * ZOOM_SENSITIVITY,
          MAX_CAMERA_RADIUS
        ),
        MIN_CAMERA_RADIUS
      );
    }

    this.updateCameraPosition();
  }

  onTouchEnd(event) {
    this.initialTouch = null;
    this.initialDistance = null;
  }

  getDistance(touches) {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateCameraPosition() {
    this.camera.zoom = this.cameraRadius;
    this.camera.position.x =
      100 *
      Math.sin(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.y = 100 * Math.sin(this.cameraElevation * DEG2RAD);
    this.camera.position.z =
      100 *
      Math.cos(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.add(this.cameraOrigin);
    this.camera.lookAt(this.cameraOrigin);
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    // 여기에서 카메라의 상태를 업데이트합니다.
    // 예를 들어, 카메라의 위치나 회전을 조정하는 코드가 포함될 수 있습니다.
    // 이 메서드는 `TempLand.js`의 렌더링 루프에서 호출됩니다.

    this.updateCameraPosition(); // 카메라 위치 및 방향을 업데이트하는 메서드
  }
}
