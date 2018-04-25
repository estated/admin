import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from "node-fetch";

const API_DEV_PATH = 'http://localhost:3001/graphql';

const ApiCli = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: (process) ? process.env.API_DEV_PATH || API_DEV_PATH : API_DEV_PATH,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default ApiCli;