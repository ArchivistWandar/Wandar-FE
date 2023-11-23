import React from "react";
import { View, Image, StyleSheet } from "react-native";

const SelectedImageComponent = ({ selectedImage }) => {
  if (!selectedImage) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Image source={{ uri: selectedImage.asset }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, // 적절한 크기 조정
    height: 200, // 적절한 크기 조정
    resizeMode: "contain",
  },
});

export default SelectedImageComponent;
