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

const SongPlayer = (props) => (
  <Query query={PLAY_QUERY} >
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      if(typeof data.selectedSong === "object") {
        console.log("data.selectedSong");

      

      }
        {/* <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} /> */}
      return (
        <table className='playerTable'>
          <tr>
            <td>
              <button className='player' onClick={(e)=>this.recordClick(e)}>
                PLAY
              </button>
            </td>
            <td>
              <button className='buttonStop' onClick={(e)=>this.recordClick(e)}>
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