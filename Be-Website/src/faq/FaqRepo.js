const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AddFAQRepo = async (data) => {
  const response = await prisma.faq.create({
    data: { 
        question: data.question, 
        answer: data.answer 
    },
  });
  return response;
};

const GetFAQRepo = async () => {
    const response = await prisma.faq.findMany({
        orderBy: {
            createdAt: "desc",
          },
    })
    return response
}

const DeleteFAQRepo = async (id) => {
    const response = await prisma.faq.delete({
        where: {id: id}
    })
    return response
}

module.exports = {
  AddFAQRepo,
  GetFAQRepo,
  DeleteFAQRepo
};
