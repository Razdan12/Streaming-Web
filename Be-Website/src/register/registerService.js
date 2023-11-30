const bcrypt = require("bcrypt");
const { createUser } = require("./registerRepo");
const { getUserByEmail } = require("../users/userRepo");
const { Response } = require("../config/response");

const RegisterService = {
  registerUser: async (name, email, password, role, idPaket) => {
    console.log("ini jalan");
    const cekEmail = await getUserByEmail(email);
    if (cekEmail) {
      return Response(400, [], "email sudah digunakan");
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const today = new Date();
        today.setDate(today.getDate() + 2);
        today.setHours(0, 0, 0, 0);
        const userData = {
          name: name,
          email: email,
          role: role,
          password: hashedPassword,
          idPaket: idPaket,
          aktif: today,
        };

        const user = await createUser(userData);
        return Response(201, user, "berhasil registrasi");
      } catch (error) {
        throw error;
      }
    }
  },
};

module.exports = RegisterService;
