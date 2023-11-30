const express = require("express");
const router = express.Router();
const {authAdmin, authAll} = require("../config/auth");
const { SerCreatePaketMusik, SerGetPaketMusik, } = require("./paketMusikServis");

router.post("/", authAdmin, async (req, res) => {
    try {
        const paketMusik = await SerCreatePaketMusik(req.body);
        res.status(201).json(paketMusik);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
 
router.get("/", authAll, async ( req, res) => {
    try {
        const paketMusik = await SerGetPaketMusik();
        res.status(200).json(paketMusik);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.get("/:id", authAll, async (req, res) => {
    try {
        const paketMusik = await SerGetPaketVideoById(req.params.id);
        if (!paketMusik) {
          return res.status(404).json({ message: 'Paket Musik not found' });
        }
        res.status(200).json(paketMusik);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.patch("/:id", authAdmin, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
    try {
        const paketMusik = await SerUpdatePaketVideo(id, data);
        if (!paketMusik) {
          return res.status(404).json({ message: 'Paket musik not found' });
        }
        res.status(200).json(paketMusik);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
} )

router.delete("/:id", authAdmin, async (req, res) => {
    try {
        const paketMusik = await SerDeletePaketVideo(req.params.id);
        if (!paketMusik) {
          return res.status(404).json({ message: 'Paket video not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})



module.exports = router;
