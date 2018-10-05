import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {SONG_Query} from './songQuery';




const SongPlayer = (props) => (
  <Query query={SONG_Query} >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
        {/* <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} /> */}

      return (
        <p>uhuhhuhu</p>
      );
    }}
  </Query>
);


export default SongPlayer;