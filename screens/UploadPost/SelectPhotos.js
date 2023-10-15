import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Text,
} from "react-native";
import { colors } from "../../colors";
import { Container } from "../../components/Shared";

const MAX_PHOTOS = 4; // Maximum number of photos allowed
const numColumns = 4;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const BlackBar = styled.View`
  height: 40px;
  background-color: ${colors.backgroundColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
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

  const isSelected = useMemo(() => {
    return (uri) => selectedPhotos.includes(uri);
  }, [selectedPhotos]);

  const getPhotos = async () => {
    const { assets: mediaAssets } = await MediaLibrary.getAssetsAsync({
      sortBy: [MediaLibrary.SortBy.creationTime],
      first: 100000,
    });
    setPhotos(mediaAssets);

    if (!chosenPhoto && mediaAssets.length > 0) {
      setChosenPhoto(mediaAssets[0]?.uri);
    }
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

    // Update the chosen photo when a photo is selected
    setChosenPhoto(photo.uri);
  };

  const SelectedImage = React.memo(({ photo, width, numColumns, onPress }) => (
    <ImageContainer onPress={onPress}>
      <Image
        source={{ uri: photo.uri }}
        style={{
          width: width / numColumns,
          height: 100,
          opacity: isSelected(photo.uri) ? 0.5 : 1,
        }}
      />
      <IconContainer>
        {isSelected(photo.uri) ? (
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "JostMedium",
              paddingRight: 5,
            }}
          >
            {selectedPhotos.indexOf(photo.uri) + 1}
          </Text>
        ) : (
          <Ionicons name="ellipse-outline" size={18} color="white" />
        )}
      </IconContainer>
    </ImageContainer>
  ));

  const renderItem = ({ item: photo }) => (
    <SelectedImage
      photo={photo}
      width={width}
      numColumns={numColumns}
      onPress={() => togglePhotoSelection(photo)}
    />
  );

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
      <BlackBar>
        {/* Add a dropdown button for albums here */}
        <Text style={{ color: "white" }}>{/* Album Name */}</Text>
        <Text style={{ color: "white", fontFamily: "JostMedium" }}>
          {`${selectedPhotos.length} / ${MAX_PHOTOS}`}{" "}
          {/* Show selected photos count and maximum */}
        </Text>
      </BlackBar>
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
