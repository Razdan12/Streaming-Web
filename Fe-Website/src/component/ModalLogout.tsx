import "react-custom-otp/dist/index.css";

import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Store";
import { ModalWarning } from "./Modals";
import api from "../Api/api";

const ModalLogout = () => {
  const {
    token,
    idProfil,
    removeToken,
    removeEmail,
    removeIdPaket,
    removeIdUser,
    removeIdProfil,
  } = useStore();
  const navigate = useNavigate();

  const handleUpdateProfil = async () => {
    const data = {
      status: false,
    };
    await api.EditProfil(token, idProfil, data);
  };

  const handleLogout = () => {
    removeToken();
    removeEmail();
    removeIdPaket();
    removeIdUser();
    removeIdProfil();
    handleUpdateProfil();
    window.location.reload();
    navigate("/");
  };
  return (
    <div id="keluar-modal">
      <ModalWarning id="logout">
        <div className="flex flex-col">
          <div className="bg-transparent flex flex-col items-center justify-center h-1/2 gap-y-3">
            <h2 className="text-xl font-bold">Yakin Ingin Keluar?</h2>
            <p className="text-gray-700 mb-4 text-center">
              Anda perlu login lagi untuk masuk
            </p>
          </div>
          <div className="flex flex-row w-full gap-x-3">
            
            <div className="w-1/2">
            <form method="dialog">
           
              <button className="btn w-full">
                <p className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Kembali
                </p>
              </button>
            </form>
            </div>
            <div className="w-1/2">
              <label
                className="btn w-full capitalize   text-lg text-white bg-gradient-to-r from-cyan-300 to-indigo-500"
                htmlFor="logout"
                onClick={handleLogout}
              >
                Ya, Keluar
              </label>
            </div>
          </div>
        </div>
      </ModalWarning>
    </div>
  );
};

export default ModalLogout;
