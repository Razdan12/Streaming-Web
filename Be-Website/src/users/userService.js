const { createAccounts, deleteProfilByUser } = require("../akun/akunService");
const prisma = require("../config");
const RegisterService = require("../register/registerService");
const { findUserSiplah, DeleteUserSiplah } = require("../siplah/siplahRepo");
const { findUser, getUserById, updateUser, transaskiUser, getInvoice, deleteUserId } = require("./userRepo");
const bcrypt = require("bcrypt");

const getUser = async () => {
  const user = await findUser();
  return user;
};

const addUserManual = async (name, email, password, idPaket) => {
  try {
    const role = 'user'
    const response = await RegisterService.registerUser(name, email, password, role)
    const idUser = response.data.id
    await createAccounts(idUser, idPaket)
    return response
  } catch (error) {
    console.log(error);
  }

}
const deleteUser = async (idUser) => {
  try {
    await deleteProfilByUser(idUser)
    const findSiplah = await findUserSiplah(idUser)
    if(findSiplah){
      await DeleteUserSiplah(idUser)
    }
    await prisma.transaksi.deleteMany({
      where: {
        idUser: idUser
      }
    })
    await deleteUserId(idUser)
    return 'sukses'


  } catch (error) {
    console.log(error);
  }


}
const UserById = async (userId) => {
  try {
    const user = await getUserById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserr = async (id, data) => {
  return await updateUser(id, data);
};

const UpdatePassword = async (id, data) => {
  const user = await UserById(id);
  const UserPassword = user.password
  const oldPassword = data.oldPassword
  const newPassword = data.newPassword
  const validPassword = await bcrypt.compare(oldPassword, UserPassword);

  if(!validPassword){
    return {password: false}
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const Data = {
    password: hashedPassword
  }
  const response = await updateUserr(id, Data)
  if(response){
    return {password: true}
  }

}
const ResetPassword = async (id, password) => {
 
  const defaultPassword = password ? password : '12345678'
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  const Data = {
    password: hashedPassword
  }
  const response = await updateUserr(id, Data)
  if(response){
    return {password: true}
  }

}

const GetTransaksiUser = async (idUser) => {
  const response = await transaskiUser(idUser)
  const dataResponse = await Promise.all(
    response.map(async (item) => {
      const dataRest = {
        id: item.id,
        tanggal : item.tanggalBayar,
        invoice : item.invoiceNumber,
        paket: item.paket.name,
        masaAktif: item.paket.masaAktif,
        totalTransaksi: item.totalBayar,
        status: item.status,
        dibayar: item.tanggalBayar
      }
      return dataRest
    })
  )
  return dataResponse
}

const GetInvoice = async (idTransaksi) => {
  const response = await getInvoice(idTransaksi)
  const dataSiplah = await Promise.all(
    response.siplah.map(async (item) => {
      return {
        namaInstansi : item.namaInstansi,
        noTelfon: item.noHp,
        alamat: item.alamat,

      }
    })
  )
  const dataResponse = {
    id: response.id,
    siplahData: dataSiplah,
    email: response.user.email,
    noInvoice: response.invoiceNumber,
    tanggalBayar: response.tanggalBayar,
    paymentMethod: response.metodeBayar,
    namaPaket: response.paket.name,
    jumlahAkun: response.paket.kapasitas,
    masaAktif: response.paket.masaAktif,
    kodePembayaran: response.nomorPembayaran,
    harga: response.totalBayar,
  }
  return dataResponse

}

module.exports = {
  getUser,
  UserById,
  updateUserr,
  UpdatePassword,
  GetTransaksiUser,
  addUserManual ,
  GetInvoice,
  deleteUser,
  ResetPassword
};
