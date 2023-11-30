const express = require("express");
const router = express.Router();
const paketVideoService = require('./paketVideoServis');
const {authAdmin, authAll} = require("../config/auth")

router.post("/", async (req, res) => {
    try {
        const paketVideo = await paketVideoService.createPaketVideo(req.body);
        res.status(201).json(paketVideo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
 
router.get("/",  async ( req, res) => {
 
    try {
        const paketVideos = await paketVideoService.getPaketVideos();
        res.status(200).json(paketVideos);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.get("/:id",  async (req, res) => {
    try {
        const paketVideo = await paketVideoService.getPaketVideoById(req.params.id);
        if (!paketVideo) {
          return res.status(404).json({ message: 'Paket video not found' });
        }
        res.status(200).json(paketVideo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.patch("/:id", authAdmin, async (req, res) => {

    try {
        const paketVideo = await paketVideoService.updatePaketVideo(req.params.id, req.body);
        if (!paketVideo) {
          return res.status(404).json({ message: 'Paket video not found' });
        }
        res.status(200).json(paketVideo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
} )

router.delete("/:id", authAdmin, async (req, res) => {
    try {
        const paketVideo = await paketVideoService.deletePaketVideo(req.params.id);
        if (!paketVideo) {
          return res.status(404).json({ message: 'Paket video not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




module.exports = router;
