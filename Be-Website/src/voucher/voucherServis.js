const { UserById } = require("../users/userService");
const voucherRepo = require("./voucherRepo");

const createVoucher = async (
  name,
  deskripsi,
  requirment,
  diskon,
  kode,
  mulai,
  berakhir
) => {
  const createVoucherCode = (length) => {
    const rundomCode = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let voucherCode = "";

    for (let i = 0; i < length; i++) {
      const rundomIndex = Math.floor(Math.random() * rundomCode.length);
      voucherCode += rundomCode.charAt(rundomIndex);
    }

    return voucherCode;
  };

  const generateVoucher = kode ? kode : createVoucherCode(6);

  const data = {
    name: name,
    deskripsi: deskripsi,
    requirment: requirment,
    diskon: diskon,
    status: true,
    kode: generateVoucher,
    mulai: mulai,
    berakhir: berakhir,
  };

  try {
    const voucher = await voucherRepo.createVoucher(data);
   
    return voucher;
  } catch (error) {
   
    return error;
  }
};

const redeemVoucher = async (kode, idUser) => {
  try {
    const voucher = await voucherRepo.redemCodeVoucher(kode);
    if (!voucher) {
      throw new Error("Kode Voucher tidak ditemukan");
    }
    if (!voucher.status) {
      throw new Error("Voucher Tidak Tersedia");
    }
    const today = new Date();
    const startDate = new Date(voucher.mulai);
    const endDate = new Date(voucher.berakhir);

    if (today < startDate) {
      throw new Error("Voucher belum aktif");
    }
    if (today > endDate) {
      throw new Error("Voucher telah berakhir");
    }
    
    const idVoucher = voucher.id
    const totalDipakai = voucher.digunakan + 1;
    const pengguna = voucher.pengguna || [];
    const user = await UserById(idUser);

    if (pengguna.includes(user.email)){
      return "user sudah menggunakan voucher"
    }
    const penggunaBaru = [...pengguna, user.email]
    const data = {
      digunakan: totalDipakai,
      pengguna: penggunaBaru
    }
    await voucherRepo.updateVoucher(idVoucher, data)
    return voucher;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};


const getVouchers = async () => {
  return await voucherRepo.getVouchers();
};

const getVoucherById = async (id) => {
  return await voucherRepo.getVoucherById(id);
};

const updateVoucher = async (id, data) => {
  return await voucherRepo.updateVoucher(id, data);
};

const deleteVoucher = async (id) => {
  await voucherRepo.deleteVoucher(id);
};

module.exports = {
  createVoucher,
  getVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
  redeemVoucher
};
