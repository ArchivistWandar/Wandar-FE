import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Container, LoadingContainer } from "../Shared";
import { currentUsernameVar } from "../../apollo";
import { Skeleton } from "moti/skeleton";

const UserList = ({
  data,
  onSearch,
  onAddFriend,
  addingFriendUsername,
  friend,
  refreshing,
  onRefresh,
  loading,
}) => {
  const [loadingImages, setLoadingImages] = useState({}); // State to track loading images

  const handleImageLoadStart = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const renderItem = ({ item }) => {
    const isAddingThisFriend = item.username === addingFriendUsername;
    const isFriendOrSelf =
      item.isFriend || item.username === currentUsernameVar();
    const isSentButPending = item.isPending === "sentButPending";
    const isReceivedButPending = item.isPending === "receivedButPending";
    const isImageLoading = loadingImages[item.id];

    return (
      <PostItem>
        {isImageLoading && (
          <Skeleton colorMode="dark" width={70} height={70} radius={35} />
        )}
        <PostImage
          source={item.avatar}
          onLoadStart={() => handleImageLoadStart(item.id)}
          onLoadEnd={() => handleImageLoadEnd(item.id)}
          style={isImageLoading ? { position: "absolute", opacity: 0 } : {}}
        />
        <PostDetails>
          <PostTitle>{item.username}'s lands</PostTitle>
          {item.lastUpdate ? (
            <PostDate>Last update: {item.lastUpdate}</PostDate>
          ) : null}
        </PostDetails>
        {friend ? (
          <Ionicons name="chevron-forward" size={24} color={"white"} />
        ) : !isFriendOrSelf ? (
          <>
            {isAddingThisFriend ? (
              <ActivityIndicator size="small" color="white" />
            ) : isSentButPending ? (
              <InfoContainer>
                <InfoText>Pending</InfoText>
              </InfoContainer>
            ) : isReceivedButPending ? (
              <InfoContainer>
                <InfoText>Request Received</InfoText>
              </InfoContainer>
            ) : (
              <TouchableOpacity onPress={() => onAddFriend(item.username)}>
                <Ionicons name="person-add" size={24} color={"white"} />
              </TouchableOpacity>
            )}
          </>
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
      {loading === true ? (
        <LoadingContainer>
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginBottom: "80%" }}
          />
        </LoadingContainer>
      ) : data.length !== 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <LoadingContainer>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "JostMedium",
            }}
          >
            Nothing to show
          </Text>
        </LoadingContainer>
      )}
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
`;

const PostDetails = styled.View`
  flex: 1;
  margin-left: 22px;
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

const InfoContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

const InfoText = styled.Text`
  font-family: "JostMedium";
  color: white;
  font-size: 12px;
`;

export default UserList;
