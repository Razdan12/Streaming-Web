const prisma = require("../config/index");

const createVoucher = async (data) => {
  return await prisma.voucher.create({
    data: data,
  });
};

const getVouchers = async () => {
  return await prisma.voucher.findMany({
    orderBy: {
      createdAt: 'desc' 
    }
  });
};

const getVoucherById = async (id) => {
  return await prisma.voucher.findUnique({
    where: {
      id,
    },
  });
};

const redemCodeVoucher = async (kode) => {
  return await prisma.voucher.findUnique({
    where: {
      kode,
    }
  })
}

const updateVoucher = async (id, data) => {
  return await prisma.voucher.update({
    where: {
      id,
    },
    data: data,
  });
};

const deleteVoucher = async (id) => {
  await prisma.voucher.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createVoucher,
  getVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
  redemCodeVoucher
};
