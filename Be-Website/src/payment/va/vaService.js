const Xendit = require("xendit-node");
const dotenv = require("dotenv");
const { UserById, updateUserr } = require("../../users/userService");
const {
  createTransaksi,
  totalTransaksi,
  findTransaksi,
  updateTransaksi,
} = require("../paymentRepo");
const { getPaket } = require("../../paket/paketService");
const { SendEmail } = require("../../mail/mailService");

dotenv.config();

const x = new Xendit({
  secretKey: process.env.XenditSecretKey,
});
const { VirtualAcc } = x;
const vaSpecificOption = {};
const va = new VirtualAcc(vaSpecificOption);

exports.getVaBank = async () => {
  const banks = await va.getVABanks();
  return banks;
};

exports.createVa = async (idUser, bankCode, idPaket) => {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + 24);
  const user = await UserById(idUser);
  const paket = await getPaket(idPaket);
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const invoiceNumber = await totalTransaksi();

  const resp = await va.createFixedVA({
    externalID: idUser,
    bankCode: bankCode,
    name: user.name,
    isClosed: true,
    expectedAmt: paket.harga,
    isSingleUse: true,
    expirationDate: date,
  });

  const invoice = `INV/${currentDate}/WJG/VA/${invoiceNumber
    .toString()
    .padStart(4, "0")}`;

  const dataTransaksi = {
    idUser: idUser,
    idPaket: idPaket,
    invoiceNumber: invoice,
    status: resp.status,
    metodeBayar: `VA-${bankCode}`,
    nomorPembayaran: resp.account_number,
    totalBayar: resp.expected_amount,
    idPayment: resp.id,
    tanggalBayar: date,
    expiredDate: resp.expiration_date,
    externalId: idUser,
  };
  const dataRepo = await createTransaksi(dataTransaksi);
  const dataUser = {
    role: "user",
    status: "pending",
  };
  await updateUserr(idUser, dataUser);

  const dataEmail = {
    penerima: user.email,
    subject: "Detail Pembayaran Langganan www.wijiga.com",
    pesan:
      "Detail Pembayaran langganan layanan di wijiga.com dengan detail sebagai berikut : ",
    dataPesan: `
    <p>Email Pengguna     : ${user.email}</p>
    <p>Detail Paket       : ${paket.name}</p>
    <p>Masa Aktif         : ${paket.masaAktif} Hari</p>
    <p>Total Tagihan      : Rp. ${dataRepo.totalBayar}</p>
    <p>Metode Pembayaran  : ${dataRepo.metodeBayar}</p>
    <p>Nomor Pembayaran   : ${dataRepo.nomorPembayaran}</p>
    <p>Status             : ${dataRepo.status}</p>
    `,
    penutup: `Segera lakukan pembayaran sebelum ${dataRepo.expiredDate}`,
    penutup2: `Terimakasih telah berlangganan di wijiga.com`
  };

  const Penutup = dataRepo.metodeBayar === "siplah" || dataRepo.metodeBayar === "manual" ? dataEmail.penutup2 : dataEmail.penutup;
  await SendEmail(
    dataEmail.penerima,
    dataEmail.subject,
    dataEmail.pesan,
    dataEmail.dataPesan,
    Penutup
  );
  return dataRepo;
};

exports.cekVa = async (id) => {
  const dataTransaksi = await findTransaksi(id);
  // const idTransaksi = dataTransaksi.idPayment
  // const VaCek = await va.getFixedVA({ id: idTransaksi });
  const dataRespon = {
    id: id,
    totalBayar: dataTransaksi.totalBayar,
    invoiceNumber: dataTransaksi.invoiceNumber,
    statusPembayaran: dataTransaksi.status,
    Methode: dataTransaksi.metodeBayar,
    NoVA: dataTransaksi.nomorPembayaran,
    namaPaket: dataTransaksi.paket.name,
    jumlahAkun: dataTransaksi.paket.kapasitas,
    emailUser: dataTransaksi.user.email,
    masaAktif: dataTransaksi.paket.masaAktif,
    dibuat: dataTransaksi.createdAt,
  };

  return dataRespon;
};

exports.cekPaymentVa = async (paymentId) => {
  const payment = await va.getVAPayment({ paymentID: paymentId });
  return payment;
};

exports.PaymentPay = async (data) => {
  const externalId = data.externalId;
  console.log(externalId);

  const Data = {
    idCallBack: data.idCallback,
    status: "lunas",
  };
  const dataUser = {
    role: "user",
    status: "aktif",
  };
  const user = await updateUserr(externalId, dataUser);
  const paket = await getPaket(user.idPaket);

  const updatePayment = await updateTransaksi(externalId, Data);
  const dataEmail = {
    penerima: user.email,
    subject: "Pembayaran Langganan www.wijiga.com",
    pesan:
      "Pembayaran anda telah kami terima , terima kasih telah berlangganan di wijiga.com berikut detail paket anda : ",
    dataPesan: `
    <p>Email Pengguna     : ${user.email}</p>
    <p>Nama Paket         : ${paket.name}</p>
    <p>Masa Aktif         : ${paket.masaAktif} Hari</p>
    `,
    penutup: `untuk mengakses akun anda silakan login di https://wijiga.com`,
  };
  await SendEmail(
    dataEmail.penerima,
    dataEmail.subject,
    dataEmail.pesan,
    dataEmail.dataPesan,
    dataEmail.penutup
  );
  return updatePayment;
};
