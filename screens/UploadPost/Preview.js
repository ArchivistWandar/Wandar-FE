import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container, HeaderRightText } from "../../components/Shared";
import Collage from "../../components/Collage";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import PhotoDateRange from "../../components/PhotoDateRange";
import PrivacyToggle from "../../components/PrivacyToggle";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 50px;
`;

// GraphQL Mutation
const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $title: String!
    $caption: String!
    $photos: [Upload]!
    $landId: Int!
    $isPublic: Boolean!
    $isPublished: Boolean!
  ) {
    createPost(
      title: $title
      caption: $caption
      photos: $photos
      landId: $landId
      isPublic: $isPublic
      isPublished: $isPublished
    ) {
      ok
      error
    }
  }
`;

export default function Preview({ route, navigation }) {
  const [isUploading, setIsUploading] = useState(false);
  const { selectedPhotos, memoText, selectedLand, selectedLandId } =
    route.params;
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);
  const [photoDateRange, setPhotoDateRange] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleToggleSelection = (newPublicStatus) => {
    setIsPublic(newPublicStatus);
    console.log(isPublic);
  };

  const handleUpload = () => {
    setIsUploading(true);
    const isPublished = true; // 항상 true

    // selectedPhotos.assets 배열을 서버가 처리할 수 있는 형식으로 변환
    const formattedPhotos = selectedPhotos.assets.map((photo) => {
      // 각 사진을 ReactNativeFile 객체로 변환
      return new ReactNativeFile({
        uri: photo.uri,
        type: `image/${photo.uri.split(".").pop()}`,
        name: `photo.${photo.uri.split(".").pop()}`,
      });
    });

    createPost({
      variables: {
        title: photoDateRange,
        caption: memoText,
        photos: formattedPhotos,
        landId: selectedLandId,
        isPublic,
        isPublished,
      },
    })
      .then(({ data }) => {
        if (data.createPost.ok) {
          setIsUploading(false);
          Alert.alert("Success", `Post uploaded successfully`, [
            {
              text: "Go to previous page",
              onPress: () =>
                navigation.navigate("Tabs", { screen: "TabArchive" }),
            },
          ]);
        } else {
          console.error(data.createPost.error);
        }
      })
      .catch((err) => {
        console.error("Mutation error: ", err);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isUploading ? (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginRight: "10%" }}
          />
        ) : (
          <TouchableOpacity onPress={handleUpload}>
            <HeaderRightText>Upload</HeaderRightText>
          </TouchableOpacity>
        ),
    });
  }, [navigation, handleUpload, isUploading]);

  // PhotoDateRange 결과를 처리하는 함수
  const onDateRangeCalculated = (dateRange) => {
    setPhotoDateRange(dateRange);
  };

  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 30,
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text
            style={{ fontFamily: "JostBold", fontSize: 20, color: "white" }}
          >
            {selectedLand.name}
          </Text>
          <PrivacyToggle
            isPublic={isPublic}
            onSelectSwitch={handleToggleSelection}
            selectionColor={"white"}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <PhotoDateRange
            photos={selectedPhotos.assets}
            textStyle={{
              color: "white",
              fontFamily: "JostMedium",
              fontSize: 14,
            }}
            onDateRangeCalculated={onDateRangeCalculated}
          />
        </View>
        <Collage selectedPhotoUris={selectedPhotos.assets} />
        <MemoContainer>
          <Text
            style={{
              fontFamily: "JostMedium",
              fontSize: 14,
              color: "white",
              marginTop: 15,
            }}
          >
            {memoText}
          </Text>
        </MemoContainer>
      </ScrollView>
    </Container>
  );
}
