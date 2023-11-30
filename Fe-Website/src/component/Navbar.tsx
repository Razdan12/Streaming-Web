import { BsPlusLg } from "react-icons/bs";
import Logo from "../assets/logo.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore } from "../store/Store";
import { PiArchiveBoxFill } from "react-icons/pi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import ModalLogin from "./ModalLogin";
import api from "../Api/api";
import { ModalWarning } from "./Modals";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilData, setProfilData] = useState<any>("");
  const [profil, setProfil] = useState<any>([]);
  const [profilId, setProfilId] = useState<string>("");
  const [cekStatus, SetStatus] = useState<boolean>(false);
  const [Name, setName] = useState<string>("");
  const { token, idProfil, setIdProfil } = useStore();
  const navigate = useNavigate();

  const handleDaftar = () => {
    navigate("register");
  };

  const GetProfilData = async () => {
    const Response = await api.GetProfilById(token, idProfil);
    setProfilData(Response.data);
  };

  const GetProfilUser = async () => {
    const profil = await api.GetProfilUser(token);
    const dataProfil = profil.data.data.profil;
    setProfil(dataProfil);
  };

  useEffect(() => {
    if (idProfil) {
      GetProfilData();
      GetProfilUser();
    }
  }, [idProfil]);

  const cekLogin = async () => {
    const responseLogin = await api.GetInfoUser(token)
    if (responseLogin) {
      setIsLoggedIn(!isLoggedIn);
    }
  }

  useEffect(() => {
    cekLogin()
    if (idProfil) {
      GetProfilData();
    }
    
  }, [token]);

  const handleChangeProfil = (id: string, nama: string, status: boolean) => {
   
    setProfilId(id);
    setName(nama);
    SetStatus(status);
    let modalElement = document.getElementById("profil") as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const handleUpdateProfil = async () => {
    const data = {
      status: false,
    };
    await api.EditProfil(token, idProfil, data);
  };

  const handleUpdateProfilTrue = async () => {
    const data = {
      status: true,
    };
    await api.EditProfil(token, profilId, data);
    setIdProfil(profilId);
    window.location.reload();
  };

  const checkProfil = async () => {
    if (cekStatus) {
      let modalElement = document.getElementById(
        "warning"
      ) as HTMLDialogElement;
      if (modalElement) {
        modalElement.showModal();
      }
    } else {
      await handleUpdateProfil();
      handleUpdateProfilTrue();
    }
};
const handleLogout = () => {
  let modalElement = document.getElementById(
    "logout"
  ) as HTMLDialogElement;
  if (modalElement) {
    modalElement.showModal();
  }
}


  return (
    <>
      <ModalWarning id="profil">
        <div className="w-full flex flex-col gap-4 items-center justify-center my-5">
          <div className="bg-transparent flex flex-col items-center justify-center h-1/2 gap-y-3">
            <h2 className="text-xl font-bold">Pindah Akun?</h2>
            <p className="text-gray-700 mb-4 text-center">
              Anda akan pindah ke akun <span className="font-bold">{Name}</span>
            </p>
          </div>
          <div className="flex flex-row w-full gap-x-3">
            <div className="w-1/2">
              <form method="dialog">
                <button className="btn w-full">Kembali</button>
              </form>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="change-account"
                onClick={checkProfil}
              >
                Ya, Pindah
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
      <ModalWarning id="warning">
        <div className="w-full flex flex-col gap-4 items-center justify-center my-5">
          <div className="bg-transparent flex flex-col items-center justify-center h-1/2 gap-y-3">
            <h2 className="text-xl font-bold">Akun Sedang Aktif</h2>
            <p className="text-gray-700 mb-4 text-center">
              Silahkan pilih akun lainnya untuk pindah profil
            </p>
          </div>
        </div>
      </ModalWarning>

      <div className="w-full bg-white shadow-lg z-10 px-0 sm:px-10">
        <div className="flex">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content navbar">
              {/* Page content here */}
              <div className="navbar-start">
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden md:hidden"
                  htmlFor="my-drawer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 stroke-[#9E9E9E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <img
                  src={Logo}
                  alt="logo om sinung"
                  className="w-32 lg:w-52 cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="navbar-center hidden lg:flex md:flex">
                <ul className="menu menu-horizontal px-1 gap-x-8 font-base text-gray-400">
                  <li>
                    <Link
                      to={"/"}
                      className="hover:bg-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/video"}
                      className="hover:bg-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                    >
                      Video
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/musik"}
                      className="hover:bg-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                    >
                      Musik
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-end lg:flex md:flex">
                {isLoggedIn ? (
                  <>
                    <details className="dropdown dropdown-end">
                      <summary className="btn btn-ghost hover:bg-white rounded-full ">
                        <div className="w-10 rounded-full bg-blue-700">
                          <img
                            src={profilData.picture}
                            alt="Avatar"
                          />
                        </div>
                      </summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60">
                        <div className="w-full join-horizontal">
                          <div className="collapse collapse-arrow join-item ">
                            <input type="checkbox" />
                            <div className="collapse-title text-md font-normal flex items-center gap-2">
                              <div className="w-8 rounded-full bg-blue-700">
                                <img
                                  src={profilData.picture}
                                  alt={profilData.name}
                                />
                              </div>
                              <div>{profilData.name}</div>
                            </div>
                            <div className="collapse-content flex flex-col gap-y-3">
                              {profil?.map((item: any, index: number) => (
                                <label
                                  htmlFor="change-account"
                                  onClick={() =>
                                    handleChangeProfil(
                                      item.id,
                                      item.name,
                                      item.status
                                    )
                                  }
                                >
                                  <div
                                    className=" flex flex-row justify-between items-center cursor-pointer ml-2"
                                    key={index}
                                  >
                                    <div className=" text-md font-normal flex items-center gap-2">
                                      <div className={`w-6 rounded-full ${item.status ? "ring ring-success" : ""}`} >
                                        <img
                                          src={item.picture}
                                          alt={item.name}
                                        />
                                      </div>
                                      <div>{item.name}</div>
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <li className=" flex-row hover:bg-inherit mt-1 gap-x-0 hidden">
                          <div className="hover:bg-[#E0E0E0] hover:fill-gray-400 flex items-center fill-gray-400 rounded-full bg-[#E0E0E0] p-1 ml-2">
                            <PiArchiveBoxFill size="1.5rem" color="#616161" />
                          </div>
                          <div className="hover:bg-inherit flex items-center text-[#656565]">
                            <Link to={"/perpustakaan"}>Perpustakaan</Link>
                          </div>
                        </li>
                        <li className="flex flex-row hover:bg-inherit mt-1 gap-x-0">
                          <div className="hover:bg-[#E0E0E0] hover:fill-gray-400 flex items-center fill-gray-400 rounded-full bg-[#E0E0E0] p-1 ml-2">
                            <CgProfile size="1.5rem" color="#656565" />
                          </div>
                          <div className="hover:bg-inherit flex items-center text-[#656565]">
                            <Link to={"/informasiakun"}>Informasi Akun</Link>
                          </div>
                        </li>
                        <li className="flex flex-row hover:bg-inherit mt-1 gap-x-0">
                          <div className="hover:bg-[#E0E0E0] hover:fill-gray-400 flex items-center fill-gray-400 rounded-full bg-[#E0E0E0] p-1 ml-2">
                            <BiSolidHelpCircle size="1.5rem" color="#656565" />
                          </div>
                          <div className="hover:bg-inherit flex items-center text-[#656565]">
                            <Link to={"/pusatbantuan"}>Pusat Bantuan</Link>
                          </div>
                        </li>
                        <li className="flex flex-row hover:bg-inherit mt-1 gap-x-0">
                          <div className="hover:bg-[#E0E0E0] hover:fill-gray-400 flex items-center fill-gray-400 rounded-full bg-[#E0E0E0] p-1 ml-2">
                            <RiLogoutBoxRLine size="1.5rem" color="#E30000" />
                          </div>
                        
                          <label
                            className="hover:bg-inherit flex items-center text-red-500 hover:text-red-600"
                            onClick={handleLogout}
                          >
                            Keluar
                          </label>
                        </li>
                      </ul>
                    </details>
                  </>
                ) : (
                  <>
                    <ModalLogin />
                    <div className="flex gap-3">
                      <div className="w-full flex flex-row items-center gap-x-3">
                        <div
                          className="bg-white w-20 h-10 rounded-lg flex justify-center items-center"
                          onClick={handleDaftar}
                        >
                          <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-sm font-bold font-['PT Sans'] leading-9 tracking-wider capitalize cursor-pointer">
                            Daftar
                          </p>
                        </div>
                        <div className="text-white w-20 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex justify-center items-center">
                          <label
                            className="text-center text-white text-sm font-bold font-['PT Sans'] leading-9 tracking-wider capitalize cursor-pointer"
                            htmlFor="modal-login"
                          >
                            Masuk
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="drawer-side z-10">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-white gap-4 text-black">
                <div className="w-full navbar flex items-center gap-3 shadow-md">
                  <div className="text-2xl font-bold text-[#9E9E9E] rotate-45">
                    <label htmlFor="my-drawer">
                      <BsPlusLg />
                    </label>
                  </div>
                  <img src={Logo} alt="logo om sinung" className="w-40" />
                </div>
                <li>
                  <Link
                    to={"/"}
                    className="hover:bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/video"}
                    className="hover:bg-transparent text-[#9E9E9E] hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/musik"}
                    className="hover:bg-transparent text-[#9E9E9E] hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 hover:font-bold"
                  >
                    Musik
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const NavbarSecond = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 border-b-2 lg:px-32 px-5">
      <div className="flex-1">
        <Link to={"/"}>
          <img src={Logo} alt="" className="h-10 lg:ml-5 ml-0" />
        </Link>
      </div>
      <div className="flex-none cursor-pointer" onClick={() => navigate(-1)}>
        <span className="text-2xl text-gray-400">
          <MdKeyboardArrowLeft />
        </span>
        <span className=" text-xl font-medium whitespace-nowrap text-gray-400 dark:text-white">
          Back
        </span>
      </div>
    </div>
  );
};

export default Navbar;
