import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import PianoApp from './pianoApp';
import registerServiceWorker from './registerServiceWorker';
// import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';

import './index.css';


const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Song': return object.title; // use `title` as the primary key
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <PianoApp /> 
  </ApolloProvider>,
  document.getElementById('root'),
);

const App = () => (
  <ApolloProvider client={client}>    
    <PianoApp/>
  </ApolloProvider>
);



const ExchangeRates = () => (
  <Query
    query={gql`
      {
        say
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return  (
        <div >
          <p>{data.say}</p>
        </div>
      );
    }}
  </Query>
);

client.query({
  query: gql`
  {
    songs {
      id,
      title,
      keysPlayed
    }
  }
  `,
})
  .then(data => {

    console.log(data);
    client.writeQuery({ query: query, data: data });

  });
//   .catch(error => console.error(error));
const query = gql`
    {
      songs {
        id,
        title,
        keysPlayed
      }
    }
`;
// const data = client.readQuery({ query });
// console.log(data)
// const { songs } = client.readQuery({
//   query: gql`
//    {
//       songs {
//         id,
//         title,
//         keysPlayed
//       }
//    }
//   `,
// });




ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<PianoApp />, document.getElementById('root'));
registerServiceWorker();
