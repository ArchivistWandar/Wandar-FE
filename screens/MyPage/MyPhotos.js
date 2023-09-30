import React from "react";
import { FlatList, Image, useWindowDimensions } from "react-native";
import { Container } from "../../components/Shared";

const images = [
  require("../../assets/images/jeju.png"),
  require("../../assets/images/busan.png"),
  require("../../assets/images/exhibition.png"),
  require("../../assets/images/flowers.png"),
  require("../../assets/images/plane.png"),
];

const MyPhotos = () => {
  const numColumns = 3;
  const { width } = useWindowDimensions();

  const renderItem = ({ item }) => (
    <Image
      source={item}
      style={{ width: width / numColumns, height: width / numColumns }}
      resizeMode="cover"
    />
  );

  return (
    <Container>
      <FlatList
        numColumns={numColumns}
        data={images}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={renderItem}
      />
    </Container>
  );
};

export default MyPhotos;
