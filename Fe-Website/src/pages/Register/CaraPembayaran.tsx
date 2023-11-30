import { useEffect, useState } from "react";
import { NavbarSecond } from "../../component/Navbar";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdContentCopy } from "react-icons/md";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
import CountdownTimer from "../../component/Countdown";

const CaraPembayaran = () => {
  const navigate = useNavigate();
  const [data, setDataTransaksi] = useState<any>();
  const [lunas, setLunas] = useState<boolean>(false);
  const { idTransaksi } = useStore();

  const dataTransaksi = async () => {
    const response = await api.CekPaymentVa(idTransaksi);
    console.log({ response });

    const status = response.data?.data.statusPembayaran;

    if (status === "lunas") {
      setLunas(true);
    }
    setDataTransaksi(response.data?.data);
  };

  useEffect(() => {
    dataTransaksi();
  }, []);

  const handleBack = () => {
    navigate("/Konfirmasi-Pembayaran");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(data?.NoVA);
   
  };
  return (
    <>
      <div className="flex flex-auto " data-theme="light">
        <div className="grow overflow-hidden">
          <NavbarSecond />
          <div className="flex flex-col justify-items-center mx-5 lg:mx-16 mt-10 ">
            <div className="flex justify-center mb-10 text-lg lg:text-xl font-bold">
              Registrasi Akun
            </div>
            <div className="justify-center items-center">
              <ul className=" steps steps-horizontal w-full text-gray-500">
                <li
                  className="step step-info bg-white text-sm"
                  data-content="✓"
                >
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
            <div className="mx-5 lg:mx-48 mt-10">
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-sm font-bold leading-tight">
                  Detail Transaksi
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-zinc-600 text-base font-normal leading-snug">
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
                <div className="text-zinc-600 text-base font-normal leading-snug">
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
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-base font-normal leading-snug">
                  No. Virtual Account
                </div>
                <div className="flex flex-row justify-center items-center gap-x-3">
                  <div className="text-neutral-800 text-sm lg:text-base font-bold leading-snug">
                  {data?.NoVA}
                  </div>
                  <div>
                    <button className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center" onClick={handleCopy}>
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
              <div className="flex flex-row justify-between items-center mt-3">
                <div className="text-zinc-600 text-base font-normal leading-snug">
                  Total Pembayaran
                </div>
                <div className="text-neutral-800 text-base font-bold leading-snug">
                Rp.{data?.totalBayar}
                </div>
              </div>
              <hr className="mt-5" />
              <div className="collapse collapse-arrow">
                <input type="radio" name="howtopay-accordion" />
                <div className="collapse-title text-lg lg:text-xl font-bold">
                  ATM Bank
                </div>
                <div className="collapse-content">
                  <ul className="list-decimal list-inside text-sm lg:text-base text-[#616161]">
                    <li>Masukkan Kartu Anda.</li>
                    <li>Pilih Bahasa.</li>
                    <li>Masukkan PIN ATM Anda.</li>
                    <li>Pilih "Menu Lainnya".</li>
                    <li>Pilih "Transfer".</li>
                    <li>
                      Pilih Jenis rekening yang akan Anda gunakan (Contoh: "Dari
                      Rekening Tabungan").
                    </li>
                    <li>Pilih "Virtual Account Billing".</li>
                    <li>
                      Masukkan nomor Virtual Account Anda (contoh: 0099876629).
                    </li>
                    <li>
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi.
                    </li>
                    <li>
                      Konfirmasi, apabila telah sesuai, lanjutkan transaksi.
                    </li>
                    <li>Transaksi telah selesai.</li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input type="radio" name="howtopay-accordion" />
                <div className="collapse-title text-lg lg:text-xl font-bold">
                  Cabang atau Outlet Bank
                </div>
                <div className="collapse-content">
                  <ul className="list-decimal list-inside text-sm lg:text-base text-[#616161]">
                    <li>Kunjungi Kantor Cabang/outlet BNI terdekat.</li>
                    <li>
                      Informasikan kepada Teller, bahwa ingin melakukan
                      pembayaran "Virtual Account Billing".
                    </li>
                    <li>Serahkan nomor Virtual Account Anda kepada Teller.</li>
                    <li>Teller melakukan konfirmasi kepada Anda.</li>
                    <li>Teller memproses Transaksi.</li>
                    <li>
                      Apabila transaksi Sukses anda akan menerima bukti
                      pembayaran dari Teller tersebut.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input type="radio" name="howtopay-accordion" />
                <div className="collapse-title text-lg lg:text-xl font-bold">
                  Mobile Banking
                </div>
                <div className="collapse-content">
                  <ul className="list-decimal list-inside text-sm lg:text-base text-[#616161]">
                    <li>
                      Akses BNI Mobile Banking dari handphone kemudian masukkan
                      user ID dan password.
                    </li>
                    <li>Pilih menu "Transfer".</li>
                    <li>
                      Pilih menu "Virtual Account Billing" kemudian pilih
                      rekening debet.
                    </li>
                    <li>
                      Masukkan nomor Virtual Account Anda (contoh:
                      8277088229613784) pada menu "input baru".
                    </li>
                    <li>
                      Konfirmasi transaksi dan masukkan Password Transaksi.
                    </li>
                    <li>Pembayaran Anda Telah Berhasil.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center lg:mt-12 mt-5 mb-10 lg:mx-52">
              <div className="w-full lg:w-40 bg-neutral-100 rounded-md">
                <button
                  className="w-full lg:w-40 h-11 px-14 font-bold justify-center items-center gap-6 flex text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400"
                  onClick={handleBack}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaraPembayaran;
