import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../pianoApp.css';

const SELECTED_SONG = gql `
  mutation playSong($title: String!, $keysPlayed: [String]) {
    playSong(title: $title, keysPlayed: $keysPlayed) @client {
      id
    }
  }
  `;
const SelectedSong = ({...data}) => (
  <Mutation mutation={ SELECTED_SONG }>
    { 
      playSong => {
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
          playSong({ variables: { title: title, keysPlayed: keys } });
        }}
        >
          {
            data.songs.map(song => (
              <option keys={song.keysPlayed} title={song.title} id={song.id}
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
