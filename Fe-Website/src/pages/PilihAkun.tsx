import { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
import { CardAkun } from "../component/Card";
import { useStore } from "../store/Store";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { ModalWarning } from "../component/Modals";

const PilihAkun = () => {
  const [profil, setProfil] = useState<any>([]);
  const [triger, SetTriger] = useState<boolean>(false)
  const { SecretKey, removeSecretKey,setToken, setIdProfil , setIdUser, idProfil} = useStore();
  const navigate = useNavigate();

  const GetProfilUser = async () => {
    const profil = await api.GetProfilUser(SecretKey);
    const dataProfil = profil.data.data.profil;
    setProfil(dataProfil);
   
  };

  const UpdateProfil = async (ProfilId: string) => {
    const data = {
      status: true,
    };
    await api.EditProfil(SecretKey, ProfilId, data);
  };
  const HandleForceClose = async () => {
    console.log('ini jalan');
    
    const data = {
      status: false,
    };
    await api.EditProfil(SecretKey, idProfil, data);
    SetTriger(!triger)
    window.location.reload()

  };

  const setProfilId = (id: any, status: boolean, idUser: string) => {
    setIdProfil(id);
    if (!status) {
      UpdateProfil(id);
      setIdUser(idUser);
      setToken(SecretKey);
      removeSecretKey()
      navigate("/");
      
    } else {
      let modalElement = document.getElementById("akun") as HTMLDialogElement;
      if (modalElement) {
        modalElement.showModal();
      }
    }
  };

  useEffect(() => {
    GetProfilUser();
  }, [triger]);

  
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-cyan-300 to-indigo-500">
      <ModalWarning id="akun">
        <div className="w-full flex flex-col gap-4 items-center justify-center my-5">
          <div className="text-2xl font-bold text-black">
            <span>Akun Sedang Aktif</span>
          </div>
          <div className="text-md font-bold text-black">
            <span>Silahkan pilih akun lainnya untuk login</span>
          </div>
          <div className=" bg-cyan-500 text-white px-3 py-2 rounded-md cursor-pointer" onClick={HandleForceClose}>
            Akhiri Sesi ?
          </div>
          
        </div>
      </ModalWarning>
      <div className="w-full h-1/2 rounded-xl flex flex-col justify-start items-center px-4 pt-5">
        <div className="text-center text-5xl text-black">Pilih Akun</div>
        <div className="flex flex-row justify-center items-center gap-6 pt-10  w-full flex-wrap">
          {profil.map((item: any, index: number) => (
            <div onClick={() => setProfilId(item.id, item.status, item.idUser)}>
              <CardAkun
                nama={item.name}
                lastOn={item.status ? "Online" : "offline"}
                color={item.status ? "red-500" : "black"}
                key={index}
                image={item.picture}
                tanggal={item.updatedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PilihAkun;
