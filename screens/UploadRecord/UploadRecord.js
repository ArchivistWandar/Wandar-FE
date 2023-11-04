import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Container } from "../../components/Shared";

const UploadRecord = ({ route }) => {
  const { assets } = route.params.result;

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.line} />
        <View style={styles.imageContainer}>
          {assets.map((image, index) => (
            <View
              key={index}
              style={[
                styles.imageWrapper,
                { alignItems: index % 2 === 0 ? "flex-start" : "flex-end" },
              ]}
            >
              <View style={styles.branch} />
              <Image source={{ uri: image.uri }} style={styles.image} />
            </View>
          ))}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    height: "90%",
    width: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "90%",
    width: "100%",
  },
  imageWrapper: {
    width: "85%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  branch: {
    position: "absolute",
    top: "50%", // 가지가 이미지의 중앙에서 시작
    width: "50%", // 가지의 길이. 적절히 조절하세요.
    height: 1,
    backgroundColor: "white",
  },
});

export default UploadRecord;
