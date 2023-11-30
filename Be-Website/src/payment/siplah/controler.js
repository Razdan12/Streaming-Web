const express = require("express");
const { cekPayment } = require("./service");
const router = express.Router();

router.get("/cek-transaksi/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await cekPayment(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "eror" });
  }
});

module.exports = router;
