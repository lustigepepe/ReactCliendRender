import React from 'react';
import ReactDOM from 'react-dom';
import createAudioList from './helper/prepareAudio.js';
// import gql from 'graphql-tag';

import logo from './logo.svg';
import './PianoApp.css';


function Square(props) {
  return ( < button className = { props.className } onClick = { props.onClick } > { props.value } <
    /button>
  );
}

class KeyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(12).fill(null)
    };
    this.audioListKeys = createAudioList();
  }
  
  handleClick(i) {
    this.audioListKeys[--i].play();
  }
 
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
    return ( <Square className = { this.drawKey(i) } value = { this.state.squares[i] } onClick = {
        () => this.handleClick(i)} />

      // <div>
      // <button onClick={()=>this.togglePlay()}>{this.state.play ? 'Pause' : 'Play'}</button>
      // </div>
      /*<div>
        <button onClick={this.togglePlay()}>{this.state.play ? 'Pause' : 'Play'}</button>
      </div>*/
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

class Recording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(12).fill(null)
    };
    this.audioListKeys = createAudioList();
  }
  
  handleClick(i) {
    this.audioListKeys[--i].play();
  }
 

  // renderKey(i) {
  //   return ( <Square className = { this.drawKey(i) } value = { this.state.squares[i] } onClick = {
  //       () => this.handleClick(i)} />

  //     // <div>
  //     // <button onClick={()=>this.togglePlay()}>{this.state.play ? 'Pause' : 'Play'}</button>
  //     // </div>
  //     /*<div>
  //       <button onClick={this.togglePlay()}>{this.state.play ? 'Pause' : 'Play'}</button>
  //     </div>*/
  //   );
  // }

  render() {
    var rows = [];
    for (let i = 1; i < 13; ++i)
      rows.push(this.renderKey(i));
    return ( <div className = "recording" > { rows } </div>
    );
  }
}

class PianoApp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   keys: Array(12).fill("0"),
    //   key: 0,
    // };
  }
  //  state = {users: []}

  // componentDidMount() {
  //   fetch('/data')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  //TODO
  // connection DB and etc.

  // handleClick(i) {
  //   const keys = this.state.keys;
  //   const currentKey = keys[this.state.key];
  //   this.setState({
  //     keys: keys,
  //     key: key
  //   });
  // }


  // render() {
  //   return (
  //     <div className="App">
  //       <h1>Users</h1>
  //       {this.state.users.map(user =>
  //         <div key={user.id}>{user.username}</div>
  //       )}
  //     </div>
  //   );
  // }


  // free me
  render() {
    // const keys = this.state.keys;
    // const currentKey = keys[this.state.key];

    return ( <div className = "App-KeyBoard" > <KeyBoard / >

            </div>
    );
  }
} //END

export default PianoApp;