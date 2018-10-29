import React from 'react';
import createAudioList from './helper/prepareAudio';
import SongQuery from './components/songQuery';
import SongPlayer from './components/songPlayer';
import './pianoApp.css';
import Test from './components/test';
import NewSongToServer from './components/newSongToServer';

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
    return ( <Square className = { this.drawKey(i)} key = {i} 
              onClick = {() => this.props.onClick(i)} 
            />
    );
  }
  render() {
    var rows = [];
    for (let i = 1; i < 13; ++i)
      rows.push(this.renderKey(i));
      return ( <div className = "board-row"> { rows } </div>
    );
  }
}

class PianoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordOn: false
    };
    this.recording = {isRecording: true, keys:[]};
    this.audioListKeys = createAudioList();
  }
  
  handleKeyClick(i) {
    this.audioListKeys[--i].play();
    if(this.state.recordOn) 
      this.recording.keys.push(i);
    else
      this.recording.keys = [];

  }

  recordSaved() {
    this.setState({ recordOn: false });
    console.log(this.state.recordOn);
  }

  recordClick() {
    this.setState(prevState => ({
      recordOn: !prevState.recordOn
    }));
    this.recording.isRecording = this.state.recordOn;
  }
  render() {
 
    return (
            <div className = "App-KeyBoard"> 
              <div className="keyBoardGrid">
                <KeyBoard onClick={i => this.handleKeyClick(i)}/>
              </div>
              <table>
              <tbody>
                <tr>
                  <td>
                  <label>
                    Start record:
                    <button onClick={(e)=>this.recordClick(e)}>
                        {this.state.recordOn ? 'RUNNING' : 'ON'}
                    </button>
                  </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <NewSongToServer {...this.recording} onClick={(e)=>this.recordSaved(e)}/>   
                  </td>
                </tr>
                <tr className="emptyRow"></tr>
                <tr>
                  <td>
                    <label>
                      Play a song from the dropdown list: 
                      <SongQuery/>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <SongPlayer {...this.audioListKeys}/>
                  </td>
                </tr>
                </tbody>
              </table>
              <Test/>
            </div>
    );
  }
} //END

export default PianoApp;