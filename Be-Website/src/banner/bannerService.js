const { Response } = require("../config/response");
const { createBanner, getAllBanner, updateBanner, deleteBanner } = require("./bannerRepo");

const CreateBannerService = async ({ url, judul, jenis, urutan , deskripsi, idProduk, namaProduk}) => {
  try {
    if (!url) {
      return Response(500, [], "Gagal mendapatkan Url Image");
    }

    const data = {
      url,
      judul,
      aktif: false,
      jenis,
      urutan,
      deskripsi,
      idProduk,
      namaProduk
    };

    const response = await createBanner(data);
    return Response(201, response, "Berhasil upload Banner");
  } catch (error) {
    console.log(error);
    return Response(500, error, "Gagal upload Banner");
  }
};

const GetAllBannerService = async () => {
  try {
    const response = await getAllBanner();
    return Response(200, response, "Berhasil mengambil data banner");
  } catch (error) {
    return error;
  }
};

const UpdateBannerService = async (id, judul, jenis, aktif) => {
  const data = {
    judul: judul,
    jenis: jenis,
    aktif: aktif
  };
  try {
    const response = await updateBanner(id, data);
    return Response(201, response, " Berhasil Edit Data");
  } catch (error) {
    console.log(error);
   return Response(404, error, "gagal edit data");
  }
};

const DeleteBanner = async (id) => {
  try {
   const response =  await deleteBanner(id)
    return Response(201, response, " Berhasil Hapus Data");
  } catch (error) {
    console.log(error);
   return Response(404, error, "gagal Hapus data");
  }
}
module.exports = {
  CreateBannerService,
  GetAllBannerService,
  UpdateBannerService,
  DeleteBanner
};
