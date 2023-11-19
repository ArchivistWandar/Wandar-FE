import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { gql, useQuery } from "@apollo/client";

const SEE_MY_INFO_QUERY = gql`
  query SeeMyInfo {
    seeMyInfo {
      username
      avatar
      totalFriends
    }
  }
`;

const defaultAvatar = require("../../assets/images/profile8.png");

const MyInfo = ({ navigation }) => {
  const { data, loading, error } = useQuery(SEE_MY_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <UserInfoBox>
        <UserInfoContainer>
          <View style={{ marginRight: "7%" }}>
            <Skeleton
              colorMode={"light"}
              radius="round"
              height={50}
              width={50}
            />
          </View>
          <UserDetails>
            <View style={{ marginBottom: "4%" }}>
              <Skeleton
                width={80}
                height={16}
                colorMode={"light"}
                radius={"round"}
              />
            </View>
            <Skeleton
              width={60}
              height={14}
              colorMode={"light"}
              radius={"round"}
            />
          </UserDetails>
        </UserInfoContainer>
      </UserInfoBox>
    );
  }

  const { username, avatar, totalFriends } = data.seeMyInfo;

  const goToMyInfoEdit = () => {
    navigation.navigate("MyInfoEdit");
  };

  return (
    <UserInfoBox>
      <UserInfoContainer>
        <ProfileImage
          source={avatar === null ? defaultAvatar : { uri: avatar }}
        />

        <UserDetails>
          <Username>@{username}</Username>

          <FriendsNum>{totalFriends} friends</FriendsNum>
        </UserDetails>
        <TouchableOpacity onPress={goToMyInfoEdit}>
          <Ionicons name="pencil" size={20} color={"white"} />
        </TouchableOpacity>
      </UserInfoContainer>
    </UserInfoBox>
  );
};

const UserInfoBox = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

const UserInfoContainer = styled.View`
  width: 90%;
  height: 70px;
  border-radius: 35px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px);
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 22px;
`;

const UserDetails = styled.View`
  flex: 1;
`;

const Username = styled.Text`
  font-size: 15px;
  font-family: "JostBold";
  margin-bottom: 3px;
  color: white;
`;

const FriendsNum = styled.Text`
  font-family: "JostMedium";
  font-size: 13px;
  color: #bbb;
  margin-bottom: 2px;
`;

export default MyInfo;
