import React from "react";
import { Container } from "../../components/Shared";
import MyPageTabNav from "../../navigators/MyPageTabNav";
import MyInfo from "./MyInfo";

const MyPage = ({ navigation }) => {
  return (
    <Container>
      <MyInfo navigation={navigation} />
      <MyPageTabNav />
    </Container>
  );
};

export default MyPage;
