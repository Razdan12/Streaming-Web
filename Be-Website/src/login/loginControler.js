const express = require("express");
const { login } = require('./loginService');


const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(401).json({status: 401, data: [], message: "email & password harap diisi"});
  }
  try {
    const {token, masaAktifDateOnly, role ,idUser} = await login(email, password);
    const data = {
      token: token,
      masaAktifUser: masaAktifDateOnly,
      role : role,
      idUser: idUser
    }
    res.json({status: 200, data: data, message: "sukses Login"});
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
});



module.exports = router;
