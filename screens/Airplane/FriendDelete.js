import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Container,
  LoadingContainer,
  formatDate,
} from "../../components/Shared";
import { SEE_FRIENDS } from "./FriendsTab";
import { currentUsernameVar } from "../../apollo";
import { RequestButton, RequestButtonContainer } from "../FollowRequests";

const DELETE_FRIEND = gql`
  mutation DeleteFriend($username: String!) {
    deleteFriend(username: $username) {
      ok
      error
    }
  }
`;

const FriendItem = ({ friend, onUnfollow, isUnfollowing }) => {
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
        disabled={isUnfollowing}
      >
        {isUnfollowing ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <RequestButton>Unfollow</RequestButton>
        )}
      </RequestButtonContainer>
    </View>
  );
};

const FriendDelete = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_FRIENDS, {
    variables: { username: currentUsernameVar() },
  });
  const [unfollowingUsername, setUnfollowingUsername] = useState(null);

  const [unfollowUser] = useMutation(DELETE_FRIEND, {
    onCompleted: () => {
      refetch();
      setUnfollowingUsername(null); // Reset after unfollowing
    },
    onError: () => {
      setUnfollowingUsername(null); // Reset in case of error
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleUnfollow = (username) => {
    Alert.alert(
      `Unfollow ${username}`,
      `Are you sure you want to unfollow ${username}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Unfollow",
          onPress: () => {
            setUnfollowingUsername(username); // Set the currently unfollowing username
            unfollowUser({ variables: { username } });
          },
        },
      ]
    );
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
      : require("../../assets/images/profile8.png"),
    lastUpdate: formatDate(friend.lastUpdate),
  }));

  return (
    <Container>
      <FlatList
        style={{ marginTop: "20%" }}
        data={transformedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem
            friend={item}
            onUnfollow={handleUnfollow}
            isUnfollowing={item.username === unfollowingUsername}
          />
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
