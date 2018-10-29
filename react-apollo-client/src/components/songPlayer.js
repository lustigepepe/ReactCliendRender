import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import '../pianoApp.css'


const GET_PLAY_SONG = gql`
  query GetSong {
    getPlaySong @client {
      title
      keysPlayed
    }
  }
`;

const SongPlayer = (audio) => (
  <Query query={GET_PLAY_SONG} >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      let noData = true;
      if(typeof data.getPlaySong !== "object")
          noData = false;
      // main player function set with the play button
      let playIn;
      //
      return (
        <table className='playerTable'>
          <tbody>               
            <tr>
              <td>
                <button className='player' onClick={(e)=>{
                  if (!noData) {
                    alert("Please select a song");
                    return;
                  }
                  console.log('Songplayer');
                  console.log(data.getPlaySong.keysPlayed);
                  var i = 1;
                  audio[data.getPlaySong.keysPlayed[0]].play();
                  function play () {
                    if (!(data.getPlaySong.keysPlayed.length > 1))
                      return;
                    audio[data.getPlaySong.keysPlayed[i]].play();
                    i++;
                    if(! (i < data.getPlaySong.keysPlayed.length)) {
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
                  <span>
                  STOP
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }}
  </Query>
);

export default SongPlayer;