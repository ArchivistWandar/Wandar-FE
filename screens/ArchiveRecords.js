import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../components/Shared";

const postData = [
  {
    id: "1",
    title: "2023 Jeju 🍊",
    date: "Aug 5, 2023",
    photoCount: 12,
    isPrivate: false,
    image: require("../assets/images/jeju.png"),
  },
  {
    id: "2",
    title: "Busan 🌊",
    date: "July 21, 2023",
    photoCount: 8,
    isPrivate: true,
    image: require("../assets/images/busan.png"),
  },
];

const ArchiveRecords = ({ navigation }) => {
  const goToRecordDetail = () => {
    navigation.navigate("RecordDetail");
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={goToRecordDetail}>
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
