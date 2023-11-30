const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPaket = async (data) => {
  return await prisma.paket.create({
    data,
  });
}

const getAllPakets = async () => {
  return await prisma.paket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

const getPaketById = async (id) => {
  return await prisma.paket.findUnique({
    where: { id },
  });
}

const updatePaket = async (id, data) => {
  return await prisma.paket.update({
    where: { id },
    data,
  });
}

const deletePaket = async (id) => {
  return await prisma.paket.delete({
    where: { id },
  });
}

module.exports = {
  createPaket,
  getAllPakets,
  getPaketById,
  updatePaket,
  deletePaket,
};
