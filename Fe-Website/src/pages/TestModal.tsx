import {
  ModalChangeEmail,
  ModalOtp,
  Modals,
  ModalWarning,
} from "../component/Modals";
import { Input, InputPassword } from "../component/Input";
import { useState } from "react";
import warning from "../assets/waning.png";
import { PacketButton } from "../component/Button";
import {
  BsFillCheckCircleFill,
  BsDashSquareFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import { ModalDiscount } from "../component/Modals";

const TestModal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const [num, setNum] = useState(20);
  return (
    <div>
      {/* modal reset pw */}
      <ModalChangeEmail />
      <ModalDiscount />
      <button className="btn btn-wide">
        <label htmlFor="discount">Discount</label>
      </button>
      <ModalOtp />
      <div id="reset-pw">
        <Modals id="reset-password">
          <label
            htmlFor="reset-password"
            className="btn btn-sm absolute right-2 top-2 text-black"
          >
            ✕
          </label>
          <div className="flex justify-center mb-2 text-xl font-bold">
            Reset Password
          </div>
          <div className="flex items-center justify-center w-full mb-10">
            <p className="mt-2 text-md text-gray-400">Masukkan Email Anda</p>
          </div>
          <div className="w-full">
            <label className="relative pt-3">
              <input
                type="text"
                placeholder="Email"
                className="input h-12 w-full px-6 text-xl bg-white border-b-2 border-gray-300 focus:border-b-3 focus:border-gray-300 focus:outline-none text-gray-900 rounded-lg placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-2xl text-gray-400 text-opacity-80 bg-white absolute left-5 top-0 bottom-5 transition duration-200 input-text">
                Email
              </span>
            </label>
          </div>
          <button
            id="btn-reset"
            className="hover:cursor-pointer mt-10 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 flex justify-center items-center"
          >
            <p className="text-xl font-bold text-white">Reset Password</p>
          </button>
        </Modals>
        <div className="">
          <label
            className="btn btn-wide btn-primary text-white bg-gradient"
            htmlFor="reset-password"
          >
            Reset Password
          </label>
        </div>
      </div>
      {/* modal login */}
      <div id="login">
        <Modals id="modal-login">
          <label
            htmlFor="modal-login"
            className="btn btn-sm absolute right-2 top-2 text-black"
          >
            ✕
          </label>
          <div className="flex justify-center mb-2 text-xl font-bold">
            Masuk Akun
          </div>
          <div className="flex items-center justify-center w-full mb-10">
            <p className="mt-2 text-md text-gray-400">
              Belum Punya Akun?{" "}
              <a className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Daftar
              </a>
            </p>
          </div>
          <div className="relative mt-5">
            <Input type="text" id="email" name="email" label="Email" />
          </div>
          <div className="relative mt-10">
            <InputPassword
              id="password"
              type="password"
              label="Password"
              name="password"
            />
          </div>
          <div className="w-full flex justify-end py-5">
            <p className="font-base">Lupa Password?</p>
          </div>
          <button
            id="btn-modal-login"
            className="hover:cursor-pointer mt-5 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 flex justify-center items-center"
          >
            <p className="text-xl font-bold text-white">Masuk</p>
          </button>
        </Modals>
        <div className="">
          <label
            className="btn btn-wide btn-primary text-white bg-gradient"
            htmlFor="modal-login"
          >
            Masuk
          </label>
        </div>
      </div>
      {/* modal warning */}
      <div id="warning-modal">
        <ModalWarning id="modal-warning">
          <div className="flex flex-col">
            <div className="h-1/2 w-full">
              <label
                htmlFor="modal-warning"
                className="btn btn-sm bg-transparent absolute right-2 top-2 text-black hover:bg-transparent"
              >
                ✕
              </label>
              <div className="flex items-center justify-center mb-4">
                <img
                  src={warning}
                  alt="warning image"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="bg-transparent flex flex-col items-center justify-center h-1/2 gap-y-3">
              <h2 className="text-xl font-bold">Pembayaran Belum Selesai</h2>
              <p className="text-gray-700 mb-4 text-center">
                Selesaikan pembayaran anda agar dapat mengakses seluruh konten
                Wijiga
              </p>
            </div>
            <div className="rounded-md">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-400"
                htmlFor="modal-warning"
              >
                Selesaikan Pembayaran
              </label>
            </div>
          </div>
        </ModalWarning>
        <div className="">
          <label
            className="btn btn-wide btn-primary text-white bg-gradient"
            htmlFor="modal-warning"
          >
            Warning
          </label>
        </div>
      </div>
      {/* modal register */}
      <div id="regis">
        <Modals id="modal-regis">
          <label
            htmlFor="modal-regis"
            className="btn btn-sm absolute right-2 top-2 text-black"
          >
            ✕
          </label>
          <div className="flex justify-center mb-5 text-xl font-bold">
            Registrasi Akun
          </div>
          <div className="justify-center items-center">
            <ul className="steps steps-vertical lg:steps-horizontal w-full text-gray-500">
              <li className="step step-info bg-white">Isi Data Akun</li>
              <li className="step">Pilih Paket</li>
              <li className="step">Pembayaran</li>
            </ul>
          </div>
          <div className="relative mt-10">
            <Input type="text" id="email" name="email" label="Email" />
            <div className="mt-10">
              <InputPassword
                id="password-regis"
                label="Password"
                name="password"
              />
            </div>
            <div className="mt-10">
              <InputPassword
                id="confirm-password"
                label="Confirm Password"
                name="confirm-password"
              />
            </div>
          </div>
          <div className="justify-items-center gap-x-36 inline-flex mt-5">
            <div className="w-40 h-11 px-14 bg-neutral-100 rounded justify-start items-center gap-6 flex">
              <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Batal
              </p>
            </div>
            <label
              className="btn w-40 h-11 px-14 bg-gradient-to-r from-cyan-300 to-indigo-500 rounded justify-start items-center gap-6 flex text-white"
              htmlFor="modal-paket"
            >
              Next
            </label>
          </div>
        </Modals>

        <div className="">
          <label
            className="btn btn-wide btn-primary text-white bg-gradient"
            htmlFor="modal-regis"
          >
            Register
          </label>
        </div>
      </div>
      <div className="">
        <label
          className="btn btn-wide btn-primary text-white bg-gradient"
          htmlFor="warning-change-email"
        >
          Change Email
        </label>
      </div>

      {/* end of modal register */}

      <Modals id="modal-paket">
        <label
          htmlFor="modal-paket"
          className="btn btn-sm absolute right-2 top-2 text-black"
        >
          ✕
        </label>
        <div className="flex justify-center mb-5 text-xl font-bold">
          Registrasi Akun
        </div>
        <div className="justify-center items-center">
          <ul className="steps steps-vertical lg:steps-horizontal w-full text-gray-500">
            <li className="step step-info bg-white">Isi Data Akun</li>
            <li className="step step-info">Pilih Paket</li>
            <li className="step">Pembayaran</li>
          </ul>
        </div>
        <div className="flex justify-center items-center w-full h-auto my-5">
          <PacketButton
            id="individual"
            packetName="Individual"
            benefit1="1 Akun Aktif"
            benefit2="Paket Hemat Untuk Kamu"
            benefit3="50rb/bulan"
          />
          <PacketButton
            id="family"
            packetName="Family"
            benefit1="5 Akun Aktif"
            benefit2="Bersama Lebih Hemat"
            benefit3="220rb/bulan"
          />
          <div
            onClick={handleClick}
            className={`w-48 h-60 rounded-3xl shadow-gradient-to-r from-cyan-300 to-blue-400 ${
              isClicked
                ? "bg-gradient-to-r from-cyan-300 to-blue-400"
                : "bg-white"
            }`}
          >
            {isClicked ? (
              <div className="justify-center items-center gap-4 flex px-5 cursor-pointer">
                <div className="flex-col justify-center items-start inline-flex">
                  <div className="text-start text-white text-2xl font-bold leading-loose">
                    Instansi
                  </div>
                  <div className="flex flex-row">
                    <p className="text-gray-500 text-base">
                      Isikan Jumlah Akun
                    </p>
                  </div>
                  <div className="flex flex-col w-40 bg-white shadow-xl border rounded-lg border-@19345E justify-center items-center">
                    <div className="flex flex-row mb-3 text-2xl gap-4 justify-center items-center">
                      <BsDashSquareFill
                        className="text-@19345E hover:scale-125 cursor-pointer"
                        onClick={() => {
                          if (num > 20) {
                            setNum(num - 1);
                          }
                        }}
                      />
                      <h1>{num}</h1>
                      <BsFillPlusSquareFill
                        className="text-@19345E hover:scale-125 cursor-pointer"
                        onClick={() => {
                          if (num < 25) {
                            setNum(num + 1);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-gray-500 text-base">*note: 50rb/akun</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="justify-center items-center gap-4 flex px-5 cursor-pointer">
                <div className="flex-col justify-center items-start inline-flex">
                  <div className="text-start text-[#284B80] text-2xl font-bold leading-loose">
                    Instansi
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <BsFillCheckCircleFill />
                    </div>
                    <p className="text-gray-500 text-base">
                      {" "}
                      {">"}10 Akun Aktif
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <BsFillCheckCircleFill />
                    </div>
                    <p className="text-gray-500 text-base">
                      Professional Purpose
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <BsFillCheckCircleFill />
                    </div>
                    <p className="text-gray-500 text-base">
                      Mulai dari 400rb/bulan
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row text-start text-gray-400 pb-14">
          <div className="w-4/6 flex flex-col">
            <p>Atur Masa Aktif</p>
          </div>
          <div className="w-2/6 flex flex-col">
            <p>Total Harga</p>
            <p className="text-2xl">Rp. 150.000</p>
          </div>
        </div>
        <div className="justify-items-center gap-x-36 inline-flex">
          <div className="w-40 h-11 px-14 bg-neutral-100 rounded justify-start items-center gap-6 flex"></div>
          <label
            className="btn w-40 h-11 px-14 bg-gradient-to-r from-cyan-300 to-indigo-500 rounded justify-start items-center gap-6 flex text-white"
            htmlFor="modal-paket"
          >
            Next
          </label>
        </div>
      </Modals>
    </div>
  );
};

export default TestModal;
