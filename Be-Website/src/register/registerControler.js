const express = require("express");
const RegisterService = require("./registerService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password, role, idPaket } = req.body;

  const defaultName = "Guest";
  const defaultRole = "guest";

  const finalName = name || defaultName;
  const finalRole = role || defaultRole;

  try {
    const user = await RegisterService.registerUser(
      finalName,
      email,
      password,
      finalRole,
      idPaket
    );
    const data = {
      id: user.data.id,
      name: user.data.name,
      email: user.data.email,
      role: user.data.role
    }

    res.status(user.status).json({status: user.status, data: data ,  message: user.message});
  } catch (error) {
    
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
