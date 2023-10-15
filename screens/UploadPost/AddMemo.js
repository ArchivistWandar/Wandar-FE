import React, { memo, useEffect, useState } from "react";
import Collage from "../../components/Collage";
import styled from "styled-components/native";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "../../components/Shared";
import { colors } from "../../colors";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 10px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.yellow};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  font-family: "JostSemiBold";
`;

export default function AddMemo({ navigation, route }) {
  const [memoText, setMemoText] = useState(""); // State to store the memo text

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChooseLand", {
          selectedPhotos: route.params.selectedPhotos,
          memoText: memoText,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [memoText]);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Collage route={route} />
        <MemoContainer>
          <Text
            style={{ fontFamily: "JostItalic", fontSize: 20, color: "white" }}
          >
            memo
          </Text>
          <TextInput
            style={{
              padding: 15,
              paddingTop: 15,
              marginTop: 10,
              borderRadius: 5,
              borderColor: "white",
              borderWidth: 1,
              color: "white",
              fontFamily: "JostMedium",
              minHeight: 150,
            }}
            value={memoText}
            onChangeText={setMemoText}
            multiline={true}
            scrollEnabled={true} // Enable scrolling when the text overflows the input box
            placeholder="Write your memo here"
            placeholderTextColor={"grey"}
            textAlignVertical={"top"}
          />
        </MemoContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
}
