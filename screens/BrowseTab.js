import React, { useState } from "react";
import { Container } from "../components/Shared";
import UserList from "../components/friendsNav/UserList";
import { gql, useMutation, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo";

const SEARCH_USERS = gql`
  query SearchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      avatar
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
  const loggedInUsername = currentUsernameVar(); // Fetch the current logged-in username
  const [keyword, setKeyword] = useState("");
  const [addingFriendUsername, setAddingFriendUsername] = useState(null);

  const { data, loading, refetch } = useQuery(SEARCH_USERS, {
    variables: { keyword: keyword },
    skip: keyword.length === 0,
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

  const handleSearch = (text) => {
    setKeyword(text);
    if (text.length > 0) {
      refetch();
    }
  };

  const handleSendFriendRequest = (username) => {
    if (username === loggedInUsername) {
      alert("You cannot send a friend request to yourself.");
      return;
    }
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

  // Format the data for UserList
  const formattedData =
    data?.searchUsers.map((user) => ({
      ...user,
      avatar: user.avatar
        ? { uri: user.avatar }
        : require("../assets/images/profile8.png"), // Replace with your default avatar path
    })) || [];

  return (
    <Container>
      <UserList
        data={formattedData}
        onSearch={handleSearch}
        onAddFriend={handleSendFriendRequest}
        loading={loading}
        friend={false}
        addingFriendUsername={addingFriendUsername}
      />
    </Container>
  );
};

export default BrowseTab;
