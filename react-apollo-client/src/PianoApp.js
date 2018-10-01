import React from 'react';
import ReactDOM from 'react-dom';
import createAudioList from './helper/prepareAudio.js';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {SongList} from './graphql/querys.js';
import './pianoApp.css';


function Square(props) {
  return ( < button className = { props.className } onClick = { props.onClick } > { props.value } <
    /button>
  );
}

class KeyBoard extends React.Component {
 
  drawKey(i) {
    if (i % 2 === 0) {
      if (i <= 4)
        return "thinSquare";
      if (i >= 8)
        return "square";
    }
    if (i % 2 !== 0) {
      if (i >= 7) {
        return "thinSquare";
      }
      if (i <= 5)
        return "square";
    }
    return "square";
  }

  renderKey(i) {
    return ( <Square className = { this.drawKey(i) } 
              onClick = {() => this.props.onClick(i)} 
            />
    );
  }
  render() {
    var rows = [];
    for (let i = 1; i < 13; ++i)
      rows.push(this.renderKey(i));
    return ( <div className = "board-row" > { rows } </div>
    );
  }
}
const typeDefs = gql `
    type Song {
        id: ID!
        title: String
        keysPlayed: [String]
    }

    type Query {
      songs: [Song]
      say:String!
    }`


class PianoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(12).fill(null),
      newSongName: null,
      recordOn: true,
      dbSongNumber: null,
      playSongWithID: 0
    };

    this.audioListKeys = createAudioList();

  }
  setNewSongName(event) {
    console.log("newSongName !:: " +this.state.newSongName);
    this.setState({newSongName: event.target.value});
  }


  handleKeyClick(i) {
    this.audioListKeys[--i].play();
  }
  
  recordClick() {
    console.log("Toggle !:: " +this.state.recordOn);
    this.setState(prevState => ({
      recordOn: !prevState.recordOn
    }));
  }

  getDBSong() {
    // this.setState({songName: event.target.value});
    // this.setState(prevState => ({
    //   recordOn: !prevState.recordOn
    // }));

  }

  // const fromDBSongs = [1, 2, 3, 4, 5];
  // const songList = fromDBSongs.map((song) =>
  //   <li>{song}</li>
  // );
  //TODO
  // connection DB and etc.

  
  // free me
  render() {
    // const keys = this.state.keys;
    // const currentKey = keys[this.state.key];
    return (
            <div className = "App-KeyBoard"> 
              <div className="keyBoardGrid">
                <KeyBoard onClick={i => this.handleKeyClick(i)}/>
              </div>
              <div>
              <component/>
              </div>
              <table>
              <tr>
                <label>
                  Start record:
                  <button onClick={(e)=>this.recordClick(e)}>
                      {this.state.recordOn ? 'ON' : 'OFF'}
                  </button>
                </label>
              </tr>
              <tr>
                <label>
                  Choose a song name to save:
                  <input value={this.state.newSongName} onChange={(e)=>this.setNewSongName(e)} />
                </label>
              </tr>
              <tr className="emptyRow"></tr>
              <tr>
                <label>
                  Play the song with number:               
                  <input className="songNumber" value={this.state.dbSongNumber} onChange={(e)=>this.getDBSong(e)} />
                </label>
              </tr>
              <tr>
                <label>
                  Play a Song from the dropdown list: 
                  {/* <ul>{songList}</ul> */}
                  <SongList/>
                </label>
              </tr>
              </table>
            </div>
    );
  }
} //END

export default PianoApp;