import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { colors } from "../../colors";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.yellow};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  font-family: "JostSemiBold";
`;

export default function SelectPhotos({ navigation }) {
  const [photoLocal, setPhotoLocal] = useState("");
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const MAX_PHOTOS = 10; // Maximum number of photos allowed

  const getPhotos = async () => {
    const { assets: mediaAssets } = await MediaLibrary.getAssetsAsync();
    setPhotos(mediaAssets);
    setChosenPhoto(mediaAssets[0]?.uri);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("AddMemo", { selectedPhotos })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [selectedPhotos, photoLocal]);

  const numColumns = 4;
  const { width } = useWindowDimensions();

  const togglePhotoSelection = (photo) => {
    if (selectedPhotos.includes(photo.uri)) {
      setSelectedPhotos((prevSelectedPhotos) =>
        prevSelectedPhotos.filter((selected) => selected !== photo.uri)
      );
    } else if (selectedPhotos.length < MAX_PHOTOS) {
      setSelectedPhotos((prevSelectedPhotos) => [
        ...prevSelectedPhotos,
        photo.uri,
      ]);
    }
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer
      onPress={() => togglePhotoSelection(photo)}
      style={{
        opacity: selectedPhotos.includes(photo.uri) ? 0.6 : 1,
      }}
    >
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name={
            selectedPhotos.includes(photo.uri) ? "checkbox" : "checkbox-outline"
          }
          size={18}
          color="white"
        />
      </IconContainer>
    </ImageContainer>
  );

  console.log(selectedPhotos);

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" && (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        )}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
