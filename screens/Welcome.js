import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 60px;
  margin-left: 20px;
`;

const WelcomeMessage = styled.Text`
  color: #fff;
  text-align: center;
  font-family: "JostMediumItalic";
  font-size: 24px;
  font-style: italic;
  font-weight: 500;
  margin-top: 130px;
`;

export default function Welcome({ navigation }) {
  const goToSignUp = () => navigation.navigate("SignUpNav");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <WelcomeMessage>
        Design, Capture, & Share. {"\n"} Wandar Your World
      </WelcomeMessage>
      <ButtonContainer>
        <AuthButton
          text="Sign Up"
          disabled={false}
          onPress={goToSignUp}
          isYellow={true}
        />
        <AuthButton
          text="Login"
          disabled={false}
          onPress={goToLogin}
          isYellow={false}
        />
      </ButtonContainer>
    </Container>
  );
}
