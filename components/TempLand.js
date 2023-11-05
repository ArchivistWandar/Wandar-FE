import React, { useEffect, useRef } from "react";
import { GLView } from "expo-gl";
import { PanResponder, View } from "react-native";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from "three";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { Container } from "./Shared";

CameraControls.install({ THREE: THREE });

export default function TempLand() {
  let timeout;
  const cameraControlsRef = useRef(null);

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // When a touch starts, we store the initial distance if there are two touches
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          this.initialDistance = Math.sqrt(dx * dx + dy * dy);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) {
          // Handle zooming (dolly)
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate the difference from the initial distance
          const distanceDiff = distance - this.initialDistance;

          // Scale factor for zoom speed (you may want to adjust this)
          const scaleFactor = 0.001;

          // Determine if we zoom in or out based on the distance difference
          if (distanceDiff > 0) {
            // Zoom in
            cameraControlsRef.current.dolly(scaleFactor * distanceDiff, true);
          } else {
            // Zoom out
            cameraControlsRef.current.dolly(
              -scaleFactor * Math.abs(distanceDiff),
              true
            );
          }
        } else if (evt.nativeEvent.touches.length === 1) {
          // Handle panning (truck)
          const touch = evt.nativeEvent.touches[0];

          // Scale factors for panning speed (you may want to adjust these)
          const panXScaleFactor = 0.001;
          const panYScaleFactor = 0.001;

          cameraControlsRef.current.truck(
            -gestureState.dx * panXScaleFactor,
            -gestureState.dy * panYScaleFactor,
            true
          );
        }
      },
      onPanResponderRelease: () => {
        // Reset the initial distance on release
        this.initialDistance = null;
      },
    })
  ).current;

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const cube = new IconMesh();
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Create CameraControls and attach it to the renderer's canvas
    const cameraControls = new CameraControls(camera, gl.canvas);
    cameraControlsRef.current = cameraControls;

    let clock = new THREE.Clock();

    function update() {
      let delta = clock.getDelta();
      cube.rotation.y += 0.05;
      cube.rotation.x += 0.025;
      cameraControls.update(delta);
    }

    const myCube = new TileMesh(2, 2);
    myCube.position.set(1, 0, 0);
    scene.add(myCube);

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <Container>
      <GLView
        {...panResponder.panHandlers}
        style={{ flex: 1 }}
        onContextCreate={onContextCreate}
      />
    </Container>
  );
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxGeometry(1.5, 1.0, 1.0), // Change BoxBufferGeometry to BoxGeometry
      new MeshStandardMaterial({
        color: "yellow", // Yellow color instead of texture
      })
    );
  }
}

class TileMesh extends Mesh {
  constructor(x, y) {
    super(
      new BoxGeometry(x, 0.1, y), // Change BoxBufferGeometry to BoxGeometry
      new MeshStandardMaterial({
        color: "orange",
      })
    );
  }
}
