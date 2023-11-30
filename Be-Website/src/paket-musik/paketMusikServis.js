const {
  RepoAddPaketMusik,
  RepoGetPaketMusik,
  RepoPaketMusikById,
  RepoUpdatePaketMusik,
  RepoDeletePaketMusik,
} = require("./paketMusikRepo");

exports.SerCreatePaketMusik = async (data) => {
  return await RepoAddPaketMusik(data);
};

exports.SerGetPaketMusik = async () => {
  return await RepoGetPaketMusik();
};

exports.SerGetPaketMusikById = async (id) => {
  return await RepoPaketMusikById(id);
};

exports.SerUpdatePaketMusik = async (id, data) => {
  return await RepoUpdatePaketMusik(id, data);
};

exports.SerDeletePaketMusik = async (id) => {
  const paketMusik = await RepoDeletePaketMusik(id);
  if (!paketVideo) {
    throw new Error("Paket video not found");
  }
  if (paketVideo.video) {
    throw new Error("Cannot delete paket video with related video");
  }
  return paketMusik;
};
