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
  return (
    <Mutation mutation={UPDATE_SONG}>
      {(updateSong) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              // console.log(recording.keys);
              console.log('keys');
              if(input.value === "")
                alert("Please choose a song name");
              if(typeof recording.keys === 'undefined' && recording.keys.length < 1)
                alert("Please stop recording");
              updateSong({ variables: { title: input.value, keysPlayed: recording.keys } });
              input.value = "";
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