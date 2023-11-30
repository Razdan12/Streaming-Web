export interface StoreState {
    token: string | null;
    setToken: (token: string | null) => void;
    removeToken: () => void;

    SecretKey: string | null;
    setSecretKey: (SecretKey: string | null) => void;
    removeSecretKey: () => void;

    idVideo: string | null;
    setIdVideo: (idVideo: string | null) => void;
    removeIdVideo: () => void;

    email: string | null;
    setEmail: (email: string | null) => void;
    removeEmail: () => void;

    password: string | null;
    setPassword: (password: string | null) => void;
    removePassword: () => void;

    idUser: string | null;
    setIdUser: (idUser: string | null) => void;
    removeIdUser: () => void;

    idPaket: string | null;
    setIdPaket: (idPaket: string | null) => void;
    removeIdPaket: () => void;

    idTransaksi: string | null;
    setIdTransaksi: (idTransaksi: string | null) => void;
    removeIdTransaksi: () => void;

    idMusik: string | null;
    setIdMusik: (idMusik: string | null) => void;
    removeIdMusik: () => void;

    searchValue: string | null;
    setSearchValue: (searchValue: string | null) => void;
    removeSearchValue: () => void;

    searchMusik: string | null;
    setsearchMusik: (searchMusik: string | null) => void;
    removesearchMusik: () => void;

    idProfil: string | null;
    setIdProfil: (idProfil: string | null) => void;
    removeIdProfil: () => void;

    namaFile: string | null;
    setNamaFile: (namaFile: string | null) => void;
    removeNamaFile: () => void;

    idKategori: string | null;
    setKategori: (idKategori: string | null) => void;
    removeKategori: () => void;

    NamaKategori: string | null;
    setNamaKategori: (idKategori: string | null) => void;
    removeNamaKategori: () => void;

   
}
export interface banner {
    id?: string;
    source?: string;
}
export interface filterButton {
    id?: string;
    icon?: string;
    text1?: string;
    text2?: string;
}
export interface paketButton {
    id?: string;
    packetName?: string;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
}
export interface login {
    data: {
        email: string;
        password: string;
        token: string;
        role: string;
        idUser: string
    }

}