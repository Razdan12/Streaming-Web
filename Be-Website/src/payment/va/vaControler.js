const express = require("express");
const router = express.Router();
const { getVaBank, createVa, cekVa, cekPaymentVa, PaymentPay } = require("./vaService");


router.get("/bank", async (req, res) => {
  try {
    const VaBank = await getVaBank();
    res.status(200).json({ status: 200, data:  VaBank , message: "berhasil mengambil data VA Bank"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async ( req, res) => {
  const {idUser, bankCode , idPaket} = req.body;
  try {
    const createFixedVa = await createVa(idUser, bankCode, idPaket);
    res.status(201).json({ status: 200, data: createFixedVa, message: "sukses membuat VA"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post("/cekva", async ( req, res) => {
  const {id} = req.body;
  try {
    const VaCek = await cekVa(id);
    res.status(201).json({ status: 200, data: VaCek, message: "sukses"})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post("/cekpayment", async (req, res) => {
  const {paymentId} = req.body;
  try {
    const cekPAymentVa = await cekPaymentVa(paymentId)
    res.status(201).json({ status: 200, data: cekPAymentVa, message: "sukses"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.post('/xendit-pay', async (req, res) => {
  const payload = req.body;
  const data = {
    idCallback : payload.id,
    externalId : payload.external_id,
  }
  
 await PaymentPay(data)
  res.status(200).json("sukses");
})

router.post('/xendit-update-payment', (req, res) => {
  const payload = req.body;
  
  res.status(200).send('Webhook berhasil diterima');
})

module.exports = router;
