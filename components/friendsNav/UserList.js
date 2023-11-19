import React from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../Shared";
import { currentUsernameVar } from "../../apollo";

const UserList = ({
  data,
  onSearch,
  onAddFriend,
  addingFriendUsername,
  friend,
}) => {
  const renderItem = ({ item }) => {
    const isAddingThisFriend = item.username === addingFriendUsername;
    const isFriendOrSelf =
      item.isFriend || item.username === currentUsernameVar();

    return (
      <PostItem>
        <PostImage source={item.avatar} />
        <PostDetails>
          <PostTitle>{item.username}'s lands</PostTitle>
          {item.lastUpdate ? (
            <PostDate>Last update: {item.lastUpdate}</PostDate>
          ) : null}
        </PostDetails>
        {friend ? (
          <Ionicons name="chevron-forward" size={24} color={"white"} />
        ) : !isFriendOrSelf ? (
          <TouchableOpacity onPress={() => onAddFriend(item.username)}>
            {isAddingThisFriend ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="person-add" size={24} color={"white"} />
            )}
          </TouchableOpacity>
        ) : null}
      </PostItem>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <Ionicons
          name="search"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#777"
          onChangeText={onSearch}
        />
      </SearchContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 14.5px;
  backdrop-filter: blur(2px);
  padding: 8px 14px;
  margin: 20px;
  margin-bottom: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: white;
  padding: 0;
  font-family: "JostMedium";
`;

const PostItem = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px; /* Add border line */
  border-color: #717171; /* Border color */
  padding: 22px; /* Add some padding to separate items */
`;

const PostImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 22px;
`;

const PostDetails = styled.View`
  flex: 1;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-family: "JostBold";
  margin-bottom: 4px;
  color: white;
`;

const PostDate = styled.Text`
  font-family: "JostMedium";
  font-size: 12px;
  color: #bbb;
  margin-bottom: 4px;
`;

export default UserList;
