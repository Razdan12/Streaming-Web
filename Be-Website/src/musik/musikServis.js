const {
  JenjangVideoById,
  MusikJenjang,
  DeleteMusikJenjang,
} = require("../Jenjang/RepoJenjang");
const { Response } = require("../config/response");
const { getOneKategori } = require("../kategori/kategoriRepo");
const { getAllKategori } = require("../kategori/kategoriServis");
const {
  createMusik,
  getAllMusik,
  jenjangMusik,
  kategoriMusik,
  filterMusik,
  getMusikById,
  updateMusik,
  deleteMusik,
  FindMusik,
  DeleteKategoriMusik,
  updateMusikJenjang,
  updateMusikKategori,
} = require("./musikRepo");

const AddMusik = async ({
  name,
  deskripsi,
  url,
  jenjangIds,
  durasi,
  lirik,
  kategoriIds,
  namaFile,
}) => {
  const thumbnail =
    "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";

  return await createMusik({
    name,
    deskripsi,
    url,
    thumbnail,
    jenjangIds,
    durasi,
    lirik,
    kategoriIds,
    namaFile,
  });
};

const GetAllMusik = async () => {
  try {
    const musik = await getAllMusik();
    const dataRespon = await Promise.all(
      musik.map(async (item) => {
        const dataJenjang = await Promise.all(
          item.musikJenjang.map(async (item) => {
            const jenjang = await JenjangVideoById(item.jenjangId);
            return jenjang;
          })
        );

        const dataKategori = await Promise.all(
          item.musikKategori.map(async (item) => {
            const kategori = await getOneKategori(item.kategoriId);
            const data = {
              id: kategori.id,
              kategori: kategori.Name,
              aktif: kategori.aktif,
              urutan: kategori.noKategori,
              jenis: kategori.kategoriFor,
            };
            return data;
          })
        );
        return {
          id: item.id,
          judul: item.name,
          deskripsi: item.deskripsi,
          thumbnail: item.thumbnail,
          jenjang: dataJenjang,
          lirik: item.lirik,
          namaFile: item.namaFile,
          kategori: dataKategori,
        };
      })
    );

    return dataRespon;
  } catch (error) {
    return error;
  }
};

const getAllMusikWithKategori = async (jenjang) => {
  try {
    const Kategori = await getAllKategori();

    if (!Kategori) throw new Error("Failed to get categories");

    const idKategori = await Promise.all(
      Kategori.map(async (item) => {
        const musik = await GetMusikKategori(item.id);
        // console.log({musik});

        if (!musik)
          throw new Error(`Failed to get videos for category ${item.id}`);

        const dataMusik = await Promise.all(
          musik.map(async (musikItem) => {
            const dataJenjang = await MusikJenjang(musikItem.id);

            if (!dataJenjang)
              throw new Error(
                `Failed to get jenjang for musik ${musikItem.musik.id}`
              );

            const getJenjang = await Promise.all(
              dataJenjang.map(async (jenjang) => {
                const responseJenjang = await JenjangVideoById(
                  jenjang.jenjangId
                );

                if (!responseJenjang)
                  throw new Error(
                    `Failed to get jenjang video by id ${jenjang.jenjangId}`
                  );
                return responseJenjang;
              })
            );

            return {
              id: musikItem.id,
              name: musikItem.name,
              deskripsi: musikItem.deskripsi,
              thumbnail: musikItem.thumbnail,
              lirik: musikItem.lirik,
              namaFile: musikItem.namaFile,
              jenjang: getJenjang,
              kategori: item.Name,
            };
          })
        );

        if (jenjang) {
          const filterData = dataMusik.filter((item) =>
            item.jenjang.some((j) => j.name === jenjang)
          );
          return {
            idKategori: item.id,
            kategori: item.Name,
            status: item.aktif,
            jenis: item.kategoriFor,
            Musik: filterData,
          };
        } else {
          return {
            idKategori: item.id,
            kategori: item.Name,
            status: item.aktif,
            jenis: item.kategoriFor,
            Musik: dataMusik,
          };
        }
      })
    );
    return Response(200, idKategori, "berhasil mendapatkan semua data Musik");
  } catch (error) {
    // console.log(error);
    return Response(500, [], error);
  }
};
const JenjangMusik = async (jenjang) => {
  try {
    const data = await jenjangMusik(jenjang);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const dataJenjang = await Promise.all(
          item.musikJenjang.map(async (item) => {
            const jenjangRes = await JenjangVideoById(item.jenjangId);
            return jenjangRes;
          })
        );

        const dataKategori = await Promise.all(
          item.musikKategori.map(async (item) => {
            const kategori = await getOneKategori(item.kategoriId);
            const dataRes = {
              id: kategori.id,
              kategori: kategori.Name,
              aktif: kategori.aktif,
              urutan: kategori.noKategori,
              jenis: kategori.kategoriFor,
            };
            return dataRes;
          })
        );
        return {
          id: item.id,
          judul: item.name,
          deskripsi: item.deskripsi,
          thumbnail: item.thumbnail,
          jenjang: dataJenjang,
          lirik: item.lirik,
          namaFile: item.namaFile,
          kategori: dataKategori,
        };
      })
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const GetMusikKategori = async (idKategori) => {
  try {
    const data = await kategoriMusik(idKategori);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const video = await GetMusikById(item.musik.id);
        return video;
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const FilterMusik = async (jenjang, idKategori) => {
  try {
    const data = await filterMusik(jenjang, idKategori);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        return {
          id: item.id,
          judul: item.name,
          deskripsi: item.deskripsi,
          thumbnail: item.thumbnail,
          jenjang: item.jenjang,
          durasi: item.durasi,
          kategori: item.kategori.Name,
          namaFile: item.namaFile,
        };
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
  }
};

const GetMusikById = async (id) => {
  const musik = await getMusikById(id);
  if (!musik) {
    return Response(400, [], "musik tidak ditemukan");
  }
  const dataJenjang = await Promise.all(
    musik.musikJenjang.map(async (item) => {
      const jenjang = await JenjangVideoById(item.jenjangId);
      return jenjang;
    })
  );

  const dataKategori = await Promise.all(
    musik.musikKategori.map(async (item) => {
      const kategori = await getOneKategori(item.kategoriId);
      const data = {
        id: kategori.id,
        Name: kategori.Name,
        aktif: kategori.aktif,
        urutan: kategori.noKategori,
        jenis: kategori.kategoriFor,
      };
      return data;
    })
  );
  const data = {
    id: musik.id,
    name: musik.name,
    thumbnail: musik.thumbnail,
    jenjang: dataJenjang,
    kategori: dataKategori,
    namaFile: musik.namaFile,
    lirik: musik.lirik,
    deskripsi: musik.deskripsi,
  };

  return data;
};

const UpdateMusik = async (id, data) => {
  try {
    if (data.jenjang && data.idKategori) {
      await DeleteMusikJenjang(id);
      await DeleteKategoriMusik(id);
      await updateMusikJenjang(id, data);
      await updateMusikKategori(id, data);
    } else if (data.jenjang) {
      await DeleteMusikJenjang(id);
      await updateMusikJenjang(id, data);
    } else if (data.idKategori) {
      await DeleteKategoriMusik(id);
      await updateMusikKategori(id, data);
    } else {
      await updateMusik(id, data);
    }
  } catch (error) {
    console.error(error);
    return Response(500, [], "Terjadi kesalahan saat mengedit musik");
  }

  return Response(200, "", "berhasil edit musik");
};

const DeleteMusik = async (id) => {
  return await deleteMusik(id);
};

const FindMusikService = async (name, jenjang) => {
  try {
    const data = await FindMusik(name);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const dataJenjang = await Promise.all(
          item.musikJenjang.map(async (item) => {
            const jenjang = await JenjangVideoById(item.jenjangId);
            return jenjang;
          })
        );

        const dataKategori = await Promise.all(
          item.musikKategori.map(async (item) => {
            const kategori = await getOneKategori(item.kategoriId);
            const data = {
              id: kategori.id,
              kategori: kategori.Name,
              aktif: kategori.aktif,
              urutan: kategori.noKategori,
              jenis: kategori.kategoriFor,
            };
            return data;
          })
        );
        return {
          id: item.id,
          name: item.name,
          thumbnail: item.thumbnail,
          jenjang: dataJenjang,
          kategori: dataKategori,
          namaFile: item.namaFile,
          lirik: item.lirik,
          deskripsi: item.deskripsi,
        };
      })
    );
    if (jenjang) {
      const filterData = dataRespon.filter((item) =>
        item.jenjang.some((j) => j.name === jenjang)
      );
      return Response(200, filterData, "berhasil menemukann data");
    } else {
      return Response(200, dataRespon, "berhasil menemukan data");
    }
  } catch (error) {
    console.log(error);
    Response(500, [], "gagal mencari musik");
  }
};

module.exports = {
  AddMusik,
  GetAllMusik,
  JenjangMusik,
  GetMusikKategori,
  FilterMusik,
  GetMusikById,
  UpdateMusik,
  DeleteMusik,
  getAllMusikWithKategori,
  FindMusikService,
};
