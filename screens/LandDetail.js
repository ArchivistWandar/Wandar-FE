import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const LandDetail = ({ navigation }) => {
  const goToLandArchiveNav = () => navigation.navigate("LandArchiveNav");
  return (
    <Container>
      <Header>
        <Left>
          <LandTitle>Jeju 🍊</LandTitle>
          <Date>23.07.12~23.07.19</Date>
        </Left>
        <TouchableOpacity onPress={goToLandArchiveNav}>
          <Ionicons
            name="albums-outline"
            size={30}
            color="#fff"
            style={{ marginEnd: "5%" }}
          />
        </TouchableOpacity>
      </Header>
    </Container>
  );
};

const Header = styled.View`
  margin-top: 26%;
  justify-content: center;
  padding-left: 25px;
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
`;

const LandTitle = styled.Text`
  font-size: 24px;
  font-family: "JostBold";
  color: white;
`;

const Date = styled.Text`
  padding-top: 5px;
  font-size: 14px;
  font-family: "JostMediumItalic";
  color: white;
`;
export default LandDetail;
