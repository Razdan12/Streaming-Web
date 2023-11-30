const express = require("express");
const router = express.Router();
const {
  createVideo,
  getAllVideos,
  updateVideo,
  deleteVideo,
  getVideoByKategori,
  jenjangVideo,
  filterVideo,
  getVideoById,
  getAllVideoWithKategori,
  FindVideoService,
} = require("./videoService");
const { authAdmin, authAll } = require("../config/auth");  
const { getVideoByIdPaket } = require("../paket-video/paketVideoServis");
const createBucket = require("../config/s3Bucket");
const Credentials = require("../config/Credentials");
const upload = createBucket.createBucketVideo("Video");
const image = createBucket.createBucketVideo("Thumbnail");
const s3 = Credentials;



router.get("/play/:filename", async (req, res) => {
  const fileName = req.params.filename;
  
  if (!fileName) {
    return res.status(404).send("File not found");
  } else {
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `videos/${fileName}.m3u8`,
    };

    try {
      const response = await s3.send(new AWS.GetObjectCommand(s3Params));
      
      response.Body.pipe(res);
      
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      
    } catch (err) {
      console.log(err);
      res.status(404).send("File not found");
    }
  }
});

router.post("/", upload.single("video"), authAdmin, async (req, res) => {
  const dataFile = req.file;

  if (dataFile) {
    try {
      const { name, deskripsi, jenjang, durasi, idKategori } = req.body;
      const url = dataFile.location;
      const key = dataFile.key.split("/");
      const namaVideo = key[1];

      const video = await createVideo({
        name,
        deskripsi,
        jenjangIds: jenjang,
        durasi,
        url,
        key: namaVideo,
        kategoriIds: idKategori,
      });

      res.status(201).json({
        status: 201,
        data: video,
        message: "Berhasil menambahkan video",
      });
    } catch (error) {

      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(500).json("gagal menambahkan video");
  }
});

router.get("/", async (req, res) => {
  try {
    const { jenjang, idKategori } = req.query;
    let videos = [];

    if (!jenjang && !idKategori) {
      videos = await getAllVideos();
    } else if (jenjang && !idKategori) {
      videos = await jenjangVideo(jenjang);
    } else if (!jenjang && idKategori) {
      videos = await getVideoByKategori(idKategori);
    } else {
      videos = await filterVideo(jenjang, idKategori);
    }

    res.status(200).json({
      status: 200,
      message: "Berhasil mengambil video",
      data: videos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/video/:id", authAll, async (req, res) => {
  const id = req.params.id;
  const video = await getVideoById(id);
  res.status(200).json(video);
});

router.get("/video/:id/paket", authAll, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getVideoByIdPaket(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", image.single("thumbnail"), authAdmin, async (req, res) => {
  try {
    const { name, deskripsi, jenjang, idKategori, idPaketVid } =
      req.body;
   
    const id = req.params.id;
    const dataFile = req.file;
    const thumbnail = dataFile ? dataFile.location : undefined;

    const data = {
      name,
      deskripsi,
      idPaketVid,
      thumbnail,
      jenjang,
      idKategori
    };

    const response = await updateVideo(id, data);

    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Terjadi kesalahan dalam mengedit video: " + error.message,
    });
  }
});

router.get("/kategori", async (req, res) => {
  const { jenjang } = req.query;
  const data = await getAllVideoWithKategori(jenjang);
  res.status(data.status).json(data);
});

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteVideo(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  const { value, jenjang } = req.query;
  try {
    const data = await FindVideoService(value, jenjang);
    res.status(data.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/kategori/:id", authAll, async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getVideoByKategori(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
