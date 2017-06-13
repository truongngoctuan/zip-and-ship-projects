// require modules
var jsonfile = require('jsonfile');
var zipper = require('./module-01-zipper.js');
var package_handler = require('./module-01-02-pacgakes-sharer');
const path = require('path');

//get params
var __dirname = process.argv[2];

//TODO: check and create dirs before hand
var __DIRS = {
  outputProjects: 'dist/projects',
  outputPackages: 'dist/packages'
}

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
      path.join(__DIRS.outputProjects, projectObject.filename),
      projectObject.includes);

    package_handler.exec(projectObject.source, __DIRS.outputPackages);
  });
}