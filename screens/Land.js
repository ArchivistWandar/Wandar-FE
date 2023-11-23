import React, { useState } from "react";
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import TempLand from "../components/TempLand";
import { Ionicons } from "@expo/vector-icons";
import ImageSlideUpPanel from "../components/SlideUpModal";
import { useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import MovingBackground from "../components/landMovingBackground";


const Land = ({ navigation }) => {
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(null);
  const goToFriendsSelect = () => {
    navigation.navigate("FriendSelect");
  };
  const goToLandDetail = () => {
    navigation.navigate("LandDetail");
  };
  const goToLandAdd = () => {
    navigation.navigate("LandAdd");
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
      <ImageSlideUpPanel />
      <TempLand selectedImage={selectedImage} />
      <MovingBackground />


      <PlaneButton onPress={goToFriendsSelect}>
        <PlaneImage source={require("../assets/images/planeButton.png")} />
      </PlaneButton>
      <LandAddButton onPress={goToLandAdd}>
        <Ionicons name="add" size={40} color="#fff" />
      </LandAddButton>
    </Container>
  );
};

const PlaneButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 12%;
  right: 20px;
`;

const PlaneImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const LandAddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 12%;
  left: 20px;
`;
export default Land;
