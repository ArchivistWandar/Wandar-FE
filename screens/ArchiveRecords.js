import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container, LoadingContainer, formatDate } from "../components/Shared";
import { gql, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo";

const SEE_RECORD_QUERY = gql`
  query SeeRecord($username: String!) {
    seeRecord(username: $username) {
      photos {
        photo
      }
      id
      theme
      isMine
      isPublic
      createdAt
      title
    }
  }
`;

const ArchiveRecords = ({ navigation }) => {
  const { data, loading, error, refetch } = useQuery(SEE_RECORD_QUERY, {
    variables: { username: currentUsernameVar() }, // replace with actual username
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  const postData = data.seeRecord
    .map((record) => ({
      id: record.id,
      title: record.title,
      date: formatDate(record.createdAt),
      photoCount: record.photos.length,
      isPrivate: !record.isPublic,
      image: { uri: record.photos[0].photo },
      timestamp: record.createdAt, // Save the original timestamp for sorting
    }))
    .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)); // Sort by timestamp in descending order

  const goToRecordDetail = (id) => {
    navigation.navigate("RecordDetail", { id });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => goToRecordDetail(item.id)}>
        <PostItem>
          <PostImage source={item.image} />
          <PostDetails>
            <PostTitle>{item.title}</PostTitle>
            <PostDate>{item.date}</PostDate>
            <PhotoCount>{item.photoCount} photos</PhotoCount>
          </PostDetails>
          {item.isPrivate ? (
            <Ionicons name="lock-closed" size={20} color={"white"} />
          ) : (
            <Ionicons name="people" size={20} color={"white"} />
          )}
        </PostItem>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id}
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

const PostItem = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px; /* Add border line */
  border-color: #717171; /* Border color */
  padding: 22px; /* Add some padding to separate items */
`;

const PostImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 22px;
`;

const PostDetails = styled.View`
  flex: 1;
`;

const PostTitle = styled.Text`
  font-size: 15px;
  font-family: "JostBold";
  margin-bottom: 4px;
  color: white;
`;

const PostDate = styled.Text`
  font-family: "JostMedium";
  font-size: 12px;
  color: #bbb;
  margin-bottom: 4px;
`;

const PhotoCount = styled.Text`
  font-family: "JostMedium";
  font-size: 12px;
  color: white;
`;

export default ArchiveRecords;
