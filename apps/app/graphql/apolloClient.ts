import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:5005/graphql',
  cache: new InMemoryCache(),
});
