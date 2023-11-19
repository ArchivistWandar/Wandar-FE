import React from "react";
import { Container } from "../../components/Shared";
import MyPageTabNav from "../../navigators/MyPageTabNav";
import MyInfo from "./MyInfo";
import { logUserOut } from "../../apollo";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { Alert } from "react-native";

const MyPage = ({ navigation }) => {
  const client = useApolloClient();

  const confirmLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => logUserOut(client),
      },
    ]);
  };

  const HeaderRight = () => (
    <TouchableOpacity onPress={confirmLogOut}>
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
