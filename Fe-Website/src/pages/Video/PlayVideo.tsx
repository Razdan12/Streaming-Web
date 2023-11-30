import { useState, useEffect, useCallback } from "react";
import Layout from "../../component/Layout";

import { CardPlay } from "../../component/Card";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
// import Hls from "hls.js";
// import HlsListener from "hls.js";

const PlayVideo = () => {
  const { token, idVideo, namaFile, setIdVideo, setNamaFile } = useStore();
  const [isPaket, setIsPaket] = useState(true);
  const [video, setVideo] = useState<any>([]);
  const [videoAll, setVideoAll] = useState<any>([]);
  const [videoPaket, setVideoPaket] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  // const [videoUrl, setVideoUrl] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);

//  const file = localStorage.getItem("")
  
  const fetchVideo = useCallback(async () => {
    const response = await api.getVideoById(token, idVideo);
    const data = response?.data;
    setVideo(data);

    if (data.paket === true) {
      try {
        const id = data.idPaketVid;
        const response = await api.GetVideoByProfil(token, id);
        const dataRest = response.data;
  
        setVideoPaket(dataRest);
      } catch (error) {
        console.log(error);
      }
    }
    setIsPaket(data.paket);
  }, [token, idVideo]);

  // const play = async () => {
  //   try {
  //     const response = await api.PlayVideo(namaFile);
  //     console.log(response.data);
      
  //     setVideoUrl(response.data);
  //     setIsLoading(false);
  
  //     if (response.data.startsWith("#EXTM3U")) {
  //       const m3u8Url = response.data;
    
  //       if(Hls.isSupported()) {
  //         const video = document.getElementById('video') as HTMLMediaElement;;
  //         const hls = new Hls();
  //         hls.loadSource(m3u8Url);
  //         hls.attachMedia(video);
  //         hls.on(Hls.Events.MANIFEST_PARSED, function() {
  //           video.play();
  //         });
  //         hls.on(Hls.Events.ERROR, (event, data) => { console.error(data); })
    
  //         setIsPlaying(true);
  //       }
  //     } else {
  //       setVideoUrl("");
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // }
  
  
  const getAllVideo = useCallback(async () => {
    try {
      const response = await api.getAllVideo();
      setVideoAll(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // play()
    const fetchAllData = async () => {
      await fetchVideo();
      await getAllVideo();
    };

    fetchAllData();
  }, [trigger]);

  const handleChange = (id: string, file: string) => {
    setIdVideo(id);
    setNamaFile(file);
    setTrigger(!trigger);

    window.location.reload();
  };

  const jenjangData = video?.jenjang?.map((item: any) => item.name);
  const KategoriData = video?.kategori?.map(
    (item: any) => item.Name
  );


  
  return (
    <Layout id="playvideoa">
      <div className="sm:p-5  mb-20  flex flex-col justify-center items-center">
        <div className="grid sm:grid-cols-12 sm:w-5/6 sm:p-2  h-1/2">
          <div
            className={`flex flex-col ${
              isPaket ? "col-span-8" : "col-span-12"
            } w-full`}
          >
            <div className="w-full h-5/6">
              <video
                controls
                id="video"
                controlsList="nodownload"
                className="w-full rounded-lg h-full  object-cover"
                poster={video.thumbnail}
              >
                <source
                  src={`${import.meta.env.VITE_REACT_API_URL}/streaming/video/${namaFile}`}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="w-full  sm:ml-3 ml-2 p-1 sm:p-0 mt-3">
              <div className="font-bold text-[#1E2124]   text-lg">
                {video.name}
              </div>
              <div
                className="w-full text-xl pt-10"
                dangerouslySetInnerHTML={{ __html: video.deskripsi }}
              />
              <div className="flex flex-row flex-wrap text-gray-400 sm:text-md text-sm my-2 gap-x-2">
                {isPaket ? (
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
                <div>Cipt. Om Sinung</div>
              </div>
            </div>
          </div>
          <div
            className={`sm:col-span-4   sm:w-full w-screen flex flex-col sm:justify-startustify-center sm:items-start ${
              isPaket ? "" : "hidden"
            }`}
          >
            {isPaket ? (
              <div className="flex flex-col  bg-[#EEEEEE] max-h-screen  mx-3 mb-3  p-2 rounded-xl gap-y-5">
                <div className="font-bold">Paket Video</div>
                {videoPaket.map((item: any, index: number) => (
                  <div onClick={() => handleChange(item.id, item.namaFIle)}>
                    <CardPlay
                      judul={item.name}
                      thumbnail={item.thumbnail}
                      deskripsi={item.deskripsi}
                      kategori={"terbaru"}
                      jenjang={"SD"}
                      key={index}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

           
          </div>
        </div>

        <div className="w-5/6">
          <div className="flex flex-col py-0 mt-10 ">
            <div className="text-2xl font-bold  ">Rekomendasi Video Lain</div>
            <div className="flex flex-row my-10 flex-wrap gap-5">
              {videoAll?.data?.map((item: any, number: number) => (
                <div className="w-72 cursor-pointer" key={number} onClick={() => handleChange(item.id , item.namaFile)}>
                  <img src={item.thumbnail} alt="" className="rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};
export default PlayVideo;
