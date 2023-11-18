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

const MY_PAGE = gql`
  query SeeMypage {
    seeMypage {
      username
      email
      avatar
      totalFriends
      records {
        photos {
          photo
        }
      }
      posts {
        photos {
          photo
        }
      }
      lands {
        landname
      }
      lastUpdate
    }
  }
`;

const MyPage = ({ navigation }) => {
  const client = useApolloClient();
  const { data, loading, refetch } = useQuery(MY_PAGE, {
    fetchPolicy: "network-only",
  });

  // Extract the necessary data
  const myInfoProps = {
    username: data?.seeMypage?.username,
    avatar: data?.seeMypage?.avatar,
    email: data?.seeMypage?.email,
    totalFriends: data?.seeMypage?.totalFriends,
    loading,
  };

  const myPageTabNavProps = {
    records: data?.seeMypage?.records,
    posts: data?.seeMypage?.posts,
    lands: data?.seeMypage?.lands,
    lastUpdate: data?.seeMypage?.lastUpdate,
  };

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
      <MyInfo {...myInfoProps} navigation={navigation} />
      <MyPageTabNav {...myPageTabNavProps} />
    </Container>
  );
};

export default MyPage;
