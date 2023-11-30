import { StoreState } from "../utils/types/types";
import create, { SetState } from "zustand";

const Store = create<StoreState>((set: SetState<StoreState>) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },

  removeToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  SecretKey: localStorage.getItem("Key"),
  setSecretKey: (SecretKey) => {
    if (SecretKey) {
      localStorage.setItem("Key", SecretKey);
    } else {
      localStorage.removeItem("Key");
    }
    set({ SecretKey });
  },

  removeSecretKey: () => {
    localStorage.removeItem("SecretKey");
    set({ SecretKey: null });
  },

  idVideo: localStorage.getItem("idVideo"),
  setIdVideo: (idVideo) => {
    if (idVideo) {
      localStorage.setItem("idVideo", idVideo);
    } else {
      localStorage.removeItem("idVideo");
    }
    set({ idVideo });
  },

  removeIdVideo: () => {
    localStorage.removeItem("idVideo");
    set({ idVideo: null });
  },

  idMusik: localStorage.getItem("idMusik"),
  setIdMusik: (idMusik) => {
    if (idMusik) {
      localStorage.setItem("idMusik", idMusik);
    } else {
      localStorage.removeItem("idMusik");
    }
    set({ idMusik });
  },

  removeIdMusik: () => {
    localStorage.removeItem("idMusik");
    set({ idMusik: null });
  },

  searchValue: localStorage.getItem("searchValue"),
  setSearchValue: (searchValue) => {
    if (searchValue) {
      localStorage.setItem("searchValue", searchValue);
    } else {
      localStorage.removeItem("searchValue");
    }
    set({ searchValue });
  },

  removeSearchValue: () => {
    localStorage.removeItem("searchValue");
    set({ searchValue: null });
  },

  searchMusik: localStorage.getItem("searchMusik"),
  setsearchMusik: (searchMusik) => {
    if (searchMusik) {
      localStorage.setItem("searchMusik", searchMusik);
    } else {
      localStorage.removeItem("searchMusik");
    }
    set({ searchMusik });
  },

  removesearchMusik: () => {
    localStorage.removeItem("searchMusik");
    set({ searchMusik: null });
  },

  email: localStorage.getItem("email"),
  setEmail: (email) => {
    email
      ? localStorage.setItem("email", email)
      : localStorage.removeItem("email");
    set({ email });
  },
  removeEmail: () => {
    localStorage.removeItem("email");
    set({email: null})
  },

  idUser: localStorage.getItem("idUser"),
  setIdUser: (idUser) => {
    idUser
      ? localStorage.setItem("idUser", idUser)
      : localStorage.removeItem("idUser");
    set({ idUser });
  },

  removeIdUser: () => {
    localStorage.removeItem("idUser");
    set({ idUser: null });
  },

  idPaket: localStorage.getItem("idPaket"),
  setIdPaket: (idPaket) => {
    idPaket
      ? localStorage.setItem("idPaket", idPaket)
      : localStorage.removeItem("idPaket");
    set({ idPaket });
  },

  removeIdPaket: () => {
    localStorage.removeItem("idPaket");
    set({ idPaket: null });
  },

  idTransaksi: localStorage.getItem("idTransaksi"),
  setIdTransaksi: (idTransaksi) => {
    idTransaksi
      ? localStorage.setItem("idTransaksi", idTransaksi)
      : localStorage.removeItem("idTransaksi");
    set({ idTransaksi });
  },

  removeIdTransaksi: () => {
    localStorage.removeItem("idTransaksi");
    set({ idTransaksi: null });
  },

  idProfil: localStorage.getItem("idProfil"),
  setIdProfil: (idProfil) => {
    idProfil
      ? localStorage.setItem("idProfil", idProfil)
      : localStorage.removeItem("idProfil");
    set({ idProfil });
  },

  removeIdProfil: () => {
    localStorage.removeItem("idProfil");
    set({ idProfil: null });
  },

  namaFile: localStorage.getItem("namaFile"),
  setNamaFile: (namaFile) => {
    namaFile
      ? localStorage.setItem("namaFile", namaFile)
      : localStorage.removeItem("namaFile");
    set({ namaFile });
  },
  removeNamaFile: () => {
    localStorage.removeItem("namaFile");
    set({ namaFile: null });
  },

  idKategori: localStorage.getItem("kategori"),
  setKategori: (idKategori) => {
    idKategori
      ? localStorage.setItem("kategori", idKategori)
      : localStorage.removeItem("kategori");
    set({ idKategori });
  },
  removeKategori: () => {
    localStorage.removeItem("kategori");
    set({ idKategori: null });
  },

  NamaKategori: localStorage.getItem("NamaKategori"),
  setNamaKategori: (NamaKategori) => {
    NamaKategori
      ? localStorage.setItem("NamaKategori", NamaKategori)
      : localStorage.removeItem("NamaKategori");
    set({ NamaKategori });
  },
  removeNamaKategori: () => {
    localStorage.removeItem("NamaKategori");
    set({ NamaKategori: null });
  },

  password: localStorage.getItem("password"),
  setPassword: (password) => {
    password
      ? localStorage.setItem("password", password)
      : localStorage.removeItem("password");
    set({ password });
  },
  removePassword: () => {
    localStorage.removeItem("password");
    set({ password: null });
  }
 
}));

export const useStore = Store;
