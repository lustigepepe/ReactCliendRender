import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import PianoApp from './pianoApp';
import registerServiceWorker from './registerServiceWorker';
import  {typeDefs, resolvers} from './localCache/localQReMutation.js';

// import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';


import './index.css';


const cache = new InMemoryCache({
  // dataIdFromObject: object => {
  //   switch (object.__typename) {
  //     case 'Song': return object.title; // use `title` as the primary key
  //     default: return defaultDataIdFromObject(object); // fall back to default handling
  //   }
  // }
});


const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const stateLink = withClientState({ resolvers, typeDefs, cache});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
  // link:  httpLink
});


// const ExchangeRates = () => (
//   <Query
//     query={gql`
//       {
//         rates(currency: "USD") {
//           currency
//           rate
//         }
//       }
//     `}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.rates.map(({ currency, rate }) => (
//         <div key={currency}>
//           <p>{`${currency}: ${rate}`}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );

//Start
// const newSong = {
//   id: 0,
//   title: 'FirstSong',
//   keysPlayed: ['A'],
//   __typename: 'SongItem'
// };
// const data = {
//   songs: [newSong]
// };
// client.writeData({ data });


// const query = gql`
// query {
//   songs @client {
//     id
//     title
//     keysPlayed
//   }
// }
// `;


// const backData = client.readQuery({ query });
// console.log(backData);
//End

// const App = () => (
//   <div>
//     <TodoForm />
//     <TodoList />
//     <Footer />
//   </div>
// );


// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App/>
//     {/* <ExchangeRates/> */}
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
