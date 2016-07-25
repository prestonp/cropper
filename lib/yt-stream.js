var fs = require('fs');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

var stream = function(options, writable) {
  options = options || { start: 0, duration: 0 };
  var ytstream = ytdl(options.url);
  var command = ffmpeg(ytstream)
                  .seek(options.start)
                  .duration(options.duration)
                  .format('mp3')
                  .noVideo()
                  .on('end', function() {
                    console.log('file has been converted succesfully');
                  })
                  .on('error', function(err) {
                    console.log('an error happened: ' + err.message);
                    console.log(arguments);
                  })
                  .pipe(writable, { end: true });
  return command;
};

// usage:
// stream({ url: 'http://www.youtube.com/watch?v=bTqVqk7FSmY', start: 65, duration: 5 }, 'output.mp3');
module.exports = stream;
