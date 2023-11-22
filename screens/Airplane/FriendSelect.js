import React from "react";
import { Container, HeaderRightText } from "../../components/Shared";
import FriendsNav from "../../navigators/FriendsNav";
import styled from "styled-components/native";

const FriendSelect = () => {
  return (
    <Container>
      <TitleContainer>
        <Title style={{ color: "white" }}>
          Whose land do you want to visit?
        </Title>
      </TitleContainer>
      <FriendsNav />
    </Container>
  );
};

const TitleContainer = styled.View`
  margin-top: 120px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: "JostSemiBold";
  font-size: 18px;
`;

export default FriendSelect;
