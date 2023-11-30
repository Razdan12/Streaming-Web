const { createPaket, getAllPakets, getPaketById, updatePaket, deletePaket } = require('./paketRepo');

const addPaket = async (name, masaAktif, harga, kapasitas, register, userCreate ) => {
  const Aktif = masaAktif;
  const data = { name, masaAktif: Aktif, harga, kapasitas, register , userCreate};
  return await createPaket(data);
}

const getAllPaket = async () => {
  return await getAllPakets();
}

const getPaket = async (id) => {
  return await getPaketById(id);
}

const modifyPaket = async (id, name, masaAktif, harga, kapasitas) => {
  const data = { name, masaAktif, harga, kapasitas };
  return await updatePaket(id, data);
}

const removePaket = async (id) => {
  
  return await deletePaket(id);
}

module.exports = {
  addPaket,
  getAllPaket,
  getPaket,
  modifyPaket,
  removePaket,
};
