import React, { FC, useState } from "react";
import { filterButton, paketButton } from "../utils/types/types";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface pilihan {
  children: React.ReactNode;
  id?: string;
}

export const FilterButton: FC<filterButton> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { id, icon, text1, text2 } = props;
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-96 h-24 rounded-3xl shadow-gradient-to-r from-cyan-300 to-blue-400 ${
        isClicked ? "bg-gradient-to-r from-cyan-300 to-blue-400" : "bg-white"
      }`}
      id={id}
    >
      <div className="justify-center items-center gap-4 flex">
        <img src={icon} alt="Icon" id="button-icon" />
        <div className="flex-col justify-center items-start inline-flex">
          <div className="text-center text-neutral-800 text-2xl font-bold leading-loose">
            {text1}
          </div>
          <div className="text-center text-neutral-800 text-base font-normal leading-loose">
            {text2}
          </div>
        </div>
      </div>
    </button>
  );
};
export const PacketButton: FC<paketButton> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { id, packetName, benefit1, benefit2, benefit3 } = props;

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-1/2 h-auto rounded-3xl shadow-gradient-to-r from-cyan-300 to-blue-400 ${
        isClicked ? "bg-gradient-to-r from-cyan-300 to-blue-400" : "bg-white"
      }`}
      id={id}
    >
      <div className="justify-center items-center gap-4 flex px-5 cursor-pointer">
        <div className="flex-col justify-center items-start inline-flex">
          <div
            className={`text-start text-2xl font-bold leading-loose ${
              isClicked ? "text-white" : "text-[#284B80]"
            }`}
          >
            {packetName}
          </div>
          <div className="flex flex-row">
            <div>
              <BsFillCheckCircleFill />
            </div>
            <p className="text-gray-500 text-base">{benefit1}</p>
          </div>
          <div className="flex flex-row">
            <div>
              <BsFillCheckCircleFill />
            </div>
            <p className="text-gray-500 text-base">{benefit2}</p>
          </div>
          <div className="flex flex-row">
            <div>
              <BsFillCheckCircleFill />
            </div>
            <p className="text-gray-500 text-base">{benefit3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MoreButton = () => {
  return (
    <button className="w-52 justify-center items-center p-2 flex border-none">
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
        Lihat Lebih Banyak
      </span>
    </button>
  );
};

export const PlayAll = () => {
  return (
    <button className="btn w-36 h-11 bg-gradient-to-r from-cyan-300 to-blue-400">
      <span className="font-bold text-white capitalize">Putar Semua</span>
    </button>
  );
};

export const PerbaruiButton: FC<pilihan> = ({ children, id }) => {
  const [terpilih, setTerpilih] = useState(false);
  const handlePilih = () => {
    setTerpilih(!terpilih);
  };
  return (
    <div className={id}>
      <div
        onClick={handlePilih}
        className={`w-full${
          terpilih ? "bg-gradient-to-r from-cyan-300 to-blue-400" : "bg-white"
        }`}
      >
        <div className="bg-white p-5">{children}</div>
      </div>
    </div>
  );
};
