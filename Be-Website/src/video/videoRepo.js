const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createVideo = async ({
  name,
  deskripsi,
  url,
  thumbnail,
  namaFIle,
  jenjangIds,
  durasi,
  kategoriIds,
}) => {
  try {
    const video = await prisma.video.create({
      data: {
        name,
        deskripsi,
        url,
        thumbnail,
        namaFIle,
        durasi,
        videoJenjang: {
          create: Array.isArray(jenjangIds)
            ? jenjangIds.map((jenjangId) => ({
                jenjangId,
              }))
            : [{ jenjangId: jenjangIds }],
        },
        videoKategori: {
          create: Array.isArray(kategoriIds)
            ? kategoriIds.map((kategoriId) => ({
                kategoriId,
              }))
            : [{ kategoriId: kategoriIds }],
        },
      },
    });

    return video;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllVideos = async () => {
  return await prisma.video.findMany({
    include: {
      videoKategori: true,
      videoJenjang: true,
      paket: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const filterVideo = async (jenjang, idKategori) => {
  return await prisma.video.findMany({
    where: {
      AND: [
        {
          videoKategori: {
            some: {
              kategoriId: idKategori,
            },
          },
        },
        {
          videoJenjang: {
            some: {
              jenjangId: jenjang,
            },
          },
        },
      ],
    },
  });
};

const jenjangVideo = async (jenjang) => {
  const data = await prisma.videoJenjang.findMany({
    where: {
      jenjangId: jenjang,
    },
    include: {
      video: true,
      jenjang: true,
    },
  });

  return data;
};

const getVideoByKategori = async (idKategori) => {
  const data = await prisma.videoKategori.findMany({
    where: {
      kategoriId: idKategori,
    },
    include: {
      video: true,
    },
  });
  return data;
};

const FindVideo = async (name) => {
  return await prisma.video.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
          },
        },
        {
          deskripsi: {
            contains: name,
          },
        },
      ],
    },
    include: {
      videoKategori: true,
      videoJenjang: true,
      paket: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getVideoById = async (id) => {
  return await prisma.video.findUnique({
    where: { id },
    include: {
      paket: true,
      videoKategori: true,
      videoJenjang: true,
    },
  });
};

const updateVideo = async (id, data) => {
  return await prisma.video.update({
    where: { id: id },
    data,
  });
};

const updateVideoJenjang = async (id, data) => {
  try {
    await prisma.video.update({
      where: { id: id },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        thumbnail: data.thumbnail,
        idPaketVid: data.idPaketVid,
        videoJenjang: {
          create: Array.isArray(data.jenjang)
            ? data.jenjang.map((jenjangId) => ({
                jenjangId,
              }))
            : [{ jenjangId: data.jenjang }],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateVideoKategori = async (id, data) => {
  try {
    await prisma.video.update({
      where: { id: id },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        thumbnail: data.thumbnail,
        idPaketVid: data.idPaketVid,
        videoKategori: {
          create: Array.isArray(data.idKategori)
            ? data.idKategori.map((kategoriId) => ({
                kategoriId,
              }))
            : [{ kategoriId: data.idKategori}],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteKategoriVideo = async (idVideo) => {
  await prisma.videoKategori.deleteMany({
    where: {
      videoId: idVideo
    }
  })
}
const deleteVideo = async (id) => {
  await prisma.videoJenjang.deleteMany({
    where: { videoId: id },
  });
  await prisma.videoKategori.deleteMany({
    where: { videoId: id },
  });

  return await prisma.video.delete({
    where: { id },
  });
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideoByKategori,
  jenjangVideo,
  filterVideo,
  FindVideo,
  updateVideoJenjang,
  updateVideoKategori,
  DeleteKategoriVideo
};
