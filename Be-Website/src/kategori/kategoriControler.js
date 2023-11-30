const express = require('express');
const router = express.Router();
const kategoriService = require('./kategoriServis');
const { authAdmin, authAll } = require('../config/auth');


router.post('/',authAdmin, async (req, res) => {
  try {
    const newKategori = await kategoriService.createKategori(req.body);
    res.status(201).json(newKategori);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const allKategori = await kategoriService.getAllKategori();
    res.status(200).json(allKategori);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', authAll, async (req, res) => {
  try {
    const oneKategori = await kategoriService.getOneKategori(req.params.id);
    res.status(200).json(oneKategori);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id',authAdmin, async (req, res) => {
    try {
      const updatedKategori = await kategoriService.updateKategori(req.params.id, req.body);
      res.status(200).json(updatedKategori);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.delete('/:id',authAdmin, async (req, res) => {
    try {
      await kategoriService.deleteKategori(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  