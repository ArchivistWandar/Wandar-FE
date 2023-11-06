const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

// 기본 설정을 가져옵니다.
const defaultConfig = getDefaultConfig(__dirname);

// assetExts 배열에 '.glb' 파일 확장자를 추가합니다.
defaultConfig.resolver.assetExts.push("glb");
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
