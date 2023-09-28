import React from "react";
import {
  AuthButtonContainer,
  AuthTitle,
} from "../../components/auth/AuthShared";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { Container } from "../../components/Shared";

const SetProfile = () => {
  const username = "wandar";
  return (
    <Container>
      <AuthLayout>
        <AuthTitle>
          Welcome {username}!{"\n"}Choose your profile
        </AuthTitle>
      </AuthLayout>
      <AuthButtonContainer>
        <AuthButton
          text="Continue"
          disabled={false}
          // onPress={}
          isYellow={false}
        />
      </AuthButtonContainer>
    </Container>
  );
};

export default SetProfile;
