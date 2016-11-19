// require modules
//var fs = require('fs');
var jsonfile = require('jsonfile');
var zipper = require('./module-01-zipper.js');

//get params
var __dirname = process.argv[2];
// process.argv.forEach(function (val, idx) {
//   console.log(val + " : " + idx);
// });

//get configuration object from a config file
var configObject = {};
jsonfile.readFile('folder-list.json', function (error, obj) {
  configObject = obj;
  // console.log(configObject);

  zipAndShip(configObject);
});

function zipAndShip(configObject) {
  configObject.projects.forEach(function (projectObject, idx) {
    zipper.exec(
      projectObject.source, 
      projectObject.filename, 
      projectObject.includes);
  });
}