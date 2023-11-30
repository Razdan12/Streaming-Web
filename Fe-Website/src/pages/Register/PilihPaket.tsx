import React, { useState, useEffect } from "react";
// import disc from "../../assets/Discount.png";
import { NavbarSecond } from "../../component/Navbar";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Input } from "../../component/Input";
// import { ModalDiscount, ModalSK } from "../../component/Modals";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalWarning } from "../../component/Modals";

type PaketProps = {
  label: string;
  image?: string;
  activeTab: string;
  onClick: (tab: string) => void;
};
type ContentPaket = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentPaket) => {
  return <div className="flex flex-col">{children}</div>;
};

const schema = Yup.object().shape({
  namaInstansi: Yup.string().required("Required"),
  noHp: Yup.string().required("Required"),
  alamat: Yup.string().required("Required"),
  kodeSiplah: Yup.string().required("Required"),
});

const TabPaket = ({ label, activeTab, onClick }: PaketProps) => {
  const isActive = activeTab === label;

  return (
    <div className="w-full flex items-center justify-center">
      <button
        className={`px-4 py-4 w-full h-14 flex justify-center items-center${
          isActive
            ? " border-b-2 border-b-cyan-400 text-black"
            : "text-gray-400"
        }`}
        onClick={() => onClick(label)}
      >
        {label === "Paket Normal" ? (
          <p className="text-center text-zinc-600 text-base font-bold leading-relaxed">
            {label}
          </p>
        ) : (
          <p className="text-center text-zinc-600 text-base font-bold leading-relaxed">
            {label}
          </p>
        )}
      </button>
    </div>
  );
};

const PilihPaket = () => {
  const [activeTab, setActiveTab] = useState("Paket Normal");
  const [RangeValue, setRangeValue] = useState(1);
  const [choosen, setChoosen] = useState("Individu");
  const [harga, setHarga] = useState<number>(30000);
  const [totalHarga, setTotalHarga] = useState<number>(harga);
  const [loading, setLoading] = useState<boolean>(false);
  const { setIdPaket, idUser, setIdTransaksi, email, password } = useStore();

  const formik = useFormik({
    initialValues: {
      namaInstansi: "",
      noHp: "",
      alamat: "",
      kodeSiplah: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (event: any) => {
    setRangeValue(event.target.value);
  };
  const navigate = useNavigate();

  const createProfil = async (idPaket: string) => {
    await api.CreateProfil(idUser, idPaket);
  };

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
    if (activeTab === "Paket Normal") {
      const kapasitas = choosen == "Individu" ? 1 : 5;
      const namaPaket = `${choosen}`;
      try {
        setLoading(true);
        const Response = await api.PilihPaket(
          namaPaket,
          RangeValue * 30,
          totalHarga,
          kapasitas
        );
        setIdPaket(Response.data.id);
        createProfil(Response.data.id);
        navigate("/Pilih-Metode");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const { namaInstansi, noHp, alamat, kodeSiplah } = formik.values;
        const rest = await api.radeemSiplah(
          idUser,
          namaInstansi,
          noHp,
          alamat,
          kodeSiplah
        );

        createProfil(rest.data?.data?.idPaket);
        setIdTransaksi(rest.data?.data?.idTransaksi);
        handleKirimEmail();
        navigate("/konfirmasi-paket");
      } catch (error) {
        let modalElement = document.getElementById(
          "siplah"
        ) as HTMLDialogElement;
        if (modalElement) {
          modalElement.showModal();
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleTabsClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setTotalHarga(harga * RangeValue);
  }, [RangeValue, harga]);

  const handleChoose = (choose: any) => {
    choose === "Individu" ? setHarga(30000) : setHarga(150000);
    setChoosen(choose);
  };

  return (
    <>
      <ModalWarning id="siplah">
        <div className="w-full flex flex-col items-center justify-center my-10">
          <span className="text-2xl text-black font-bold">
            Kode Pembayaran Tidak Valid
          </span>
          {/* <div className="">
            <form method="dialog w-full">
              
              <button className="btn py-4 px-2 mt-5 bg-cyan-500 w-full flex justify-center font-bold text-white rounded-md cursor-pointer ">
                Pilih Paket
              </button>
            </form>
          </div> */}
        </div>
      </ModalWarning>
      <div className="flex flex-auto  overflow-x-hidden" data-theme="light">
        <div className="">
          <NavbarSecond />
          <div className="flex flex-col justify-items-center mt-10 ">
            <div className="flex justify-center mb-10 text-lg lg:text-xl font-bold  mx-16 ">
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
                <li className="step step-info text-sm" data-content=" ">
                  Pilih Paket
                </li>
                <li className="step text-sm" data-content=" ">
                  Pembayaran
                </li>
              </ul>
            </div>
            <div className="flex flex-row justify-center items-center my-10 w-full px-5 lg:px-56">
              <TabPaket
                label="Paket Normal"
                activeTab={activeTab}
                onClick={handleTabsClick}
              />
              <TabPaket
                label="Paket Instansi"
                activeTab={activeTab}
                onClick={handleTabsClick}
              />
            </div>
            <div className="h-4/6 w-screen">
              {activeTab === "Paket Normal" && (
                <Content>
                  <div className="flex flex-col justify-center items-center mx-5 lg:mx-52">
                    <div className="flex flex-row justify-center items-center w-full gap-x-5">
                      <div
                        className={`p-[5px] bg-white rounded-2xl shadow-lg justify-start items-start gap-2 flex flex-col w-1/2 cursor-pointer ${
                          choosen === "Individu"
                            ? "bg-gradient-to-r from-cyan-300 to-blue-500"
                            : "bg-white"
                        }`}
                        onClick={() => handleChoose("Individu")}
                      >
                        <div className="bg-white p-4 w-full items-start flex justify-start flex-col rounded-2xl gap-y-3">
                          <div
                            className={` ${
                              choosen === "Individu"
                                ? "text-blue-900"
                                : "text-blue-400"
                            } text-2xl font-bold text-start mb-2`}
                          >
                            Individu
                          </div>
                          <div
                            className={`flex flex-col justify-start items-start gap-2 ${
                              choosen === "Individu"
                                ? "text-gray-800"
                                : "text-gray-400"
                            }`}
                          >
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className=" text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                1 Akun aktif
                              </div>
                            </div>
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row  gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className=" text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                Paket hemat untuk kamu
                              </div>
                            </div>
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row  gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className=" text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                Rp. 30.000/bulan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-[5px] bg-white rounded-2xl shadow-lg justify-start items-start gap-2 flex flex-col w-1/2 cursor-pointer ${
                          choosen === "Family"
                            ? "bg-gradient-to-r from-cyan-300 to-blue-500"
                            : "bg-white"
                        }`}
                        onClick={() => handleChoose("Family")}
                      >
                        <div className="bg-white p-4 w-full items-start flex justify-start flex-col rounded-2xl gap-y-3">
                          <div
                            className={` ${
                              choosen === "Family"
                                ? "text-blue-900"
                                : "text-blue-400"
                            } text-2xl font-bold text-start mb-2`}
                          >
                            Family
                          </div>
                          <div
                            className={`flex flex-col justify-start items-start gap-2 ${
                              choosen === "Family"
                                ? "text-gray-800"
                                : "text-gray-400"
                            }`}
                          >
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row  gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className="text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                5 Akun aktif
                              </div>
                            </div>
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row  gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className="text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                Bersama Lebih Hemat
                              </div>
                            </div>
                            <div className="bg-inherit hover:bg-inherit hover:border-none flex justify-center items-center flex-row  gap-x-1">
                              <span>
                                <BsFillCheckCircleFill />
                              </span>
                              <div className=" text-xs lg:text-base font-normal leading-normal tracking-wide flex justify-center items-center">
                                Rp. 150.000/bulan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-start w-full mt-4 gap-y-5 lg:gap-x-5">
                      <div className="flex flex-col w-full lg:w-1/2 justify-start items-start">
                        <div className="text-black text-opacity-60 text-sm lg:text-base font-normal capitalize leading-tigh   mb-5">
                          Masa aktif {RangeValue} (Bulan)
                        </div>
                        <div className="w-10/12">
                          <input
                            type="range"
                            min="1"
                            max="12"
                            step="1"
                            value={RangeValue}
                            onChange={handleChange}
                            className="range range-info tooltip tooltip-open fill-cyan-400"
                            data-tip={RangeValue}
                          />
                        </div>
                      </div>
                      {/* <div className="flex flex-col w-1/2 items-start">
                        <div className="text-black text-opacity-60 text-sm lg:text-base font-normal capitalize leading-tigh  ">
                          Voucher
                        </div>
                        <div className="flex flex-row gap-x-2 mt-5 justify-center items-center">
                          <img src={disc} alt="" />
                          <label
                            htmlFor="discount"
                            className="cursor-pointer text-sm lg:text-base"
                          >
                            5 Voucher Tersedia
                          </label>
                        </div>
                      </div> */}
                    </div>
                    <div className="flex-col justify-start items-start gap-3 flex w-full mt-5">
                      <div className="text-black text-opacity-60 text-sm font-bold leading-tight">
                        Total Harga
                      </div>
                      <div className="text-neutral-800 text-2xl lg:text-3xl font-bold leading-10">
                        Rp. {totalHarga === 0 ? harga : totalHarga}
                      </div>
                    </div>
                  </div>
                </Content>
              )}
              {activeTab === "Paket Instansi" && (
                <div className="flex flex-col justify-center items-center mx-5 lg:mx-52">
                  <div className="p-5 w-full gap-y-5 flex flex-col">
                    <Input
                      type="text"
                      id="namaInstansi"
                      name="namaInstansi"
                      value={formik.values.namaInstansi}
                      onChange={formik.handleChange}
                      label="Nama Instansi"
                    />
                    <Input
                      type="text"
                      id="noHp"
                      name="noHp"
                      value={formik.values.noHp}
                      onChange={formik.handleChange}
                      label="No Telfon"
                    />
                    <Input
                      type="text"
                      id="alamat"
                      name="alamat"
                      value={formik.values.alamat}
                      onChange={formik.handleChange}
                      label="Alamat Instansi"
                    />
                    <Input
                      type="text"
                      id="kodeSiplah"
                      name="kodeSiplah"
                      value={formik.values.kodeSiplah}
                      onChange={formik.handleChange}
                      label="Kode Pembayaran"
                    />
                  </div>
                  <div className="flex flex-col w-full px-5">
                    <div className="text-zinc-600 text-base font-bold leading-relaxed">
                      Keterangan
                    </div>
                    <ul>
                      <li>
                        {" "}
                        1. Paket Siplah dibeli dalam laman
                        https://siplah.blibli.com/
                      </li>
                      <li>
                        2. Kode pembayaran bersifat unik dan hanya dapat
                        digunakan 1 kali
                      </li>
                      <li>
                        3. Jika terdapat kendala dalam penginputan silahkan
                        hubungi{" "}
                        <span className="text-blue-500 text-base font-bold leading-relaxed cursor-pointer">
                          Admin
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
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

export default PilihPaket;
