cropper
---

> api to crop and convert youtube videos to audio

### get /:videoId?start=[start]&duration=[duration]

* `videoId` is the video id
* `start` is start time in secs
* `duration` is duration in secs

all parameters are required.

the response is an mp3

environment variables
---

| Name                  | Description    | Required |
|-----------------------|----------------|----------|
| AWS_ACCESS_KEY_ID     | AWS Access Key | ✔        |
| AWS_SECRET_ACCESS_KEY | AWS Secret     | ✔        |
| BUCKET                | S3 Bucket      |          |

license
---

mit
