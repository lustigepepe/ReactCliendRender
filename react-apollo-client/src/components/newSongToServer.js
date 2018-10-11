import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import '../pianoApp.css';

const UPDATE_SONG = gql`
  mutation updateSong($title: String!, $keysPlayed: [Int]) {
    updateSong(title: $title, keysPlayed: $keysPlayed) {
      id
      title
      keysPlayed
    }
  }
`;

const NewSongToServer = ({...recording}) => {
  let input;
  let mistake = false;
  return (
    <Mutation mutation={UPDATE_SONG}>
      {(updateSong) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log('keys');
              if(input.value.length < 1) {
                alert("Please choose a song name");
                mistake = true;
              }
              
              console.log(recording.keys.length);
              if(recording.keys.length < 1) {
                alert("Please start recording");
                mistake = true;
              }  
              if(recording.isRecording) {
                alert("Please stop recording");
                mistake = true;
              }
              if(!mistake) {
                updateSong({ variables: { title: input.value, keysPlayed: recording.keys } });
                input.value = "";
                mistake = false;
              }
            }}
          >
            <label>
              Choose a song name to save:
              <input
                ref={node => {
                  input = node;
                }}
              />
            </label>
              <button className="saveButton">SAVE</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default NewSongToServer;