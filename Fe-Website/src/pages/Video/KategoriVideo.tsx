import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
// import { PlayAll } from "../../component/Button";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
import { CardCategory } from "../../component/Card";
import { Link, useNavigate } from "react-router-dom";

const KategoriVideo = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState<any[]>([]);
  const { idKategori , NamaKategori , setIdVideo, setNamaFile} = useStore();

  const fetchVideoByKategori = async () => {
    const response = await api.getVideoByKategori(idKategori);
    setVideo(response.data.data);
  };

  useEffect(() => {
    fetchVideoByKategori();
  }, []);

  const handlePlayVideo = (id: string, namaFile: string) => {
    setIdVideo(id);
    setNamaFile(namaFile);
    navigate("/detail");
  };


  return (
    <Layout id="kategorivideo">
      <div className="w-full  flex justify-center py-5">
        <div className="w-full sm:w-5/6 p-2">
          <div className="text-md breadcrumbs ">
            <ul>
              <li>
                <Link to={"/"}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to={"/video"}>
                  <a>Video</a>
                </Link>
              </li>
              <li>
                <a className="text-cyan-500">{NamaKategori}</a>
              </li>
            </ul>
          </div>
          <div className="text-2xl font-[700] text-black py-10 flex flex-row gap-5 justify-start items-center">
            <div>{NamaKategori}</div>
            
          </div>
          <div className="flex flex-row flex-wrap w-full ">
            {video.map((item: any, index: number) => (
              <div className="w-full sm:w-1/2" onClick={() => handlePlayVideo(item.id, item.namaFile)}>
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
    </Layout>
  );
};
export default KategoriVideo;
