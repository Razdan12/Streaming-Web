import React, { FC, useState, useEffect } from "react";
import api from "../Api/api";
import { useStore } from "../store/Store";

export type TabProps = {
  label: string;
  activeTab: string;
  onClick: (tab: string) => void;
};
export type ContentProps = {
  children: React.ReactNode;
};

export const Tab = ({ label, activeTab, onClick }: TabProps) => {
  const isActive = activeTab === label;

  return (
    <div className="w-full items-center">
      <button
        className={`px-4 py-2 text-center w-full${
          isActive
            ? " border-b-2 border-b-cyan-400 text-black"
            : "text-gray-400 "
        }`}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    </div>
  );
};

export const Content = ({ children }: ContentProps) => {
  return <div className="p-4 text-sm text-justify">{children}</div>;
};

interface tabProps {
  deskripsi: string;
  lirik: string;
}
const Tabs: FC<tabProps> = ({ deskripsi, lirik }) => {
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [musik, setMusik] = useState<any>([]);
  const { setNamaFile, setIdMusik, idMusik } = useStore();

  const fetchMusik = async () => {
    try {
      const response = await api.getAllMusik();
      setMusik(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMusik();
  }, []);

  const handleOnClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handeleChangeMusik = (namaFile: string, idMusik: string) => {
    setNamaFile(namaFile);
    setIdMusik(idMusik);
    window.location.reload();
  };
  const deskMusik = (desc: string) => {
    let desk = desc?.replace(/<[^>]*>/g, '');
    return desk

  }
  return (
    <div className=" overflow-y-auto">
      <div className="flex mb-4 text-center  shadow-md">
        <Tab label="Deskripsi" activeTab={activeTab} onClick={handleOnClick} />
        <Tab label="Lirik" activeTab={activeTab} onClick={handleOnClick} />
        <Tab
          label="Selanjutnya"
          activeTab={activeTab}
          onClick={handleOnClick}
        />
      </div>
      <div className="h-4/6 overflow-y-auto">
        {activeTab === "Deskripsi" && (
          <Content>
            <div className="w-full flex  max-h-[380px]">
   <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: deskripsi }}
              />
            </div>
          </Content>
        )}
        {activeTab === "Lirik" && (
          <Content>
              <div
                className="w-full text-xl px-10 max-h-[380px] flex flex-col text-center"
                dangerouslySetInnerHTML={{ __html: lirik }}
              />
           
          </Content>
        )}
        {activeTab === "Selanjutnya" && (
          <Content>
            <div className="flex flex-col gap-y-3 overflow-y-auto max-h-[400px]">
              {musik?.map((item: any, index: number) => (
                
                <div
                  onClick={() => handeleChangeMusik(item.namaFile, item.id)}
                  className={`${idMusik === item.id ? "hidden" : ""}`}
                >
                  <div
                    className="bg-inherit w-full h-auto flex flex-row justify-center items-center cursor-pointer  overflow-hidden"
                    key={index}
                  >
                    <figure className="w-1/3 h-full">
                      <img src={item.thumbnail} alt="image" />
                    </figure>
                    <div className="flex flex-col w-2/3 ml-3">
                      <p className="font-bold text-black text-md">
                        {item.judul}
                      </p>
                      <div className="text-justify text-xs line-clamp-1">
                        {deskMusik(item.deskripsi)}
                      </div>
                      <div className="text-gray-400 gap-2 flex flex-wrap flex-row text-xs mt-2">
                        {item.jenjang.map((item: any, index: number) => (
                          <p key={index}>{item.name}</p>
                        ))}
                        <p>|</p>

                        {item.kategori.map((item: any, index: number) => (
                          <p key={index}>{item.kategori}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Content>
        )}
      </div>
    </div>
  );
};

export default Tabs;
