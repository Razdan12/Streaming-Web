const kategoriRepo = require('./kategoriRepo');

const createKategori = async (data) => {
  const dataRest = {
    Name: data.Name,
    kategoriFor: data.kategoriFor,
    noKategori: data.noKategori,
    aktif: data.aktif
  }
  return await kategoriRepo.createKategori(dataRest);
};

const getAllKategori = async () => {
  return await kategoriRepo.getAllKategori();
};

const getOneKategori = async (id) => {
  return await kategoriRepo.getOneKategori(id);
};

const updateKategori = async (id, data) => {
  return await kategoriRepo.updateKategori(id, data);
};

const deleteKategori = async (id) => {
  return await kategoriRepo.deleteKategori(id);
};

module.exports = {
  createKategori,
  getAllKategori,
  getOneKategori,
  updateKategori,
  deleteKategori,
};
