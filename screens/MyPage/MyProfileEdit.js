import React from "react";
import ProfileSelect from "../../components/ProfileSelect";
import { Container } from "../../components/Shared";
import { ScrollView } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import {
  AuthButtonContainer,
  AuthTitle,
} from "../../components/auth/AuthShared";
import AuthButton from "../../components/auth/AuthButton";

const MyProfileEdit = () => {
  const username = "vivian";

  return (
    <Container>
      <ScrollView>
        <AuthLayout>
          <AuthTitle profile={true}>
            Hi {username}! {"\n"}Edit your profile
          </AuthTitle>
          <ProfileSelect />
        </AuthLayout>
      </ScrollView>
      <AuthButtonContainer>
        <AuthButton
          text="Save"
          disabled={false}
          // onPress={}
          loading={false}
          isYellow={false}
        />
      </AuthButtonContainer>
    </Container>
  );
};

export default MyProfileEdit;
