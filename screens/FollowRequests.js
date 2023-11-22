import React, { useContext, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import styled from "styled-components/native";
import { Container, LoadingContainer } from "../components/Shared";
import { colors } from "../colors";
import { RequestProcessedContext } from "../components/RequestProcessedProvider";
import { SEE_FRIENDS } from "./FriendsTab";
import { currentUsernameVar } from "../apollo";
import { Skeleton } from "moti/skeleton";

// GraphQL Query
const SEE_FRIEND_REQUEST = gql`
  query SeeFriendRequest {
    seeFriendRequest {
      requestSender {
        username
        avatar
      }
      createdAt
    }
  }
`;

const ACCEPT_OR_DECLINE_FRIEND_REQUEST = gql`
  mutation AcceptOrDeclineFriendRequest(
    $username: String!
    $isAccepting: Boolean!
  ) {
    acceptOrDeclineFriendRequest(
      username: $username
      isAccepting: $isAccepting
    ) {
      ok
    }
  }
`;

const FollowRequests = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const { data, loading, error, refetch } = useQuery(SEE_FRIEND_REQUEST, {
    fetchPolicy: "network-only",
  });
  const { setRequestProcessed } = useContext(RequestProcessedContext);
  // In your mutation
  const [acceptOrDeclineFriendRequest] = useMutation(
    ACCEPT_OR_DECLINE_FRIEND_REQUEST,
    {
      update(cache, { data: { acceptOrDeclineFriendRequest } }) {
        if (acceptOrDeclineFriendRequest.ok) {
          const existingFriends = cache.readQuery({
            query: SEE_FRIENDS,
            variables: { username: currentUsernameVar() },
          });

          // Modify `existingFriends` as needed, perhaps removing or adding a friend
          // Then write it back to the cache
          cache.writeQuery({
            query: SEE_FRIENDS,
            variables: { username: currentUsernameVar() },
            data: { ...existingFriends /* modified data */ },
          });
        }
      },
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleImageLoadStart = (username) => {
    setLoadingImages((prev) => ({ ...prev, [username]: true }));
  };

  const handleImageLoadEnd = (username) => {
    setLoadingImages((prev) => ({ ...prev, [username]: false }));
  };

  const handleConfirm = (username) => {
    acceptOrDeclineFriendRequest({
      variables: { username, isAccepting: true },
      refetchQueries: [
        { query: SEE_FRIEND_REQUEST },
        { query: SEE_FRIENDS, variables: { username: currentUsernameVar() } },
      ],
    })
      .then((response) => {
        if (response.data.acceptOrDeclineFriendRequest.ok) {
          setRequestProcessed((prev) => !prev);
          alert(`Friend request from ${username} accepted.`);
        } else {
          alert(`Failed to accept the friend request from ${username}.`);
        }
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}`);
      });
  };

  const handleDelete = (username) => {
    acceptOrDeclineFriendRequest({
      variables: { username, isAccepting: false },
      refetchQueries: [
        { query: SEE_FRIEND_REQUEST },
        { query: SEE_FRIENDS, variables: { username: currentUsernameVar() } },
      ],
    })
      .then((response) => {
        if (response.data.acceptOrDeclineFriendRequest.ok) {
          setRequestProcessed((prev) => !prev);
          alert(`Friend request from ${username} declined.`);
        } else {
          alert(`Failed to decline the friend request from ${username}.`);
        }
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}`);
      });
  };

  if (loading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  if (error) return <Text>Error: {error.message}</Text>;
  if (data?.seeFriendRequest.length === 0) {
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

  return (
    <Container>
      <RequestList
        data={data?.seeFriendRequest}
        keyExtractor={(item, index) => String(index)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        renderItem={({ item }) => {
          const isLoading = loadingImages[item.requestSender.username];
          const avatarUri = item.requestSender.avatar
            ? { uri: item.requestSender.avatar }
            : require("./../assets/images/profile8.png");
          return (
            <RequestItem>
              {isLoading ? (
                <Skeleton colorMode="dark" width={50} height={50} radius={25} />
              ) : null}
              <ProfileImage
                source={avatarUri}
                onLoadStart={() =>
                  handleImageLoadStart(item.requestSender.username)
                }
                onLoadEnd={() =>
                  handleImageLoadEnd(item.requestSender.username)
                }
                style={isLoading ? { position: "absolute", opacity: 0 } : {}}
              />
              <Username>{item.requestSender.username}</Username>
              <ButtonsContainer>
                <RequestButtonContainer
                  color={colors.blue}
                  onPress={() => handleConfirm(item.requestSender.username)}
                >
                  <RequestButton>Confirm</RequestButton>
                </RequestButtonContainer>
                <RequestButtonContainer
                  color="rgba(255,255,255,0.1)"
                  onPress={() => handleDelete(item.requestSender.username)}
                >
                  <RequestButton>Delete</RequestButton>
                </RequestButtonContainer>
              </ButtonsContainer>
            </RequestItem>
          );
        }}
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

export const RequestButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.color || "white"};
  padding: 4px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const RequestButton = styled.Text`
  font-family: "JostMedium";
  color: white;
  font-size: 12px;
`;

export default FollowRequests;
