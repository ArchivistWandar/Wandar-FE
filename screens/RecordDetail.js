import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { LoadingContainer } from "../components/Shared";
import { themes } from "../components/RecordTheme";
import { colors } from "../colors";

const GET_RECORD_QUERY = gql`
  query GetRecord($getRecordId: Int!) {
    getRecord(id: $getRecordId) {
      title
      theme
      createdAt
      photos {
        photo
      }
    }
  }
`;

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecord($deleteRecordId: Int!) {
    deleteRecord(id: $deleteRecordId) {
      ok
      error
    }
  }
`;

const RecordDetail = ({ navigation, route }) => {
  // GetRecord
  const { data, loading, error } = useQuery(GET_RECORD_QUERY, {
    variables: { getRecordId: route.params.id },
  });

  const windowWidth = Dimensions.get("window").width;
  const [title, setTitle] = useState("Loading...");
  const [theme, setTheme] = useState(null);
  const [assets, setAssets] = useState([]);

  // DeleteRecord
  const [deleteRecordMutation] = useMutation(DELETE_RECORD_MUTATION, {
    variables: { deleteRecordId: route.params.id },
    onCompleted: (response) => {
      if (response.deleteRecord.ok) {
        navigation.navigate("ArchiveRecords");
      } else {
        alert("Failed to delete the record.");
      }
    },
    onError: (error) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteRecordMutation() },
      ]
    );
  };

  useEffect(() => {
    if (data && data.getRecord) {
      setTitle(data.getRecord.title);
      setAssets(data.getRecord.photos);
      const foundTheme = themes.find((t) => t.name === data.getRecord.theme);
      if (foundTheme) {
        setTheme(foundTheme);
      }
    }
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: Platform.OS === "ios" ? "white" : theme?.textColor,
      headerTitle: () => (
        <Text
          style={{
            color: "white",
            fontFamily: "JostSemiBold",
            fontSize: 15,
          }}
        >
          {title}
        </Text>
      ),
      headerBackground: () =>
        Platform.OS === "ios" ? (
          <BlurView
            tint="dark"
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View
            style={{
              backgroundColor: theme
                ? theme.backgroundColor
                : "rgba(0, 0, 0, 0.5)",
            }}
          />
        ),
      headerRight: () => (
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
  }, [navigation, theme, title, handleDelete]);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? theme.backgroundColor : colors.backgroundColor,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            position: "absolute",
            color: theme ? theme.textColor : "white",
            fontFamily: "JostSemiBoldItalic",
            fontSize: 20,
            top: "16%",
          }}
        >
          Wandar.
        </Text>
        <View
          style={{
            position: "absolute",
            top: "25%", // 원의 위치. 선의 끝에 맞춰 조절하세요.
            left: "50%",
            marginLeft: -4, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
            width: 8, // 원의 크기
            height: 8, // 원의 크기
            borderRadius: 4, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "85%", // 원의 위치.
            left: "50%",
            marginLeft: -4, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
            width: 8, // 원의 크기
            height: 8, // 원의 크기
            borderRadius: 4, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "25%",
            height: "60%",
            width: 1,
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View style={styles.imageContainer}>
          {assets.map((image, index) => (
            <View
              key={index}
              style={[
                styles.imageWrapper,
                { alignItems: index % 2 === 0 ? "flex-start" : "flex-end" },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  top: "50%", // 가지가 이미지의 중앙에서 시작
                  width: "50%", // 가지의 길이.
                  height: 1,
                  backgroundColor: theme ? theme.textColor : "white",
                }}
              />

              <Image
                source={{ uri: image.photo }}
                style={{
                  width: windowWidth / 3.5,
                  height: windowWidth / 3.5,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: "48%", // 원의 위치.
                  left: "50%",
                  marginLeft: -3, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
                  width: 6, // 원의 크기
                  height: 6, // 원의 크기
                  borderRadius: 6, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
                  backgroundColor: theme
                    ? theme.backgroundColor
                    : colors.backgroundColor,
                  borderColor: theme ? theme.textColor : "white",
                  borderWidth: 1,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "60%",
    width: "100%",
  },
  imageWrapper: {
    width: "85%",
    top: "10%",
  },
});

export default RecordDetail;
