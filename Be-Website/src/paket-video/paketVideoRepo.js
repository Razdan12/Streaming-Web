const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPaketVideo = async data => {
  return prisma.paket_video.create({
    data,
  });
};

exports.getPaketVideos = async () => {
  return prisma.paket_video.findMany({
    include:{
      video: true
    }
  });
};

exports.getPaketVideoById = async id => {
  return prisma.paket_video.findUnique({
    where: { id },
  });
};

exports.updatePaketVideo = async (id, data) => {
  return prisma.paket_video.update({
    where: { id },
    data,
  });
};

exports.deletePaketVideo = async id => {
  return prisma.paket_video.delete({
    where: { id },
  });
};

exports.getVideoByPaket = async (idPaket) => {
  return prisma.video.findMany({
    where: {
      idPaketVid: idPaket
    },
    include: {
      videoKategori: true,
      videoJenjang: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}