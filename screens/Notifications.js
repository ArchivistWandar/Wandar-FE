import React from "react";
import { FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { Container } from "../components/Shared";
const notificationsData = [
  {
    id: "1",
    type: "post",
    username: "hyeinlee.leeeeeee",
    postImage: require("./../assets/post1.png"),
    profileImage: require("./../assets/profile1.png"),
  },
  {
    id: "2",
    type: "record",
    username: "iamlily",
    postImage: require("./../assets/record1.png"),
    profileImage: require("./../assets/profile2.png"),
  },
  {
    id: "3",
    type: "land",
    username: "dankim",
    landname: "Beach Paradise",
    profileImage: require("./../assets/profile3.png"),
  },
  {
    id: "4",
    type: "suggestion",
    text: "Find new friends",
    profileImage: require("./../assets/logo.png"),
  },
  {
    id: "5",
    type: "suggestion",
    text: "Upload Wandar Record & archive memories!",
    profileImage: require("./../assets/logo.png"),
  },
];

const Notifications = () => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "post":
        return (
          <NotificationItem>
            <ProfileImage source={item.profileImage} />
            <NotificationText>
              <Username>{item.username}</Username> uploaded a new post.
            </NotificationText>
            <PostImage source={item.postImage} />
          </NotificationItem>
        );
      case "record":
        return (
          <NotificationItem>
            <ProfileImage source={item.profileImage} />
            <NotificationText>
              <Username>{item.username}</Username> uploaded a new Record.
            </NotificationText>
            <PostImage source={item.postImage} />
          </NotificationItem>
        );
      case "land":
        return (
          <NotificationItem>
            <ProfileImage source={item.profileImage} />
            <NotificationText>
              <Username>{item.username}</Username> created a new land{" "}
              <Landname>{item.landname}</Landname>.
            </NotificationText>
          </NotificationItem>
        );
      case "suggestion":
        return (
          <NotificationItem>
            <ProfileImage source={item.profileImage} />
            <NotificationText>{item.text}</NotificationText>
          </NotificationItem>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <NotificationList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

const NotificationList = styled(FlatList)`
  flex: 1;
  margin: 20px;
`;

const NotificationItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const NotificationText = styled.Text`
  flex: 1;
  font-family: "JostMedium";
  color: white;
  font-size: 13px;
`;

const Username = styled.Text`
  font-family: "JostBold";
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-left: 10px;
`;

const Landname = styled.Text`
  font-family: "JostBold";
`;

export default Notifications;
