import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import assetsMap from "../AssetsMap";

function loadModelToScene(modelName) {
  const modelPath = assetsMap[modelName];

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    modelPath,
    (gltf) => {
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

      return object;
    },
    undefined,
    (error) => {
      console.error("An error happened during loading a model", error);
    }
  );
}

export default loadModelToScene;
