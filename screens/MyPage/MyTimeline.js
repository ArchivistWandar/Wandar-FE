import React, { useState } from "react";
import styled from "styled-components/native";
import {
  Container,
  LoadingContainer,
  formatDate,
} from "../../components/Shared";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Skeleton } from "moti/skeleton";

const MY_PAGE = gql`
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
      }
      lands {
        landname
      }
      lastUpdate
    }
  }
`;

const MyTimeline = () => {
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

  // Extract timeline data from query response
  const timelineData = [...data.seeMypage.records].sort(
    (a, b) => new Date(parseInt(b.createdAt)) - new Date(parseInt(a.createdAt))
  );

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          padding: 16, // Adjust this value as needed
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            {/* Display first photo from each record */}
            {item.photos && item.photos.length > 0 && (
              <NotificationBox>
                <LeftContent>
                  {loadingImages[item.id] && (
                    <Skeleton
                      colorMode="light"
                      width={50}
                      height={50}
                      radius={6}
                    />
                  )}
                  <PostImage
                    source={{ uri: item.photos[0].photo }}
                    style={
                      loadingImages[item.id]
                        ? { position: "absolute", opacity: 0 }
                        : {}
                    }
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoadEnd={() => handleImageLoadEnd(item.id)}
                  />
                </LeftContent>
                <RightContent record={true}>
                  <NotificationText>New Wandar Record</NotificationText>
                  {item.title ? <LandNames>{item.title}</LandNames> : null}
                  <DateText>{formatDate(item.createdAt)}</DateText>
                </RightContent>
              </NotificationBox>
            )}

            {/* Logic for posts and lands can be added here if needed */}
          </TimelineItem>
        ))}
      </ScrollView>
    </Container>
  );
};

const TimelineItem = styled.View`
  margin-bottom: 20px;
`;

const NotificationBox = styled.View`
  flex-direction: row;
  border-color: transparent;
  background-color: white;
  border-radius: 10px;
  height: 66px;
  position: relative;
`;

const LeftContent = styled.View`
  flex: 1;
  padding-left: 10px;
  /* align-items: center; */
  justify-content: center;
`;
const PostImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;
const RightContent = styled.View`
  flex: 6;
  justify-content: center;
  padding-left: 15px;
`;

const NotificationText = styled.Text`
  font-size: 14px;
  font-family: "JostBoldItalic";
  color: black;
`;

const LandNames = styled.Text`
  font-size: 14px;
  color: grey;
  font-family: "JostMedium";
`;

const DateText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: black;
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

export default MyTimeline;
