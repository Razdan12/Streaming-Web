const { findTransaksi } = require("../paymentRepo");

exports.cekPayment = async (paymentId) => {
    const payment = await findTransaksi(paymentId)
    const dataRest = {
        invoice: payment.invoiceNumber,
        metodePembelian: payment.metodeBayar,
        status: payment.status,
        kodeBayar: payment.nomorPembayaran,
        namaInstansi: payment.siplah[0].namaInstansi,
        namaPaket: payment.paket.name,
        idPaket: payment.paket.id,
        jumlahAkun: payment.paket.kapasitas,
        email: payment.user.email,
        masaAktif: payment.paket.masaAktif,
        harga: payment.paket.harga,
        dibuat: payment.createdAt,

    }
    return dataRest;
  };
  