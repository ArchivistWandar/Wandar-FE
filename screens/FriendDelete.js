import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  View,
  RefreshControl,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Container, LoadingContainer, formatDate } from "../components/Shared";
import { SEE_FRIENDS } from "./FriendsTab";
import { currentUsernameVar } from "../apollo";
import { RequestButton, RequestButtonContainer } from "./FollowRequests";

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

const FriendItem = ({ friend, onUnfollow }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Image
        source={friend.avatar}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{ flex: 1, fontFamily: "JostSemiBold", color: "white" }}>
        {friend.username}
      </Text>
      <RequestButtonContainer
        color="rgba(255,255,255,0.1)"
        onPress={() => onUnfollow(friend.username)}
      >
        <RequestButton>Unfollow</RequestButton>
      </RequestButtonContainer>
    </View>
  );
};

const FriendDelete = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_FRIENDS, {
    variables: { username: currentUsernameVar() },
  });

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    onCompleted: () => {
      // Refetch the list after a successful unfollow
      refetch();
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleUnfollow = (username) => {
    unfollowUser({ variables: { username } });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  if (data?.seeFriends.length === 0) {
    return (
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
    );
  }

  const transformedData = data?.seeFriends?.friends.map((friend) => ({
    id: friend.username,
    username: friend.username,
    avatar: friend.avatar
      ? { uri: friend.avatar }
      : require("../assets/images/profile8.png"),
    lastUpdate: formatDate(friend.lastUpdate),
  }));

  return (
    <Container>
      <FlatList
        style={{ marginTop: "20%" }}
        data={transformedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem friend={item} onUnfollow={handleUnfollow} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      />
    </Container>
  );
};

export default FriendDelete;
