import axios, { AxiosPromise } from "axios";
import { VideoAll, VideoKategory } from "../utils/types/Video";
import { MusikAll, MusikKategori } from "../utils/types/Musik";
import { login } from "../utils/types/types";
import { Register } from "../utils/types/Register";
import { Paket } from "../utils/types/Paket";
import { Payment } from "../utils/types/Payment";
import { Siplah } from "../utils/types/Siplah";

const instance = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });

export default {
  login: (email: string | null, password: string | null): AxiosPromise<login> =>
    instance({
      method: "POST",
      url: `/login`,
      data: {
        email,
        password,
      },
    }),
  getAllKategori: (): AxiosPromise<VideoKategory[]> =>
    instance({
      method: "GET",
      url: `/kategori`,
    }),

  //video by kategori
  getVideoByKategori: (idKategori: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/video?idKategori=${idKategori}`,
    }),
  getAllVideo: (): AxiosPromise<VideoKategory[]> =>
    instance({
      method: "GET",
      url: `/video`,
    }),
  getVideoKategori: (jenjang: string | null): AxiosPromise<VideoKategory> =>
    instance({
      method: "GET",
      url: `/video/kategori?jenjang=${jenjang}`,
    }),

  getVideoById: (token: string | null, id: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/video/video/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  //Musik
  getAllMusik: (): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/musik`,
    }),
  getMusikKategori: (jenjang: string | null): AxiosPromise<MusikKategori[]> =>
    instance({
      method: "GET",
      url: `/musik/kategori?jenjang=${jenjang}`,
    }),

  getMusikByKategori: (id: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/musik/kategori/${id}`,
    }),

  Registrasi: (email: string, password: string): AxiosPromise<Register> =>
    instance({
      method: "POST",
      url: "/register",
      data: {
        email: email,
        password: password,
      },
    }),

  PilihPaket: (
    name: string,
    masaAktif: number,
    harga: number,
    kapasitas: number
  ): AxiosPromise<Paket> =>
    instance({
      method: "POST",
      url: "/paket",
      data: {
        name,
        masaAktif,
        harga,
        kapasitas,
        register: true,
        userCreate: true
      },
    }),
  CreatePayment: (
    idUser: string | null,
    bankCode: string | null,
    idPaket: string | null
  ): AxiosPromise<Payment> =>
    instance({
      method: "POST",
      url: "/payment/va/create",
      data: {
        idUser,
        bankCode,
        idPaket,
      },
    }),
  searchVideo: (param: string | null): AxiosPromise<VideoAll> =>
    instance({
      method: "GET",
      url: `/video/filter?value=${param}`,
    }),
  CekPaymentVa: (idPayment: string | null): AxiosPromise<Payment> =>
    instance({
      method: "POST",
      url: "/payment/va/cekva",
      data: {
        id: idPayment,
      },
    }),

  GetBank: (): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/payment/va/bank",
    }),

  CekPaymentSiplah: (idPayment: string | null): AxiosPromise<Payment> =>
    instance({
      method: "GET",
      url: `/payment/siplah/cek-transaksi/${idPayment}`,
    }),
  searchMusik: (param: string | null): AxiosPromise<MusikAll> =>
    instance({
      method: "GET",
      url: `/musik/filter?value=${param}`,
    }),
  radeemSiplah: (
    idUser: string | null,
    namaInstansi: string | null,
    noHp: string | null,
    alamat: string | null,
    kodeSiplah: string | null
  ): AxiosPromise<Siplah> =>
    instance({
      method: "PATCH",
      url: "/siplah/radem/code",
      data: {
        idUser,
        namaInstansi,
        noHp,
        alamat,
        kodeSiplah,
      },
    }),




  CreateProfil: (
    idUser: string | null,
    idPaket: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: "/akun",
      data: {
        userId: idUser,
        packageId: idPaket,
      },
    }),

  GetProfilUser: (token: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/user/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  EditDataUser: (
    token: string | null,
    id: string | null,
    data: any
  ): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/user/data/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    }),

  UpdatePasswordUser: (
    token: string | null,
    id: string | null,
    data: any
  ): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/user/password/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    }),

  GetVideoByProfil: (
    token: string | null,
    id: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `video/video/${id}/paket`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetBanner: (): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/banner",
    }),

  GetInfoUser: (token: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/user/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetProfilById: (
    token: string | null,
    idProfil: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/akun/${idProfil}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  EditProfil: (
    token: string | null,
    idProfil: string | null,
    data: any
  ): AxiosPromise<any> =>
    instance({
      method: "PATCH",
      url: `/akun/${idProfil}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    GetAllVatar: (token: string | null): AxiosPromise<any> => 
    instance({
      method: "GET",
      url: '/avatar/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetPaketById: (
    token: string | null,
    idPaket: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/paket/get/${idPaket}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetTransaksiUser: (
    token: string | null,
    idUser: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/user/transaksi/${idUser}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetInvoiceUser: (
    token: string | null,
    idTransaksi: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/user/invoice/${idTransaksi}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetMusikbyId: (
    token: string | null,
    idMusik: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/musik/get/${idMusik}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  PlayVideo: (namaFile: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/streaming/video/play/${namaFile}`,
    }),

  GetAllFaq: (token: string | null): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: "/faq/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    Email: (
      penerima: string | null,
      subject: string | null,
      pesan: string | null,
      dataPesan: string | null,
      penutup: string | null
    ): AxiosPromise<any> => 
    instance({
      method: "POST",
      url: "/mail",
      data: {
        penerima,
        subject,
        pesan,
        dataPesan,
        penutup

      }
    })
};
