import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../pianoApp.css';

const PLAY_SONG = gql `
  mutation setPlaySong($title: String!, $keysPlayed: [String]) {
    setPlaySong(title: $title, keysPlayed: $keysPlayed) @client {
      id
    }
  }
  `;



class PlaySong extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewSongs();
  }

  render() {
    return (
      // const playSong = ({...data}) => (
        <Mutation mutation={ PLAY_SONG }>
          { 
            setPlaySong => {
            return (
              <select className="dropDown"  onChange={e=>{
                let title = e.target.options[e.target.selectedIndex].getAttribute('title');
                let keys = e.target.options[e.target.selectedIndex].getAttribute('keys');
                let keysPlayed = [];
                let temp = '';
                for (let i of keys) {
                  if(i !== ',')
                    temp += i;
                  else {
                    keysPlayed.push(temp);
                    temp = '';
                  }
                }
                keysPlayed.push(temp);
                setPlaySong({ variables: { title: title, keysPlayed: keysPlayed } });
              }}>
                {
                  this.props.data.songs.map(song => (
                    <option key={song.id} keys={song.keysPlayed} title={song.title} id={song.id}
                    > 
                      {song.title}
                    </option>
                  ))
                }
              </select>
            );
          }}
        </Mutation>
// );

    );
  }
}
export default PlaySong;
