import { useEffect, useState } from "react";
import { NavbarSecond } from "../../component/Navbar";
import { useNavigate } from "react-router-dom";
import { BsBank, BsFillCheckCircleFill } from "react-icons/bs";
import { useStore } from "../../store/Store";
import api from "../../Api/api";

const PilihMetode = () => {
  const navigate = useNavigate();
  const [pilih, setPilih] = useState<number>(0);
  const [pilihBank, setPilihBank] = useState<string>("BCA");
  const [Bank, setBank] = useState<any>([]);
  const { idPaket, idUser, setIdTransaksi, email, password } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const checkBank = async () => {
    const response = await api.GetBank();
    setBank(response.data.data);

  };
  useEffect(() => {
    checkBank();
  }, [pilih]);

  const handleKirimEmail = async () => {
    const dataRest = {
      penerima: email,
      subject: "Pendaftaran Akun Wijiga.com",
      pesan:
        "Selamat pendaftaran akun anda di wijiga.com telah berhasil, berikut detail akun anda :",
      dataPesan: `
      <p>Email : ${email}</p> 
      <p>Kata Sandi : ${password}</p>
      `,
      penutup:
        "untuk mengakses akun anda silakan kunjungi link berikut https://wijiga.com",
    };
    await api.Email(
      dataRest.penerima,
      dataRest.subject,
      dataRest.pesan,
      dataRest.dataPesan,
      dataRest.penutup
    );
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      const Response = await api.CreatePayment(idUser, pilihBank, idPaket);
      setIdTransaksi(Response.data?.data?.id);
      handleKirimEmail();
      navigate("/Konfirmasi-Pembayaran");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Pilih-Paket");
  };

  const handlePilih = async (index: number, bank: string) => {
    setPilih(index);
    setPilihBank(bank);
  };

  return (
    <>
      <div className="flex flex-auto " data-theme="light">
        <div className="grow h-screen overflow-x-hidden">
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
            <div className="flex mx-5 lg:mx-52 mt-12 flex-col">
              <div className="justify-start capitalize text-[#616161]  ">
                Pilih Metode Pembayaran
              </div>
              <div className="mt-3 w-full gap-y-3 join-horizontal">
                <div className="collapse collapse-arrow join-item bg-white border border-neutral-200 mb-3">
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-normal">
                    Virtual Account Bank
                  </div>
                  <div className="collapse-content flex flex-col gap-y-3">
                    {Bank.map((item: any, index: number) => (
                      <div
                        className={`${
                          item.is_activated
                            ? item.country === "ID"
                              ? item.currency === "IDR"
                                ? ""
                                : "hidden"
                              : "hidden"
                            : "hidden"
                        }  flex flex-row gap-x-3 justify-between items-center  px-1 rounded-md border-b border-b-neutral-200 py-2 cursor-pointer  ${
                          pilih === index ? "bg-green-300" : ""
                        }`}
                        key={index}
                        onClick={() => handlePilih(index, item.code)}
                      >
                        <div className="flex items-center gap-2 ">
                          <div className="text-2xl ">
                            <BsBank />
                          </div>
                          <p className="text-base text-[#1E2124]">
                            {item.name}
                          </p>
                        </div>
                        <div className="mr-10 text-green-800">
                          <p>
                            {pilih === index ? <BsFillCheckCircleFill /> : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mb-10 justify-center mt-5 ">
              <div className="w-5/6 flex justify-end  pr-0 sm:pr-10">
                <div className="p-2 flex justify-center  w-1/2 sm:w-32">
                  <button
                    className="btn w-full bg-gray-200"
                    onClick={handleBack}
                  >
                    Kembali
                  </button>
                </div>
                <div className="p-2 flex justify-center  w-1/2 sm:w-32">
                  <button
                    className="btn w-full bg-gradient-to-r from-cyan-300 to-blue-400 rounded-md justify-center items-center gap-6 flex text-white"
                    onClick={handleNext}
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

export default PilihMetode;
