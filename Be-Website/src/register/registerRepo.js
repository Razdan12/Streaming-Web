const prisma = require("../config");

const createUser = async (userData) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const createAkuns = async (akunDataArray) => {
  try {
    const createdAkuns = await prisma.akun.createMany({
      data: akunDataArray,
    });
    return createdAkuns;
  } catch (error) {
    throw error;
  }
};

const getPaketById = async (id) => {
  try {
    const paket = await prisma.paket.findUnique({
      where: { id },
    });
    return paket;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, createAkuns, getPaketById };