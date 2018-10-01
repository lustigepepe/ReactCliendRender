const express = require('express');
const apollo = require('./apolloServer');

// HTTP Server express
var expressServer = express();
// var router = expressServer.get('/', function(req, res, next) {
// Comment out this line:
//res.send('respond with a resource');
expressServer.get('/data', function(req, res, next) {
   console.log("Request success!");
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
});


// apollo.applyMiddleware({ expressServer }); // app is from an existing express app
var urlEx = expressServer.listen(8081);

expressServer.get('/', function(req, res) {
  console.log(`🚀  in router`);
  // console.log(`🚀 Apollo server running:`+ req.protocol + '://' + req.get('host') + req.originalUrl);
  // var url = req.url;



});



console.log(`🚀 Express server running: http://localhost:${urlEx.address().port} `);
// express.listen().then(({ url }) => {
// });
