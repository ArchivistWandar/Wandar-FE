// metro.config.js
const defaultAssetExts =
  require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: [...defaultAssetExts, "glb"], // Add 'glb' to the list
  },
};
