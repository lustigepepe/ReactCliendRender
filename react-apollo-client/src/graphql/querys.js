import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import '../pianoApp.css';


const GET_SONGS = gql`
  {
    songs {
      id,
      title
    }
  }
`;

const SongList = ({ onSongSelected, props }) => (
  <Query query={GET_SONGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select className="dropDown" name="song" onChange={onSongSelected}>
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

export {SongList};