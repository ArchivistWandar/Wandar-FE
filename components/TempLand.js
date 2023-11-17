import React, { useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  PerspectiveCamera,
  Scene,
  PointLight,
  SpotLight,
  Fog,
  GridHelper,
  TextureLoader,
} from "three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Asset } from "expo-asset";
import MobileCameraManager from "./MobileCameraManager.js"; // 파일 경로에 주의하세요

export default function TempLand() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [textures, setTextures] = useState({});
  const cameraManagerRef = useRef(null);

  useEffect(() => {
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

    const loadModel = async () => {
      try {
        await Asset.loadAsync(require("../assets/glbAsset2/milk.glb"));
        setModelLoaded(true);
      } catch (error) {
        console.error("Model loading error:", error);
      }
    };

    loadTextures();
    loadModel();
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const aspect = width / height;
    const sceneColor = 0x6ad6f0;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const camera = new PerspectiveCamera(70, aspect, 0.01, 1000);
    camera.position.set(2, 5, 5);
    cameraManagerRef.current = new MobileCameraManager(camera);

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    if (modelLoaded && textures.albedo && textures.emissive) {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        Asset.fromModule(require("../assets/glbAsset2/milk.glb")).uri,
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
          model.scale.set(10, 10, 10);
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("An error happened during loading a model", error);
        }
      );
    }

    let clock = new THREE.Clock();
    const render = () => {
      requestAnimationFrame(render);
      const delta = clock.getDelta();
      if (cameraManagerRef.current) {
        cameraManagerRef.current.update(delta);
      }
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  const handleTouch = (event, type) => {
    if (!cameraManagerRef.current) return;
    switch (type) {
      case "start":
        cameraManagerRef.current.onTouchStart(event);
        break;
      case "move":
        cameraManagerRef.current.onTouchMove(event);
        break;
      case "end":
        cameraManagerRef.current.onTouchEnd(event);
        break;
      default:
        break;
    }
  };

  return (
    <GLView
      onStartShouldSetResponder={() => true}
      onResponderGrant={(e) => handleTouch(e, "start")}
      onResponderMove={(e) => handleTouch(e, "move")}
      onResponderRelease={(e) => handleTouch(e, "end")}
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
    />
  );
}
