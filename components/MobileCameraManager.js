import * as THREE from "three";

// 상수 정의
const DEG2RAD = Math.PI / 180.0;
const MIN_CAMERA_RADIUS = 0.1;
const MAX_CAMERA_RADIUS = 5;
const MIN_CAMERA_ELEVATION = 0;
const MAX_CAMERA_ELEVATION = 80;
const AZIMUTH_SENSITIVITY = 0.2;
const ELEVATION_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 0.0005;
const PAN_SENSITIVITY = -0.05;
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
    } else if (event.nativeEvent.touches.length === 3) {
      // 세 손가락 터치 시작 위치 기록
      const touch1 = event.nativeEvent.touches[0];
      const touch2 = event.nativeEvent.touches[1];
      const touch3 = event.nativeEvent.touches[2];

      this.initialThreeFingerTouch = {
        x: (touch1.pageX + touch2.pageX + touch3.pageX) / 3,
        y: (touch1.pageY + touch2.pageY + touch3.pageY) / 3,
      };
    }
  }

  onTouchMove(event) {
    if (event.nativeEvent.touches.length === 1 && this.initialTouch) {
      // 한 손가락 터치: 패닝
      const touch = event.nativeEvent.touches[0];
      const deltaX = (touch.pageX - this.initialTouch.x) * -PAN_SENSITIVITY; // 반대 방향으로 변경
      const deltaY = (touch.pageY - this.initialTouch.y) * -PAN_SENSITIVITY; // 반대 방향으로 변경

      // 카메라의 현재 방향에 기반한 이동 벡터 계산
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
        this.camera.quaternion
      );
      const left = new THREE.Vector3(-1, 0, 0).applyQuaternion(
        this.camera.quaternion
      );
      const up = new THREE.Vector3(0, 1, 0);

      // 좌우 이동 (left 벡터 사용)
      this.cameraOrigin.add(left.multiplyScalar(deltaX));

      // 상하 이동 (up 벡터 사용)
      this.cameraOrigin.add(up.multiplyScalar(deltaY));

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
    } else if (
      event.nativeEvent.touches.length === 3 &&
      this.initialThreeFingerTouch
    ) {
      // 세 손가락으로 회전 처리
      const touch1 = event.nativeEvent.touches[0];
      const touch2 = event.nativeEvent.touches[1];
      const touch3 = event.nativeEvent.touches[2];

      const currentX = (touch1.pageX + touch2.pageX + touch3.pageX) / 3;
      const currentY = (touch1.pageY + touch2.pageY + touch3.pageY) / 3;

      // 방향 반대로 변경
      const deltaX =
        (this.initialThreeFingerTouch.x - currentX) * AZIMUTH_SENSITIVITY;
      const deltaY =
        (this.initialThreeFingerTouch.y - currentY) * ELEVATION_SENSITIVITY;

      this.cameraAzimuth += deltaX;
      this.cameraElevation = Math.min(
        Math.max(this.cameraElevation - deltaY, MIN_CAMERA_ELEVATION),
        MAX_CAMERA_ELEVATION
      );

      this.initialThreeFingerTouch = { x: currentX, y: currentY };
    }

    this.updateCameraPosition();
  }

  onTouchEnd(event) {
    this.initialTouch = null;
    this.initialDistance = null;
    this.initialThreeFingerTouch = null;
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
