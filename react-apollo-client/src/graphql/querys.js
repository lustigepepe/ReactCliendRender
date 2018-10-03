import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '../pianoApp.css';

const cache = new InMemoryCache();

const SONG_Query = gql`
  {
    songs {
      id,
      title,
      keysPlayed
    }
  }
`;

// const SONG_Query_Explicit = gql`
//   query Songs($title: String) {
//       songs(title: $title) {
//         id,
//         keysPlayed
//       }
//     }
// `;
// const SONG_Query_Explicit = gql`
// {
//   songByTitle(title) {
//     keysPlayed,
//     title
//   }
// }
// `;
// const PlaySong = ({ breed }) => (
//   <Query query={SONG_Query} variables={{ breed }}>
//     {({ loading, error, data }) => {
//       if (loading) return null;
//       if (error) return `Error!: ${error}`;

//       return (
//         <Button src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
//       );
//     }}
//   </Query>
// );

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


// const SongPlayer = graphql(SONG_Query_Explicit, {
//   options: props => ({ variables: { title: props.title } }),
//   props: data => {
//     keys: data.keysPlayed
//     // id: data.id
//   }
// })(PlayComp);

// function PlayComp(props) {
//   return (
//     <button onClick={props.onClick}>
//       PLAY
//     </button>
//   );
// }

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

export {SongList, SongPlayer};