import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../../components/auth/AuthButton";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import ProfileEditContainer from "../../components/ProfileEditContainer";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { LoadingContainer } from "../../components/Shared";
import { SEE_MY_INFO_QUERY } from "./MyInfo";

export const MY_PAGE = gql`
  query SeeMypage {
    seeMypage {
      username
      email
      avatar
    }
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $avatar: Upload
    $username: String
    $email: String
    $password: String
  ) {
    editProfile(
      avatar: $avatar
      username: $username
      email: $email
      password: $password
    ) {
      ok
    }
  }
`;

const MyInfoEdit = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(MY_PAGE, {
    fetchPolicy: "network-only",
  });
  const [editProfileMutation, { loading: editLoading }] = useMutation(
    EDIT_PROFILE_MUTATION
  );

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (data && data.seeMypage) {
      const {
        avatar,
        username: fetchedUsername,
        email: fetchedEmail,
      } = data.seeMypage;
      setProfileImage(
        avatar ? { uri: avatar } : require("../../assets/images/profile8.png")
      );
      setUsername(fetchedUsername);
      setEmail(fetchedEmail);
    }
  }, [data]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage({ uri: selectedImageUri });
    }
  };

  const handleSave = async () => {
    let photoFile = null;

    if (profileImage && profileImage.uri) {
      photoFile = new ReactNativeFile({
        uri: profileImage.uri,
        type: `image/${profileImage.uri.split(".").pop()}`,
        name: `profile.${profileImage.uri.split(".").pop()}`,
      });
    }

    try {
      const response = await editProfileMutation({
        variables: {
          avatar: photoFile,
          username: username,
          email: email,
          password: password,
        },
        refetchQueries: [{ query: SEE_MY_INFO_QUERY }],
      });

      if (response.data.editProfile.ok) {
        // Handle successful profile edit
        alert("Profile updated successfully");
      } else {
        // Handle unsuccessful profile edit
        alert("Failed to update profile");
      }
    } catch (error) {
      // Handle error
      console.error("Error editing profile:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  if (loading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );

  return (
    <ProfileEditContainer>
      <ScrollView>
        <ProfileImageContainer>
          {/* Original profile image */}
          <ProfileImage source={profileImage} />
          <EditButton onPress={pickImage}>
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
          />
        </TextInputContainer>

        <TextInputContainer>
          {/* Email input */}
          <InputLabel>Email</InputLabel>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={"grey"}
            value={email}
            keyboardType="email-address"
            autoCapitalize={"none"}
          />
        </TextInputContainer>

        <TextInputContainer>
          {/* Password input */}
          <InputLabel>Password</InputLabel>
          <PasswordInputContainer>
            <PasswordInput
              placeholder="Enter your password"
              placeholderTextColor={"grey"}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                color={"white"}
                size={24}
              />
            </TouchableOpacity>
          </PasswordInputContainer>
        </TextInputContainer>
        <ButtonContainer>
          <AuthButton
            text="Save"
            disabled={disabled || editLoading}
            isYellow={false}
            loading={false}
            onPress={handleSave}
          />
        </ButtonContainer>
      </ScrollView>
    </ProfileEditContainer>
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

const PasswordInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  width: 87%;
  background-color: #1b1b1b;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: white;
  font-family: "JostMedium";
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 30px 40px;
`;

export default MyInfoEdit;
