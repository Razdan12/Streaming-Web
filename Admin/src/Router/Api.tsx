import axios, { AxiosPromise } from "axios";
import {
  Banner,
  Faq,
  GetAllUser,
  GetKategori,
  GetPaket,
  InfoUser,
  LoginResponse,
  generateSiplah,
  getAllMusik,
  getAllVideo,
  getPAketVideo,
  getSiplah,
  getVoucher,
} from "./Utils";

const instance = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });

const Api = {
  Login: (
    email: string | null,
    password: string | null
  ): AxiosPromise<LoginResponse> =>
    instance({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    }),

  AddPaket: (
    token: string | null,
    name: string | null | undefined,
    masaAktif: number | null | undefined,
    harga: number | null | undefined,
    kapasitas: number | null | undefined
  ): AxiosPromise<GetPaket> =>
    instance({
      method: "POST",
      url: "/paket",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        masaAktif,
        harga,
        kapasitas,
        userCreate: false,
      },
    }),

  GetPaket: (token: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/paket",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  EditPaket: (
    token: string | null | undefined,
    id: string | null | undefined,
    name: string | null | undefined,
    masaAktif: number | null | undefined,
    harga: number | null | undefined,
    kapasitas: number | null | undefined
  ): AxiosPromise<GetPaket> =>
    instance({
      method: "PATCH",
      url: `/paket/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        masaAktif,
        harga,
        kapasitas,
      },
    }),

  DeletePaket: (
    token: string | null,
    id: string | null
  ): AxiosPromise<GetPaket> =>
    instance({
      method: "DELETE",
      url: `/paket/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetPaketById: (
    token: string | null,
    id: string | null
  ): AxiosPromise<GetPaket> =>
    instance({
      method: "GET",
      url: `/paket/get/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetAllKAtegori: (token: string | null): AxiosPromise<GetKategori> =>
    instance({
      method: "GET",
      url: "/kategori",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  AddKategori: (
    token: string | null,
    Name: string | undefined,
    kategoriFor: string | undefined,
    noKategori: number | undefined,
    aktif: boolean | undefined
  ): AxiosPromise<GetKategori> =>
    instance({
      method: "POST",
      url: "/kategori",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        Name,
        kategoriFor,
        noKategori,
        aktif,
      },
    }),

  EditKategori: (
    token: string | null,
    id: string | null,
    Name: string | undefined,
    kategoriFor: string | undefined,
    noKategori: number | undefined,
    aktif: boolean | undefined
  ): AxiosPromise<GetKategori> =>
    instance({
      method: "PUT",
      url: `/kategori/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        Name,
        kategoriFor,
        noKategori,
        aktif,
      },
    }),

  DeleteKategori: (
    token: string | null,
    id: string | null
  ): AxiosPromise<GetKategori> =>
    instance({
      method: "DELETE",
      url: `/kategori/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetAllUser: (token: string | null): AxiosPromise<GetAllUser> =>
    instance({
      method: "GET",
      url: "/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetInfoUser: (token: string | null): AxiosPromise<InfoUser> =>
    instance({
      method: "GET",
      url: "/user/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GenerateSiplah: (
    idPaket: string | null,
    methodBayar: string,
    kuota: number
  ): AxiosPromise<generateSiplah> =>
    instance({
      method: "POST",
      url: "/siplah",
      data: {
        idPaket,
        methodBayar,
        kuota,
      },
    }),

  GetAllSiplah: (): AxiosPromise<generateSiplah> =>
    instance({
      method: "GET",
      url: "/siplah",
    }),

  GetSiplahById: (id: string | null): AxiosPromise<getSiplah> =>
    instance({
      method: "GET",
      url: `/siplah/${id}`,
    }),

  UpdateSiplah: (
    idUSiplah: string | null,
    status: boolean
  ): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/siplah/edit/${idUSiplah}`,
      data: {
        avail: status,
      },
    }),

  GetAllVoucher: (): AxiosPromise<getVoucher> =>
    instance({
      method: "GET",
      url: "/voucher",
    }),

  CreateVoucher: (
    name: string,
    deskripsi: string,
    requirment: number,
    diskon: number,
    mulai: string,
    berakhir: string,
    kode: string | null
  ): AxiosPromise<getVoucher> =>
    instance({
      method: "POST",
      url: "/voucher",

      data: {
        name,
        deskripsi,
        requirment,
        diskon,
        mulai,
        berakhir,
        kode,
      },
    }),

  GetVoucherById: (id: string): AxiosPromise<getVoucher> =>
    instance({
      method: "GET",
      url: `/voucher/${id}`,
    }),

  GetAllJenjang: (): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/jenjang",
    }),

  CreateUser: (
    token: string | null,
    name: string,
    email: string,
    password: string,
    idPaket: string
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: "/user/create",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
        idPaket,
      },
    }),

  deleteUser: (
    token: string | null,
    idUser: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "DELETE",
      url: `/user/delete/${idUser}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  editUser: (token: string | null, idUser: string | null, data: any): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/user/data/${idUser}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data
    }),

  tambahProfil: (token: string | null, idUser: string | null, jumlah: number): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: `/akun/add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        idUser,
        jumlah
      }
    }),

  getAllProfil: (token: string | null, idUser: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/akun/${idUser}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  deleteProfil: (token: string | null, idProfil: string | null): AxiosPromise<any> =>
    instance({
      method: "DELETE",
      url: `/akun/${idProfil}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  ResetPasswordUser: (token: string | null, idUser: string | null, password: string| null): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/user/reset/${idUser}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password
      }
     
    }),
};

const MusikRest = {
  GetMusikAll: (): AxiosPromise<getAllMusik> =>
    instance({
      method: "GET",
      url: "/musik",
    }),
  getAllMusik: (
    token: string | null,
    jenjang: string | null,
    idKategori: string | null
  ): AxiosPromise<getAllMusik> =>
    instance({
      method: "GET",
      url: `/musik?jenjang=${jenjang}&idKategori=${idKategori}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  uploadMusik: (
    token: string | null,
    formData: any
  ): AxiosPromise<getAllMusik> =>
    instance({
      method: "POST",
      url: "/musik",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }),
  EditMusik: (
    token: string | null,
    id: string,
    formData: any
  ): AxiosPromise<getAllMusik> =>
    instance({
      method: "PATCH",
      url: `/musik/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }),

  DeleteMusik: (token: string | null, id: string): AxiosPromise<getAllMusik> =>
    instance({
      method: "DELETE",
      url: `/musik/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
};

const PaketVideoRest = {
  GetPaketVideo: (token: string | null): AxiosPromise<getPAketVideo> =>
    instance({
      method: "GET",
      url: "/paket-video",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
};

const PaketMusikRest = {
  GetPaketMusik: (token: string | null): AxiosPromise<getPAketVideo> =>
    instance({
      method: "GET",
      url: "/paket-musik",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
};

const VideoRest = {
  GetVideoAll: (): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/video",
    }),
  getAllVideo: (
    jenjang: string | null,
    idKategori: string | null
  ): AxiosPromise<getAllVideo> =>
    instance({
      method: "GET", // untuk mengambil data ( membaca data )
      url: `/video?jenjang=${jenjang}&idKategori=${idKategori}`,
    }),

  uploadVideo: (
    token: string | null,
    formData: any
  ): AxiosPromise<getAllVideo> =>
    instance({
      method: "POST", // untuk mengirim data ( create )
      url: "/video",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }),

  deleteVideo: (token: string | null, id: string): AxiosPromise<getAllVideo> =>
    instance({
      method: "DELETE", // delete menghapus
      url: `/video/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  EditVideo: (
    token: string | null,
    id: string,
    formData: any
  ): AxiosPromise<getAllVideo> =>
    instance({
      method: "PATCH",
      url: `/video/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }),
};
const BannerRest = {
  GetAll: (): AxiosPromise<Banner[] | any> =>
    instance({
      method: "GET",
      url: `/banner`,
    }),

  UploadBanner: (
    token: string | null,
    formData: any
  ): AxiosPromise<getAllVideo> =>
    instance({
      method: "POST",
      url: "/banner",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }),

  UpdateBanner: (
    token: string | null,
    id: string,
    judul?: string | null,
    jenis?: string | null,
    aktif?: boolean | null
  ): AxiosPromise<getAllVideo> =>
    instance({
      method: "PATCH",
      url: `/banner/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        judul,
        jenis,
        aktif,
      },
    }),

  DeleteBanner: (token: string | null, id: string): AxiosPromise<getAllVideo> =>
    instance({
      method: "DELETE",
      url: `/banner/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const FaqRest = {
  GetAllFaq: (token: string | null): AxiosPromise<Faq> =>
    instance({
      method: "GET",
      url: "/faq/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  AddFaq: (
    token: string | null,
    question: string | null,
    answer: string | null
  ): AxiosPromise<Faq> =>
    instance({
      method: "POST",
      url: "/faq",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        question,
        answer,
      },
    }),
  DeleteFaq: (token: string | null, id: string | null): AxiosPromise<Faq> =>
    instance({
      method: "DELETE",
      url: `/faq/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const TransaksiRest = {
  GetTransaksi: (token: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/transaksi",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export {
  Api,
  VideoRest,
  PaketVideoRest,
  PaketMusikRest,
  BannerRest,
  MusikRest,
  FaqRest,
  TransaksiRest,
};
