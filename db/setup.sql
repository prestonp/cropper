CREATE EXTENSION pgcrypto;

CREATE TABLE files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT current_timestamp,
  type varchar,
  url varchar,
  key varchar,
  etag varchar,
  video_id varchar,
  loaded int default 0,
  total int default 0
);
