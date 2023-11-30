import { useState, useEffect } from "react";
import library from "../assets/piclibrary.png";
import coupon1 from "../assets/coupon1.png";
import coupon2 from "../assets/coupon2.png";

// import { BiSolidPencil } from "react-icons/bi";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Store";
import { LocalStore } from "../store/LocalStore";
import api from "../Api/api";
import { BiSolidPencil } from "react-icons/bi";
import { Input } from "./Input";
import { BsCheck2Circle, BsFillCameraFill } from "react-icons/bs";

interface AkunCard {
  nama: string;
  lastOn: string;
  color: string;
  image: string;
  tanggal: any;
}
interface CardSide {
  id?: any;
  name?: any;
  thumbnail?: any;
  deskripsi?: any;
  durasi?: any;
  jenjang?: any;
  kategori?: any;
}

interface cardVideoPaket {
  thumbnail: string;
  judul: string;
  deskripsi: string;
  jenjang: string;
  kategori: string;
}
export const CardSideImage: FC<CardSide> = ({
  id,
  name,
  thumbnail,
  deskripsi,
  durasi,
  jenjang,
  kategori,
}) => {
  const navigate = useNavigate();
  const { setIdVideo } = useStore();

  const handleDetail = () => {
    setIdVideo(id);
    navigate("/detail");
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div
        className="flex-row bg-inherit gap-x-3 w-full flex justify-center items-center cursor-pointer"
        key={id}
        onClick={handleDetail}
      >
        <img src={thumbnail} alt="image" className="w-64 h-36" />
        <div className="w-1/3 flex flex-col gap-y-2 items-start">
          <div className="font-bold text-black capitalize text-2xl">{name}</div>
          <div className="text-justify capitalize line-clamp-3 text-base">
            {deskripsi}
          </div>
          <div className="gap-5 flex flex-row">
            <div className="text-gray-400 ">{durasi}</div>
            <div className="text-gray-400 ">{jenjang}</div>
            <div className="text-gray-400 ">{kategori}</div>
          </div>
        </div>
      </div>
    </>
  );
};

interface CardCategori {
  image: string;
  judul: string;
  deskripsi: string;
  jenjang: any;
  kategori: any;
}
export const CardCategory: FC<CardCategori> = ({
  image,
  jenjang,
  judul,
  deskripsi,
  kategori,
}) => {
  let desk = deskripsi.replace(/<[^>]*>/g, "");
  return (
    <div className="rounded-xl cursor-pointer w-full my-1 ">
      <div className=" sm:w-5/6 rounded-lg ">
        <div className="w-full grid grid-cols-6">
          <div className=" flex justify-center items-center col-span-3 ">
            <img src={image} alt="image" className="rounded-xl " />
          </div>
          <div className="p-3 w-full  col-span-3 ">
            <p className="card-title font-bold text-black">{judul}</p>
            <div className="text-justify line-clamp-1 sm:line-clamp-2">
              {desk}
            </div>
            <div className="text-gray-400 gap-2 flex flex-row flex-wrap w-full mt-3">
              {jenjang?.map((item: any, index: number) => (
                <p key={index} className="text-xs">
                  {item.name}
                </p>
              ))}
              {kategori?.map((item: any, index: number) => (
                <p key={index} className="text-xs">
                  {item.Name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardLibrary = () => {
  return (
    <div className="card card-side bg-base-100 w-full flex justify-center items-center cursor-pointer">
      <figure className="w-64 h-36">
        <img src={library} alt="image" />
      </figure>
      <div className="card-body w-1/2">
        <p className="card-title font-bold text-black">
          Ice Breaking Tepuk Tangan
        </p>
        <div className="text-justify">
          Ice Breaking ini digunakan saat anak anak kurang fokus dengan materi
          yang disampaikan, cara penggunaannya cukup mudah dengan memberi aba
          aba di depan anak anak
        </div>
        <div className="text-gray-400 gap-5 flex flex-row">
          <p>10.10</p> <p>PAUD</p>
          <p>Ice Breaking</p>
        </div>
      </div>
    </div>
  );
};

interface cardAkun {
  profil: string;
  nama: string;
  aktif?: string;
  id: string;
}

export const CardManageAccount: FC<cardAkun> = ({
  profil,
  nama,
  aktif,
  id,
}) => {
  const { token } = useStore();
  const { setIdProfil } = LocalStore();
  const [edit, setEdit] = useState<boolean>(false);
  const [namaEdit, setNama] = useState<string>("");

  const UpdateProfil = async () => {
    const data = {
      name: namaEdit,
    };
    if (namaEdit) {
      await api.EditProfil(token, id, data);
      setEdit(false);
      window.location.reload();
    } else {
      setEdit(false);
    }
  };
  return (
    <div className="flex flex-row gap-[7.5rem] items-center w-full  sm:w-1/3 ">
      <div className="w-full flex flex-row gap-x-3 justify-between items-center px-5">
        <div className="relative cursor-pointer">
          <img src={profil} alt="" className="w-16 sm:w-24 rounded-full" />
          <label htmlFor="avatar" onClick={() => setIdProfil(id)}>
            <div className="rounded-full absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <BsFillCameraFill className="text-white h-5 w-5" />
            </div>
          </label>
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex gap-5">
            <div className={`${edit ? "flex" : "hidden"} items-center w-5/6`}>
              <Input
                id="nama-profil"
                type="text"
                label={nama}
                className="input input-bordered w-12"
                value={namaEdit}
                onChange={(e) => setNama(e.target.value)}
              />
              <span
                className="ml-3 text-2xl text-green-500 cursor-pointer"
                onClick={UpdateProfil}
              >
                <BsCheck2Circle />
              </span>
            </div>
            <div className={`${edit ? "hidden" : ""}`}>
              <p className="text-neutral-800 text-base font-bold cursor-pointer ">
                {nama}
              </p>
            </div>
            <div
              onClick={() => setEdit(true)}
              className={`${edit ? "hidden" : ""} `}
            >
              <div className="cursor-pointer tooltip" data-tip="Edit">
                <BiSolidPencil size="1.5rem" />
              </div>
            </div>
          </div>

          <div
            className={` ${
              aktif ? "text-blue-500" : "text-gray-500"
            } flex justify-start`}
          >
            <label className="">{aktif ? "Sedang Aktif" : "Tidak Aktif"}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardActivity = () => {
  const { idUser, token, setIdTransaksi } = useStore();
  const [dataTransaksi, setTransaksi] = useState<any>([]);

  const Transaksi = async () => {
    const response = await api.GetTransaksiUser(token, idUser);
    setTransaksi(response.data);
 
  };

  useEffect(() => {
    Transaksi();
  }, []);

  const Tanggal = (tanggal: any) => {
    const date = new Date(tanggal);

    const options: any = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = date.toLocaleString("id-ID", options);
    return formattedDate;
  };

  return (
    <div className="flex flex-col gap-3 cursor-pointer">
      {dataTransaksi?.map((item: any, index: number) => (
        <label htmlFor="detail-trans" onClick={() => setIdTransaksi(item.id)}>
          <div key={index} className="cursor-pointer">
            <div className="flex flex-row gap-5 items-center ">
              <div className="text-[#616161]  text-xs sm:text-xl">
                {Tanggal(item?.tanggal)}
              </div>
              <div className="text-gray-300">|</div>
              <div className="font-bold text-[#3598FF]   text-right text-xs sm:text-xl">
                {item?.invoice}
              </div>
            </div>
            <div className="grid grid-cols-4 w-full bg-gray-100 px-2">
              <div className="w-full flex col-span-2 flex-col gap-y-2   justify-center">
                <div className="text-gray-900  w-full tracking-wide text-xs sm:text-xl">
                  Pembelian Paket {item?.paket} Masa Aktif {item?.masaAktif}{" "}
                  hari
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <div className=" flex flex-row">
                  <div className="text-gray-900  text-xs sm:text-xl ">
                    Total Transaksi
                  </div>
                </div>
                <div className="text-gray-900 tracking-wide text-xs sm:text-xl font-bold">
                  Rp {item?.totalTransaksi}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="text-xs sm:text-xl flex justify-center items-center py-2 px-4 bg-green-200 rounded-full font-bold text-green-800">
                  {item?.status}
                </div>
              </div>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export const CardPlay: FC<cardVideoPaket> = ({
  thumbnail,
  judul,
  deskripsi,
  jenjang,
  kategori,
}) => {
  return (
    <div className="bg-inherit w-full h-auto flex flex-row justify-center items-center cursor-pointer  overflow-hidden">
      <figure className="w-1/3 h-full">
        <img src={thumbnail} alt="image" />
      </figure>
      <div className="flex flex-col w-2/3 ml-3">
        <p className="font-bold text-black text-sm">{judul}</p>
        <div className="text-justify text-xs line-clamp-2">{deskripsi}</div>
        <div className="text-gray-400 gap-5 flex flex-row text-xs">
          {/* <p>10.10</p> */}
          <p>{jenjang}</p>
          <p>{kategori}</p>
        </div>
      </div>
    </div>
  );
};

export const CardAkun: FC<AkunCard> = ({ nama, lastOn, color, image }) => {
  // const date = new Date("2023-10-25T08:27:00.676Z");

  // const options: any = {
  //   year: "2-digit",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  // };

  // const formattedDate = date.toLocaleString("id-ID", options);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="w-16 sm:w-32  rounded-full">
          <img
            src={image}
            alt=""
            className="hover:shadow-[0px_35px_60px_10px_rgba(0,0,0,0.3)] hover:shadow-green-500  cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap">
        <p className="text-center text-lg font-bold text-black">{nama}</p>
        <p className={`text-center text-md font-bold text-${color}`}>
          {lastOn}
        </p>
        <p className={`text-center text-sm font-bold text-gray-800`}>
          {/* Last on <span>{`${formattedDate}`}</span> */}
        </p>
      </div>
    </div>
  );
};

interface DiscountCard {
  id: string;
  name: string;
  desc: string;
}
export const CardDisc: FC<DiscountCard> = ({ id, name, desc }) => {
  return (
    <>
      <div
        className="w-full flex flex-row h-16 justify-center items-center bg-inherit px-1"
        id={id}
      >
        <div
          className="flex flex-col w-full px-3 bg-no-repeat bg-cover h-full justify-center items-start rounded-md"
          style={{ backgroundImage: `url(${coupon1})` }}
        >
          <div className="text-neutral-800 text-base font-bold tracking-wide pl-3">
            {name}
          </div>
          <div className="text-zinc-600 text-base font-normal capitalize px-3">
            {desc}{" "}
            <label htmlFor="sk" className="text-blue-500 cursor-pointer">
              S&K
            </label>
          </div>
        </div>
        <div
          className="w-1/3 h-full text-center bg-no-repeat flex justify-center items-center"
          style={{ backgroundImage: `url(${coupon2})` }}
        >
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 cursor-pointer pr-2">
            Pilih
          </p>
        </div>
      </div>
    </>
  );
};

interface HomeCard {
  idContent?: any;
  thumbnail?: any;
  judul?: any;
}

export const CardHome: FC<HomeCard> = ({ idContent, thumbnail, judul }) => {
  const navigate = useNavigate();
  const { setIdVideo } = useStore();

  const handleDetail = () => {
    setIdVideo(idContent);
    navigate("/detail");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <img
        src={thumbnail}
        alt={judul}
        onClick={handleDetail}
        className="rounded-2xl cursor-pointer w-40 h-24"
      />
    </>
  );
};
