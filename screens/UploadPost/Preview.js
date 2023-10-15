import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Container } from "../../components/Shared";
import Collage from "../../components/Collage";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import PhotoDateRange from "../../components/PhotoDateRange";
import PrivacyToggle from "../../components/PrivacyToggle";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 50px;
`;

export default function Preview({ route, navigation }) {
  const { selectedPhotos, memoText, selectedLand } = route.params;

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
            selectionMode={1}
            roundCorner={true}
            option1="Friends"
            option2="Private"
            onSelectSwitch={(value) => console.log(value)}
            selectionColor="white"
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
            photos={selectedPhotos}
            textStyle={{
              color: "white",
              fontFamily: "JostMedium",
              fontSize: 14,
            }}
          />
        </View>
        <Collage selectedPhotoUris={selectedPhotos.map((photo) => photo.uri)} />
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
