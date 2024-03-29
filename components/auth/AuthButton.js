import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { ActivityIndicator, Platform } from "react-native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.isYellow ? colors.yellow : "white")};
  width: 100%;
  padding: 16px 10px;
  border-radius: 50px;
  margin-bottom: 10px;
  ${Platform.select({
    ios: `
        shadow-color: rgba(0, 0, 0, 0.25);
        shadow-offset: 0px 7px;
        shadow-opacity: 1;
        shadow-radius: 30px;
      `,
    android: `
        elevation: 8;
      `,
  })}
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: black;
  font-weight: 600;
  text-align: center;
  font-family: "JostMedium";
  font-size: 16px;
`;

export default function AuthButton({
  onPress,
  disabled,
  text,
  isYellow,
  loading,
}) {
  return (
    <Button disabled={disabled} onPress={onPress} isYellow={isYellow}>
      {loading ? (
        <ActivityIndicator color={colors.backgroundColor} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
