import { useEffect, useState } from "react";
// import bni from "../../assets/BNI.png";
// import bca from "../../assets/BCA.png";
// import bri from "../../assets/BRI.png";

import CountdownTimer from "../../component/Countdown";
import { IconContext } from "react-icons";
import { IoIosRefresh } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NavbarSecond } from "../../component/Navbar";
import { ModalKeluarBayar } from "../../component/Modals";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
import { motion } from "framer-motion";

const KonfirmBayar = () => {
  const [data, setDataTransaksi] = useState<any>();
  const [triger, setTriger] = useState<boolean>(false);
  const [lunas, setLunas] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [justSet, setJustSet] = useState<boolean>(false);
  const { idTransaksi, email, setToken, password, removePassword } = useStore();

  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/Cara-Bayar");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(data?.NoVA);
    setAlert(true);
  };
  useEffect(() => {
    if (alert && !justSet) {
      setJustSet(true);
      const timer = setTimeout(() => {
        setAlert(false);
        setJustSet(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, justSet]);

  const handleReload = () => {
    setTriger(!triger);
  };

  const handleLogin = async (status: string) => {
    if (status === "lunas") {
      const response = await api.login(email, password);
      const token = response.data?.data?.token;
      setToken(token);
      removePassword();
      navigate("/pilihakun");
    }
  };

  const dataTransaksi = async () => {
    const response = await api.CekPaymentVa(idTransaksi);
    const status = response.data?.data.statusPembayaran;
    if (status === "lunas") {
      setLunas(true);
      handleLogin(status);
    }
    setDataTransaksi(response.data?.data);
  };

  useEffect(() => {
    dataTransaksi();
  }, [triger]);

  const tanggalSekarang: Date = new Date(data?.dibuat);
  const tanggalKedepan: Date = new Date(tanggalSekarang);

  tanggalKedepan.setDate(tanggalSekarang.getDate() + data?.masaAktif);

  const opsi: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const tanggalPeriode =
    tanggalSekarang.toLocaleDateString("id-ID", opsi) +
    " - " +
    tanggalKedepan.toLocaleDateString("id-ID", opsi);

  return (
    <>
      <div className="flex flex-col items-center " data-theme="light">
        
        <div className="absolute top-0 right-0 z-50 ">
          {alert && (
            <motion.div
              className="alert alert-success"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            >
             
              <span>Nomor VA berhasil di Copy </span>
            </motion.div>
          )}
        </div>
        <div className="w-full sticky top-0 z-20">
          <NavbarSecond />
        </div>
        <div className="flex w-5/6 flex-col justify-items-center  mt-10">
          <div className="flex justify-center mb-10 text-xl font-bold">
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
          <div className="flex flex-col justify-center items-center gap-y-3 mt-9">
            <div className="text-zinc-600 text-sm font-normal leading-tight">
              Total Pembayaran
            </div>
            <div className="text-neutral-800 text-3xl font-bold leading-10">
              Rp.{data?.totalBayar}
            </div>
            <div className="flex-col w-full px-5 lg:px-52">
              <div className="flex flex-row justify-between items-center">
                <div className="text-zinc-600 font-normal leading-snug text-sm sm:text-base">
                  Invoice Number
                </div>{" "}
                <div className="text-neutral-800 font-bold leading-snug text-sm sm:text-base">
                  {data?.invoiceNumber}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Sisa Waktu
                </div>
                <div className="text-neutral-800 text-md sm:text-base font-bold leading-loose">
                  {lunas ? (
                    "00:00:00"
                  ) : (
                    <CountdownTimer targetDate={new Date(data?.dibuat)} />
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Status Pembayaran
                </div>
                <div className="flex flex-row justify-center items-center gap-x-3">
                  <div
                    className={`p-1  rounded-xl border ${
                      lunas
                        ? "border-green-600 bg-green-100"
                        : "border-orange-600 bg-pink-100"
                    }  justify-center items-center gap-2.5 flex`}
                  >
                    <div
                      className={`${
                        lunas ? "text-green-700" : "text-orange-600"
                      } text-base font-bold`}
                    >
                      {data?.statusPembayaran}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center"
                      onClick={handleReload}
                    >
                      <IconContext.Provider
                        value={{
                          color: "gradient",
                          className: "fill-gray-400",
                        }}
                      >
                        <div>
                          <IoIosRefresh size="1.25rem" />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Bank Transfer
                </div>
                <div>
                  <p
                    className="font-bold
                  "
                  >
                    {data?.Methode}
                  </p>
                </div>
              </div>
              <hr className="mt-5" />
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm font-bold leading-tight">
                  Pembayaran
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  No. Virtual Account
                </div>
                <div className="flex flex-row justify-center items-center gap-x-3">
                  <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                    {data?.NoVA}
                  </div>
                  <div>
                    <button
                      className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center"
                      onClick={handleCopy}
                    >
                      <IconContext.Provider
                        value={{
                          color: "gradient",
                          className: "fill-gray-400",
                        }}
                      >
                        <div>
                          <MdContentCopy size="1.25rem" />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm font-bold leading-tight">
                  Detail Transaksi
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Nama Paket
                </div>
                <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                  {data?.namaPaket}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Jumlah Akun
                </div>
                <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                  {data?.jumlahAkun} Akun
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Email Terdaftar
                </div>
                <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                  {data?.emailUser}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Masa Aktif
                </div>
                <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                  {data?.masaAktif} Hari
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm sm:text-base font-normal leading-snug">
                  Periode Paket
                </div>
                <div className="text-neutral-800 text-sm sm:text-base font-bold leading-snug">
                  {tanggalPeriode}
                </div>
              </div>
            </div>
          </div>
          <ModalKeluarBayar />
          <div className="flex w-full mb-10 justify-center mt-10 ">
            <div className="w-5/6 flex justify-end  pr-0 sm:pr-10">
              <div className="p-2 flex justify-center  w-full sm:w-40">
                <button
                  className="btn w-full bg-gradient-to-r from-cyan-300 to-blue-400 rounded-md justify-center items-center gap-6 flex text-white"
                  onClick={handlePay}
                >
                  Cara Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KonfirmBayar;
