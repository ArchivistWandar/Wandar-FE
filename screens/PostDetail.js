import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { Container, LoadingContainer } from "../components/Shared";
import Collage from "../components/Collage";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation, useQuery } from "@apollo/client";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 50px;
`;

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($deletePostId: Int!) {
    deletePost(id: $deletePostId) {
      ok
      error
    }
  }
`;

const GET_POST_QUERY = gql`
  query GetPost($getPostId: Int!) {
    getPost(id: $getPostId) {
      photos {
        photo
      }
      land {
        landname
      }
      createdAt
      caption
      isMine
      isPublic
      title
    }
  }
`;

export default function PostDetail({ route, navigation }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [transformedPhotos, setTransformedPhotos] = useState([]);
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { getPostId: route.params.id },
  });

  // DeleteRecord
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION, {
    variables: { deletePostId: route.params.id },
    onCompleted: (response) => {
      setIsDeleting(false);
      if (response.deletePost.ok) {
        navigation.navigate("ArchivePosts");
      } else {
        alert("Failed to delete the post.");
      }
    },
    onError: (error) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deletePostMutation();
          setIsDeleting(true);
        },
      },
    ]);
  };

  useEffect(() => {
    if (data && data.getPost) {
      const { land, photos } = data.getPost;
      navigation.setOptions({
        headerTitle: () => (
          <Text
            style={{
              color: "white",
              fontFamily: "JostSemiBold",
              fontSize: 15,
            }}
          >
            {land.landname}
          </Text>
        ),
        headerRight: () =>
          isDeleting ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginRight: "10%" }}
            />
          ) : (
            <TouchableOpacity onPress={handleDelete}>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="white"
                style={{ marginRight: "5%" }}
              />
            </TouchableOpacity>
          ),
      });
      Promise.all(
        photos.map(
          (photo) =>
            new Promise((resolve) => {
              Image.getSize(photo.photo, (width, height) =>
                resolve({ uri: photo.photo, width, height })
              );
            })
        )
      ).then(setTransformedPhotos);
    }
  }, [navigation, data, handleDelete]);

  if (loading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  if (error)
    return (
      <LoadingContainer>
        <Text>Error: {error.message}</Text>
      </LoadingContainer>
    );

  const { caption, isPublic, title } = data.getPost;

  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: "20%",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text
            style={{ fontFamily: "JostSemiBold", fontSize: 20, color: "white" }}
          >
            {title}
          </Text>
          <Ionicons
            name={isPublic ? "people" : "lock-closed"}
            size={14}
            color={"white"}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
          }}
        ></View>

        <Collage selectedPhotoUris={transformedPhotos} />
        <MemoContainer>
          <Text
            style={{
              fontFamily: "JostMedium",
              fontSize: 14,
              color: "white",
              marginTop: 15,
            }}
          >
            {caption}
          </Text>
        </MemoContainer>
      </ScrollView>
    </Container>
  );
}
