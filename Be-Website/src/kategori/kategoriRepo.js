const prisma = require("../config");


const createKategori = async (data) => {
  return await prisma.kategori.create({
    data,
  });
};

const getAllKategori = async () => {
  return await prisma.kategori.findMany({
    orderBy:{
      noKategori: 'asc'
    }
  });
};

const getOneKategori = async (id) => {
  return await prisma.kategori.findUnique({
    where: { id },
  });
};

const updateKategori = async (id, data) => {
  return await prisma.kategori.update({
    where: { id },
    data,
  });
};


const deleteKategori = async (id) => {
  return await prisma.kategori.delete({
    where: { id },
  });
};



module.exports = {
  createKategori,
  getAllKategori,
  getOneKategori,
  updateKategori,
  deleteKategori,
};
