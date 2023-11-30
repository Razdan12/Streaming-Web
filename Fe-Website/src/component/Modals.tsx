import React, { FC,  useState } from "react";
import warning from "../assets/waning.png";
import { OTP } from "react-custom-otp";
import "react-custom-otp/dist/index.css";
import { CardDisc } from "./Card";
import { useStore } from "../store/Store";

interface Props {
  children?: React.ReactNode;
  id?: string;
}

export const Modals: FC<Props> = ({ children, id }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
};

export const ModalWarning: FC<Props> = ({ children, id }) => {
  return (
    <>
      {/* <input type="checkbox" id={id} className="modal-toggle" /> */}
      <dialog id={id} className="modal">
        <div
          className="modal-box bg-cyan-500 flex justify-center flex-col p-0"
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2">
              ✕
            </button>
          </form>
          <img src={warning} alt="" className="object-cover" />
          <div className="w-full h-full bg-white rounded-md p-3 mt-5">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export const ModalVoc: FC<Props> = ({ children, id }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div
          className="modal-box"
          style={{
            background: "linear-gradient(to bottom, white 30%, #F5F5F5 70%)",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export const ModalDiscount = () => {
  return (
    <div id="discount-modal">
      <ModalVoc id="discount">
        <div className="flex flex-col gap-y-5">
          <div className="h-1/2 w-full flex flex-row">
            <p className="text-xl font-bold text-black">Gunakan Voucher</p>
            <label
              htmlFor="discount"
              className="btn btn-sm bg-transparent absolute right-2 top-2 text-black hover:bg-transparent"
            >
              ✕
            </label>
          </div>
          <div className="bg-transparent flex flex-row items-start justify-center gap-x-3">
            <input
              type="text"
              className="w-2/3 border-b border-b-cyan-400 outline-none h-10"
              placeholder="Kode Voucher"
            />
            <div className="w-1/3 flex bg-gradient-to-r from-cyan-300 to-indigo-500 text-white justify-center items-center h-10 rounded mb-4">
              <p className="font-bold leading-9 tracking-wider">Gunakan</p>
            </div>
          </div>
          <div className="bg-neutral-100 w-full flex flex-col gap-y-2 pt-2">
            <CardDisc
              id="disc-1"
              name="Diskon Individu Rp. 3000"
              desc="Minimal Pembelian Paket 3 Bulan"
            />
            <CardDisc
              id="disc-2"
              name="Diskon Individu Rp. 5000"
              desc="Minimal Pembelian Paket 6 Bulan"
            />
            <CardDisc
              id="disc-3"
              name="Diskon Family Rp. 10.000"
              desc="Minimal Pembelian Paket 3 Bulan"
            />
            <CardDisc
              id="disc-1"
              name="Diskon Family Rp. 20.000"
              desc="Minimal Pembelian Paket 6 Bulan"
            />
          </div>
        </div>
      </ModalVoc>
    </div>
  );
};

export const ModalKeluarBayar = () => {
  return (
    <div id="keluar-bayar-modal">
      <ModalWarning id="keluar-bayar">
        <div className="flex flex-col">
          <div className="h-1/2 w-full">
            <label
              htmlFor="keluar-bayar"
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
            <h2 className="text-xl font-bold">Apakah Anda Ingin Keluar?</h2>
            <div className="text-center">
              <span className="text-zinc-600 text-sm font-normal leading-tight">
                Anda belum menyelesaikan pembayaran, kode pembayaran dapat
                dilihat di{" "}
              </span>
              <span className="text-neutral-800 text-sm font-bold leading-tight">
                Notifikasi
              </span>
              <span className="text-zinc-600 text-sm font-normal leading-tight">
                {" "}
                atau{" "}
              </span>
              <span className="text-neutral-800 text-sm font-bold leading-tight">
                Aktivitas Akun
              </span>
            </div>
          </div>
          <div className="flex flex-row w-full gap-x-3 mt-4">
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg"
                htmlFor="keluar-bayar"
              >
                <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Batal
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="keluar-bayar"
              >
                Tetap Keluar
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
    </div>
  );
};

interface Profil {
  id?: any;
  name: string;
}
export const ModalChangeAccount: FC<Profil> = ({ id, name }) => {
  const { setIdProfil } = useStore();

  const handleChangeProfil = async () => {
    setIdProfil(id);
    window.location.reload();
  };

  return (
    <div id="ganti-akun">
      <ModalWarning id="change-account">
        <div className="flex flex-col">
         
          <div className="bg-transparent flex flex-col items-center justify-center h-1/2 gap-y-3">
            <h2 className="text-xl font-bold">Pindah Akun?</h2>
            <p className="text-gray-700 mb-4 text-center">
              Anda akan pindah ke akun <span className="font-bold">{name}</span>
            </p>
          </div>
          <div className="flex flex-row w-full gap-x-3">
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg"
                htmlFor="change-account"
              >
                <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Kembali
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="change-account"
                onClick={handleChangeProfil}
              >
                Ya, Pindah
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
    </div>
  );
};

export const ModalStopSubs = () => {
  return (
    <div id="berhenti-langganan">
      <ModalWarning id="stop-subs">
        <div className="flex flex-col">
          <div className="w-full">
            <label
              htmlFor="stop-subs"
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
            <h2 className="text-xl font-bold">Yakin Berhenti Langganan?</h2>
            <p className="text-gray-700 mb-4 text-center">
              Anda perlu membeli paket lagi untuk mengakses konten Wijiga
            </p>
          </div>
          <div className="flex flex-row w-full gap-x-3">
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg"
                htmlFor="stop-subs"
              >
                <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Kembali
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="stop-subs"
              >
                Ya, Berhenti
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
    </div>
  );
};

export const ModalChangeEmail = () => {
  return (
    <div id="berhenti-langganan">
      <ModalWarning id="warning-change-email">
        <div className="flex flex-col">
          <div className="w-full">
            <label
              htmlFor="warning-change-email"
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
            <h2 className="text-xl font-bold">Yakin Ingin Ubah Email?</h2>
            <p className="text-gray-700 mb-4 text-center">
              Anda akan mendapatkan kode OTP di{" "}
              <span className="font-bold">email lama</span> anda
            </p>
          </div>
          <div className="flex flex-row w-full gap-x-3">
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg"
                htmlFor="warning-change-email"
              >
                <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Batal
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="modal-otp"
              >
                Kirim OTP
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
    </div>
  );
};
export const ModalOtp = () => {
  const [stringCode, setStringCode] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  console.log(stringCode, submitStatus);

  return (
    <div id="berhenti-langganan">
      <Modals id="modal-otp">
        <div className="flex flex-col">
          <div className="w-full">
            <label
              htmlFor="modal-otp"
              className="btn btn-sm bg-transparent absolute right-2 top-2 text-black hover:bg-transparent"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col gap-y-6 items-center justify-center w-full mb-10">
            <p className="mt-2 text-2xl font-bold text-[#1E2124]">
              Masukkan kode OTP
            </p>
            <p className="text-gray-700 text-center">
              kami telah mengirimkan otp ke{" "}
              <p>
                <span className="font-bold text-[#1E2124]">
                  {" "}
                  Fand******.gmail.com
                </span>
              </p>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <OTP
              inputsClasses="custom-inputs"
              inputsStyles={{
                background: "#EEEEEE",
                color: "#000000",
                width: "21%",
                height: "6rem",
                border: "#555",
                outline: "none",
                fontFamily: "sans-serif",
                fontSize: "48px",
                fontWeight: "bold",
                borderRadius: "0.375rem",
              }}
              containerClasses="otp-container"
              containerStyles={{ background: "#FFFFFF" }}
              inputsNumber={4}
              setStringCode={setStringCode}
              setSubmitStatus={setSubmitStatus}
              separator={<span>-</span>}
            />
          </div>
          <div className="flex items-center justify-center w-full mt-3">
            <p className="text-[#616161]">
              Tidak menerima kode?{" "}
              <span className="text-[#3598FF] font-bold   cursor-pointer">
                Kirim ulang kode
              </span>
            </p>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export const ModalSK = () => {
  return (
    <>
      <div id="modal-snk">
        <input type="checkbox" id="sk" className="modal-toggle" />
        <div className="modal">
          <div
            className="modal-box  bg-gradient-to-b from-cyan-400 via-white to-white"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #50D9FF 40%, white 10%)",
            }}
          >
            <div className="flex flex-col">
              <div className="h-1/2 w-full px-5 pb-5 pt-10 bg-inherit">
                <label
                  htmlFor="sk"
                  className="btn btn-sm border-none bg-transparent absolute right-2 top-2 text-black hover:bg-transparent"
                >
                  ✕
                </label>
                <CardDisc
                  id="disc-1"
                  name="Diskon Individu Rp. 3000"
                  desc="Minimal Pembelian Paket 3 Bulan"
                />
              </div>
              <div className="flex flex-col w-full gap-y-3 h-1/2">
                <div className="justify-between items-start flex w-full mt-5">
                  <div className="text-black text-base font-bold">
                    Masa Berlaku
                  </div>
                  <div className="grow shrink basis-0 text-right text-black text-sm font-normal">
                    25 Agustus 2023 - <br />1 September 2023{" "}
                  </div>
                </div>
                <div className="w-full justify-between items-start flex gap-y-3">
                  <div className="text-black text-base font-bold">
                    Minimum Masa Aktif Paket
                  </div>
                  <div className="grow shrink basis-0 text-right text-black text-sm font-normal">
                    3 Bulan
                  </div>
                </div>
              </div>
              <hr className="w-full my-3" />
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-black text-base font-bold">
                  Syarat & Ketentuan
                </div>
                <div className="text-black text-sm font-normal">
                  1. Voucher tidak dapat diuangkan
                </div>
                <div className="text-black text-sm font-normal">
                  2. Voucher hanya dapat digunakan pada paket Individu
                </div>
                <div className="text-black text-sm font-normal">
                  3. Voucher hanya berlaku pada pembelian paket Normal
                </div>
                <div className="text-black text-sm font-normal">
                  4. Voucher dapat digunakan selama masa aktif berlaku
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
