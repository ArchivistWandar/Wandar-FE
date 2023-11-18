import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
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
    }
  }
`;

const MyPhotos = () => {
  const username = currentUsernameVar();
  const numColumns = 3;
  const { width } = useWindowDimensions();

  const { data, loading, error } = useQuery(SEE_PHOTOS_QUERY, {
    variables: { username: username },
    fetchPolicy: "network-only",
  });

  // Display loading container until all photos are loaded
  if (loading || !data?.seePhotos) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  const photos = data.seePhotos.map((photo) => ({
    ...photo,
    key: photo.record.id.toString(),
  }));

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
        data={photos}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default MyPhotos;
