import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import PianoApp from './pianoApp';
import registerServiceWorker from './registerServiceWorker';
import  {typeDefs, resolvers} from './localCache/localQReMutation';
import {SONG_Query} from './components/songQuery';

// import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import './index.css';

const cache = new InMemoryCache({
  // dataIdFromObject: object => {
  //   switch (object.__typename) {
  //     case 'Song': return object.title; // use `title` as the primary key
  //     default: return defaultDataIdFromObject(object); // fall back to default handling
  //   }
  // }
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
// const httpLink = new HttpLink({
  //   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
  // });
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const stateLink = withClientState({ resolvers, typeDefs, cache});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
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
  cache,
  link: ApolloLink.from([stateLink, link]),
  // link:  httpLink
  defaultOptions: defaultOptions
});


const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
);

//Start
// console.log(cache);
// const newSong = {
//   id: 0,
//   title: 'Test',
//   keysPlayed: ['A'],
//   __typename: 'SongItem'
// };
// const data = {
//   songs: [newSong]
// };
// client.writeData({ data });
// console.log(cache);

// const newSong2 = {
//   id: 2,
//   title: 'BBBBBB',
//   keysPlayed: ['A'],
//   __typename: 'SongIt'
// };
// const data2 = {
//   songs: [newSong2]
// };
// client.writeData({ data2 });



// const query = gql`
// query {
//   songs @client {
//     id
//     title
//     keysPlayed
//   }
// }
// `;

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


// console.log(cache);
// const backData = client.readFragment({ fragment, id});
// console.log(backData); 

// const backData2 = client.readQuery({query});
// console.log(backData2);
// }
// i++; 
// End

// const App = () => (
//   <div>
//     <TodoForm />
//     <TodoList />
//     <Footer />
//   </div>
// );


// ReactDOM.render(
//   <ApolloProvider client={client}>
//     {/* <App/> */}
//     <ExchangeRates/>
//   </ApolloProvider>,
//   document.getElementById('root'),
// );

const App = () => (
  <ApolloProvider client={client}>    
    <PianoApp/>
  </ApolloProvider>
);





ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<PianoApp />, document.getElementById('root'));
registerServiceWorker();
