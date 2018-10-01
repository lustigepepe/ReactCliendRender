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
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';

import './index.css';


const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
  dataIdFromObject: object => object.id,
});

function TodoApp({ data: { songs } }) {
  return (
    <ul>
    {songs.map(({ id, title }) => (
      <li key={id}>{title}</li>
    ))}
  </ul>
  );
}

const QUERY_USER = gql`
  {
    song {
      title
    }
  }
`;
{({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return  (
    <div >
      <p>{data.say}</p>
    </div>
  );
}}

const Hello = ({ data:{  loading, song } }) => (
  loading ? <p>Loading…</p> :
  <h1>Hello {song.title}</h1>
);
const TeStt = graphql(QUERY_USER)(Hello);




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


const GET_SONGS = gql`
  {
    songs {
      id,
      title
    }
  }
`;

const SongList = ({ onSongSelected }) => (
  <Query query={GET_SONGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="song" onChange={onSongSelected}>
          {data.songs.map(song => (
            <option key={song.id} value={song.title}>
              {song.title}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);



ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<PianoApp />, document.getElementById('root'));
registerServiceWorker();
