// require modules
const path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var pretty = require('prettysize');
var glob = require('glob');

//inForder: folder the contain `packages`, asked to be synced
//outFolder: where I put zipped nuget package files
exports.exec = function progress(inFolder, outFolder) {

    var dirs = getDirectories(path.join(inFolder, '/packages'));
    var existingDirs = getFiles(path.join(outFolder));

    dirs.forEach(function(dir) {
        if (existingDirs.indexOf(dir + '.zip') == -1) {
            zipThatFolderForMe(path.join(inFolder, '/packages', dir), outFolder); 
        }
          
    }, this);
}

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function getFiles (srcpath) {
  var filesWithPath = glob.sync(srcpath + '/**/*.*', {
      base: srcpath
  }); //TODO: improve

  var files = [];
  filesWithPath.forEach(function (filesWithPath) {
      files.push(path.basename(filesWithPath));
  });
  return files;
}

function getFolderNameWithoutPath(folderPath) { //TODO: path.basename ?
    return path.basename(folderPath);
}

function zipThatFolderForMe(folderName, outFolder) {
    var fileExt = 'zip';
  var zippedName = path.basename(folderName) + '.' + fileExt;
  console.log('folderName = ' + folderName);
  //console.log('zippedName = ' + zippedName);
  //console.log('out file = ' + path.join(outFolder, zippedName));

  // create a file to stream archive data to.
  var output = fs.createWriteStream(path.join(outFolder, zippedName));
  var archive = archiver(fileExt, {
      store: true // Sets the compression method to STORE.
  });

  // listen for all archive data to be written
  output.on('close', function() {
    console.log("zip package (" + pretty(archive.pointer()) + ") " + zippedName);
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  archive.glob('./**/*.*', {
    cwd: folderName
  });

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  archive.finalize();
}
