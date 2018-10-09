import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import '../pianoApp.css'


const PLAY_QUERY = gql`
  query GetSong {
    selectedSong @client {
      title
      keysPlayed
    }
  }
`;

const SongPlayer = (audio) => (
  <Query query={PLAY_QUERY} >
    {({ loading, error, data }) => {
      console.log(data.selectedSong);
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      let noData = true;
      if(typeof data.selectedSong !== "object")
          noData = false;
      
      // main player function set with play button
      let playIn;
      //
      return (
        <table className='playerTable'>
          <tr>
            <td>
              <button className='player' onClick={(e)=>{
                if (!noData) {
                  alert("You have to select a song before");
                  return;
                }
                var i = 1;
                audio[data.selectedSong.keysPlayed[0]].play();
                function play () {
                  audio[data.selectedSong.keysPlayed[i]].play();
                  i++;
                  if(! (i < data.selectedSong.keysPlayed.length)) {
                    clearInterval(playIn);
                  }
                }
                playIn = setInterval(play, 1000);
              }}>
                PLAY
              </button>
            </td>
            <td>
              <button className='buttonStop' onClick={(e)=>{
                if (!noData) 
                  return;
                  clearInterval(playIn);
              }}>
                STOP
              </button>
            </td>
          </tr>
        </table>
      );
    }}
  </Query>
);


export default SongPlayer;