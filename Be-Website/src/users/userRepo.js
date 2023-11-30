const prisma = require("../config");

const findUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      aktif: true,
      role: true,
      akun: {
        select: {
          id: true,
          name: true,
        },
      },
      paket: {
        select: {
          name: true,
        },
      },
    },
  });
  return user;
};

const getUserById = async (userId) => {
  try {
    const userById = await prisma.user.findUnique({
      where: { id: userId },
    });

    return userById;
  } catch (error) {
    throw error;
  }
};
const getUserByEmail = async (email) => {
  try {
    const userById = await prisma.user.findUnique({
      where: { email: email },
    });

    return userById;
  } catch (error) {
    throw error;
  }
};
const updateUser = async (id, data) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const jumlahUser = async () => {
  return await prisma.user.count();
};

const transaskiUser = async (idUser) => {
  const response = await prisma.transaksi.findMany({
    where: {
      idUser: idUser,
    },
    include: {
      paket: true,
      siplah: true
    }
  })

  return response
}

const getInvoice = async (idTransaksi) => {
  return await prisma.transaksi.findUnique({
    where: {
      id: idTransaksi
    },
    include: {
      siplah: true,
      paket: true,
      user: true
    }
  })
}

const deleteUserId = async (idUser) => {
  return await prisma.user.delete({
    where: {
      id: idUser
    }
  })
}
module.exports = {
  findUser,
  getUserById,
  updateUser,
  jumlahUser,
  getUserByEmail,
  transaskiUser,
  getInvoice,
  deleteUserId
};
