import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../../components/Shared";

const userData = {
  id: "1",
  username: "hyeinlee.le",
  profileImage: require("../../assets/images/profile4.png"),
  friendsNum: "28",
};

const MyInfo = () => {
  return (
    <UserInfoBox>
      <UserInfoContainer>
        <ProfileImage source={userData.profileImage} />
        <UserDetails>
          <Username>@{userData.username}</Username>
          <FriendsNum>{userData.friendsNum} friends</FriendsNum>
        </UserDetails>
        <Ionicons name="pencil" size={20} color={"white"} />
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
