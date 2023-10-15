import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Container } from "../../components/Shared";
import Collage from "../../components/Collage";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 50px;
`;

export default function Preview({ route, navigation }) {
  const { selectedPhotos, memoText, selectedLand } = route.params;

  const goToChooseLand = () => {
    navigation.navigate("ChooseLand", {
      selectedPhotos: route.params.selectedPhotos,
      memoText: memoText,
    });
  };

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
          }}
        >
          <Text
            style={{ fontFamily: "JostBold", fontSize: 20, color: "white" }}
          >
            {selectedLand.name}
          </Text>
        </View>
        <Collage route={route} />
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
