import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { Container, LoadingContainer } from "../components/Shared";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { Skeleton } from "moti/skeleton";
import { colors } from "../colors";

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
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, refetch } = useQuery(SEE_NOTIFICATIONS_QUERY);
  const [imageLoading, setImageLoading] = useState({});
  const [avatarLoading, setAvatarLoading] = useState({});

  const goToFollowRequests = () => {
    navigation.navigate("FollowRequests");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleImageLoadStart = (id) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleAvatarLoadStart = (id) => {
    setAvatarLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleAvatarLoadEnd = (id) => {
    setAvatarLoading((prev) => ({ ...prev, [id]: false }));
  };

  const renderItem = ({ item }) => {
    const { type, content } = item;
    const imageId = `${type}-${content.createdAt}`; // Unique ID for each image
    const avatarId = `avatar-${content.user.username}-${content.createdAt}`;

    switch (type) {
      case "posts":
        return (
          <NotificationItem>
            {avatarLoading[avatarId] && (
              <Skeleton colorMode="dark" width={50} height={50} radius={25} />
            )}
            <ProfileImage
              source={
                content.user.avatar
                  ? { uri: content.user.avatar }
                  : require("./../assets/images/profile8.png")
              }
              style={
                avatarLoading[avatarId]
                  ? { position: "absolute", opacity: 0 }
                  : {}
              }
              onLoadStart={() => handleAvatarLoadStart(avatarId)}
              onLoadEnd={() => handleAvatarLoadEnd(avatarId)}
            />
            <NotificationText>
              <Username>{content.user.username}</Username> uploaded a new post.
            </NotificationText>
            {imageLoading[imageId] && (
              <Skeleton colorMode="dark" width={60} height={60} radius={10} />
            )}
            <PostImage
              source={{ uri: content.photos[0].photo }}
              style={
                imageLoading[imageId]
                  ? { position: "absolute", opacity: 0 }
                  : {}
              }
              onLoadStart={() => handleImageLoadStart(imageId)}
              onLoadEnd={() => handleImageLoadEnd(imageId)}
            />
          </NotificationItem>
        );
      case "records":
        return (
          <NotificationItem>
            {avatarLoading[avatarId] && (
              <Skeleton colorMode="dark" width={50} height={50} radius={25} />
            )}
            <ProfileImage
              source={
                content.user.avatar
                  ? { uri: content.user.avatar }
                  : require("./../assets/images/profile8.png")
              }
              style={
                avatarLoading[avatarId]
                  ? { position: "absolute", opacity: 0 }
                  : {}
              }
              onLoadStart={() => handleAvatarLoadStart(avatarId)}
              onLoadEnd={() => handleAvatarLoadEnd(avatarId)}
            />
            <NotificationText>
              <Username>{content.user.username}</Username> uploaded a new
              Record.
            </NotificationText>
            {imageLoading[imageId] && (
              <Skeleton colorMode="dark" width={60} height={60} radius={10} />
            )}
            <PostImage
              source={{ uri: content.photos[0].photo }}
              style={
                imageLoading[imageId]
                  ? { position: "absolute", opacity: 0 }
                  : {}
              }
              onLoadStart={() => handleImageLoadStart(imageId)}
              onLoadEnd={() => handleImageLoadEnd(imageId)}
            />
          </NotificationItem>
        );
      case "lands":
        return (
          <NotificationItem>
            {avatarLoading[avatarId] && (
              <Skeleton colorMode="dark" width={50} height={50} radius={25} />
            )}
            <ProfileImage
              source={
                content.user.avatar
                  ? { uri: content.user.avatar }
                  : require("./../assets/images/profile8.png")
              }
              style={
                avatarLoading[avatarId]
                  ? { position: "absolute", opacity: 0 }
                  : {}
              }
              onLoadStart={() => handleAvatarLoadStart(avatarId)}
              onLoadEnd={() => handleAvatarLoadEnd(avatarId)}
            />
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
            }}
          >
            <Ionicons name="person-add" size={24} color={"white"} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <NotificationText style={{ marginLeft: "12%" }}>
              <Username>Follow requests</Username>
            </NotificationText>
            <NotificationText style={{ color: "grey", marginLeft: "12%" }}>
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
    return (
      <LoadingContainer>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "JostMedium",
          }}
        >
          Error! {error.message}
        </Text>
      </LoadingContainer>
    );
  }

  if (data?.seeNotifications && data.seeNotifications.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: colors.backgroundColor }}
      >
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
              }}
            >
              <Ionicons name="person-add" size={24} color={"white"} />
            </View>
            <View style={{ flexDirection: "column" }}>
              <NotificationText style={{ marginLeft: "12%" }}>
                <Username>Follow requests</Username>
              </NotificationText>
              <NotificationText style={{ color: "grey", marginLeft: "12%" }}>
                Approve or ignore requests
              </NotificationText>
            </View>
          </TouchableOpacity>
          <View
            style={{ borderColor: "rgba(255,255,255, 0.1)", borderTopWidth: 1 }}
          ></View>
          <LoadingContainer>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "JostMedium",
              }}
            >
              Nothing to show
            </Text>
          </LoadingContainer>
        </Container>
      </ScrollView>
    );
  }

  // 알림 데이터를 배열로 변환하고 최신순으로 정렬
  const notifications =
    data && data.seeNotifications
      ? data.seeNotifications
          .flatMap((notification) => [
            ...notification.posts.map((post) => ({
              type: "posts",
              content: post,
            })),
            ...notification.lands.map((land) => ({
              type: "lands",
              content: land,
            })),
            ...notification.records.map((record) => ({
              type: "records",
              content: record,
            })),
          ])
          .sort(
            (a, b) => Number(b.content.createdAt) - Number(a.content.createdAt)
          )
      : []; // Default to an empty array if data.seeNotifications is null

  return (
    <Container>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
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
                }}
              >
                <Ionicons name="person-add" size={24} color={"white"} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <NotificationText style={{ marginLeft: "12%" }}>
                  <Username>Follow requests</Username>
                </NotificationText>
                <NotificationText style={{ color: "grey", marginLeft: "12%" }}>
                  Approve or ignore requests
                </NotificationText>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderColor: "rgba(255,255,255, 0.1)",
                borderTopWidth: 1,
              }}
            ></View>
          </>
        }
        ListFooterComponent={<View style={{ height: 100 }} />} // Optional: Footer for extra spacing
      />
    </Container>
  );
};

const NotificationItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 25px 20px 0px 20px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const NotificationText = styled.Text`
  flex: 1;
  font-family: "JostMedium";
  color: white;
  font-size: 13px;
  margin-left: 5%;
  margin-right: 15px;
`;

const Username = styled.Text`
  font-family: "JostBold";
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const Landname = styled.Text`
  font-family: "JostBold";
`;

export default Notifications;
