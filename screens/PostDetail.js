import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Container } from "../components/Shared";

const PostDetail = () => {
  const post = {
    landname: "Jeju 🍊",
    title: "July 18, 2023 ~ July 19 2023",
    isPrivate: true,
    photoCollage: [
      require("../assets/images/jeju.png"),
      require("../assets/images/flowers.png"),
      require("../assets/images/exhibition.png"),
    ],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta ante vitae volutpat. Nulla facilisi. Sed ut metus at arcu consequat laoreet.",
  };

  return (
    <Container>
      <ScrollView>
        <TitleContainer>
          <Title>{post.title}</Title>
          {post.isPrivate && (
            <PrivacyIcon>
              <Ionicons name="lock-closed" size={18} color={"white"} />
            </PrivacyIcon>
          )}
        </TitleContainer>

        <PhotoCollage>
          {post.photoCollage.map((photo, index) => (
            <Photo key={index} source={photo} />
          ))}
        </PhotoCollage>

        <Text>{post.text}</Text>
      </ScrollView>
    </Container>
  );
};

const TitleContainer = styled.View`
  margin-top: 150px;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: "JostBold";
  color: white;
  flex: 1;
`;

const PrivacyIcon = styled.View`
  margin-left: 10px;
`;

const PhotoCollage = styled.View`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
`;

const Photo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: "JostMedium";
  color: white;
  margin: 10px 20px;
`;

export default PostDetail;
