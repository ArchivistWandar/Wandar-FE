import React, { useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Asset } from "expo-asset";
import { FlatList } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height; // 화면 높이 추가
const imageMargin = 5;
const modalContentPadding = 15;
const imageWidth =
  (screenWidth - imageMargin * 4 - modalContentPadding * 2) / 3 - 4; // 화면 가로 크기를 3으로 나눔

const ImageSlideUpPanel = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedImageId, setSelectedImageId] = useState(null);

  const handleImagePress = (id) => {
    if (id === selectedImageId) {
      setModalVisible(false); // 모달 닫기
      // Land 스크린으로 네비게이션하고 선택된 이미지 데이터 전달
      navigation.navigate("Land", {
        selectedImage: images.find((image) => image.id === id),
      });
    } else {
      setSelectedImageId(id); // 새로운 이미지 선택
    }
  };

  // ... 나머지 컴포넌트 및 반환 부분

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleImagePress(item.id)}>
      <View
        style={[
          styles.imageContainer,
          { width: imageWidth, height: imageWidth },
          item.id === selectedImageId ? styles.selectedImage : null, // 선택된 이미지 스타일 적용
        ]}
      >
        <Image
          source={{ uri: item.asset }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const images = [
    // 이미지 배열
    { id: 1, asset: require("../assets/barImage/bell.png"), objName: "bell" },
    { id: 2, asset: require("../assets/barImage/plate.png"), objName: "plate" },
    { id: 3, asset: require("../assets/barImage/table.png"), objName: "table" },
    {
      id: 4,
      asset: require("../assets/barImage/wreath.png"),
      objName: "wreath",
    },
    { id: 5, asset: require("../assets/barImage/bell.png"), objName: "bell" },
    { id: 6, asset: require("../assets/barImage/plate.png"), objName: "plate" },
    { id: 7, asset: require("../assets/barImage/table.png"), objName: "table" },
    {
      id: 8,
      asset: require("../assets/barImage/wreath.png"),
      objName: "wreath",
    },
    { id: 9, asset: require("../assets/barImage/bell.png"), objName: "bell" },
    {
      id: 10,
      asset: require("../assets/barImage/plate.png"),
      objName: "plate",
    },
    {
      id: 11,
      asset: require("../assets/barImage/table.png"),
      objName: "table",
    },
    {
      id: 12,
      asset: require("../assets/barImage/wreath.png"),
      objName: "wreath",
    },
  ];
  images.forEach((image) => {
    image.asset = Asset.fromModule(image.asset).uri;
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // 직접 pan 값을 업데이트
        if (gestureState.dy > 0) {
          // 오직 아래로 드래그할 때만 반응
          pan.setValue({ x: 0, y: gestureState.dy });
        } // y 값은 0 이상으로 제한
      },

      onPanResponderRelease: () => {
        if (pan.y._value > 200) {
          // 일정 거리 이상 드래그하면 모달 닫기
          Animated.timing(pan, {
            toValue: { x: 0, y: pan.y._value + screenHeight }, // 화면 아래로 내려가도록
            duration: 5000,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 }); // pan 위치 초기화
          });
          setModalVisible(false);
        } else {
          // 드래그 종료 후 원래 위치로 복귀
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // return (
  //   <View style={styles.container}>
  //     <Button title="Show Images" onPress={toggleModal} />

  //     <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
  //     <Animated.View
  //         style={[styles.modalContent, { transform: pan.getTranslateTransform() }]}
  //         {...panResponder.panHandlers}
  //       >
  //           <View {...panResponder.panHandlers} style={styles.draggableBar} />
  //         <ScrollView>

  //         </ScrollView>
  //         <Button title="Go Back" onPress={() => navigation.goBack()} />
  //       </Animated.View>
  //     </Modal>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Button title="Show Images" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        backdropOpacity={0}
      >
        <Animated.View
          style={[
            styles.modalContent,
            { transform: pan.getTranslateTransform() },
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.draggableBar} />
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
          />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </Animated.View>
      </Modal>
    </View>
  );

  // return (
  //   <View {...panResponder.panHandlers} style={styles.container}>
  //     <Button title="Show Images" onPress={toggleModal} />

  //     <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
  //       <View style={styles.modalContent}>
  //         <ScrollView>
  //           {images.map(image => (
  //             <Image key={image.id} source={{ uri: image.asset }} style={styles.image} />
  //           ))}
  //         </ScrollView>
  //         <Button title="Go Back" onPress={() => navigation.goBack()} />
  //       </View>
  //     </Modal>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: imageMargin,
    width: imageWidth - 15,
    height: imageWidth - 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  selectedImage: {
    borderColor: "red", // 선택된 이미지에 붉은색 테두리 적용
    borderWidth: 2,
    borderRadius: 10,
    tintColor: "rgba(255, 0, 0, 0.5)", // 틴트 효과 적용
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경 색상 설정
  },
  modalContent: {
    backgroundColor: "darkgrey",
    padding: modalContentPadding,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 5,
    alignItems: "center", // 추가: 모달 내용을 중앙에 정렬
  },
  draggableBar: {
    backgroundColor: "grey",
    height: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: "20%",
    marginTop: 10,
  },
});

export default ImageSlideUpPanel;
