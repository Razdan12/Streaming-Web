export interface User {
 data: {
    user: user,
    profil: profil,
 }
}

interface user {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    idPaket: string,
    aktif: string,
    status: string,
}

interface profil {
    id: string,
    idUser: string,
    name: string,
    picture: string,
    status: string
}