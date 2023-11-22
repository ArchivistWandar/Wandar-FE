import React from "react";
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import TempLand from "../components/TempLand";
import { Ionicons } from "@expo/vector-icons";

const Land = ({ navigation }) => {
  const goToFriendsSelect = () => {
    navigation.navigate("FriendSelect");
  };
  const goToLandDetail = () => {
    navigation.navigate("LandDetail");
  };
  const goToLandAdd = () => {
    navigation.navigate("LandAdd");
  };
  return (
    <Container>
      <TouchableOpacity onPress={goToLandDetail}></TouchableOpacity>
      <TempLand />
      <PlaneButton onPress={goToFriendsSelect}>
        <PlaneImage source={require("../assets/images/planeButton.png")} />
      </PlaneButton>
      <LandAddButton onPress={goToLandAdd}>
        <Ionicons name="add" size={40} color="#fff" />
      </LandAddButton>
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
