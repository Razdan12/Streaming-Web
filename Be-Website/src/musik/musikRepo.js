const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMusik = async ({
  name,
  deskripsi,
  url,
  thumbnail,
  jenjangIds,
  durasi,
  lirik,
  kategoriIds,
  namaFile,
}) => {
  try {
    const musik = await prisma.musik.create({
      data: {
        name,
        deskripsi,
        url,
        thumbnail,
        durasi,
        lirik,
        namaFile,
        musikJenjang: {
          create: Array.isArray(jenjangIds)
            ? jenjangIds.map((jenjangId) => ({
                jenjangId,
              }))
            : [{ jenjangId: jenjangIds }],
        },
        musikKategori: {
          create: Array.isArray(kategoriIds)
            ? kategoriIds.map((kategoriId) => ({
                kategoriId,
              }))
            : [{ kategoriId: kategoriIds }],
        },
      },
    });
    return musik;
  } catch (error) {
    throw error;
  }
};

const getAllMusik = async () => {
  try {
    const data = await prisma.musik.findMany({
      include: {
        musikKategori: true,
        musikJenjang: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const filterMusik = async (jenjang, idKategori) => {
  return await prisma.musik.findMany({
    where: {
      musikJenjang: {
        id: jenjang,
      },
      musikKategori: {
        id: idKategori,
      },
    },
    include: {
      musikKategori: true,
      musikJenjang: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const jenjangMusik = async (jenjang) => {
  return await prisma.musik.findMany({
    where: {
      musikJenjang: {
        jenjangId: jenjang,
      },
    },
    include: {
      musikKategori: true,
      musikJenjang: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const kategoriMusik = async (idKategori) => {
  const data = await prisma.musikKategori.findMany({
    where: {
      kategoriId: idKategori,
    },
    include: {
      musik: true,
    },
  });
  return data;
};

const FindMusik = async (name) => {
  return await prisma.musik.findMany({
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
      musikKategori: true,
      musikJenjang: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getMusikById = async (id) => {
  return await prisma.musik.findUnique({
    where: { id },
    include: {
      paket: true,
      musikKategori: true,
      musikJenjang: true,
    },
  });
};

const updateMusik = async (id, data) => {
  return await prisma.musik.update({
    where: { id: id },
    data,
  });
};

const updateMusikJenjang = async (id, data) => {
  try {
    await prisma.musik.update({
      where: { id: id },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        lirik: data.lirik,
        idPaketMusik: data.idPaketMusik,
        musikJenjang: {
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
const updateMusikKategori = async (id, data) => {
  try {
    await prisma.musik.update({
      where: { id: id },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        lirik: data.lirik,
        idPaketMusik: data.idPaketMusik,
        musikKategori: {
          create: Array.isArray(data.idKategori)
            ? data.idKategori.map((kategoriId) => ({
                kategoriId,
              }))
            : [{ kategoriId: data.idKategori }],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteKategoriMusik = async (idMusik) => {
  await prisma.musikKategori.deleteMany({
    where: {
      musikId: idMusik,
    },
  });
};
const deleteMusik = async (id) => {
  await prisma.musikJenjang.deleteMany({
    where: { musikId: id },
  });
  await prisma.musikKategori.deleteMany({
    where: { musikId: id },
  });
  return await prisma.musik.delete({
    where: { id },
  });
};
module.exports = {
  createMusik,
  getAllMusik,
  filterMusik,
  jenjangMusik,
  getMusikById,
  updateMusik,
  deleteMusik,
  kategoriMusik,
  FindMusik,
  updateMusikKategori,
  updateMusikJenjang,
  DeleteKategoriMusik,
};
