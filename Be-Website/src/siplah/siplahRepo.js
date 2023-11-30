const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSiplahCode = async (data) => {
  try {
    const SiplahCode = await prisma.siplahCode.create({
      data: data,
    });
   
    return SiplahCode;
  } catch (error) {
    return error;
  }
};

const createUserSiplah = async (data) => {
  try {
    const dataRes = await prisma.userSiplah.create({
      data: data
    })
    return dataRes
  } catch (error) {
    return error;
  }
}

const getSiplahUser = async (kodeSiplah) => {
  const response = await prisma.userSiplah.findMany({
    where: {KodeSiplah: kodeSiplah},
  })
  return response
} 

const findUserSiplah = async (idUser) => {
  return await prisma.userSiplah.findMany({
    where: {
      idUser: idUser
    }
  })
}
const DeleteUserSiplah = async (idUser) => {
  return await prisma.userSiplah.deleteMany({
    where: {
      idUser: idUser
    }
  })
}
const totalSiplah = async () => {
  const total = await prisma.userSiplah.count()
  return total;
}
const getSiplahCodes = async () => {
  return await prisma.siplahCode.findMany({
    orderBy: {
      createdAt: 'desc' 
    }
  });
};

const getSiplahCodeById = async (id) => {
  return await prisma.siplahCode.findUnique({
    where: {
      id,
    },
  });
};

const redemCodeSiplah = async (kodeSiplah) => {
  return await prisma.siplahCode.findUnique({
    where: {
      kodeSiplah,
    },
    include: {
      paket: true
    }
  })
}

const updateSiplahCode = async (id, data) => {
  return await prisma.siplahCode.update({
    where: {
      id,
    },
    data: data,
  });
};

const deleteSiplahCode = async (id) => {
  await prisma.siplahCode.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  totalSiplah,
  createSiplahCode,
  getSiplahCodes,
  getSiplahCodeById,
  updateSiplahCode,
  deleteSiplahCode,
  redemCodeSiplah,
  createUserSiplah,
  getSiplahUser ,
  findUserSiplah,
  DeleteUserSiplah
};
