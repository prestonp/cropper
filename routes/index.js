var express = require('express');
var router = express.Router();
var ytStream = require('../lib/yt-stream');

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

module.exports = router;
