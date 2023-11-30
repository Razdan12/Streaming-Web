import React, { Suspense, useEffect, useState } from "react";
import LayoutProfile from "../../component/LayoutProfile";
import { CardManageAccount, CardActivity } from "../../component/Card";
import { Input, InputPassword } from "../../component/Input";
import { ModalStopSubs, Modals } from "../../component/Modals";

import { Link, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalStore } from "../../store/LocalStore";
import { AiOutlineCloseCircle } from "react-icons/ai";

const schema = Yup.object().shape({
  OldPassword: Yup.string().required("Password wajib diisi"),
  NewPassword: Yup.string().required("Password wajib diisi"),
  RePassword: Yup.string().required("Password wajib diisi"),
});

const InformasiAkun = () => {
  const ModalLogout = React.lazy(() => import("../../component/ModalLogout"));
  const navigate = useNavigate();
  const { idProfil } = LocalStore();
  const { token, idTransaksi } = useStore();
  const [profil, setProfil] = useState<any>([]);
  const [akun, setAkun] = useState<any>([]);
  const [avatar, setAvatar] = useState<any>([]);
  const [Paket, setPaket] = useState<any>("");
  const [namaUser, setNamaUser] = useState<string>("");
  const [triger, setTriger] = useState<boolean>(false);
  const [transaksi, setTransaksi] = useState<any>();
  const [password, setPassword] = useState<boolean>(false);
  const [passwordd, setPasswordd] = useState<boolean>(false);
  const [Index, setIndex] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      OldPassword: "",
      NewPassword: "",
      RePassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const GetProfilUser = async () => {
    try {
      const Profil = await api.GetProfilUser(token);
      const { user: dataUser, profil: dataProfil } = Profil.data.data;
      const { idPaket: PaketId } = dataUser;

      setProfil(dataUser);
      setAkun(dataProfil);

      const response = await api.GetPaketById(token, PaketId);
      setPaket(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const EditUser = async () => {
    try {
      const id = profil.id;
      const data = {
        name: namaUser,
      };
      await api.EditDataUser(token, id, data);
      setTriger(!triger);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateProfil = async () => {
    console.log("ini jalan");

    const data = {
      picture: url,
    };
    try {
      await api.EditProfil(token, idProfil, data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvatar = async () => {
    const avatarRest = await api.GetAllVatar(token);
    setAvatar(avatarRest.data);
  };
  const dataTransaksi = async () => {
    const response = await api.CekPaymentVa(idTransaksi);
    setTransaksi(response.data?.data);
  };

  useEffect(() => {
    GetProfilUser();
    fetchAvatar();
    dataTransaksi();
  }, [triger]);

  useEffect(() => {
    dataTransaksi();
  }, [idTransaksi]);

  const masaAktif = () => {
    const aktif = new Date(profil.aktif);
    const formattedDate = aktif.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return formattedDate;
  };

  const handleChangePassword = async () => {
    const id = profil.id;
    const { OldPassword, NewPassword, RePassword } = formik.values;
    if (NewPassword != RePassword) {
      return setPassword(true);
    }

    if (NewPassword.length < 8) {
      return setPassword(true);
    }
    setPassword(false);
    const data = {
      oldPassword: OldPassword,
      newPassword: NewPassword,
    };
    const response = await api.UpdatePasswordUser(token, id, data);

    if (!response.data.password) {
      setPasswordd(true);
    } else {
      window.location.reload();
    }
  };

  const validasi = password
    ? " focus:border-red-600 border-red-500"
    : "text-gray-600 focus:border-gray-600 border-gray-300";

  const validasiPassword = passwordd
    ? " focus:border-red-600 border-red-500"
    : "text-gray-600 focus:border-gray-600 border-gray-300";


  const tanggalSekarang: Date = new Date(transaksi?.dibuat);
  const tanggalKedepan: Date = new Date(tanggalSekarang);

  tanggalKedepan.setDate(tanggalSekarang.getDate() + transaksi?.masaAktif);

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
    <LayoutProfile id="informasiakun">
      <div className="modal" id="ubah-nama">
        <div className="modal-box">
          <label
            htmlFor="ubah-nama"
            className="btn btn-sm absolute right-2 top-2 text-black"
            onClick={() => navigate(-1)}
          >
            X
          </label>
          <div className="flex justify-center mb-2 text-xl font-bold">
            Ubah Nama
          </div>
          <div className="flex items-center justify-center w-full mb-10">
            <p className="mt-2 text-md text-gray-400">
              Gunakan nama lengkap atau nama panggilan
            </p>
          </div>
          <div className="relative mt-5">
            <Input
              type="text"
              id="nama"
              name="nama"
              label="Nama"
              value={namaUser}
              onChange={(event) => setNamaUser(event.target.value)}
            />
          </div>
          <button
            id="btn-ubah-nama"
            className="hover:cursor-pointer mt-5 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 flex justify-center items-center"
            onClick={EditUser}
          >
            <p className="text-xl font-bold text-white">Simpan</p>
          </button>
        </div>
      </div>

      <div className="modal" id="ubah-email">
        <div className="modal-box">
          <label
            htmlFor="ubah-email"
            className="btn btn-sm absolute right-2 top-2 text-black"
            onClick={() => navigate(-1)}
          >
            X
          </label>
          <div className="flex justify-center mb-2 text-xl font-bold">
            Ubah Email
          </div>
          <div className="flex items-center justify-center w-full mb-10">
            <p className="mt-2 text-md text-gray-400">
              Pastikan alamat email anda benar
            </p>
          </div>
          <div className="relative mt-5">
            <Input type="text" id="email" name="email" label="Email" />
          </div>
          <button
            id="btn-ubah-email"
            className="hover:cursor-pointer mt-5 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 flex justify-center items-center"
          >
            <p className="text-xl font-bold text-white">Verifikasi Email</p>
          </button>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <ModalLogout />
      </Suspense>

      <ModalStopSubs />
      <div className="modal" id="ubah-password">
        <div className="modal-box">
          <label
            htmlFor="ubah-password"
            className="btn btn-sm absolute right-2 top-2 text-black"
            onClick={() => navigate(-1)}
          >
            X
          </label>
          <div className="flex justify-center mb-2 text-xl font-bold">
            Ubah Kata Sandi
          </div>
          <div className="flex items-center justify-center w-full mb-10">
            <p className="mt-2 text-md text-gray-400">
              Kata Sandi minimal 8 karakter
            </p>
          </div>
          <div className="relative mt-5">
            <InputPassword
              id="OldPassword"
              type="password"
              label="Kata Sandi Lama"
              name="OldPassword"
              className={validasiPassword}
              value={formik.values.OldPassword}
              onChange={formik.handleChange}
            />
            <label className={`text-red-600 ${passwordd ? "" : "hidden"}`}>
              password salah
            </label>
          </div>
          <div className="relative mt-5">
            <InputPassword
              id="NewPassword"
              type="password"
              label="Kata Sandi Baru"
              className={validasi}
              name="NewPassword"
              value={formik.values.NewPassword}
              onChange={formik.handleChange}
            />
          </div>
          <div className="relative mt-5">
            <InputPassword
              id="RePassword"
              type="password"
              className={validasi}
              label="Konfirmasi Kata Sandi Baru"
              name="RePassword"
              value={formik.values.RePassword}
              onChange={formik.handleChange}
            />
            <label className={`text-red-600 ${password ? "" : "hidden"}`}>
              password tidak sama / kurang dari 8
            </label>
          </div>
          <button
            id="btn-ubah-password"
            className="hover:cursor-pointer mt-5 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 flex justify-center items-center"
            onClick={handleChangePassword}
          >
            <p className="text-xl font-bold text-white">Simpan</p>
          </button>
        </div>
      </div>

      <Modals id="avatar">
        <div className="w-full flex flex-col justify-center">
          <div className="w-full flex font-semibold justify-end ">
            <label htmlFor="avatar" className="cursor-pointer text-3xl">
              <AiOutlineCloseCircle />
            </label>
          </div>
          <div className="font-bold text-2xl flex justify-center">
            Ubah Foto Profil
          </div>
          <div className="font-semibold text-sm sm:text-md flex justify-center">
            Gunakan Avatar yang tersedia untuk foto profil
          </div>
          <div className="w-full flex flex-wrap gap-3 justify-center items-center my-10">
            {avatar?.map((item: any, index: number) => (
              <div
                className={`${
                  Index === index ? "ring" : ""
                } ring-info rounded-full p-1`}
              >
                <img
                  key={index}
                  src={item.url}
                  className="bg-red-500 rounded-full w-12 sm:w-20 cursor-pointer"
                  alt="avatar"
                  onClick={() => {
                    setIndex(index);
                    setUrl(item.url);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center" onClick={UpdateProfil}>
            <button className="btn btn-info">Ganti Profil</button>
          </div>
        </div>
      </Modals>
      <Modals id="detail-trans">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center text-2xl font-bold">
            Detail Transaksi
          </div>
          <div className="w-full flex justify-between mt-5">
            <div className="text-md">Invoice Number</div>
            <div className="text-md">{transaksi?.invoiceNumber}</div>
          </div>
                  <img src="" alt="" />
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Status Pembayaran</div>
            <div className="text-md font-bold">{transaksi?.statusPembayaran}</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Methode Bayar</div>
            <div className="text-md">{transaksi?.Methode}</div>
          </div>
          <hr className="my-5" />
          <div className="w-full flex justify-between mt-2">
            <div className="text-md font-bold">Detail Transaksi</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Nama Paket</div>
            <div className="text-md">{transaksi?.namaPaket}</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Jumlah Akun</div>
            <div className="text-md">{transaksi?.jumlahAkun} Akun</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Email Terdaftar</div>
            <div className="text-md">{transaksi?.emailUser}</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Masa Aktif</div>
            <div className="text-md">{transaksi?.masaAktif} Hari</div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Periode Paket</div>
            <div className="text-md">
             {tanggalPeriode}
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <div className="text-md">Total Bayar</div>
            <div className="text-md font-bold">Rp. {transaksi?.totalBayar}</div>
          </div>
          <div className="w-5/6 flex justify-between mt-10">
            <label htmlFor="detail-trans" className="btn w-1/3">
              Tutup
            </label>
            <Link to={"/invoice"}>

            <div className="btn btn-primary w-1full">Lihat Invoice</div>
            </Link>
          </div>
        </div>
      </Modals>

      <div className="flex-col w-[97%] justify-start items-start gap-9 inline-flex mb-10">
        <div className="text-neutral-400 text-xl sm:text-3xl font-normal">
          Profile
        </div>
        <div className=" flex w-full px-5 flex-row justify-between border-b-2 ">
          <div className="text-neutral-800  font-normal  flex flex-col justify-center text-sm sm:text-xl">
            <div className="">Nama</div>
            <div className="py-10">Email</div>
            <div>Password</div>
          </div>
          <div className="flex">
            <div className="text-neutral-800  ml-2 flex flex-col justify-center text-sm sm:text-xl">
              <div>:</div>
              <div className="py-10">: </div>
              <div>: </div>
            </div>
            <div className="text-neutral-800  ml-2 flex flex-col justify-center text-sm sm:text-xl font-bold">
              <div>{profil.name}</div>
              <div className="py-10"> {profil.email}</div>
              <div> ********</div>
            </div>
          </div>
          <div className="text-right text-blue-500  font-normal flex flex-col justify-center text-sm sm:text-xl">
            <div className="">
              <label className="cursor-pointer" htmlFor="ubah-nama">
                <a href="#ubah-nama">Ubah Nama</a>
              </label>
            </div>
            <div className="py-10">
              <div>
                <label className=" cursor-pointer" htmlFor="ubah-email">
                  {/* <a href="#ubah-email">Ubah Email</a> */}
                </label>
              </div>
            </div>
            <div>
              <div>
                <label className=" cursor-pointer" htmlFor="ubah-password">
                  <a href="#ubah-password">Ubah Password</a>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="text-neutral-400 text-xl sm:text-3xl font-normal">
          Detail Paket
        </div>
        <div className="border-b-2 flex justify-between w-full px-5 items-center pb-10  ">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-5 justify-center items-center pr-5">
            <div className="w-fit h-fit p-1 border-2 rounded-xl border-amber-400 text-amber-400  font-bold text-xs sm:text-xl">
              {Paket.name}
            </div>
            <div className="text-[#1E2124] font-normal text-xs sm:text-xl">
              {Paket.kapasitas} Akun Aktif
            </div>
          </div>
          <div className="text-[#1E2124]  font-normal text-xs sm:text-xl ">
            Berlaku sampai : {masaAktif()}
          </div>
          <div className="flex flex-col text-[#1E2124] font-normal gap-3 text-right text-xs sm:text-xl ml-5 ">
            {/* <div className="text-blue-500">
              <label htmlFor="" className=" cursor-pointer">
                Perbarui Paket
              </label>
            </div>
            <div className="text-red-500">
              <label htmlFor="stop-subs" className=" cursor-pointer">
                Berhenti Langganan
              </label>
            </div> */}
          </div>
        </div>
        <div className="text-neutral-400 text-3xl font-normal">Kelola Akun</div>
        <div className="flex flex-col gap-y-6 border-b-2 pb-14 w-full">
          <div className="flex w-full  flex-wrap justify-between sm:px-10 items-center gap-4 sm:gap-x-32">
            {akun.map((item: any, index: number) => (
              <CardManageAccount
                id={item.id}
                profil={item.picture}
                nama={item.name}
                aktif={item.status}
                key={index}
              />
            ))}
          </div>

         
        </div>
        <div className="text-neutral-400 text-3xl font-normal">
          Aktivitas Akun
        </div>
        <div className="grid grid-cols-2 w-full "></div>
        <div className="flex flex-col w-full gap-y-12">
          <CardActivity />
        </div>
      </div>
    </LayoutProfile>
  );
};
export default InformasiAkun;
