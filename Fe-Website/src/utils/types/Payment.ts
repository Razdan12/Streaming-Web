export interface Payment {
    data: {
        id: string,
        totalBayar: number,
        invoiceNumber: string,
        statusPembayaran: string,
        Methode: string,
        NoVA: number,
        namaPaket: string,
        jumlahAkun: number,
        emailUser: string,
        masaAktif: number,
        periodePaket: any
    },
}

