const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTransaksi = async (data) => {
  try {
    const transaksi = await prisma.transaksi.create({
      data: {
        idUser: data.idUser,
        idPaket: data.idPaket,
        invoiceNumber: data.invoiceNumber,
        status: data.status,
        metodeBayar: data.metodeBayar,
        nomorPembayaran: data.nomorPembayaran,
        totalBayar: data.totalBayar,
        idPayment: data.idPayment,
        tanggalBayar: data.tanggalBayar,
        expiredDate: data.expiredDate,
        externalId: data.externalId
      },
    });
    return transaksi;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findTransaksi = async (id) => {
  
  const data = await prisma.transaksi.findUnique({
    where: { id: id },
    include:{
      paket: true,
      user: true,
      siplah: true
    }
  })
  return data
}

exports.totalTransaksi = async () => {
  const total = await prisma.transaksi.count()
  return total;
}

exports.updateTransaksi = async (id, data) => {
  console.log(id);
  const dataTransaksi = await prisma.transaksi.findUnique({
    where: { externalId: id},
  })
  if(!dataTransaksi){
    return "data tidak ditemukan"
  }
  const idTransaksi = dataTransaksi.id
  const transaksi = await prisma.transaksi.update({
    where: { id: idTransaksi},
    data: {
      idCallBack: data.idCallBack,
      status: data.status
    }
  })
  return transaksi;
}


exports.GetAllTransaksi = async () => {
  const response = await prisma.transaksi.findMany({
    include: {
      paket: true,
      user: true
    }
  })
  return response
}