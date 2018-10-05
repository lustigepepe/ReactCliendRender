import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query, Subscription } from 'react-apollo';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Mutation } from "react-apollo";
import '../pianoApp.css';

const SONG_Query = gql`
  {
    songs {
      id,
      title,
      keysPlayed
    }
  }
`;

const SongList = (props) => (
  <Query query={SONG_Query}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <select className="dropDown" name="song" onChange={props.onChange}>
          {
            data.songs.map(song => (
            <option key={song.id} value={song.title}>
              {song.title}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

export default SongList;
// export {SONG_Query};