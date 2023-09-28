import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../components/Shared";

const postData = [
  {
    id: "1",
    landName: "Jeju 🍊",
    date: "Aug 3, 2023 ~ Aug 19, 2023",
    isPrivate: false,
    contents:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum is simply dummy text of the has been the industry's standard dummy text.",
    image: require("../assets/images/jeju.png"),
  },
  {
    id: "2",
    landName: "Daily 🫧",
    date: "July 1, 2023 ~ July 18, 2023",
    isPrivate: true,
    contents:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum is simply dummy text of the has been the industry's standard dummy text.",
    image: require("../assets/images/busan.png"),
  },
  // Add more post data here
];

const ArchivePosts = () => {
  const renderItem = ({ item }) => {
    return (
      <PostItem>
        <PostImage source={item.image} />
        <PostDetails>
          <LandName>{item.landName}</LandName>
          <DateAndPrivacy>
            <DateText numberOfLines={1}>{item.date}</DateText>
            {item.isPrivate ? (
              <IconContainer>
                <Ionicons name="lock-closed" size={15} color={"white"} />
              </IconContainer>
            ) : (
              <IconContainer>
                <Ionicons name="people" size={15} color={"white"} />
              </IconContainer>
            )}
          </DateAndPrivacy>
          <Contents numberOfLines={2}>{item.contents}</Contents>
        </PostDetails>
      </PostItem>
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

const IconContainer = styled.View`
  padding-left: 10px; /* Add left padding */
`;

const PostItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px; /* Add border line */
  border-color: #717171; /* Border color */
`;

const PostImage = styled.Image`
  width: 100px;
  height: 100px;
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
