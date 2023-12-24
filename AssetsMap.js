import { Asset } from 'expo-asset';

const assetsMap = {
  bell: Asset.fromModule(require("./assets/glbAsset2/bell.glb")).uri,
  plate: Asset.fromModule(require("./assets/glbAsset2/plate.glb")).uri,
  table: Asset.fromModule(require("./assets/glbAsset2/table.glb")).uri,
  wreath: Asset.fromModule(require("./assets/glbAsset2/wreath.glb")).uri,
};

export default assetsMap;
