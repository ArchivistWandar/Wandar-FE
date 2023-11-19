import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { Container, LoadingContainer } from "../components/Shared";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";

const SEE_NOTIFICATIONS_QUERY = gql`
  query SeeNotifications {
    seeNotifications {
      posts {
        photos {
          photo
        }
        user {
          username
          avatar
        }
        createdAt
      }
      lands {
        user {
          username
          avatar
        }
        landname
        createdAt
      }
      records {
        photos {
          photo
        }
        user {
          username
          avatar
        }
        createdAt
      }
    }
  }
`;

const Notifications = ({ navigation }) => {
  const { data, loading, error } = useQuery(SEE_NOTIFICATIONS_QUERY);

  const goToFollowRequests = () => {
    navigation.navigate("FollowRequests");
  };

  const renderItem = ({ item }) => {
    const { type, content } = item;

    switch (type) {
      case "posts":
        return (
          <NotificationItem>
            <ProfileImage source={{ uri: content.user.avatar }} />
            <NotificationText>
              <Username>{content.user.username}</Username> uploaded a new post.
            </NotificationText>
            <PostImage source={{ uri: content.photos[0].photo }} />
          </NotificationItem>
        );
      case "records":
        return (
          <NotificationItem>
            <ProfileImage source={{ uri: content.user.avatar }} />
            <NotificationText>
              <Username>{content.user.username}</Username> uploaded a new
              Record.
            </NotificationText>
            <PostImage source={{ uri: content.photos[0].photo }} />
          </NotificationItem>
        );
      case "lands":
        return (
          <NotificationItem>
            <ProfileImage source={{ uri: content.user.avatar }} />
            <NotificationText>
              <Username>{content.user.username}</Username> created a new land{" "}
              <Landname>{content.landname}</Landname>.
            </NotificationText>
          </NotificationItem>
        );
      default:
        return null;
    }
  };

  // 데이터를 불러오는 중이거나 에러가 발생한 경우에 대한 처리
  if (loading) {
    return (
      <Container>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={goToFollowRequests}
        >
          <View
            style={{
              margin: 5,
              alignItems: "center",
              marginLeft: 10,
              marginRight: 30,
            }}
          >
            <Ionicons name="person-add" size={24} color={"white"} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <NotificationText>
              <Username>Follow requests</Username>
            </NotificationText>
            <NotificationText style={{ color: "grey" }}>
              Approve or ignore requests
            </NotificationText>
          </View>
        </TouchableOpacity>
        <View
          style={{ borderColor: "rgba(255,255,255, 0.1)", borderTopWidth: 1 }}
        ></View>
        <LoadingContainer>
          <ActivityIndicator size={"small"} color={"white"} />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // 알림 데이터를 배열로 변환하고 최신순으로 정렬
  const notifications = data.seeNotifications
    .flatMap((notification) => [
      ...notification.posts.map((post) => ({ type: "posts", content: post })),
      ...notification.lands.map((land) => ({ type: "lands", content: land })),
      ...notification.records.map((record) => ({
        type: "records",
        content: record,
      })),
    ])
    .sort((a, b) => Number(b.content.createdAt) - Number(a.content.createdAt));

  return (
    <Container>
      <TouchableOpacity
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={goToFollowRequests}
      >
        <View
          style={{
            margin: 5,
            alignItems: "center",
            marginLeft: 10,
            marginRight: 30,
          }}
        >
          <Ionicons name="person-add" size={24} color={"white"} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <NotificationText>
            <Username>Follow requests</Username>
          </NotificationText>
          <NotificationText style={{ color: "grey" }}>
            Approve or ignore requests
          </NotificationText>
        </View>
      </TouchableOpacity>
      <View
        style={{ borderColor: "rgba(255,255,255, 0.1)", borderTopWidth: 1 }}
      ></View>
      <NotificationList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </Container>
  );
};

const NotificationList = styled(FlatList)`
  flex: 1;
  margin: 20px;
`;

const NotificationItem = styled.TouchableOpacity`
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
