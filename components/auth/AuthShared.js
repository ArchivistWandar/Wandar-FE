import { styled } from "styled-components/native";

export const AuthTitle = styled.Text`
  margin-top: ${(props) => (props.profile ? "120px" : "140px")};
  margin-left: 20px;
  margin-bottom: 50px;
  color: #fff;
  font-family: "JostMediumItalic";
  font-size: 24px;
`;

export const AuthTextBox = styled.View`
  padding: ${(props) => (props.login ? "18px" : "12px")} 17px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.disabled ? "#F13C3C" : "white")};
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: ${(props) => (props.login ? "20px" : "0px")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AuthTextInfo = styled.Text`
  color: white;
  font-family: "JostMedium";
  font-size: 11px;
  text-decoration-line: underline;
  margin-bottom: 5px;
`;

export const AuthButtonContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
`;

export const AuthTextInput = styled.TextInput`
  font-family: "JostMediumItalic";
  font-size: 14px;
  color: white;
  width: 250px;
`;

export const AuthErrorMessage = styled.Text`
  height: 20px;
  color: #ff4f4f;
  font-family: "JostRegular";
  font-size: 12px;
  margin-top: 5px;
  margin-left: 15px;
  margin-bottom: 10px;
`;
