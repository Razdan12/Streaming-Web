const express = require("express");
const { SendEmail } = require("./mailService");
const router = express.Router();

router.post("/", async (req, res) => {
  const { penerima, subject, pesan, dataPesan, penutup } = req.body;
 
  try {
    const response = await SendEmail(penerima, subject, pesan, dataPesan, penutup);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
