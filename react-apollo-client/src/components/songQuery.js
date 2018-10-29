import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PlaySong from './playSong'

import '../pianoApp.css';

const SONGS_Query = gql`
  {
    songs{
      id,
      title,
      keysPlayed
    }
  }
`;

const SONG_SUBSCRIPTION = gql`
  subscription songAdded {
    songAdded {
      id,
      title,
      keysPlayed
    }
  }
`;

const SongList = () => (
  <Query query={SONGS_Query}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      console.log(data);
      return (
        <PlaySong key={data.id} data={data}
          subscribeToNewSongs={() =>
            subscribeToMore({
              document: SONG_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newSongItem = subscriptionData.data.songAdded;
                return {
                    songs: [newSongItem, ...prev.songs]
                };
              }
            })
          }
        />
      );
    }}
  </Query>
);

export default SongList;