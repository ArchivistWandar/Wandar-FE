import React, { useEffect, useRef, useState } from "react";
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Asset } from "expo-asset";

CameraControls.install({ THREE: THREE });

export default function TempLand() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const timeoutRef = useRef();
  const cameraControlsRef = useRef(null);
  const initialDistanceRef = useRef(null);

  useEffect(() => {
    // 모델 로드
    Asset.loadAsync(require("../assets/glbAsset2/bell3.glb"))
      .then(() => {
        setModelLoaded(true); // 로딩 완료 시 상태 업데이트
      })
      .catch((error) => console.error("Model loading error:", error));

    // 컴포넌트 언마운트 시 타임아웃 클리어
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) {
          console.log("touches 2!!!");
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          initialDistanceRef.current = 1.5 * Math.sqrt(dx * dx + dy * dy);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (
          evt.nativeEvent.touches.length === 2 &&
          initialDistanceRef.current !== null
        ) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const distanceDiff = distance - initialDistanceRef.current;
          const scaleFactor = 0.005;

          if (cameraControlsRef.current) {
            if (distanceDiff > 0) {
              cameraControlsRef.current.dolly(scaleFactor * distanceDiff, true);
            } else {
              cameraControlsRef.current.dolly(
                -scaleFactor * Math.abs(distanceDiff),
                true
              );
            }
          }
        } else if (
          evt.nativeEvent.touches.length === 1 &&
          cameraControlsRef.current
        ) {
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
        initialDistanceRef.current = null;
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

    const cube = new TileMesh();
    cube.position.set(0, 0, 0);
    scene.add(cube);

    if (modelLoaded) {
      console.log("loading----------------------------------");
      console.log(modelLoaded);
      // 모델 로드가 완료되면 씬에 추가
      const gltfLoader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();

      const albedoTexture = textureLoader.load(
        Asset.fromModule(require("../assets/glbTexture/universal.png")).uri,
        // Add a callback for successful texture loading
        () => {
          console.log("Albedo texture loaded successfully");
        },
        // Add a callback for progress (optional)
        undefined,
        // Add a callback for errors in loading texture
        (err) => {
          console.error("Error loading albedo texture", err);
        }
      );

      const emissiveTexture = textureLoader.load(
        Asset.fromModule(require("../assets/glbTexture/emission.png")).uri
      );

      gltfLoader.load(
        Asset.fromModule(require("../assets/glbAsset2/bell3.glb")).uri,
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              // Assign albedo texture
              child.material.map = albedoTexture;

              // Assign emissive texture
              child.material.emissiveMap = emissiveTexture;
              child.material.emissive = new THREE.Color(0xffffff); // This sets the color of the glow
              child.material.emissiveIntensity = 1; // Adjust the intensity of the glow

              // Ensure the material is updated on the GPU
              child.material.needsUpdate = true;
            }
          });

          model.position.set(0, 0, 3);
          model.scale.set(10, 10, 10);
          scene.add(model);
          console.log("Model loaded and added to the scene with texture");
          console.log("Model position:", model.position);
          console.log("Model scale:", model.scale);
        },
        undefined, // 로드 진행 상황에 대한 콜백 함수 (필요시 사용)
        (error) => {
          console.error("An error happened during loading a model", error);
        }
      );
    }

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

    const myCube = new TileMesh(10, 10);
    myCube.position.set(0, 0, 0);
    scene.add(myCube);

    // Setup an animation loop
    const render = () => {
      timeoutRef.current = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <GLView
      {...panResponder.panHandlers}
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
    />
  );
}

class TileMesh extends Mesh {
  constructor(x, y) {
    super(
      new BoxGeometry(x, 0.1, y), // Change BoxBufferGeometry to BoxGeometry
      new MeshStandardMaterial({
        color: "seagreen",
      })
    );
  }
}
