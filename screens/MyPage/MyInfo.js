import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

const MyInfo = ({ navigation, username, avatar, totalFriends, loading }) => {
  const goToMyInfoEdit = () => {
    navigation.navigate("MyInfoEdit");
  };

  return (
    <UserInfoBox>
      <UserInfoContainer>
        {!loading ? (
          <ProfileImage source={{ uri: avatar }} />
        ) : (
          <View style={{ marginRight: "7%" }}>
            <Skeleton
              colorMode={"light"}
              radius="round"
              height={50}
              width={50}
            />
          </View>
        )}
        <UserDetails>
          {!loading ? (
            <Username>@{username}</Username>
          ) : (
            <View style={{ marginBottom: "4%" }}>
              <Skeleton
                width={80}
                height={16}
                colorMode={"light"}
                radius={"round"}
              />
            </View>
          )}
          {!loading ? (
            <FriendsNum>{totalFriends} friends</FriendsNum>
          ) : (
            <Skeleton
              width={60}
              height={14}
              colorMode={"light"}
              radius={"round"}
            />
          )}
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
