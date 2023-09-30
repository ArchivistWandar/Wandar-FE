import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../../components/Shared";
import MyProfileEdit from "./MyProfileEdit";
import { AuthButtonContainer } from "../../components/auth/AuthShared";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";

const MyInfoEdit = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("vivianlee");
  const [email, setEmail] = useState("wandar@hello.com");
  const [password, setPassword] = useState("abcdefghijk");

  const [disabled, setDisabled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    // Handle save logic here (e.g., send updated data to the server).
  };
  const goToMyProfileEdit = () => navigation.navigate("MyProfileEdit");
  return (
    <Container>
      <AuthLayout>
        <ProfileImageContainer>
          {/* Original profile image */}
          <ProfileImage source={require("../../assets/images/profile1.png")} />
          <EditButton onPress={() => navigation.navigate(MyProfileEdit)}>
            <Ionicons name="pencil" size={24} color="white" />
          </EditButton>
        </ProfileImageContainer>

        <TextInputContainer>
          {/* Username input */}
          <InputLabel>Username</InputLabel>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor={"grey"}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </TextInputContainer>

        <TextInputContainer>
          {/* Email input */}
          <InputLabel>Email</InputLabel>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={"grey"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </TextInputContainer>

        <TextInputContainer>
          {/* Password input */}
          <InputLabel>Password</InputLabel>
          <PasswordInput
            placeholder="Enter your password"
            placeholderTextColor={"grey"}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <PasswordVisibilityButton onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </PasswordVisibilityButton>
        </TextInputContainer>
        <AuthButtonContainer>
          <AuthButton text="Save" disabled={disabled} isYellow={false} />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

const ProfileImageContainer = styled.View`
  align-items: center;
  padding-top: 100px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  opacity: 0.5;
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 38%; /* Adjust this value to position the button as needed */
  left: 47%; /* Center the button horizontally */
`;

const TextInputContainer = styled.View`
  margin: 20px 40px;
`;

const InputLabel = styled.Text`
  font-family: "JostMedium";
  color: white;
  font-size: 14px;
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  background-color: #1b1b1b;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: white;
  font-family: "JostMedium";
`;

const PasswordInput = styled.TextInput`
  background-color: #1b1b1b;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: white;
  font-family: "JostMedium";
`;

const PasswordVisibilityButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 10px;
`;

export default MyInfoEdit;
