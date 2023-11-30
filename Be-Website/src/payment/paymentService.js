const { GetAllTransaksi } = require("./paymentRepo")

const getAllTransaksi = async () => {
    const response = await GetAllTransaksi()
    return response

}

module.exports = {
    getAllTransaksi
}