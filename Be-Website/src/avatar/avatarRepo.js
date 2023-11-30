const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createAvatar = async (data) => {
  try {
    const musik = await prisma.avatar.create({
      data
    });
    return musik;
  } catch (error) {
    throw error;
  }
};

const getAllAvatar = async () => {
    return await prisma.avatar.findMany({
        orderBy: {
          createdAt: 'asc' 
        }
      });
}


const getAvatarById = async (id) => {
  return await prisma.avatar.findUnique({
    where: { id }
  });
};

const updateAvatar = async (id, data) => {
  return await prisma.avatar.update({
    where: { id },
    data,
    
  });
};

const deleteAvatar = async (id) => {
  return await prisma.avatar.delete({
    where: { id },
  });
};
module.exports = {
    createAvatar,
    getAllAvatar,
    getAvatarById,
    updateAvatar,
    deleteAvatar
   
  };
  