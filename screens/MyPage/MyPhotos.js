import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
  RefreshControl,
  Text,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Container, LoadingContainer } from "../../components/Shared";
import { currentUsernameVar } from "../../apollo";

const SEE_PHOTOS_QUERY = gql`
  query SeePhotos($username: String!) {
    seePhotos(username: $username) {
      photo
      isPublic
      post {
        id
      }
      record {
        id
      }
      isMine
      createdAt
    }
  }
`;

const MyPhotos = () => {
  const username = currentUsernameVar();
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, error, refetch } = useQuery(SEE_PHOTOS_QUERY, {
    variables: { username: username },
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading || !data?.seePhotos) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }
  if (data?.seePhotos.length === 0) {
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

  // Sort the photos by a timestamp field in descending order
  const sortedPhotos = data.seePhotos
    .flatMap((photo) => {
      let photos = [];
      if (photo.record && photo.record.id) {
        photos.push({
          ...photo,
          key: `record-${photo.record.id}`,
        });
      }
      if (photo.post && photo.post.id) {
        photos.push({
          ...photo,
          key: `post-${photo.post.id}`,
        });
      }
      return photos;
    })
    .sort(
      (a, b) =>
        new Date(parseInt(b.createdAt)) - new Date(parseInt(a.createdAt))
    );

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.photo }}
      style={{ width: width / numColumns, height: width / numColumns }}
      resizeMode="cover"
    />
  );

  return (
    <Container>
      <FlatList
        numColumns={numColumns}
        data={sortedPhotos}
        keyExtractor={(item) => item.key}
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

export default MyPhotos;
