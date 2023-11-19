import React, { useState } from "react";
import { Container, LoadingContainer } from "../components/Shared";
import UserList from "../components/friendsNav/UserList";
import { gql, useMutation, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";

const SEARCH_USERS = gql`
  query SearchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      avatar
      isFriend
      isPending
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($username: String!) {
    sendFriendRequest(username: $username) {
      ok
      error
    }
  }
`;

const BrowseTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const loggedInUsername = currentUsernameVar(); // Fetch the current logged-in username
  const [keyword, setKeyword] = useState("");
  const [addingFriendUsername, setAddingFriendUsername] = useState(null);

  const { data, loading, refetch } = useQuery(SEARCH_USERS, {
    variables: { keyword: keyword },
    skip: keyword.length === 0,
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onCompleted: () => {
      refetch();
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    setKeyword(text);
    if (text.length > 0) {
      refetch();
    }
  };

  const handleSendFriendRequest = (username) => {
    const sendRequest = () => {
      setAddingFriendUsername(username); // Set the username when sending a request

      sendFriendRequest({ variables: { username } })
        .then(({ data }) => {
          if (data.sendFriendRequest.ok) {
            alert("Friend request sent!");
          } else {
            alert("Error: " + data.sendFriendRequest.error);
          }
        })
        .catch((error) => {
          alert("An error occurred: " + error.message);
        })
        .finally(() => {
          setAddingFriendUsername(null); // Reset after the request is completed or failed
        });
    };

    Alert.alert(
      "Send Friend Request",
      `Are you sure you want to send a friend request to ${username}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send Request", onPress: sendRequest },
      ]
    );
  };

  // Format the data for UserList
  const formattedData = data?.searchUsers
    ? data.searchUsers.map((user) => ({
        ...user,
        avatar: user.avatar
          ? { uri: user.avatar }
          : require("../assets/images/profile8.png"),
      }))
    : [];

  return (
    <Container>
      <UserList
        data={formattedData}
        onSearch={handleSearch}
        onAddFriend={handleSendFriendRequest}
        loading={loading}
        addingFriendUsername={addingFriendUsername}
        friend={false}
        refreshing={refreshing} // Pass the state
        onRefresh={onRefresh} // Pass the function
      />
    </Container>
  );
};

export default BrowseTab;
