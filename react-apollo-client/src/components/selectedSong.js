import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../pianoApp.css';

const ADD_SONG = gql `
  mutation addSong($title: String!, $keysPlayed: [String]) {
    addSong(title: $title, keysPlayed: $keysPlayed) @client {
      id
    }
  }
  `;
  
const SelectedSong = ({ ...data }) => (
  <Mutation mutation={ ADD_SONG }>
    { addSong => {
      return (
        <select className="dropDown"  onChange={e=>{
          let title = e.target.options[e.target.selectedIndex].getAttribute('title');
          let keys = e.target.options[e.target.selectedIndex].getAttribute('keys');
          let keysPlayed = [];
          for (let i in keys) {
            if (keys.charAt(i) !== ',')
              keysPlayed.push(keys.charAt(i));
          }
          // console.log(title);  // true
          // console.log(keysPlayed);  // true
          addSong({ variables: { title: title, keysPlayed: keysPlayed } });
        }}
        >
          {
            data.songs.map(song => (
              <option keys={song.keysPlayed} title={song.title}
              > 
                {song.title}
              </option>
            ))
          }
        </select>
      );
    }}
  </Mutation>
);

export default SelectedSong;
