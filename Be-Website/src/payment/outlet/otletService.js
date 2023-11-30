const Xendit = require("xendit-node");
const dotenv = require("dotenv");
const { getPaket } = require("../../paket/paketService");
const { UserById } = require("../../users/userService");
const { createTransaksi, totalTransaksi } = require("../paymentRepo");

dotenv.config();

const x = new Xendit({
  secretKey: process.env.XenditSecretKey,
});

const { RetailOutlet } = x;
const retailOutletSpecificOptions = {};
const ro = new RetailOutlet(retailOutletSpecificOptions);

exports.createOtlet = async (idUser, retail, idPaket) => {
  const user = await UserById(idUser);
  const paket = await getPaket(idPaket);
  if (!user) {
    return "kode user tidak valid";
  }
  if (!paket) {
    return "kode paket tidak valid";
  }
  const prefixName = user.name.substring(0, 3).toUpperCase();
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + 24);
  const invoiceNumber = await totalTransaksi();

  const resp = await ro.createFixedPaymentCode({
    externalID: idUser,
    retailOutletName: retail,
    name: user.name,
    expectedAmt: paket.harga,
    isSingleUse: true,
    expirationDate: date,
  });

  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");


  const invoice = `INV/${currentDate}/WJG/RO/${invoiceNumber
    .toString()
    .padStart(4, "0")}`;

  const dataTransaksi = {
    idUser: idUser,
    idPaket: idPaket,
    invoiceNumber: invoice,
    status: resp.status,
    metodeBayar: `RO-${retail}`,
    nomorPembayaran: resp.payment_code,
    totalBayar: resp.expected_amount,
    idPayment: resp.id,
    tanggalBayar: date,
    expiredDate: resp.expiration_date,
  };
  await createTransaksi(dataTransaksi);

  const dataRoTransaksi = {
    totalBayar: resp.expected_amount,
    invoiceNumber: invoice,
    statusPembayaran : resp.status,
    Methode: `RO-${retail}`,
    NoVA: resp.payment_code,
    namaPaket: paket.name,
    jumlahAkun: paket.kapasitas,
    emailUser: user.email,
    masaAktif: paket.masaAktif,
    periodePaket: new Date(new Date().getTime() + paket.masaAktif* 24 * 60 * 60 * 1000)

  }


  return dataRoTransaksi;
};
