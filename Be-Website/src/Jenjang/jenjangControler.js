const express = require('express');
const { getAllJenjang } = require('./RepoJenjang');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const allJenjang = await getAllJenjang();
      res.status(200).json(allJenjang);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;