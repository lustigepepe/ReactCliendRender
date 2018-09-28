
function loadSounds(octave = 1) {
    if (octave < 1)
      return null;
    // var recursive = require('recursive-readdir-synchronous');
    var allFiles = [];
    let resultFiles = [];
    let re = /.*1.*/;
  
    var files = [];
    let fileMap;
    // var readDir = require('recursive-readdir-synchronous');
    try {
      fileMap = importAllData(require.context("../../grand-piano-mp3-sounds/", false));
      allFiles = Object.keys(fileMap);
      if (allFiles === null) {
        console.log('Path to sounds does not exist');
        return null;
      }
    } catch (err) {
      console.log('Path to sounds does not exist: ' + err.errno);
    }
    let count = 0,
      pos = 0;
    allFiles.forEach(file => {
      let isNotEmpty = file.match(re);
      if (isNotEmpty !== null && count < 13) {
        resultFiles.push(isNotEmpty.input);
        count++;
      }
    });
  
    // the order is not sure at this state
    resultFiles.sort();
    let start = null;
    for (let i = 0; i < resultFiles.length; ++i) {
      let temp = resultFiles[i].match(/C1.*/);
      if (temp !== null) {
        start = temp.input;
        break;
      }
    }
  
    if (start !== null) {
      var shiftItems = resultFiles.splice(resultFiles.indexOf(start));
      // merge in th right order
      for (let x of resultFiles)
        shiftItems.push(x);
  
      resultFiles = [];
      let match_b;
      // change Key with bKey
      for (let i = 0; i < shiftItems.length; ++i) {
        if (i + 2 < shiftItems.length) {
          match_b = shiftItems[i + 2].match(/.*b.*/);
          if (match_b !== null) {
            let bKey = shiftItems.splice(i + 2, 1);
            resultFiles.push(shiftItems[i]);
            resultFiles.push(bKey);
          } else
            resultFiles.push(shiftItems[i]);
        } else
          resultFiles.push(shiftItems[i]);
      }
      shiftItems = [];
      resultFiles.forEach(fileName => {
        shiftItems.push(fileName);
      });
    } else
      return null;
  
    for(let i in shiftItems)
      shiftItems[i] = fileMap[shiftItems[i]];
  
    return shiftItems;
  }
  
  function createAudioList(octave = 1) {
    let audioList = loadSounds(octave);
    if (audioList === null)
      return null;
    for (let i in audioList) {
       audioList[i] = new Audio(audioList[i]);
      console.log("Thats's it :" + audioList.length);
    }
    return audioList;
  }
  
  function importAllData(r) {
    let fileMap = {};
    r.keys().map((item, index) => {
      fileMap[item.replace('./', '')] = r(item);
    });
    return fileMap;
  }

  
export default createAudioList;