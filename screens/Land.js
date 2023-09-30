import React from "react";
import { Container } from "../components/Shared";
import styled from "styled-components/native";

const Land = ({ navigation }) => {
  const goToFriendSelect = () => {
    navigation.navigate("FriendSelect");
  };
  return (
    <Container>
      <PlaneButton onPress={goToFriendSelect}>
        <PlaneImage source={require("../assets/images/planeButton.png")} />
      </PlaneButton>
    </Container>
  );
};

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
