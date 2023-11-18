import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { themes } from "../../components/RecordTheme";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const CREATE_RECORD_MUTATION = gql`
  mutation CreateRecord(
    $title: String!
    $photos: [Upload]!
    $theme: String!
    $isPublic: Boolean!
  ) {
    createRecord(
      title: $title
      photos: $photos
      theme: $theme
      isPublic: $isPublic
    ) {
      ok
    }
  }
`;

const EditableHeaderTitle = ({ initialTitle, textColor, setTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitleInternal] = useState(initialTitle); // 내부 상태 추가

  const handleEndEditing = () => {
    if (title.trim() === "") {
      setTitleInternal(initialTitle);
      setTitle(initialTitle); // 외부 상태도 초기값으로 설정
    } else {
      setTitle(title); // 외부 상태 업데이트
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <TextInput
      value={title}
      onChangeText={(text) => setTitleInternal(text)} // 내부 상태 업데이트
      onEndEditing={handleEndEditing}
      autoFocus
      style={{ color: textColor, fontFamily: "JostSemiBold", fontSize: 15 }}
    />
  ) : (
    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Text
        style={{ color: textColor, fontFamily: "JostSemiBold", fontSize: 15 }}
      >
        {title}
      </Text>
      <Ionicons name="pencil" size={18} color={textColor} />
    </TouchableOpacity>
  );
};

const HeaderRightText = styled.Text`
  color: ${colors.yellow};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  font-family: "JostSemiBold";
`;

const PreviewRecord = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const [title, setTitle] = useState("New record");

  const [theme, setTheme] = useState({
    backgroundColor: "#202020",
    name: "Original.",
    textColor: "white",
  });
  const [modalVisible, setModalVisible] = useState(true);
  const { assets } = route.params.result;

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: Platform.OS === "ios" ? "white" : theme?.textColor,
      headerTitle: () => (
        <EditableHeaderTitle
          initialTitle={title}
          textColor={Platform.OS === "ios" ? "white" : theme?.textColor}
          setTitle={setTitle}
        />
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
    });
  }, [theme, title]); // theme가 변경될 때마다 이 useEffect가 실행됩니다.
  const selectTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // mutation

  const [createRecordMutation, { loading: isCreatingRecord }] = useMutation(
    CREATE_RECORD_MUTATION
  );

  const handleUpload = () => {
    // Prepare the photos as an array of ReactNativeFile objects
    const photoFiles = route.params.result.assets.map((asset) => {
      return new ReactNativeFile({
        uri: asset.uri,
        type: `image/${asset.uri.split(".").pop()}`,
        name: asset.filename || `photo.${asset.uri.split(".").pop()}`,
      });
    });

    // Use the mutation with the prepared variables
    createRecordMutation({
      variables: {
        title: title,
        photos: photoFiles,
        theme: theme.name,
        isPublic: true,
      },
      onCompleted: (response) => {
        // Handle successful upload
        console.log(response);
      },
      onError: (error) => {
        // Handle error
        console.log(error);
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      // ... existing options ...
      headerRight: () => (
        <TouchableOpacity onPress={handleUpload}>
          <HeaderRightText>Upload</HeaderRightText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme, route.params.result.assets]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? theme.backgroundColor : colors.backgroundColor,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {Platform.OS === "ios" ? (
              <BlurView
                style={{
                  width: "100%",
                  padding: 20,
                }}
                tint="dark"
                intensity={40}
              >
                <FlatList
                  data={themes}
                  renderItem={({ item: theme }) => (
                    <TouchableOpacity
                      onPress={() => {
                        selectTheme(theme);
                        setModalVisible(false);
                      }}
                      style={{
                        flex: 1,
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: theme.backgroundColor,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme.textColor,
                          fontFamily: "JostMediumItalic",
                        }}
                      >
                        {theme.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(theme, index) => index.toString()}
                  numColumns={3} // 열의 수를 3으로 설정
                />
              </BlurView>
            ) : (
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <FlatList
                  data={themes}
                  renderItem={({ item: theme }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setTheme(theme);
                        setModalVisible(false);
                      }}
                      style={{
                        flex: 1,
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: theme.backgroundColor,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme.textColor,
                          fontFamily: "JostMediumItalic",
                        }}
                      >
                        {theme.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(theme, index) => index.toString()}
                  numColumns={3} // 열의 수를 3으로 설정
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: "5%",
            flexDirection: "row",
            gap: 5,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text
            style={{
              color: theme ? theme.textColor : "white",
              fontFamily: "JostMedium",
              fontSize: 15,
            }}
          >
            Choose a theme
          </Text>
          <Ionicons
            name="chevron-up"
            size={24}
            color={theme ? theme.textColor : "white"}
          />
        </TouchableOpacity>

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
                source={{ uri: image.uri }}
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

export default PreviewRecord;
