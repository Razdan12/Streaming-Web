const { S3 } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config();

// const Credentials = new S3({
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   },
//   region: process.env.REGION,
//   endpoint: process.env.URL_ENDPOINT,
// });
const Credentials = new S3({
  credentials: {
    accessKeyId: 'KQL19XKD8BKGS1J95GT8',
    secretAccessKey: 'GVCTh15cTaodG2no8qL6GIAKvpPRKZVJK3qEg3vh',
  },
  region: 'ap-southeast-1',
  endpoint: 'https://is3.cloudhost.id/',
});

module.exports = Credentials;
