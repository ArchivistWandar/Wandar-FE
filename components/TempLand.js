// TempLand.js
import React, { useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer, TextureLoader as ExpTL } from "expo-three";
import {
  AmbientLight,
  PerspectiveCamera,
  Scene,
  PointLight,
  SpotLight,
  Fog,
  GridHelper,
  ImageLoader as III,
} from "three";
import CameraControls from "camera-controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Asset } from "expo-asset";
import MobileCameraManager from "./MobileCameraManager.js";
import SlideUpModal from "./SlideUpModal";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  PanResponder,
} from "react-native";
import * as THREE from "three";
import assetsMap from "../AssetsMap.js";
import { SEE_LAND_QUERY } from "../screens/UploadPost/ChooseLand.js";
import { useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo.js";

CameraControls.install({ THREE: THREE });

const modelPaths = {
  land: require("../assets/glbAsset2/mapbase_onelayer.glb"),
};

var __albedoTextures;
var __emissiveTextures;

export default function TempLand({ selectedImage }) {
  const username = currentUsernameVar();
  const { data, loading, error } = useQuery(SEE_LAND_QUERY, {
    variables: { username },
  });

  const [modelLoaded, setModelLoaded] = useState(false);
  const [albedoTextures, setAlbedoTextures] = useState({});
  const [emissiveTextures, setEmissiveTextures] = useState({});
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [modelPosition, setModelPosition] = useState({ x: 0, y: 8, z: 3 });
  const [selectedModel, setSelectedModel] = useState(null);
  const modelOffset = 5; // 모델 간의 간격

  const sceneRef = useRef(null);
  // const textureRef = useRef();
  const cameraManagerRef = useRef(null);
  const cameraControlsRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const touchPosition = useRef(new THREE.Vector2());

  //텍스차 로드 함수
  async function loadTextures() {
    const textureLoader = new ExpTL();

    var uri1 = Asset.fromModule(
      require("../assets/glbTexture/universal.png")
    ).uri;
    console.log("********* loadTextture: albedo uri=", uri1);

    var a = textureLoader.load(uri1);
    __albedoTextures = a;
    console.log("albedo texture=", __albedoTextures);

    var uri2 = Asset.fromModule(
      require("../assets/glbTexture/universal.png")
    ).uri;
    console.log("********** loadTextture: emissive uri=", uri2);

    var e = textureLoader.load(uri2);
    __emissiveTextures = e;
    console.log("emissive texture =", __emissiveTextures);
  } // loadTextture

  /*
  var __albedoTextures;
  var __emissiveTextures;

  async function loadTextures() {


    let aimg = document.createElement("img");

    const p1 = new Promise((resolve, reject) => {
      aimg.onload = resolve;
      aimg.onerror = reject;
    });
    aimg.src = Asset.fromModule(require("../assets/glbTexture/universal.png")).uri;

    await p1;

    console.log("Image loaded successfully");
    // console.log('albedoImage=', albedoImage);
    var tx = new THREE.Texture(aimg);
    tx.needsUpdate = true;
    console.log('albedo = ', tx);
    setAlbedoTextures({ albedo: tx });

    __albedoTextures = tx;

    let eimg = document.createElement("img");

    const p2 = new Promise((resolve, reject) => {
      eimg.onload = resolve;
      eimg.onerror = reject;
    });
    eimg.src = Asset.fromModule(require("../assets/glbTexture/emission.png")).uri;

    await p2;

    console.log("Image loaded successfully");
    // console.log('albedoImage=', albedoImage);
    var tx = new THREE.Texture(eimg);
    tx.needsUpdate = true;
    console.log('emissive = ', tx);
    setEmissiveTextures({ emissive: tx });

    __emissiveTextures = tx;

  }
  */

  /*
    useEffect(() => {
      const textureLoader = new THREE.TextureLoader();
      console.log( 'useEffect #1 : ', Asset.fromModule(require("../assets/glbTexture/universal.png")).uri);
   
      textureLoader.load(
        Asset.fromModule(require("../assets/glbTexture/universal.png")).uri,
        (albedoAsset) => {
          console.log(albedoAsset)
          setAlbedoTextures({ albedo: albedoAsset })
        },
        undefined,
        (error) => {
          console.error("TEXTURE LOADING ERROR:", error);
        }
      );
      textureLoader.load(
        Asset.fromModule(require("../assets/glbTexture/emission.png")).uri,
        (emissiveAsset) => {
          setEmissiveTextures({ emissive: emissiveAsset })
        },
        undefined,
        (error) => {
          console.error("TEXTURE LOADING ERROR:", error);
        }
      );
    }, [])
  */

  // component mount 시 실행되는 effect
  useEffect(() => {
    /*
    // 모델과 텍스처가 이미 로드되었는지 확인
    if (!modelLoaded || !texturesLoaded) {
      // 모델 또는 텍스처가 로드되지 않았다면, 로드 프로세스 시작
      Promise.all([loadTextures(), loadModel()]).then(() => {
        // 모델과 텍스처 로드 완료
        console.log("Model and textures loaded");
      });
    }
  
    // 모델과 텍스처가 이미 로드되었다면, 씬에 추가
    */

    console.log("1st useEffect");
    console.log(
      "textture URI = ",
      Asset.fromModule(require("../assets/glbTexture/universal.png")).uri
    );
    console.log(
      "gltf URI= ",
      Asset.fromModule(require("../assets/glbAsset2/mapbase_onelayer.glb")).uri
    );

    loadTextures();

    let xxx;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      Asset.fromModule(require("../assets/glbAsset2/mapbase_onelayer.glb")).uri,
      (gltf) => {
        const model = gltf.scene;
        xxx = gltf;

        console.log("gltfLoad: ../assets/glbAsset2/mapbase_onelayer.glb");

        model.traverse((child) => {
          if (child.isMesh) {
            // child.material.map = textures.albedo;
            // child.material.emissiveMap = textures.emissive;
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

    console.log("xxx = ", xxx);
  }, []);

  // selectedImage 에 따라 실행되는 effect
  useEffect(() => {
    console.log(
      "--------------------2nd useEffect: selectedImage----------------"
    );

    // 모델 로딩 함수 정의
    const loadObjectModel = () => {
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
    Promise.all([loadObjectModel()])
      .then(async (gltf) => {
        if (sceneRef.current) {
          const object = await gltf[0].scene;
          // console.log(object)
          object.traverse((child) => {
            if (child.isMesh) {
              // 텍스쳐 적용
              console.log("albedo tx = ", __albedoTextures);
              child.material.map = __albedoTextures; // albedoTextures.albedo;
              child.material.emissiveMap = __emissiveTextures;
              child.material.emissive = new THREE.Color(0xffffff);
              child.material.emissiveIntensity = 1;
              child.material.needsUpdate = true;
              console.log("emissive tx =:", __emissiveTextures);
              console.log("Texture Image:", child.material.map.image);
              console.log("Texture Repeat:", child.material.map.repeat);
              console.log("Texture Offset:", child.material.map.offset);
              console.log("Texture Rotation:", child.material.map.rotation);
            }
          });

          object.scale.set(10, 10, 10);
          object.position.set(
            modelPosition.x,
            modelPosition.y,
            modelPosition.z
          );
          sceneRef.current.add(object);

          // 다음 모델 위치 업데이트
          setModelPosition((prevPos) => ({
            x: prevPos.x,
            y: prevPos.y,
            z: prevPos.z + modelOffset,
          }));
        }
      })
      .catch((error) => {
        console.error("Error loading model:", error);
      });
  }, [selectedImage]); // Dependency array includes selectedImage

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

    const renderer = new Renderer({ gl, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.outputEncoding = THREE.sRGBEncoding;

    if (!renderer.extensions.get("EXT_color_buffer_float")) {
      console.warn(
        "EXT_color_buffer_float not supported. Fallback to alternative methods."
      );
      // 대체 렌더링 방법이나 기능 사용
    }

    const scene = new Scene();
    sceneRef.current = scene;
    // if (textureRef.current) {
    //   sceneRef.current.background = textureRef.current;
    // }
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
    orthoCamera.position.set(0, 0, 0);

    const cameraControls = new CameraControls(orthoCamera, gl.canvas);
    cameraControlsRef.current = cameraControls;
    cameraManagerRef.current = new MobileCameraManager(
      orthoCamera,
      scene,
      frustumSize,
      aspect
    );

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // 강도를 0.1로 줄임
    scene.add(ambientLight);

    // 직접 광 (Direct Light) 조정
    const directLight = new THREE.DirectionalLight(0xfff2b2, 0.8); // 부드러운 색상, 강도 0.5
    directLight.position.set(-3, 5, -3).normalize();
    scene.add(directLight);

    // 부드러운 그림자 설정
    directLight.castShadow = true;
    directLight.shadow.mapSize.width = 512; // 그림자 해상도
    directLight.shadow.mapSize.height = 512;
    directLight.shadow.radius = 10; // 그림자 부드러움

    // 포그 추가
    scene.fog = new THREE.FogExp2(0xffffff, 0.002); // 흰색 포그, 밀도 0.002

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
