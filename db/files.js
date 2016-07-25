var query = require('pg-query');
query.connectionParameters = 'postgres://localhost:5432/cropper';

exports.create = function(type, videoId, callback) {
  query.first('insert into files (type , video_id) values ($1, $2) returning *', [type, videoId], callback);
}

exports.updateProgress = function(id, loaded, total, callback) {
  query.first('UPDATE files SET loaded=$1, total=$2 WHERE id=$3 returning *', [loaded, total, id], callback);
}

exports.updateFinished = function(id, url, etag, key, callback) {
  query.first('UPDATE files SET url=$1, etag=$2, key=$3 WHERE id=$4', [url, etag, key, id], callback);
}
