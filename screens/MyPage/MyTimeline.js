import React, { useState } from "react";
import styled from "styled-components/native";
import {
  Container,
  LoadingContainer,
  formatDate,
} from "../../components/Shared";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Skeleton } from "moti/skeleton";

export const MY_PAGE = gql`
  query SeeMypage {
    seeMypage {
      records {
        photos {
          photo
        }
        createdAt
        title
        id
      }
      posts {
        photos {
          photo
        }
        createdAt
        title
        id
        land {
          landname
        }
      }
      lands {
        landname
        createdAt
      }
      lastUpdate
    }
  }
`;

const MyTimeline = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const { data, loading, refetch, error } = useQuery(MY_PAGE, {
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleImageLoadStart = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <Text>Error: {error.message}</Text>
      </LoadingContainer>
    );
  }
  if (
    data?.seeMypage.posts.length === 0 &&
    data?.seeMypage.records.length === 0
  ) {
    return (
      <LoadingContainer>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "JostMedium",
            paddingBottom: 100,
          }}
        >
          Nothing to show
        </Text>
      </LoadingContainer>
    );
  }

  // Extract timeline data from query response
  const timelineData = [];
  if (data && data.seeMypage) {
    timelineData.push(
      ...data.seeMypage.records.map((record) => ({ ...record, type: "record" }))
    );
    timelineData.push(
      ...data.seeMypage.posts.map((post) => ({ ...post, type: "post" }))
    );
    // Add "start" event here if applicable
  }

  timelineData.sort(
    (a, b) => new Date(parseInt(b.createdAt)) - new Date(parseInt(a.createdAt))
  );

  const navigateToDetail = (item) => {
    if (item.type === "record" && item.id) {
      navigation.navigate("RecordDetail", { id: item.id });
    } else if (item.type === "post" && item.id) {
      navigation.navigate("PostDetail", { id: item.id });
    }
  };
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            {item.type === "record" && (
              <NotificationBox onPress={() => navigateToDetail(item)}>
                <View style={{ position: "relative" }}>
                  {loadingImages[item.id] && (
                    <Skeleton
                      colorMode="light"
                      width={40}
                      height={40}
                      radius={6}
                    />
                  )}
                  <PostImage
                    source={{ uri: item.photos[0].photo }}
                    style={loadingImages[item.id] ? { opacity: 0 } : {}}
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoadEnd={() => handleImageLoadEnd(item.id)}
                  />
                </View>
                <LeftContent>
                  <NotificationText>New Wandar Record</NotificationText>
                  {item.title && <LandNames>{item.title}</LandNames>}
                </LeftContent>
                <DateText>{formatDate(item.createdAt)}</DateText>
              </NotificationBox>
            )}

            {item.type === "post" && (
              <NotificationBox
                post={true}
                onPress={() => navigateToDetail(item)}
              >
                <View style={{ position: "relative" }}>
                  {loadingImages[item.id] && (
                    <Skeleton
                      colorMode="dark"
                      width={40}
                      height={40}
                      radius={6}
                    />
                  )}
                  <PostImage
                    post={true}
                    source={{ uri: item.photos[0].photo }} // Replace with actual photo uri
                    style={loadingImages[item.id] ? { opacity: 0 } : {}}
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoadEnd={() => handleImageLoadEnd(item.id)}
                  />
                </View>
                <LeftContent>
                  <NotificationText post={true}>New post</NotificationText>
                  <LandName post={true}>in Land {item.land.landname}</LandName>
                </LeftContent>
                <DateText post={true}>{formatDate(item.createdAt)}</DateText>
              </NotificationBox>
            )}

            {/* {item.type === "start" && (
              <NotificationBox>
                <LeftContent>
                  <PostImage
                    source={require("../../assets/logo.png")}
                    resizeMode="contain"
                  />
                </LeftContent>
                <RightContent>
                  <NotificationText>Started Wandar</NotificationText>
                  <DateText>{formatDate(item.createdAt)}</DateText>
                </RightContent>
              </NotificationBox>
            )} */}

            {/* Additional types can be added here */}
          </TimelineItem>
        ))}
        <View style={{ paddingBottom: 100 }} />
      </ScrollView>
    </Container>
  );
};

const TimelineItem = styled.View`
  /* margin-bottom: 20px; */
  margin: 20px 20px 0px 20px;
`;

const NotificationBox = styled.TouchableOpacity`
  flex-direction: row;
  border-width: 1px;
  border-color: ${(props) => (props.post ? "white" : "transparent")};
  background-color: ${(props) => (props.post ? "transparent" : "white")};
  border-radius: 10px;
  height: 60px;
  padding: 9px;
`;

const LeftContent = styled.View`
  margin-left: 10px;
`;
const PostImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const NotificationText = styled.Text`
  font-size: 14px;
  font-family: "JostBoldItalic";
  color: ${(props) => (props.post ? "white" : "black")};
`;

const LandNames = styled.Text`
  font-size: 12px;
  color: grey;
  font-family: "JostMedium";
`;

const DateText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: ${(props) => (props.post ? "white" : "black")};
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

const LandName = styled.Text`
  font-size: 12px;
  color: grey;
  font-family: "JostMedium";
`;

export default MyTimeline;
