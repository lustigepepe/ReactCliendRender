import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query, Subscription } from 'react-apollo';
import SelectedSong from './selectedSong'
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Mutation } from "react-apollo";
import '../pianoApp.css';

const SONG_Query = gql`
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
  <Query query={SONG_Query}>
    {({ subscribeToMore,loading, error, data }) => {
                    console.log('updateQuery');
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
         <SelectedSong key={data.id} {...data} 
              subscribeToNewSongs={() => 
                subscribeToMore({
                  document: SONG_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newFeedItem = subscriptionData.data.songAdded;
                    return Object.assign({}, prev, {
                      entry: {
                        comments: [newFeedItem, ...prev.entry.comments]
                      }
                    });
                  }
                })
            }
         />
      );
    }}
  </Query>
);

export default SongList;