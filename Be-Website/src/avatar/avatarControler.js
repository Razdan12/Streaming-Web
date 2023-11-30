const express = require("express");
const { authAdmin, authUser, authAll } = require("../config/auth");
const { CreateAvatarService, GetAllAvatar } = require("./avatarService");
const router = express.Router();
const createBucket = require("../config/s3Bucket");
const upload = createBucket.createBucketVideo("avatar");

router.post("/", upload.single("avatar"), authAdmin, async (req, res) => {
  const dataFile = req.file;

  const url = dataFile.location;
  const data = await CreateAvatarService({
    url,
  });
  res.status(data.status).json(data);
});

router.get("/", authAll, async (req, res) => {
  const data = await GetAllAvatar();
  res.status(200).json(data);
});

module.exports = router;
