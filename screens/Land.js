import React from "react";
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import TempLand from "../components/TempLand";

const Land = ({ navigation }) => {
  const goToFriendsSelect = () => {
    navigation.navigate("FriendSelect");
  };
  const goToLandDetail = () => {
    navigation.navigate("LandDetail");
  };
  return (
    <Container>
      <TouchableOpacity onPress={goToLandDetail}></TouchableOpacity>
      <TempLand />
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
