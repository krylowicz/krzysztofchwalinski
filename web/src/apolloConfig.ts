import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_ENDPOINT } from './constants';

const cache = new InMemoryCache();
const link = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
  cache,
  link,
});