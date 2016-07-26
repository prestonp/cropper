var express = require('express');
var router = express.Router();
var upload = require('../lib/upload');
var files = require('../db/files');

router.post('/', function(req, res, next) {
  const videoId = req.body.videoId;
  const start = req.body.start || 0;
  const duration = req.body.duration;
  const type = 'mp3'; // todo add type support

  files.create(type, videoId, function(err, file) {
    if (err) {
      console.error('error running query', err);
      return next(err);
    }

    var opts = {
      url: 'http://www.youtube.com/watch?v=' + videoId,
      start: start,
      duration: duration
    };

    upload(opts, file.id);
    return res.json(file);
  });
});

router.get('/files/:id', function(req, res, next) {
  res.set('Content-Type', 'text/event-stream');
  const id = req.params.id;
  const intervalId = setInterval(function() {
    files.get(id, (err, file) => {
      if (err) {
        console.error('Cannot fetch file', err);
        clearInterval(intervalId);
        return next(err);
      }
      res.write('data: ' + JSON.stringify(file) + '\n\n');
    });
  }, 3000);

  req.connection.on('close', () => {
    clearInterval(intervalId);
  });
});

module.exports = router;
