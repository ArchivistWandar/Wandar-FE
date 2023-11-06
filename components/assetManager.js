import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class AssetManager {
  constructor(loadingManager) {
    this.modelLoader = new GLTFLoader(loadingManager);
    this.models = {};
  }

  loadModel(name, path, onLoad) {
    console.log(`Loading model: ${name} from path: ${path}`); // 시작 로그 추가

    this.modelLoader.load(
      path,
      (gltf) => {
        this.models[name] = gltf.scene;
        console.log(`Successfully loaded model: ${name}`); // 성공 로그 추가
        if (onLoad) onLoad(gltf);
      },
      undefined,
      (error) => {
        console.error(`An error happened while loading model: ${name}`, error); // 에러 로그 수정
      }
    );
  }
}
