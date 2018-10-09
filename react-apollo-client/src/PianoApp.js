import React from 'react';
import ReactDOM from 'react-dom';
import createAudioList from './helper/prepareAudio.js';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import SongQuery from './components/songQuery';
import SongPlayer from './components/songPlayer';
// import {SongList, SongPlayer } from './graphql/querys.js';
import { withApollo } from 'react-apollo';
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

class PianoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(12).fill(null),
      chosenTitle: null,
      keysPlayed: null,
      chosenTitle: null
    };

    this.audioListKeys = createAudioList();
  }
  setNewSongName(event) {
    console.log("newSongName !:: " + this.state.newSongName);
    this.setState({newSongName: event.target.value});
  }


  handleKeyClick(i) {
    this.audioListKeys[--i].play();
  }
  playSongClick(event) {
    let data = event.target.value;
    console.log('playSongClick');
    console.log(data);
    // this.audioListKeys[--i].play();
  }


  recordClick() {
    console.log("Toggle !:: " +this.state.recordOn);
    this.setState(prevState => ({
      recordOn: !prevState.recordOn
    }));
  }

  chosenSong(event) {
    this.setState({chosenTitle: event.target.value});
    console.log('chosenSong@§$%!!');    
    console.log(event.target.value);

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
                  <input onChange={(e)=>this.setNewSongName(e)} />
                </label>
              </tr>
              <tr className="emptyRow"></tr>
              <tr>
                <label>
                  Play a song from the dropdown list: 
                  {/* <ul>{songList}</ul> */}
                  <SongQuery onChange={(e)=>this.chosenSong(e)}/>
                </label>
              </tr>
              <tr>
                <SongPlayer {...this.audioListKeys}/>
              </tr>
              </table>
            </div>
    );
  }
} //END

export default PianoApp;