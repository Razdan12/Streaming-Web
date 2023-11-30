const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { authAdmin, authAll } = require("../config/auth");
const createBucket = require("../config/s3Bucket");
const Credentials = require("../config/Credentials");
const upload = createBucket.createBucketVideo("banner");
const {
  CreateBannerService,
  GetAllBannerService,
  UpdateBannerService,
  DeleteBanner,
} = require("./bannerService");

dotenv.config();

router.post("/", upload.single("banner"), authAdmin, async (req, res) => {
  const dataFile = req.file;
  const { judul, jenis, urutan,deskripsi, idProduk, namaProduk } = req.body;

  const validJenis = ["home", "video", "musik"];
  if (!validJenis.includes(jenis)) {
    return res.status(400).json({ message: "Jenis banner salah" });
  }

  if (dataFile) {
    const url = dataFile.location;
    let urutanNumber = Number(urutan);
    const data = await CreateBannerService({
      url,
      judul,
      jenis,
      urutan: urutanNumber,
      deskripsi,
      idProduk,
      namaProduk
    });
    res.status(data.status).json(data);
  } else {
    res.status(500).json({ error: "Gagal menambahkan banner" });
  }
});

router.get("/", async (req, res) => {
  const banner = await GetAllBannerService();
  return res.status(banner.status).json(banner);
});

router.patch("/:id", authAdmin, async (req, res) => {
  const id = req.params.id;
  const { judul, jenis, aktif } = req.body;
  try {
    const data = await UpdateBannerService(id, judul, jenis, aktif);
    return res.status(data.status).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    await DeleteBanner(id);
    return res.status(200).json("sukses");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
