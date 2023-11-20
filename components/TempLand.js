import React, { useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { PanResponder, View } from "react-native";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  PerspectiveCamera,
  OrthographicCamera,
  Scene,
  PointLight,
  SpotLight,
  Fog,
  GridHelper,
  TextureLoader,
} from "three";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Asset } from "expo-asset";

CameraControls.install({ THREE: THREE });

export default function TempLand() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [textures, setTextures] = useState({});
  const cameraControlsRef = useRef(null);
  const initialDistanceRef = useRef(null);


  useEffect(() => {
    // 텍스처 로드
    const loadTextures = async () => {
      const textureLoader = new TextureLoader();
      const albedo = await new Promise((resolve, reject) => {
        textureLoader.load(
          Asset.fromModule(require("../assets/glbTexture/universal.png")).uri,
          resolve,
          undefined,
          reject
        );
      });

      const emissive = await new Promise((resolve, reject) => {
        textureLoader.load(
          Asset.fromModule(require("../assets/glbTexture/emission.png")).uri,
          resolve,
          undefined,
          reject
        );
      });

      setTextures({ albedo, emissive });
    };

    // 모델 로드
    const loadModel = async () => {
      try {
        await Asset.loadAsync(require("../assets/wandarGlbFiles/mapbase2.glb"));
        setModelLoaded(true);
      } catch (error) {
        console.error("Model loading error:", error);
      }
    };

    loadTextures();
    loadModel();
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
          const panXScaleFactor = 0.005;
          const panYScaleFactor = 0.005;
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
    const aspect = width / height;
    const sceneColor = 0x6ad6f0;

    const frustumSize = 50;
    const orthoCamera = new OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    orthoCamera.position.set(2, 5, 5);


    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const camera = new OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    // && textures.albedo && textures.emissive

    if (modelLoaded) {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        await Asset.fromModule(require("../assets/wandarGlbFiles/mapbase2.glb")).uri,
        (gltf) => {
          
          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.material.map = textures.albedo;
              child.material.emissiveMap = textures.emissive;
              child.material.emissive = new THREE.Color(0xffffff);
              child.material.emissiveIntensity = 1;
              child.material.needsUpdate = true;
            }
          });
          model.position.set(0, 0, 3);
          model.scale.set(10, 10, 10); // 모델 스케일 조정
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("An error happened during loading a model", error);
        }
      );
      
    }

    const cameraControls = new CameraControls(orthoCamera, gl.canvas);
    cameraControlsRef.current = cameraControls;

    let clock = new THREE.Clock();
    const render = () => {
      requestAnimationFrame(render);
      const delta = clock.getDelta();
      cameraControls.update(delta);
      renderer.render(scene, orthoCamera);
      gl.endFrameEXP();
    };
    render();
  };

  return <GLView {...panResponder.panHandlers}
    style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}