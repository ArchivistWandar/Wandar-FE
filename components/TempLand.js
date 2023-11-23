// TempLand.js
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
import CameraControls from "camera-controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Asset } from "expo-asset";
import MobileCameraManager from "./MobileCameraManager.js";
import SlideUpModal from "./SlideUpModal";
import { Image, View, TouchableOpacity, Text, PanResponder } from "react-native";
import * as THREE from "three";
import assetsMap from "../AssetsMap.js";

CameraControls.install({ THREE: THREE });

const modelPaths = {
  land: require("../assets/glbAsset2/mapbase2.glb"),
};

export default function TempLand({ selectedImage }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [textures, setTextures] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [modelPosition, setModelPosition] = useState({ x: 0, y: 8, z: 3 });
  const modelOffset = 5; // 모델 간의 간격

  const sceneRef = useRef(null);
  const textureRef = useRef();
  const cameraManagerRef = useRef(null);
  const cameraControlsRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const touchPosition = useRef(new THREE.Vector2());


  async function loadTextures() {
    const textureLoader = new TextureLoader();
    let albedo, emissive;

    try {
      albedo = await new Promise((resolve, reject) => {
        textureLoader.load(
          Asset.fromModule(require("../assets/glbTexture/universal.png")).uri,
          resolve,
          undefined,
          reject
        );
      });

      textureLoader.load('path/to/your/image.jpg', (texture) => {
        textureRef.current = texture;

        // 씬이 이미 생성된 경우 텍스처 적용
        if (sceneRef.current) {
          sceneRef.current.background = texture;
        }
      });

      emissive = await new Promise((resolve, reject) => {
        textureLoader.load(
          Asset.fromModule(require("../assets/glbTexture/emission.png")).uri,
          resolve,
          undefined,
          reject
        );
      });
    } catch (error) {
      console.error("Error loading textures:", error);
    }

    setTextures({ albedo, emissive });
  }

  // 모델 로드 함수
  async function loadModel() {
    try {
      await Asset.loadAsync(require("../assets/glbAsset2/table.glb"));
      setModelLoaded(true);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }

  useEffect(() => {
    // Load textures and model
    Promise.all([loadTextures(), loadModel()]).then(() => {
      console.log("Model loaded state:", modelLoaded);
      console.log("Textures loaded state:", texturesLoaded);

      // Check if the model and textures are loaded
      if (modelLoaded && textures) {
        const gltfLoader = new GLTFLoader();

        // Load the GLTF model
        gltfLoader.load(
          Asset.fromModule(require("../assets/glbAsset2/mapbase2.glb")).uri,
          (gltf) => {
            const model = gltf.scene;
            model.traverse((child) => {
              if (child.isMesh) {
                // Apply textures if necessary
                // child.material.map = textures.albedo;
                // child.material.emissiveMap = textures.emissive;
                // child.material.emissive = new THREE.Color(0xffffff);
                // child.material.emissiveIntensity = 1;
                child.material.needsUpdate = true;
              }
            });

            model.position.set(0, 0, 0);
            model.scale.set(5, 5, 5);

            if (sceneRef.current) {
              sceneRef.current.add(model);
            }
          },
          undefined,
          (error) => {
            console.error("An error occurred while loading the model:", error);
          }
        );
      }
    });
  }, [modelLoaded, textures]);

  useEffect(() => {
    // 모델 로딩 함수 정의
    const loadModel = () => {
      return new Promise((resolve, reject) => {
        if (!selectedImage) {
          return reject("No selected image.");
        }

        const modelName = selectedImage.objName;
        const modelPath = assetsMap[modelName];
        const gltfLoader = new GLTFLoader();

        gltfLoader.load(
          modelPath,
          (gltf) => resolve(gltf),
          undefined,
          (error) => reject(error)
        );
      });
    };

    // 모델 로딩 후 scene에 추가
    loadModel().then(gltf => {
      if (sceneRef.current) {
        const object = gltf.scene;
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.map = textures.albedo;
            child.material.emissiveMap = textures.emissive;
            child.material.emissive = new THREE.Color(0xffffff);
            child.material.emissiveIntensity = 1;
            child.material.needsUpdate = true;
          }
        });

        object.scale.set(10, 10, 10);
        object.position.set(modelPosition.x, modelPosition.y, modelPosition.z);
        sceneRef.current.add(object);

        // 다음 모델 위치 업데이트
        setModelPosition(prevPos => ({
          x: prevPos.x,
          y: prevPos.y,
          z: prevPos.z + modelOffset,
        }));
      }
    }).catch(error => {
      console.error("Error loading model:", error);
    });

  }, [selectedImage]); // Dependency array includes selectedImage





  useEffect(() => {
    console.log("Model loaded state:", modelLoaded);
  }, [modelLoaded]);

  useEffect(() => {
    console.log("Textures loaded state:", texturesLoaded);
  }, [texturesLoaded]);

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
    const aspect = width / height;
    const sceneColor = 0x6ad6f0;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    if (!renderer.extensions.get('EXT_color_buffer_float')) {
      console.warn('EXT_color_buffer_float not supported. Fallback to alternative methods.');
      // 대체 렌더링 방법이나 기능 사용
    }

    const scene = new Scene();
    sceneRef.current = scene;
    if (textureRef.current) {
      sceneRef.current.background = textureRef.current;
    }
    //scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const frustumSize = 50;
    const orthoCamera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    orthoCamera.position.set(0, 5, -5);

    const cameraControls = new CameraControls(orthoCamera, gl.canvas);
    cameraControlsRef.current = cameraControls;
    cameraManagerRef.current = new MobileCameraManager(orthoCamera, scene, frustumSize, aspect);


    // const ambientLight = new AmbientLight(255);
    // scene.add(ambientLight);

    // const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    // pointLight.position.set(0, 200, 200);
    // scene.add(pointLight);

    // const spotLight = new SpotLight(0xffffff, 0.5);
    // spotLight.position.set(0, 500, 100);
    // spotLight.lookAt(scene.position);
    // scene.add(spotLight);

    // 환경 광 (Ambient Light) 조정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // 강도를 0.1로 줄임
    scene.add(ambientLight);

    // 직접 광 (Direct Light) 조정
    const directLight = new THREE.DirectionalLight(0x9fc5e8, 0.5); // 부드러운 색상, 강도 0.5
    directLight.position.set(0.5, 1, 0.5).normalize();
    scene.add(directLight);

    // 부드러운 그림자 설정
    directLight.castShadow = true;
    directLight.shadow.mapSize.width = 512; // 그림자 해상도
    directLight.shadow.mapSize.height = 512;
    directLight.shadow.radius = 10; // 그림자 부드러움

    // 포그 추가
    scene.fog = new THREE.FogExp2(0xffffff, 0.002); // 흰색 포그, 밀도 0.002




    console.log(modelLoaded);
    console.log(textures.albedo);
    console.log(textures.emissive);
    const direction = new THREE.Vector3();
    orthoCamera.getWorldDirection(direction);
    console.log(direction); // 카메라가 바라보는 방향


    let clock = new THREE.Clock();
    const render = () => {
      requestAnimationFrame(render);
      const delta = clock.getDelta();
      if (cameraManagerRef.current) {
        cameraManagerRef.current.update(delta);
      }
      renderer.render(scene, orthoCamera);
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


  const onImageClick = () => {
    // 이미지 클릭 시 3D 오브젝트를 로드하는 로직을 구현하세요.
    const loader = new GLTFLoader();

    // 모델 파일의 경로를 설정합니다.
    const modelPath = "../assets/glbAsset2/table.glb"; // 실제 모델 파일의 경로로 변경해야 합니다.

    loader.load(
      modelPath,
      (gltf) => {
        // 모델 로딩이 완료되었을 때 실행되는 콜백 함수입니다.
        const model = gltf.scene;

        // 모델의 위치와 크기를 조절합니다.
        model.position.set(0, 0, 0); // 원하는 위치로 설정
        model.scale.set(1, 1, 1); // 원하는 크기로 설정

        // Scene에 모델을 추가합니다.
        scene.add(model);

        // 화면을 다시 렌더링합니다.
        renderer.render(scene, orthoCamera);
      },
      undefined,
      (error) => {
        // 모델 로딩 중 에러가 발생했을 때 실행되는 콜백 함수입니다.
        console.error("An error occurred while loading the model:", error);
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>

      <GLView
        {...panResponder.panHandlers}
        onStartShouldSetResponder={() => true}
        onResponderGrant={(e) => handleTouch(e, "start")}
        onResponderMove={(e) => handleTouch(e, "move")}
        onResponderRelease={(e) => handleTouch(e, "end")}
        style={{ flex: 1 }}
        onContextCreate={onContextCreate}
      />

    </View>
  );
}