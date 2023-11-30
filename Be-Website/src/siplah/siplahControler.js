const express = require("express");
const siplahCodeService = require("./siplahService");
const { getPaket } = require("../paket/paketService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { idPaket, methodBayar, kuota } = req.body;
  
  try {
    const siplahcode = await siplahCodeService.createSiplahCode(
      idPaket,
      methodBayar,
      kuota
    );

   
    res.json({ status: 200, data: siplahcode, message: "sukses" });
  } catch (error) {
    console.log(error);
    res.json({error});
    
  }
});

router.patch("/radem/code", async (req, res) => {
  const {idUser, namaInstansi, noHp, alamat,  kodeSiplah } = req.body;
  try {
    const Radem = await siplahCodeService.RedemSiplah(idUser, namaInstansi, noHp, alamat, kodeSiplah);
    res.status(Radem.status).json(Radem)
  } catch (error) {
    res.json(error);
  }

})

router.get("/", async (req, res) => {
  const siplahcodes = await siplahCodeService.GetSiplahCodes();
  res.json(siplahcodes);
});

router.get("/kode/:kodeSiplah", async (req, res) => {
  const kode = req.params.kodeSiplah
  const response = await siplahCodeService.getSiplahUser(kode)
  res.json(response);
})
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const siplahcode = await siplahCodeService.getSiplahCodeById(id);
  res.json(siplahcode);
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { avail } = req.body;
  const siplahcode = await siplahCodeService.updateSiplahCode(id, {
    avail
  });
  res.json(siplahcode);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await siplahCodeService.deleteSiplahCode(id);
  res.sendStatus(204);
});

module.exports = router;
