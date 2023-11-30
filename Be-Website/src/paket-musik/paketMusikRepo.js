const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.RepoAddPaketMusik = async data => {
  return await prisma.paket_musik.create({
    data,
  });
};

exports.RepoGetPaketMusik = async () => {
  return await prisma.paket_musik.findMany({
    include:{
      musik: true
    }
  });
};

exports.RepoPaketMusikById = async id => {
  return await prisma.paket_musik.findUnique({
    where: { id },
  });
};

exports.RepoUpdatePaketMusik = async (id, data) => {
  return await  prisma.paket_musik.update({
    where: { id },
    data,
  });
};

exports.RepoDeletePaketMusik = async id => {
  return await prisma.paket_musik.delete({
    where: { id },
  });
};
