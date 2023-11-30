const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { paket: true, akun: true },
  });
};

const findPackage = async (packageId) => {
  return await prisma.paket.findUnique({
    where: { id: packageId },
  });
};

const updateUser = async (userId, packageId, date) => {
  try {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        paket: {
          connect: { id: packageId },
        },
        aktif: date,
      },
    });
  } catch (error) {
    throw error;
  }
};


const createAccounts = async (userId, accountsToCreate) => {
  const createdAccounts = await prisma.akun.createMany({
    data: Array(accountsToCreate)
      .fill(null)
      .map((_, index) => ({
        idUser: userId,
        name: `Account ${index + 1}`,
        picture: "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
        status: false,
      })),
  });

  return createdAccounts;
};

const getAkunById = async (idAkun) => {
  try {
    const getAkunById = await prisma.akun.findUnique({
      where: { id: idAkun },
    });
    return getAkunById;
  } catch (error) {
    return error
  }
};

const getAkunByUser = async (idUser) => {
  const akun = await prisma.akun.findMany({
    where: { idUser },
  });
  return akun;
};

const updateAccount = async (id, data) => {
  return await prisma.akun.update({
    where: { id },
    data,
  });
};

const deleteAccountsByUser = async (idUser) => {
  return await prisma.akun.deleteMany({
    where: { idUser },
  });
};
const deleteAccountsById = async (id) => {
  return await prisma.akun.delete({
    where: { 
      id
    },
  });
};


module.exports = {
  findUser,
  findPackage,
  updateUser,
  createAccounts,
  getAkunById,
  getAkunByUser,
  updateAccount,
  deleteAccountsByUser,
  deleteAccountsById
};
