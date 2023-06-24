// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setClient } from 'svelte-apollo';

// Apollo Client setup
const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});


