import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import '../pianoApp.css';

const New_SONG = gql`
  mutation newSong($title: String!, $keysPlayed: [Int]) {
    newSong(title: $title, keysPlayed: $keysPlayed) {
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
    <Mutation mutation={New_SONG}>
      {(newSong) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if(input.value.length < 1) {
                alert("Please choose a song name");
                mistake = true;
              }
              if(recording.keys.length < 1) {
                alert("Please start recording");
                mistake = true;
              }  
              // if(recording.isRecording) {
              //   alert("Please stop recording");
              //   mistake = true;
              // }
              if(!mistake) {
                newSong({ variables: { title: input.value, keysPlayed: recording.keys } });
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
              <button className="saveButton" onClick = { recording.onClick } >SAVE</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default NewSongToServer;
