const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createBanner = async (data) => {
  try {
    const musik = await prisma.banner.create({
      data
    });
    return musik;
  } catch (error) {
    throw error;
  }
};

const getAllBanner = async () => {
    return await prisma.banner.findMany({
        orderBy: {
          urutan: 'asc' 
        }
      });
}

const filterBanner = async (jenis) => {
  return await prisma.banner.findMany({
    where: {
     jenis: jenis
    }
  })
}

const getBannerById = async (id) => {
  return await prisma.banner.findUnique({
    where: { id }
  });
};

const updateBanner = async (id, data) => {
  return await prisma.banner.update({
    where: { id },
    data,
    
  });
};

const deleteBanner = async (id) => {
  return await prisma.banner.delete({
    where: { id },
  });
};
module.exports = {
    createBanner,
    filterBanner,
    getAllBanner,
    getBannerById,
    updateBanner,
    deleteBanner
   
  };
  