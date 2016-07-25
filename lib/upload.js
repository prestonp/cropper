var ytStream = require('./yt-stream');
var AWS = require('aws-sdk');
var config = require('../config');
var files = require('../db/files');

module.exports = function(opts, id) {
  const body = ytStream(opts);
  const params = { Bucket: config.bucket, Key: id + '.mp3', Expires: 0 };
  const s3obj = new AWS.S3({ params: params });

  s3obj
    .upload({ Body: body })
    .on('httpUploadProgress', function(evt) {
      files.updateProgress(id, evt.loaded, evt.total, function(err) {
        if (err) console.error('Failed to update file progress', err);
      });
    })
    .send(function(err, data) {
      var url = s3obj.getSignedUrl('getObject', params);
      files.updateFinished(id, url, data.ETag, data.key, function(err) {
        if (err) console.error('Failed to complete upload', err);
      });
    });
};
