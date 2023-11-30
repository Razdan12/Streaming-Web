const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JenjangVideoById = async (id) => {
  return await prisma.jenjang.findUnique({
    where: { id },
  });
};

const VideoJenjang = async (idVideo) => {
  try {
    const data = await prisma.videoJenjang.findMany({
      where: {
        videoId: idVideo,
      },
    });
    
    return data;
  } catch (error) {
    console.log(error);
  }
};

const MusikJenjang = async (idMusik) => {
  try {
    const data = await prisma.musikJenjang.findMany({
      where: {
        musikId: idMusik
      },
      include: {
        musik: true
      }
    })
    return data
  } catch (error) {
    console.log(error);
  }

}
const getAllJenjang = async () => {
  return await prisma.jenjang.findMany()
}

const DeleteVideoJenjang = async (videoId) => {
  return await prisma.videoJenjang.deleteMany({
    where: {
      videoId: videoId
    }
  })

}

const DeleteMusikJenjang = async (musikId) => {
  return await prisma.musikJenjang.deleteMany({
    where: {
      musikId: musikId
    }
  })
}



module.exports = {
  JenjangVideoById,
  VideoJenjang,
  getAllJenjang,
  MusikJenjang,
  DeleteVideoJenjang,
  DeleteMusikJenjang
};
