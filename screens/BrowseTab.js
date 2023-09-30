import React from "react";
import { Container } from "../components/Shared";
import UserList from "../components/friendsNav/UserList";

const browseData = [
  {
    id: "3",
    username: "minji",
    lastUpdate: "Sep 21, 2023",
    image: require("./../assets/images/profile10.png"),
  },
  {
    id: "4",
    username: "iamtaylor",
    lastUpdate: "Aug 15, 2023",
    image: require("./../assets/images/profile8.png"),
  },
  {
    id: "5",
    username: "hehe",
    lastUpdate: "Aug 8, 2023",
    image: require("./../assets/images/profile9.png"),
  },
  {
    id: "6",
    username: "ariana",
    lastUpdate: "Aug 30, 2023",
    image: require("./../assets/images/profile11.png"),
  },
];

const BrowseTab = () => {
  return (
    <Container>
      <UserList data={browseData} />
    </Container>
  );
};

export default BrowseTab;
