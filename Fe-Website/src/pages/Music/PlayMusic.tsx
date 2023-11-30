import { LayoutPlay } from "../../component/Layout";
import { useState, useEffect } from "react";
import Tabs from "../../component/Tabs";
import { useStore } from "../../store/Store";
import Player from "./Player";
import api from "../../Api/api";

const PlayMusic = () => {
  const [musik, setMusik] = useState<any>();
  const { token, idMusik, namaFile } = useStore();

  const fetchMusik = async () => {
    try {
      const response = await api.GetMusikbyId(token, idMusik);
      setMusik(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMusik();
  }, []);

 
  return (
    <LayoutPlay id="playmusic">
      <div className="w-full min-h-screen flex flex-col pb-5 ">
        <div className="w-full flex flex-col sm:flex-row h-fit mt-3">
          <div className="w-full h-4/6 sm:w-4/6 flex flex-col justify-center items-start">
            <div className="relative  w-full">
              <img
                src={musik?.thumbnail}
                alt="Album Cover"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="bg-gradient-to-t from-black opacity-60 w-full h-1/2 absolute"></div>
                <div className="absolute inset-0 flex items-end justify-center mb-3 px-3">
                  <Player url={namaFile} />
                </div>
              </div>
            </div>
            <div className="w-full flex sm:flex-row flex-col justify-between px-10 mt-5 mb-8">
              <div className="flex flex-col ">
                <div className="font-bold text-lg text-[#1E2124]">
                  {musik?.name}
                </div>
                <div className="text-sm text-[#757575] line-clamp-1 w-1/2">
                  {musik?.deskripsi?.replace(/<[^>]*>/g, '')}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/6 mx-0 sm:mx-5 ">
            <Tabs deskripsi={musik?.deskripsi} lirik={musik?.lirik} />
          </div>
        </div>
      </div>
    </LayoutPlay>
  );
};
export default PlayMusic;
