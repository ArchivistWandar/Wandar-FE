import React, { useEffect, useState } from "react";
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import TempLand from "../components/TempLand";
import Bell from "../Bell-b-christmas.jsx";
import ImageSlideUpPanel from "../components/SlideUpModal.js";
import { useRoute } from '@react-navigation/native';
import SelectedImageComponent from "../components/object.js";

const Land = ({ navigation }) => {
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(null);
  const goToFriendsSelect = () => {
    navigation.navigate("FriendSelect");
  };
  const goToLandDetail = () => {
    navigation.navigate("LandDetail");
  };
  const handleGoBack = () => {
    navigation.goBack(); // 이전 화면으로 돌아감
  };
  useEffect(() => {
    if (route.params?.selectedImage) {
      // 전달된 selectedImage 파라미터가 있으면 상태 업데이트
      setSelectedImage(route.params.selectedImage);

    }
  }, [route.params]);

  return (
    <Container>
      <TouchableOpacity onPress={goToLandDetail}></TouchableOpacity>
      <TempLand selectedImage={selectedImage} />
      <ImageSlideUpPanel />
      <PlaneButton onPress={goToFriendsSelect}>
        <PlaneImage source={require("../assets/images/planeButton.png")} />
      </PlaneButton>
    </Container>
  );
};

const RealLand = styled.View`
  margin: 100px;
  width: 50px;
  height: 50px;
  background-color: grey;
`;

const PlaneButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const PlaneImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export default Land;
