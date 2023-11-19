import styled from "styled-components/native";
import { colors } from "../colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
