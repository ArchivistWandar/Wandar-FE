import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const currentUsernameVar = makeVar("");

export const TOKEN = "token";

export const logUserIn = async (token, username) => {
  await AsyncStorage.setItem(TOKEN, token);
  await AsyncStorage.setItem("username", username); // Save username
  isLoggedInVar(true);
  tokenVar(token);
  currentUsernameVar(username);
};

export const logUserOut = async (client) => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem("username"); // Remove username
  isLoggedInVar(false);
  tokenVar(null);
  currentUsernameVar(""); // Reset username
  client.resetStore(); // Reset the store on logout
};

const uploadHttpLink = createUploadLink({
  uri: "https://able-caryn-wandar-archivist.koyeb.app/graphql",
  headers: {
    "apollo-require-preflight": true,
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
