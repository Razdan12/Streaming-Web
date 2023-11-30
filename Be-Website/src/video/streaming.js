const express = require('express');
const router = express.Router();
const { GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../config/Credentials'); // replace with the path to your credential.js file

router.get('/video/:filename', async function(req, res) {
  const fileName = req.params.filename;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `Video/${fileName}`,
  };

  try {
    const headResponse = await s3.send(new HeadObjectCommand(s3Params));
    const fileSize = headResponse.ContentLength;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      let start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
      
      if (start === 0 && end === fileSize - 1) {
        end = Math.min(1024 * 1024 * 10, fileSize - 1); 
      }

      if (end - start > 1024 * 1024 * 10) {
        end = start + 1024 * 1024 * 10 - 1;
      }

      const chunksize = (end-start)+1;
      s3Params.Range = `bytes=${start}-${end}`;

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=3600'
      };

      res.writeHead(206, head);
      const s3Stream = (await s3.send(new GetObjectCommand(s3Params))).Body;
      s3Stream.on('error', function(err) {
        res.status(500).send("Could not read file from S3");
      });

      s3Stream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=3600'
      };

      res.writeHead(200, head);

      const s3Stream = (await s3.send(new GetObjectCommand(s3Params))).Body;
      s3Stream.on('error', function(err) {
        res.status(500).send("Could not read file from S3");
      });

      s3Stream.pipe(res);
    }
  } catch (err) {
   
    res.status(404).send("File not found");
  }
});

router.get('/audio/:filename', async function(req, res) {
  const fileName = req.params.filename;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `musik/${fileName}`,
  };

  try {
    const headResponse = await s3.send(new HeadObjectCommand(s3Params));
    const fileSize = headResponse.ContentLength;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
      const chunksize = (end-start)+1;

      s3Params.Range = `bytes=${start}-${end}`;

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600'
      };

      res.writeHead(206, head);

      const s3Stream = (await s3.send(new GetObjectCommand(s3Params))).Body;

      s3Stream.on('error', function(err) {
        res.status(500).send("Could not read file from S3");
      });

      s3Stream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600'
      };

      res.writeHead(200, head);

      const s3Stream = (await s3.send(new GetObjectCommand(s3Params))).Body;

      s3Stream.on('error', function(err) {
        res.status(500).send("Could not read file from S3");
      });

      s3Stream.pipe(res);
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("File not found");
  }
});

module.exports = router;

