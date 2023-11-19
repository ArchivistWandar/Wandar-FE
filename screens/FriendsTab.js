import React, { useContext, useEffect, useState } from "react";
import { Container, LoadingContainer, formatDate } from "../components/Shared";
import UserList from "../components/friendsNav/UserList";
import { gql, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../apollo";
import { ActivityIndicator } from "react-native";
import { RequestProcessedContext } from "../components/RequestProcessedProvider";

export const SEE_FRIENDS = gql`
  query SeeFriends($username: String!) {
    seeFriends(username: $username) {
      ok
      totalFriends
      friends {
        username
        avatar
        lastUpdate
      }
    }
  }
`;

const FriendsTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const username = currentUsernameVar();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { requestProcessed } = useContext(RequestProcessedContext);

  // In your FriendsTab component
  const { data, loading, error, refetch } = useQuery(SEE_FRIENDS, {
    variables: { username: username },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Assuming you have a state or context that changes when a mutation occurs
  useEffect(() => {
    refetch();
  }, [requestProcessed]); // useEffect depends on `requestProcessed`

  const handleSearch = (text) => {
    setSearchKeyword(text.toLowerCase());
  };

  const filteredFriends =
    data?.seeFriends?.friends.filter((friend) =>
      friend.username.toLowerCase().includes(searchKeyword)
    ) || [];

  const transformedData = filteredFriends.map((friend) => {
    return {
      id: friend.username,
      username: friend.username,
      avatar: friend.avatar
        ? { uri: friend.avatar }
        : require("../assets/images/profile8.png"),
      lastUpdate: formatDate(friend.lastUpdate),
    };
  });

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <UserList
        data={transformedData}
        friend={true}
        onSearch={handleSearch}
        onAddFriend={null}
        loading={loading}
        addingFriendUsername={null}
        refreshing={refreshing} // Pass the state
        onRefresh={onRefresh} // Pass the function
      />
    </Container>
  );
};

export default FriendsTab;
