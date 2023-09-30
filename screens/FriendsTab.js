import React from "react";
import { Container } from "../components/Shared";
import UserList from "../components/friendsNav/UserList";

const friendsData = [
  {
    id: "1",
    username: "jenniee",
    lastUpdate: "Sep 29, 2023",
    image: require("./../assets/images/profile6.png"),
  },
  {
    id: "2",
    username: "iamlilly",
    lastUpdate: "Aug 2, 2023",
    image: require("./../assets/images/profile5.png"),
  },
];

const FriendsTab = () => {
  return (
    <Container>
      <UserList data={friendsData} friend={true} />
    </Container>
  );
};

export default FriendsTab;
