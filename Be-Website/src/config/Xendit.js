const dotenv = require("dotenv");
const { Xendit } = require('xendit-node');

dotenv.config();
const x = new Xendit({
  secretKey: process.env.XenditSecretKey,
});


module.exports = {x};