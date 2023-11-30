import { useEffect, useState } from "react";
import { NavbarSecond } from "../../component/Navbar";

import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import { useStore } from "../../store/Store";

const Konfirmasi = () => {
  const navigate = useNavigate();
  const [Data, setDataTransaksi] = useState<any>();
  const { idTransaksi, email, password, setSecretKey, removePassword } = useStore();
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      const response = await api.CekPaymentSiplah(idTransaksi);
      setDataTransaksi(response.data || null);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data transaksi:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idTransaksi]);

  
  const tanggalSekarang: Date = new Date(Data?.dibuat);
  const tanggalKedepan: Date = new Date(tanggalSekarang);

  tanggalKedepan.setDate(tanggalSekarang.getDate() + Data?.masaAktif);

  const opsi: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const tanggalPeriode =
    tanggalSekarang.toLocaleDateString("id-ID", opsi) +
    " - " +
    tanggalKedepan.toLocaleDateString("id-ID", opsi);

 

  const handleLogin = async () => {
   try {
    setLoading(true)
     const response = await api.login(email, password);
     const token = response.data?.data?.token;
     setSecretKey(token);
     removePassword();
     navigate("/pilihakun");
   } catch (error) {
    navigate("/");
    console.log(error);
    
   }finally{
    setLoading(false)
   }
   
  };

  const kodeBayar: string = Data?.kodeBayar
  const Code: string = kodeBayar?.slice(0, 3) + '*'.repeat(kodeBayar?.length - 3)

  return (
    <>
      <div className="flex flex-auto " data-theme="light">
        <div className="grow h-screen overflow-x-hidden">
          <NavbarSecond />
          <div className="flex flex-col justify-items-center mt-10 ">
            <div className="flex justify-center mb-10 text-lg lg:text-xl font-bold  mx-16 ">
              Registrasi Akun
            </div>
            <div className="justify-center items-center">
            <ul className=" steps steps-horizontal w-full text-gray-500">
              <li className="step step-info bg-white text-sm" data-content="✓">
                Isi Data Akun
              </li>
              <li className="step step-info text-sm" data-content="✓">
                Pilih Paket
              </li>
              <li className="step step-info text-sm" data-content=" ">
                Pembayaran
              </li>
            </ul>
          </div>
            <div className="flex flex-col justify-center items-center gap-y-3 mt-9 ">
              <div className="flex-col  w-5/6 px-2 sm:px-32">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Invoice Number
                  </div>{" "}
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Data?.invoice}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Metode Pembelian
                  </div>
                  <div>
                    <p>{Data?.metodePembelian}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Status Pembelian
                  </div>
                  <div className="flex flex-row justify-center items-center gap-x-3">
                    <div className="p-1 bg-green-100 rounded-xl border border-green-500 justify-center items-center gap-2.5 flex">
                      <div className="text-green-500 text-base font-bold">
                        {Data?.status}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Kode Pembayaran
                  </div>{" "}
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Code}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Nama Instansi
                  </div>{" "}
                  <div className="text-neutral-800 text-base font-bold leading-snug capitalize">
                    {Data?.namaInstansi}
                  </div>
                </div>
                <hr className="mt-5" />
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-sm font-bold leading-tight">
                    Detail Transaksi
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Nama Paket
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Data?.namaPaket}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Jumlah Akun
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Data?.jumlahAkun} Akun
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Email Terdaftar
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Data?.email}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Masa Aktif
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {Data?.masaAktif } hari
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Periode Paket
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    {tanggalPeriode}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-3">
                  <div className="text-zinc-600 text-base font-normal leading-snug">
                    Harga
                  </div>
                  <div className="text-neutral-800 text-base font-bold leading-snug">
                    Rp. {Data?.harga}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mb-10 justify-center mt-5 ">
              <div className="w-5/6 flex justify-end  pr-0 sm:pr-10">
               
                <div className="p-2 flex justify-center  w-full sm:w-32">
                  <button
                    className="btn w-full bg-gradient-to-r from-cyan-300 to-blue-400 rounded-md justify-center items-center gap-6 flex text-white"
                    onClick={handleLogin}
                  >
                   {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Selanjutnya"
                    )}
                  </button>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Konfirmasi