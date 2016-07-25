var express = require('express');
var router = express.Router();
var upload = require('../lib/upload');
var files = require('../db/files');

// todo: deprecate this route
router.get('/:videoId', function(req, res, next) {
  var videoId = req.params.videoId;
  var start = req.query.start || 0;
  var duration = req.query.duration;

  if (!videoId) {
    return next(new Error('videoId must be provided'));
  }

  if (videoId.indexOf('youtube') >= 0) {
    return next(new Error('videoId must only contain id'));
  }

  var opts = {
    url: 'http://www.youtube.com/watch?v=' + videoId,
    start: start,
    duration: duration
  };

  res.contentType('mp3');
  ytStream(opts, res);
});

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

module.exports = router;
