// const express = require("express");
// const { createOtlet } = require("./OtletService");
// const router = express.Router();

// router.post("/create", async (req, res) => {
//   const { idUser, retail, idPaket } = req.body;

//   if (retail !== "ALFAMART" && retail !== "INDOMARET") {
//     res.status(500).json({ error: "Kode Retail Tidak Valid" });
//   }
//   try {
//     const Outlet = await createOtlet(idUser, retail, idPaket);
//     res
//       .status(200)
//       .json({ status: 200, data: Outlet, message: "sukses" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// module.exports = router;
