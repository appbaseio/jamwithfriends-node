var logger = require('better-console'); // A library that makes logging very easy
var Appbase = require('appbasejs'); // Appbase nodejs module

// Setting credentials
Appbase.credentials('piano', 'a659f26b2eabb4985ae104ddcc43155d');

var rooms = [];

//refresh the display every sec
setInterval(function() {
  logger.clear();
  logger.table(rooms); //show the data as a table
}, 1000);

Appbase.ns('pianoapp').v('piano').on('edge_added', function(error, edgeRef, eSnap) {
  var roomData = ["", 0];
  rooms.push(roomData);
  if(error) {
    return logger.error(error);
  }
  edgeRef.on('properties', function(error, ref, vSnap) {
    //fetching the name of the room
    roomData[0] = vSnap.properties().name;
  })
  edgeRef.outVertex('keys').on('edge_added', function(error, ref, eSnap) {
    //counting number of keys in the room
    roomData[1] += 1;    
    //refresh the view
  })
});
