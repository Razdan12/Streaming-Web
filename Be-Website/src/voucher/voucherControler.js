const express = require("express");
const voucherService = require("./voucherServis");

const router = express.Router();


router.post('/', async (req, res) => {
  const { name, deskripsi, requirment, diskon, kode , mulai, berakhir} = req.body;
  const voucher = await voucherService.createVoucher(name, deskripsi, requirment, diskon, kode, mulai, berakhir);
    res.json(voucher);
});


router.get('/', async (req, res) => {
  const vouchers = await voucherService.getVouchers();
  res.json(vouchers);
});

router.post('/radeem', async (req, res) => {
  const { kode, idUser } = req.body;
  const voucher = await voucherService.redeemVoucher(kode, idUser)
  res.json(voucher);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const voucher = await voucherService.getVoucherById(id);
  res.json(voucher);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, deskripsi, requirment, diskon, status } = req.body;
  const voucher = await voucherService.updateVoucher(id, {
    name,
    deskripsi,
    requirment,
    diskon,
    status,
  });
  res.json(voucher);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await voucherService.deleteVoucher(id);
  res.sendStatus(204);
});

module.exports = router;
