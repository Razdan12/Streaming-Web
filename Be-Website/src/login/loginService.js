const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("./loginRepo");
const { getAkunByUser, deleteAccountsByUser } = require("../akun/akunRepo");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY_JWT;

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const masaAktif = user.aktif;
  const today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(0, 0, 0, 0);

  const masaAktifDateOnly = masaAktif.toISOString().split("T")[0];
  const todayDateOnly = today.toISOString().split("T")[0];

  let token;
  if (masaAktifDateOnly <= todayDateOnly) {
    await deleteAccountsByUser(user.id);
    token = "expired";
  } else {
    token = jwt.sign({ userId: user.id, role: user.role, masaAktif: user.aktif }, secretKey, {
      expiresIn: "6h",
    });
  }

  const profil = await getAkunByUser(user.id);
  const role = user.role;
  const idUser = user.id
  return { token, profil, masaAktifDateOnly, role , idUser};
};

module.exports = { login };
