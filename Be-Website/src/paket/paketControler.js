const express = require('express');
const { addPaket, getAllPaket, getPaket, modifyPaket, removePaket } = require('./paketService');
const { authAll , authAdmin} = require("../config/auth")
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, masaAktif, harga, kapasitas, register, userCreate } = req.body;
  try {
    const paket = await addPaket(name, masaAktif, harga, kapasitas, register, userCreate);
    res.status(201).json(paket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const pakets = await getAllPaket();

    res.status(200).json({status: 200, data: pakets, message: "sukses"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get/:id',authAll, async (req, res) => {
  const { id } = req.params;
  try {
    const paket = await getPaket(id);
    if (!paket) {
      res.status(404).json({ error: 'Paket not found' });
      return;
    }
    res.status(200).json(paket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id',authAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, masaAktif, harga, kapasitas } = req.body;
  try {
    const paket = await modifyPaket(id, name, masaAktif, harga, kapasitas);
    res.status(200).json(paket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id',authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await removePaket(id);
    res.status(200).json({status: 200 , message: "data sukses dihapus"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
