import React from "react";
import { Text } from "react-native";
import { Container } from "../../components/Shared";
import MyPageNav from "../../navigators/MyPageNav";
import MyInfo from "./MyInfo";

const MyPage = () => {
  return (
    <Container>
      <MyInfo />
      <MyPageNav />
    </Container>
  );
};

export default MyPage;
