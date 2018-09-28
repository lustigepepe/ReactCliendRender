var loadSounds = require('./browserNode.js');


console.log(loadSounds.loadSounds());






// function loadSounds() {
//   const fs = require('fs');
//   var allFiles = [];
//   let resultFiles = [];
//   let re = /.*1.*/;
//   allFiles = fs.readdirSync('../../grand-piano-mp3-sounds');
//   let count = 0,
//     pos = 0;
//   allFiles.forEach(file => {
//     let isNotEmpty = file.match(re);
//     if (isNotEmpty !== null && count < 13) {
//       resultFiles.push(isNotEmpty.input);
//       count++;
//     }
//   });

//   // the order is not sure at this state
//   resultFiles.sort();
//   let start = null;
//   for (let i = 0; i < resultFiles.length; ++i) {
//     let temp = resultFiles[i].match(/C1.*/);
//     if (temp !== null) {
//       start = temp.input;
//       break;
//     }
//   }

//   if (start !== null) {
//     var shiftItems = resultFiles.splice(resultFiles.indexOf(start));

//     // merge in th right order
//     for (let x of resultFiles)
//       shiftItems.push(x);

//     resultFiles = [];
//     let match_b;
//     // change Key with bKey
//     for (let i = 0; i < shiftItems.length; ++i) {
//       if (i + 2 < shiftItems.length) {
//         match_b = shiftItems[i + 2].match(/.*b.*/);
//         if (match_b !== null) {
//           let bKey = shiftItems.splice(i + 2, 1);
//           resultFiles.push(shiftItems[i]);
//           resultFiles.push(bKey);
//         } else
//           resultFiles.push(shiftItems[i]);
//       } else
//         resultFiles.push(shiftItems[i]);
//     }
//     shiftItems = [];
//     resultFiles.forEach(fileName => {
//       shiftItems.push('../../grand-piano-mp3-sounds/' + fileName);
//     });
//   } else
//     return null;
//   return shiftItems;
// }

// function createAudioList() {
//   let array = [];
//   array.push("ll");
//   console.log("Befor: "+ array);

//   array = loadSounds();
//   // this.url = "../../grand-piano-mp3-sounds/C1.mp3";
//   console.log(array);



// }
// let url = "/Users/bic_mac/Documents/JavascriptAround/react-piano-task/grand-piano-mp3-sounds/C1.mp3";
// let audio = new Audio(url);
// audio.play();
// setTimeout(()=>{ audio.stop(); }, 1000);
