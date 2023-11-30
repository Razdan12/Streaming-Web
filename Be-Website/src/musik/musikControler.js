const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { authAdmin, authAll } = require("../config/auth");
const createBucket = require("../config/s3Bucket");
const Credentials = require("../config/Credentials");
const upload = createBucket.createBucketMusik("musik");
const image = createBucket.createBucketMusik("Thumbnail");
const {
  AddMusik,
  GetAllMusik,
  JenjangMusik,
  GetMusikKategori,
  FilterMusik,
  DeleteMusik,
  UpdateMusik,
  getAllMusikWithKategori,
  FindMusikService,
  GetMusikById,
} = require("./musikServis");

const s3 = Credentials;
dotenv.config();

router.post("/", upload.single("musik"), async (req, res) => {
  const dataFile = req.file;

  if (dataFile) {
    try {
      const { name, deskripsi, jenjang, durasi, lirik, idKategori } = req.body;
      const url = dataFile.location;
      const key = dataFile.key.split("/");
      const namaFile = key[1];

      const musik = await AddMusik({
        name,
        deskripsi,
        url,
        jenjangIds : jenjang,
        durasi,
        lirik,
        kategoriIds: idKategori,
        namaFile,
      });
      res.status(201).json({
        status: 201,
        data: musik,
        message: "Berhasil menambahkan musik",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res
      .status(500)
      .json({ error: "Gagal menambahkan musik. File tidak ditemukan." });
  }
});

router.get("/play/:filename", async (req, res) => {
  const fileName = req.params.filename;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `musik/${fileName}`,
  };

  try {
    const response = await s3.getObject(s3Params);
    response.Body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(404).send("File not found");
  }

  res.setHeader("Content-Type", "audio/mpeg");
});

router.get("/kategori", async (req, res) => {
  const {jenjang} = req.query;
  const data = await getAllMusikWithKategori(jenjang);
  res.status(data.status).json(data);
});
router.get("/kategori/:id", async (req, res) => {
  const id = req.params.id;
  const data = await GetMusikKategori(id);
  res.status(200).json(data);
});

router.get("/", async (req, res) => {
  try {
    const data = await GetAllMusik()
    const { jenjang, idKategori } = req.query;
    let musik = [];

    if (!jenjang && !idKategori) {
      musik = await GetAllMusik();
    } else if (jenjang && !idKategori) {
      musik = await JenjangMusik(jenjang);
    } else if (!jenjang && idKategori) {
      musik = await GetMusikKategori(idKategori);
    } else {
      musik = await FilterMusik(jenjang, idKategori);
    }

    res.status(200).json({
      status: 200,
      message: "Berhasil mengambil musik",
      data: musik,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", image.single("thumbnail"), authAdmin, async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const dataFile = req.file;
    const thumbnail = dataFile ? dataFile.location : undefined;

    const Data = {
      name: data.name,
      deskripsi: data.deskripsi,
      jenjang: data.jenjang,
      lirik: data.lirik,
      idKategori: data.idKategori,
      idPaketMusik: data.idPaketMusik,
      thumbnail,
    };

    const response = await UpdateMusik(id, Data);

    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan dalam mengedit musik: " + error.message,
    });
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await DeleteMusik(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  const { value, jenjang } = req.query;
  try {
    const data = await FindMusikService(value, jenjang);
    res.status(data.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get/:id" , authAll, async (req, res) => {
  const idMusik = req.params.id;
  try {
    const response = await GetMusikById(idMusik);   
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
