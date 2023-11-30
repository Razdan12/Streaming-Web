const express = require("express");
const prisma = require("../config/index");
const jwt = require("jsonwebtoken");
const {
  getUser,
  UserById,
  updateUser,
  updateUserr,
  UpdatePassword,
  GetTransaksiUser,
  addUserManual,
  GetInvoice,
  deleteUser,
  ResetPassword,
} = require("./userService");
const { authAll, authAdmin, authUserr } = require("../config/auth");
const dotenv = require("dotenv");
const { getAkunByUser, updateAccount } = require("../akun/akunRepo");

dotenv.config();

const secretKey = process.env.SECRET_KEY_JWT;

const router = express.Router();

router.get("/", authAdmin, async (req, res) => {
  const user = await getUser();
  res.send(user);
});

router.post("/create", async (req, res) => {
  const { name, email, password, idPaket } = req.body;

  try {
    const response = await addUserManual(name, email, password, idPaket);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });
    const profil = await getAkunByUser(user.id);
    await Promise.all(
      profil.map(async (item) => {
        const masaAktif = new Date(item.updatedAt);
        const sekarang = new Date();

        // Hitung selisih waktu dalam jam
        const selisihJam = Math.abs(sekarang - masaAktif) / 36e5;

        if (selisihJam > 3) {
          await updateAccount(item.id, { status: false });
        }
      })
    );
    const data = {
      user,
      profil,
    };

    res.json({ status: 200, data: data });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.get("/:userId", authAll, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.patch("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await updateUserr(id, data);

    const Data = {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      masaAktif: updatedUser.masaAktif,
    };
    res
      .status(200)
      .json({ status: 200, data: Data, message: "sukses edit data" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/password/:id", authAll, async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const response = await UpdatePassword(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch("/reset/:id", authAll, async (req, res) => {
  try {
    const { id } = req.params;
    const {password} = req.body;
    console.log(password);
    const response = await ResetPassword(id, password);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/transaksi/:idUser", authAll, async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const response = await GetTransaksiUser(idUser);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/invoice/:idTransaksi", authAll, async (req, res) => {
  try {
    const idTransaksi = req.params.idTransaksi;
    const response = await GetInvoice(idTransaksi);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.delete("/delete/:id", authAdmin, async (req, res) => {
  try {
    const idUser = req.params.id
    const response = await deleteUser(idUser)
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
module.exports = router;
