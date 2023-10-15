import React, { useState } from "react";
import Collage from "../../components/Collage";
import styled from "styled-components/native";
import { Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "../../components/Shared";

const MemoContainer = styled.View`
  margin: 25px;
  margin-top: 10px;
`;

export default function AddMemo({ route }) {
  const [memoText, setMemoText] = useState(""); // State to store the memo text

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
              paddingTop: 15,
              paddingLeft: 15,
              paddingBottom: 15,
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
