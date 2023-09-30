import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const images = [
  require("./../assets/images/profile1.png"),
  require("./../assets/images/profile2.png"),
  require("./../assets/images/profile3.png"),
  require("./../assets/images/profile4.png"),
  require("./../assets/images/profile5.png"),
  require("./../assets/images/profile6.png"),
  require("./../assets/images/profile7.png"),
  require("./../assets/images/profile8.png"),
  require("./../assets/images/profile9.png"),
  require("./../assets/images/profile10.png"),
  require("./../assets/images/profile11.png"),
];

const ProfileSelect = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <View>
      <ProfileImageContainer>
        <ProfileImage source={selectedImage} />
      </ProfileImageContainer>
      <ImageContainer>
        <ImageList>
          <CameraItem>
            <CameraButton>
              <Ionicons name="camera" size={40} color="#fff" />
            </CameraButton>
          </CameraItem>
          {images.map((image, index) => (
            <ImageItem
              key={index}
              onPress={() => handleImageSelect(image)}
              isSelected={selectedImage === image}
            >
              {selectedImage === image && <SelectionCircle />}
              <ImageThumbnail source={image} />
            </ImageItem>
          ))}
        </ImageList>
      </ImageContainer>
    </View>
  );
};

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ImageList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 90%;
  margin-bottom: 100px;
`;

const CameraItem = styled.TouchableOpacity`
  width: 25%;
  height: 90px;
  align-items: center;
  justify-content: center;
`;

const CameraButton = styled.TouchableOpacity`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  background-color: #333;
  border: 2px solid white;
  align-items: center;
  justify-content: center;
`;

const ImageItem = styled.TouchableOpacity`
  width: 25%;
  height: 90px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const ImageThumbnail = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const SelectionCircle = styled.View`
  position: absolute;
  width: 78px;
  height: 78px;
  border: 2px solid #ffee74;
  border-radius: 39px;
  z-index: 1;
`;

export default ProfileSelect;
