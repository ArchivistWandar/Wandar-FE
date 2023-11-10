import React from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Container } from "../components/Shared";
import { colors } from "../colors";

const requestsData = [
  {
    id: "1",
    username: "hyeinlee.leeeeeee",
    profileImage: require("./../assets/images/profile1.png"),
  },
  {
    id: "2",
    username: "iamlily",
    profileImage: require("./../assets/images/profile2.png"),
  },
  {
    id: "3",
    username: "dankim",
    profileImage: require("./../assets/images/profile3.png"),
  },
  {
    id: "4",
    username: "millyyyyyyy",
    profileImage: require("./../assets/images/profile8.png"),
  },
];

const FollowRequests = ({ navigation }) => {
  const handleConfirm = (id) => {
    console.log(`Confirmed request: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleted request: ${id}`);
  };

  return (
    <Container>
      <RequestList
        data={requestsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestItem>
            <ProfileImage source={item.profileImage} />
            <Username>{item.username}</Username>
            <ButtonsContainer>
              <RequestButtonContainer
                color={colors.blue}
                onPress={() => handleConfirm(item.id)}
              >
                <RequestButton>Confirm</RequestButton>
              </RequestButtonContainer>
              <RequestButtonContainer
                color="rgba(255,255,255,0.1)"
                onPress={() => handleDelete(item.id)}
              >
                <RequestButton>Delete</RequestButton>
              </RequestButtonContainer>
            </ButtonsContainer>
          </RequestItem>
        )}
      />
    </Container>
  );
};

const RequestList = styled(FlatList)`
  flex: 1;
  margin: 20px;
`;

const RequestItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Username = styled.Text`
  margin-left: 15px;
  flex: 1;
  font-family: "JostBold";
  color: white;
  margin-right: 15px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
`;

const RequestButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.color || "white"};
  padding: 4px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

const RequestButton = styled.Text`
  font-family: "JostMedium";
  color: white;
  font-size: 12px;
`;

export default FollowRequests;
