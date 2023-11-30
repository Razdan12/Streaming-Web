export interface LoginResponse {
  data: {
    token: string;
    masaAktifUser: string;
    role: string;
  };
}

export interface GetPaket {
  data: {
    id: string;
    name: string;
    masaAktif: number;
    harga: number;
    kapasitas: number;
    createdAt: string;
  };
}

export interface GetKategori {
  id: string;
  Name: string;
  createdAt: string;
}

export interface GetAllUser {
  id: string;
  name: string;
  email: string;
  aktif: string;
  akun: Akun[];
  paket: Paket[];
}
interface Akun {
  id: string;
  name: string;
}

interface Paket {
  name: string;
}

export interface InfoUser {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface generateSiplah {
  data: {
    id: string;
    namaPaket: string;
    kodeSiplah: string;
    status: string;
  };
}
export interface getSiplah {
  id: string;
  user: string;
  harga: number;
  paket: string;
  invoice: string;
  namaInstansi: string;
  kodeSiplah: string;
  status: string;
  radem: boolean;
  created: string;
}

export interface getVoucher {
  id: string;
  name: string;
  deskripsi: string;
  requirment: number;
  diskon: number;
  status: boolean;
  kode: string;
  mulai: string;
  berakhir: string;
  idUser: string;
}

export interface getAllVideo {
  data: {
    data: {
      id: string;
      name: string;
      deskripsi: string;
      thumbnail: string;
      namaFIle: string;
      jenjang: string;
      durasi: string;
      idKategori: string;
    };
  }[];
}
export interface getAllMusik {
  data: {
    data: {
      id: string;
      judul: string;
      deskripsi: string;
      thumbnail: string;
      namaFIle: string;
      jenjang: string;
      durasi: string;
      idKategori: string;
      lirik: string;
    };
  }[];
}

export interface getPAketVideo {
  id: string;
  name: string;
  video: getVideoPAket;
}

export interface getVideoPAket {
  id: string;
  name: string;
  thumbnail: string;
  namaFIle: string;
  jenjang: string;
}

export interface Banner {
  data: {
    id: string;
    url: string;
    judul: string;
    aktif: boolean;
    jenis: "home" | "video" | "musik";
  };
}

export interface Faq {
  data: {
    id: string,
    question: string,
    answer: string
  }
}