import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { Image, View, useWindowDimensions } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 10%;
  margin-left: 20px;
`;

const WelcomeMessage = styled.Text`
  color: #fff;
  text-align: center;
  font-family: "JostMediumItalic";
  font-size: 24px;
  margin-top: 30%;
`;

export default function Welcome({ navigation }) {
  const { width } = useWindowDimensions(); // Get window width
  const goToSignUp = () => navigation.navigate("SignUpNav");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <WelcomeMessage>
        Design, Capture, & Share. {"\n"} Wandar Your World
      </WelcomeMessage>
      <View style={{ flex: 1, justifyContent: "center", marginTop: "15%" }}>
        <Image
          source={require("../assets/Maskgroup.png")}
          resizeMode="contain"
          style={{
            width: width,
          }}
        />
      </View>
      <ButtonContainer>
        <AuthButton
          text="Sign Up"
          disabled={false}
          onPress={goToSignUp}
          isYellow={true}
          loading={false}
        />
        <AuthButton
          text="Login"
          disabled={false}
          onPress={goToLogin}
          isYellow={false}
          loading={false}
        />
      </ButtonContainer>
    </Container>
  );
}
