import Layout from "../component/Layout";
import { CardCategory } from "../component/Card";
import { useState, useEffect, useCallback } from "react";
// import { MoreButton } from "../component/Button";
import api from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/Store";
import {
  BsFillPlayCircleFill,
} from "react-icons/bs";

const Detail = () => {
  const [paketan, setPaketan] = useState(false);
  const [videoDetail, setVideoDetail] = useState<any>([]);
  const [videoAll, setVideoAll] = useState<any>([]);
  const [videoPaket, setVideoPaket] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const navigate = useNavigate();
  const { token, idVideo, setIdVideo, setNamaFile } = useStore();

  const fetchVideoDetail = async () => {
    try {
      const responseVideo = await api.getVideoById(token, idVideo);
      // console.log(responseVideo.data);

      setVideoDetail(responseVideo.data);
      setPaketan(responseVideo.data.paket);
      const paket = responseVideo.data.paket
      
      if (paket) {
        try {
          const id = responseVideo.data.idPaketVid;
          const response = await api.GetVideoByProfil(token, id);
          const dataRest = response.data;
          
          setVideoPaket(dataRest);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllVideo = useCallback(async () => {
    try {
      const response = await api.getAllVideo();
      setVideoAll(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchVideoDetail();
    getAllVideo();
  }, [trigger]);

  const jenjangData = videoDetail?.jenjang?.map((item: any) => item.name);
  const KategoriData = videoDetail?.kategori?.map((item: any) => item.Name);

  const handleChange = (id: string, file: string) => {
    console.log(file);
    
    setIdVideo(id);
    setNamaFile(file);
    setTrigger(!trigger);
    window.location.reload();
  };

  
  
  return (
    <Layout id="detail">
      <div className="flex flex-col">
        <div className="flex justify-start mx-10">
          <div className="text-md breadcrumbs ">
            <ul>
              <li>
                <Link to={"/"}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <a className="text-cyan-500">Detail</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-16 mt-5 gap-y-14">
          <div className="flex sm:flex-row flex-col bg-white">
            <div className="sm:w-1/2 w-full flex justify-center sm:justify-end">
              <div className="w-full max-h-72 p-2">

              <img
                src={videoDetail?.thumbnail}
                alt={videoDetail?.name}
                className="rounded-md object-cover"
              />
              </div>
            </div>
            <div className="w-full flex-col pr-16 m-8 sm:m-3">
              <p className="text-3xl font-bold capitalize">
                {videoDetail?.name}
              </p>
             
              <div className="flex flex-row flex-wrap text-gray-400 text-xs my-2 gap-x-3  w-full">
                {paketan ? (
                  <div>
                    {videoPaket.length} Video
                    <span className="px-2">|</span>
                  </div>
                ) : (
                  ""
                )}
                {jenjangData?.map((item: any, index: number) => (
                  <div className="capitalize" key={index}>
                    {item}
                  </div>
                ))}
                <div>|</div>
                {KategoriData?.map((item: any, index: number) => (
                  <div className="capitalize" key={index}>
                    {item}
                  </div>
                ))}
                <div>|</div>
                <div className="capitalize">Cipt. Om Sinung</div>
              </div>
              <div className="flex flex-row">
                <button
                  className="sm:btn btn-sm w-fit h-fit bg-gradient-to-r from-cyan-300 to-blue-400 rounded-md"
                  onClick={() => navigate("/video/play")}
                >
                  <span className="font-bold text-white capitalize  flex justify-center items-center gap-2">
                    <BsFillPlayCircleFill /> Tonton
                  </span>
                </button>
                
              </div>
              <div
                className="w-full text-xl pt-5"
                dangerouslySetInnerHTML={{ __html: videoDetail.deskripsi }}
              />
              
            </div>
          </div>
          {/* paket video */}
          {paketan ? (
            <div className="flex flex-col bg-[#F5F5F5] w-full justify-center items-center mb-5 pb-5">
              <div className="w-5/6">
                <div className="text-2xl font-bold w-full justify-start py-5">
                  Paket Video
                </div>
                <div className="flex w-full flex-row flex-wrap sm:p-2">
                  
                  {videoPaket?.map((item: any, index: number) => (
                    <div className="w-full sm:w-1/2 flex flex-col flex-wrap"  onClick={() => handleChange(item.id, item.namaFIle)}>
                      <CardCategory
                        key={index}
                        image={item.thumbnail}
                        judul={item.name}
                        jenjang={item.jenjang}
                        deskripsi={item.deskripsi}
                        kategori={item.kategori}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* end of paket video */}
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col py-0 w-5/6 ">
              <div className="text-xl sm:text-2xl font-bold">
                Rekomendasi Video Lain
              </div>
              <div className="flex flex-row my-10 flex-wrap gap-5 justify-center">
                {videoAll?.data?.map((item: any, number: number) => (
                  <div
                    className="w-32 sm:w-72 cursor-pointer"
                    key={number}
                    onClick={() => handleChange(item.id, item.namaFile)}
                  >
                    <img src={item.thumbnail} alt="" className="rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Detail;
