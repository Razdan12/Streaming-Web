const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const Credentials = require("./Credentials");
const AWS = require('@aws-sdk/client-s3');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const https = require('https');

dotenv.config();

const s3 = Credentials;

const createBucketVideo = (folder) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, `${folder}/${Date.now()}-${file.originalname}`);
      },
    }),
  });
};
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  });
};

const convertVideoToHLS = async (inputPath, outputPath, fileName) => {
  console.log({inputPath});
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-profile:v main',
        '-vf "scale=-1:720,format=yuv420p"',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 4',
        '-hls_playlist_type vod',
        '-b:v 800k',
        '-maxrate 856k',
        '-bufsize 1200k',
        '-b:a 96k',
        `-hls_segment_filename ${outputPath}/${fileName}_720p_%03d.ts`
      ])
      .output(`${outputPath}/${fileName}.m3u8`)
      .on('end', () => resolve())
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      
      .run();
  });
};

const uploadToS3 = async (bucketName, folder, fileName) => {
  const fileContent = fs.readFileSync(fileName);
  
  const params = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
    Body: fileContent,
    ACL: 'public-read'
  };

  try {
    await s3.send(new AWS.PutObjectCommand(params));
    console.log(`File uploaded successfully. ${fileName}`);
  } catch (err) {
    console.log("Error", err);
  }
};


const createBucketMusik = (folder) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, `${folder}/${Date.now()}-${file.originalname}`);
      },
    }),
  });
};

module.exports = { createBucketMusik, createBucketVideo, convertVideoToHLS, uploadToS3, downloadFile };
