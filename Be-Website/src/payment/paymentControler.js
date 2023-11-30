const express = require("express");
const { authAdmin } = require("../config/auth");
const { getAllTransaksi } = require("./paymentService");
const router = express.Router();


router.get("/", authAdmin , async (req, res) => {
    const response = await getAllTransaksi()
    const dataResponse = await Promise.all(
        response.map(async (item) => {
            return {
                id: item.id,
                emailUser: item.user.email,
                paket: item.paket.name,
                invoice: item.invoiceNumber,
                methode: item.metodeBayar,
                tanggalBayar: item.tanggalBayar,
                noPembayaran: item.nomorPembayaran,
                total: item.totalBayar,
                status: item.status,
                dibuat: item.createdAt
            }
        })
    )
    res.status(200).json(dataResponse);
})

module.exports = router;
