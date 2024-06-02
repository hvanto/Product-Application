import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const link = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
