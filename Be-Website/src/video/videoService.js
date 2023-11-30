const { Response } = require("../config/response");
const { getAllKategori } = require("../kategori/kategoriServis");
const videoRepo = require("./videoRepo");
const jenjangRepo = require("../Jenjang/RepoJenjang");
const { getOneKategori } = require("../kategori/kategoriRepo");

const createVideo = async ({
  name,
  deskripsi,
  jenjangIds,
  durasi,
  url,
  key,
  kategoriIds,
}) => {
  const thumbnail =
    "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";

  return await videoRepo.createVideo({
    name,
    deskripsi,
    url,
    thumbnail,
    namaFIle: key,
    jenjangIds,
    durasi,
    kategoriIds,
  });
};

const getAllVideos = async () => {
  try {
    const videoAll = await videoRepo.getAllVideos();
    const dataRespon = await Promise.all(
      videoAll.map(async (item) => {
        const dataJenjang = await Promise.all(
          item.videoJenjang.map(async (item) => {
            const jenjang = await jenjangRepo.JenjangVideoById(item.jenjangId);
            return jenjang;
          })
        );

        const dataKategori = await Promise.all(
          item.videoKategori.map(async (item) => {
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
          durasi: item.durasi,
          namaFile: item.namaFIle,
          kategori: dataKategori,
          jenjang: dataJenjang,
        };
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllVideoWithKategori = async (jenjang) => {
  try {
    const Kategori = await getAllKategori();
    if (!Kategori) throw new Error("Failed to get categories");

    const idKategori = await Promise.all(
      Kategori.map(async (item) => {
        const videos = await getVideoByKategori(item.id);

        if (!videos)
          throw new Error(`Failed to get videos for category ${item.id}`);

        const dataVideo = await Promise.all(
          videos.map(async (videoItem) => {
            const dataJenjang = await jenjangRepo.VideoJenjang(videoItem.id);
            if (!dataJenjang)
              throw new Error(
                `Failed to get jenjang for video ${videoItem.id}`
              );

            const getJenjang = await Promise.all(
              dataJenjang.map(async (jenjang) => {
                const responseJenjang = await jenjangRepo.JenjangVideoById(
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
              id: videoItem.id,
              judul: videoItem.name,
              deskripsi: videoItem.deskripsi,
              thumbnail: videoItem.thumbnail,
              namaFIle: videoItem.namaFile,
              jenjang: getJenjang,
            };
          })
        );

        if (jenjang) {
          const filterData = dataVideo.filter((item) =>
            item.jenjang.some((j) => j.name === jenjang)
          );
          return {
            idKategori: item.id,
            kategori: item.Name,
            status: item.aktif,
            jenis: item.kategoriFor,
            video: filterData,
          };
        } else {
          return {
            idKategori: item.id,
            kategori: item.Name,
            status: item.aktif,
            jenis: item.kategoriFor,
            video: dataVideo,
          };
        }
      })
    );

    return Response(200, idKategori, "berhasil mendapatkan semua data video");
  } catch (error) {
    console.log(error);
    return Response(500, [], error.message);
  }
};

const jenjangVideo = async (jenjang) => {
  try {
    const data = await videoRepo.jenjangVideo(jenjang);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const video = await getVideoById(item.video.id);
        return video;
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
  }
};

const getVideoByKategori = async (idKategori) => {
  try {
    const data = await videoRepo.getVideoByKategori(idKategori);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const video = await getVideoById(item.video.id);
        return video;
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
  }
};

const filterVideo = async (jenjang, idKategori) => {
  try {
    const data = await videoRepo.filterVideo(jenjang, idKategori);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const video = await getVideoById(item.id);
        return video;
      })
    );
    return dataRespon;
  } catch (error) {
    console.log(error);
  }
};

const getVideoById = async (id) => {
  const video = await videoRepo.getVideoById(id);
  if (!video) {
    return Response(400, [], "video tidak ditemukan");
  }
  try {
    const dataJenjang = await Promise.all(
      video.videoJenjang.map(async (item) => {
        const jenjang = await jenjangRepo.JenjangVideoById(item.jenjangId);
        return jenjang;
      })
    );

    const dataKategori = await Promise.all(
      video.videoKategori.map(async (item) => {
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
      id: video.id,
      name: video.name,
      deskripsi: video.deskripsi,
      thumbnail: video.thumbnail,
      namaFile: video.namaFIle,
      paket: video.paket ? true : false,
      idPaketVid: video.paket ? video.paket.id : null,
      jenjang: dataJenjang,
      kategori: dataKategori,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateVideo = async (idVideo, data) => {
  try {
    if (data.jenjang && data.idKategori) {
      await jenjangRepo.DeleteVideoJenjang(idVideo);
      await videoRepo.DeleteKategoriVideo(idVideo);
      await videoRepo.updateVideoJenjang(idVideo, data);
      await videoRepo.updateVideoKategori(idVideo, data);
    } else if (data.jenjang) {
      await jenjangRepo.DeleteVideoJenjang(idVideo);
      await videoRepo.updateVideoJenjang(idVideo, data);
    } else if (data.idKategori) {
      await videoRepo.DeleteKategoriVideo(idVideo);
      await videoRepo.updateVideoKategori(idVideo, data);
    } else {
      const video = await videoRepo.updateVideo(idVideo, data);
      if (!video) {
        return Response(400, [], "video tidak ditemukan");
      }
      const Data = {
        id: video.id,
        judul: video.name,
      };
      return Response(200, Data, "berhasil edit video");
    }
    return Response(200, "", "berhasil edit video");
  } catch (error) {
    console.error(error);
    return Response(500, [], "Terjadi kesalahan saat mengedit video");
  }
};


const deleteVideo = async (id) => {
  return await videoRepo.deleteVideo(id);
};

const FindVideoService = async (name, jenjang) => {
  try {
    const data = await videoRepo.FindVideo(name);
    const dataRespon = await Promise.all(
      data.map(async (item) => {
        const dataJenjang = await Promise.all(
          item.videoJenjang.map(async (item) => {
            const jenjang = await jenjangRepo.JenjangVideoById(item.jenjangId);
            return jenjang;
          })
        );

        const dataKategori = await Promise.all(
          item.videoKategori.map(async (item) => {
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
          namaFIle: item.namaFile,
          kategori: dataKategori,
          jenjang: dataJenjang,
        };
      })
    );
    if (jenjang) {
      const filterData = dataRespon.filter((item) =>
        item.jenjang.some((j) => j.name === jenjang)
      );

      return Response(200, filterData, "Sukses");
    } else {
      return Response(200, dataRespon, "Sukses");
    }
  } catch (error) {
    console.log(error);
    Response(500, [], "gagal mencari video");
  }
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideoByKategori,
  jenjangVideo,
  filterVideo,
  getAllVideoWithKategori,
  FindVideoService,
};
