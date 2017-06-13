// require modules
var fs = require('fs');
var archiver = require('archiver');
var pretty = require('prettysize');

//https://mushfiq.me/2014/08/21/node-js-script-to-make-a-zip-archive/
exports.exec = function zipProject(dirname, zippedName, includeGlobs) {

  // create a file to stream archive data to.
  var output = fs.createWriteStream(zippedName);
  var archive = archiver('zip', {
    //store: true, // Sets the compression method to STORE.
    zlib: {
      level: 9
    }
  });

  // listen for all archive data to be written
  output.on('close', function () {
    console.log("zip file (" + pretty(archive.pointer()) + ") " + zippedName);
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // // append a file from stream
  // var file1 = __dirname + '/file1.txt';
  // archive.append(fs.createReadStream(file1), { name: 'file1.txt' });

  // // append a file from string
  // archive.append('string cheese!', { name: 'file2.txt' });

  // // append a file from buffer
  // var buffer3 = new Buffer('buff it!');
  // archive.append(buffer3, { name: 'file3.txt' });

  // // append a file
  // archive.file('file1.txt', { name: 'file4.txt' });

  // append files from a directory
  // archive.directory(dirname + "/");

  // // append files from a glob pattern
  includeGlobs.forEach(function (val) {
    archive.glob(val, {
      cwd: dirname
    });
  });

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  archive.finalize();

}
