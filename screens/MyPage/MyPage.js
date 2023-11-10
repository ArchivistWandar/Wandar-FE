import React from "react";
import { Container } from "../../components/Shared";
import MyPageTabNav from "../../navigators/MyPageTabNav";
import MyInfo from "./MyInfo";
import { logUserOut } from "../../apollo";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyPage = ({ navigation }) => {
  const HeaderRight = () => (
    <TouchableOpacity onPress={() => logUserOut()}>
      <Ionicons
        name="log-out-outline"
        size={30}
        color="#fff"
        style={{ marginRight: "5%" }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  });

  return (
    <Container>
      <MyInfo navigation={navigation} />
      <MyPageTabNav />
    </Container>
  );
};

export default MyPage;
