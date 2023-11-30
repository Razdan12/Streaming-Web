const express = require("express");
const router = express.Router();
const akunService = require("./akunService");
const { authAll } = require("../config/auth");

router.post("/", async (req, res) => {
  const { userId, packageId } = req.body;

  try {
    const result = await akunService.createAccounts(userId, packageId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.post("/add", async (req, res) => {
  const { idUser, jumlah } = req.body;

  try {
    const result = await akunService.tambahProfil(idUser, jumlah);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:IdProfil",authAll, async(req, res) => {
  const idProfil = req.params.IdProfil;
  try {
    const profil = await akunService.getProfil(idProfil)
    res.status(200).json(profil);
  } catch (error) {
    res.status(500).json({error: "something went wrong", error})
  }
})

router.patch("/:IdProfil", async(req, res) =>{
  const idProfil = req.params.IdProfil;
  const {name , picture , status} = req.body
  try {
    const dataProfil = await akunService.updateProfil(idProfil, name, picture, status);
    res.status(201).json(dataProfil);
  } catch (error) {
    res.status(500).json({error: "something went wrong", error})
  }
})


router.delete("/:idUser", authAll, async(req, res) => {
  const idUser = req.params.idUser;
  try {
    const deleteProfil = await akunService.deleteProfilByUser(idUser);
    res.status(200).json(idUser + " berhasil dihapus")
  } catch (error) {
    res.status(500).json({error: "something went wrong", error})
  }
})

router.delete("/:idProfil/user", authAll, async(req, res) => {
  const idProfil = req.params.idProfil;
  try {
    const deleteProfil = await akunService.deleteProfilById(idProfil)
    res.status(200).json(deleteProfil)
  } catch (error) {
    res.status(500).json({error: "something went wrong", error})
  }
})

router.get("/:idUser/user", authAll , async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const response = await akunService.getProfilUser(idUser)
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({error: "something went wrong", error})
  }
})


module.exports = router;
