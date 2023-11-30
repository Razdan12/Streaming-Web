const { JenjangVideoById } = require("../Jenjang/RepoJenjang");
const paketVideoRepo = require("./paketVideoRepo");

exports.createPaketVideo = async (data) => {
  return paketVideoRepo.createPaketVideo(data);
};

exports.getPaketVideos = async () => {
  return paketVideoRepo.getPaketVideos();
};

exports.getPaketVideoById = async (id) => {
  return paketVideoRepo.getPaketVideoById(id);
};

exports.updatePaketVideo = async (id, data) => {
  return paketVideoRepo.updatePaketVideo(id, data);
};

exports.deletePaketVideo = async (id) => {
  const paketVideo = await paketVideoRepo.getPaketVideoById(id);
  if (!paketVideo) {
    throw new Error("Paket video not found");
  }
  if (paketVideo.video) {
    throw new Error("Cannot delete paket video with related video");
  }
  return paketVideoRepo.deletePaketVideo(id);
};

exports.getVideoByIdPaket = async (idPaket) => {
  try {
    const data = await paketVideoRepo.getVideoByPaket(idPaket);
    // const dataRespon = await Promise.all(
    //   data.map(async (item) => {
    //     const jenjang = await JenjangVideoById(item.jenjangId);
    //     const kategori = await getOneKategori(item.kategoriId);
    //     const dataKategori = {
    //       id: kategori.id,
    //       Name: kategori.Name,
    //       aktif: kategori.aktif,
    //       urutan: kategori.noKategori,
    //       jenis: kategori.kategoriFor,
    //     };
    //     return {
    //       id: item.id,
    //       judul: item.name,
    //       deskripsi: item.deskripsi,
    //       thumbnail: item.thumbnail,
    //       durasi: item.durasi,
    //       namaFile: item.namaFIle,
    //       jenjang: jenjang,
    //       kategori: dataKategori,
    //     };
    //   })
    // );
    return data;
  } catch (error) {
    console.log(error);
    return "gagal mengambil data";
  }
};

