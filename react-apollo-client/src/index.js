import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import PianoApp from './pianoApp';
import registerServiceWorker from './registerServiceWorker';
import { typeDefs, resolvers } from './localCache/localQReMutation';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import './index.css';

const cache = new InMemoryCache({

});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});


const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});


const link = split(

  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const stateLink = withClientState({ resolvers , cache, typeDefs});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore'
  },
  mutate: {
    errorPolicy: 'all'
  }
}


const client = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([stateLink, link]),
  defaultOptions: defaultOptions
});


// client.subscribe();



const id = `SongItem:0`;
// let i = 0;
// console.log('IntCOunt!!!:: '+ i);
// if(i > 1) {

  const fragment = gql`
  fragment titleSong on SongItem {
    title
    id
  }
`;



const App = () => (
  <ApolloProvider client={client}>    
    <PianoApp/>
  </ApolloProvider>
);





ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<PianoApp />, document.getElementById('root'));
registerServiceWorker();
