import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_SONG = gql `
  mutation addSong($title: String!, $keysPlayed: [String]) {
    addTodo(title: $title, keysPlayed: $keysPlayed) @client {
      id
    }
  }
`;

{/* <Mutation mutation={ADD_SONG} variables={{ id, title, keysPlayed }}> */}
// {addSong => (
const SelectedSong = ({ id, title, keysPlayed }) => (
      <option>
        {title}
      </option>
);
// )}
//   </Mutation>

export default SelectedSong;
