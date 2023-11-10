import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://able-caryn-wandar-archivist.koyeb.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
