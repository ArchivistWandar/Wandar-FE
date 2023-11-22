import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container, LoadingContainer, formatDate } from "../components/Shared";
import { gql, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo";

const SEE_POSTS_QUERY = gql`
  query SeePosts($username: String!) {
    seePosts(username: $username) {
      land {
        landname
      }
      photos {
        photo
      }
      user {
        username
      }
      isMine
      isPublic
      caption
      createdAt
      title
      id
    }
  }
`;

const ArchivePosts = ({ navigation }) => {
  const { data, loading, error, refetch } = useQuery(SEE_POSTS_QUERY, {
    variables: { username: currentUsernameVar() }, // Replace with the appropriate username
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goToPostDetail = (id) => {
    navigation.navigate("PostDetail", { id });
  };

  const sortedPosts = data?.seePosts
    .map((post) => ({
      ...post,
      createdAtTimestamp: new Date(parseInt(post.createdAt)).getTime(), // Convert createdAt to a timestamp
    }))
    .sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp); // Sort by createdAt in descending order

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => goToPostDetail(item.id)}>
        <PostItem>
          <PostImage source={{ uri: item.photos[0].photo }} />
          <PostDetails>
            <LandName>{item.land.landname}</LandName>
            <DateAndPrivacy>
              <DateText numberOfLines={1}>{item.title}</DateText>
              {item.isPublic ? (
                <IconContainer>
                  <Ionicons name="people" size={15} color={"white"} />
                </IconContainer>
              ) : (
                <IconContainer>
                  <Ionicons name="lock-closed" size={15} color={"white"} />
                </IconContainer>
              )}
            </DateAndPrivacy>
            <Contents numberOfLines={2}>{item.caption}</Contents>
          </PostDetails>
        </PostItem>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  if (error)
    return (
      <Container>
        <Text>Error: {error.message}</Text>
      </Container>
    );
  if (data?.seePosts.length === 0) {
    return (
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
    );
  }

  return (
    <Container>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.createdAt} // Use a unique identifier from the item
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      />
    </Container>
  );
};

const IconContainer = styled.View`
  padding-left: 10px; /* Add left padding */
`;

const PostItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px; /* Add border line */
  border-color: rgba(255, 255, 255, 0.1); /* Border color */
`;

const PostImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin-right: 15px;
`;

const PostDetails = styled.View`
  flex: 1;
`;

const LandName = styled.Text`
  font-family: "JostMedium";
  font-size: 13px;
  margin-bottom: 4px;
  color: #939393;
`;

const DateAndPrivacy = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const DateText = styled.Text`
  font-size: 15px;
  font-family: "JostBold";
  margin-bottom: 4px;
  color: white;
  max-width: 95%;
  max-height: 25px;
  overflow: hidden;
`;

const Contents = styled.Text`
  font-family: "JostMedium";
  font-size: 12px;
  color: #bbb;
  margin-bottom: 4px;
  max-height: 40px;
  overflow: hidden;
`;

export default ArchivePosts;
