const { createAccounts } = require("../akun/akunService");
const { getPaket } = require("../paket/paketService");
const { createTransaksi } = require("../payment/paymentRepo");
const { UserById, updateUserr } = require("../users/userService");
const siplahCodeRepo = require("./siplahRepo");
const { Response } = require("../config/response");

const createSiplahCode = async (idPaket, methodBayar, kuota) => {
  const codeSiplah = (length) => {
    const rundomCode = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let siplahCode = "";

    for (let i = 0; i < length; i++) {
      const rundomIndex = Math.floor(Math.random() * rundomCode.length);
      siplahCode += rundomCode.charAt(rundomIndex);
    }

    return siplahCode;
  };

  const generateSiplahCode = codeSiplah(10);

  const dataSiplah = {
    idPaket,
    kodeSiplah: generateSiplahCode,
    methode: methodBayar,
    kuota,
    avail: true,
  };

  try {
    const SiplahCode = await siplahCodeRepo.createSiplahCode(dataSiplah);
    return SiplahCode;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const RedemSiplah = async (idUser, namaInstansi, noHp, alamat, kodeSiplah) => {
  try {
    const findCode = await siplahCodeRepo.redemCodeSiplah(kodeSiplah);
    if (!findCode) {
      return Response(404, [], "token tidak ditemukan");
    }
    const cekAvail = findCode.avail;
    if (!cekAvail) {
      return Response(404, [], "token telah digunakan");
    }

    const kuota = findCode.kuota;
    const sisaKuota = findCode.sisaKuota;
    if (kuota >= sisaKuota) {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const totalsiplah = await siplahCodeRepo.totalSiplah();
      const invoice = `INV/${currentDate}/WJG/SIPLAH/00${totalsiplah}`;

      const dataTransaksi = {
        idUser: idUser,
        idPaket: findCode.idPaket,
        invoiceNumber: invoice,
        status: "lunas",
        metodeBayar: findCode.methode,
        nomorPembayaran: findCode.kodeSiplah,
        totalBayar: findCode.paket.harga,
        tanggalBayar: new Date(),
        externalId: `siplah-${idUser}`,
      };
      const transaksi = await createTransaksi(dataTransaksi);
      
      const kuotaSiplah = sisaKuota + 1;
      const Avail = kuota === kuotaSiplah ? false : true;

      const dataSiplah = {
        idUser,
        namaInstansi,
        status: "Sukses",
        KodeSiplah: kodeSiplah,
        noHp: noHp,
        alamat: alamat,
        invoice,
        idTransaksi: transaksi.id,
      };

      const UpdateSiplah = {
        sisaKuota: kuotaSiplah,
        avail: Avail
      }
    
      const dataUser = {
        role: "user",
        status: "aktif",
      };
      await updateUserr(idUser, dataUser);
      await siplahCodeRepo.createUserSiplah(dataSiplah);
      const paket = await getPaket(findCode.idPaket);
      await updateSiplahCode(findCode.id, UpdateSiplah)
      await createAccounts(idUser, paket.id);
      
      const dataRest = {
        idPaket: paket.id,
        idTransaksi: transaksi.id
      }
      return Response(200, dataRest, "sukses redem");
    }
    return Response(400, [], "kouta penuh");
  } catch (error) {
    console.log(error);
    return Response(500, [], error);
  }
};

const GetSiplahCodes = async () => {
  try {
    const getSiplah = await siplahCodeRepo.getSiplahCodes();
    const dataRespon = await Promise.all(
      getSiplah.map(async (item) => {
        const paket = await getPaket(item.idPaket);

        return {
          id: item.id,
          paket: paket.name,
          kodeSiplah: item.kodeSiplah,
          harga: paket.harga,
          methodBayar: item.methode,
          avail: item.avail,
          kuota: item.kuota,
          sisaKuota: item.sisaKuota
        };
      })
    );

    return dataRespon;
  } catch (error) {
    return error;
  }
};

const getSiplahCodeById = async (id) => {
  try {
    const siplah = await siplahCodeRepo.getSiplahCodeById(id);
    const paket = await getPaket(siplah.idPaket);
    
    return {
      id: item.id,
      paket: paket.name,
      kodeSiplah: item.kodeSiplah,
      harga: paket.harga,
      methodBayar: item.methode,
    };
  } catch (error) {
    return error;
  }
};

const getSiplahUser = async (kode) => {
  const response = await siplahCodeRepo.getSiplahUser(kode)
  return response
}

const updateSiplahCode = async (id, data) => {
  return await siplahCodeRepo.updateSiplahCode(id, data);
};

const deleteSiplahCode = async (id) => {
  await siplahCodeRepo.deleteSiplahCode(id);
};

module.exports = {
  createSiplahCode,
  GetSiplahCodes,
  getSiplahCodeById,
  updateSiplahCode,
  deleteSiplahCode,
  RedemSiplah,
  getSiplahUser
};
