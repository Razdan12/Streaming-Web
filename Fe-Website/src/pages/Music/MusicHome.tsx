import Layout from "../../component/Layout";
import { Input } from "../../component/Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notFound.png";
import { useStore } from "../../store/Store";
import api from "../../Api/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderBannerMusik } from "../../component/Carousel";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineCaretRight } from "react-icons/ai";
import Loading from "../../component/Loading";

const MusicHome = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [triger, setTriger] = useState<boolean>(false);
  const [musikByKategori, setmusikByKategori] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [muiskAll, setMusik] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setIdMusik, setNamaFile, setKategori, setNamaKategori } = useStore();

  const fetchSearchData = async (param: string) => {
    try {
      setLoading(true);
      const responseSearch = await api.searchMusik(param);
      setMusik(responseSearch.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      console.log("ini jalan enter");
      setSearch(event.target.value);
      fetchSearchData(event.target.value);
      setTriger(!triger);
    }
  };

  const handleButtonClick = (buttonName: string) => {
    if (selectedButton === buttonName) {
      setSelectedButton("");
      setTriger(!triger);
    } else {
      setSelectedButton(buttonName);
      setTriger(!triger);
    }
  };

  useEffect(() => {
    search ? fetchSearchData(search) : fetchMusikByKategori();
    musikByKategori ? setLoading(false) : setLoading(true)
  }, [triger]);

  const fetchMusikByKategori = async () => {
    try {
      setLoading(true);
      const responseMusik = await api.getMusikKategori(selectedButton);
      setmusikByKategori(responseMusik.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "100%",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "100%",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const handlePlayVMusik = (id: string, namaFile: string) => {
    setIdMusik(id);
    setNamaFile(namaFile);
    navigate("/musik/play");
    window.location.reload();
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleKategoriMusik = (idKategori: string, kategori: string) => {
    setKategori(idKategori);
    setNamaKategori(kategori);
    navigate("/kategorimusik");
  };

  return (
    <>
      <div className={`${loading ? "" : "hidden"}`}>
        <Loading />
      </div>
      <div className={`${loading ? "hidden" : ""}`}>
        <Layout id="musichome">
          <div className="flex flex-col">
            <SliderBannerMusik />
            <div className="sm:flex flex-row mt-10 gap-x-5 justify-center  hidden">
              <div className="flex mb-4 text-center w-2/3">
                <button
                  id="semua-filter"
                  onClick={() => handleButtonClick("")}
                  className={`px-4  text-center w-full ${
                    selectedButton === ""
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  Semua
                </button>

                <button
                  id="PAUD-filter"
                  onClick={() => handleButtonClick("PAUD")}
                  className={`px-4 py-2 text-center w-full ${
                    selectedButton === "PAUD"
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  PAUD
                </button>

                <button
                  id="TK-filter"
                  onClick={() => handleButtonClick("TK")}
                  className={`px-4 py-2 text-center w-full ${
                    selectedButton === "TK"
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  Taman Kanak Kanak
                </button>
              </div>
              <div className="flex flex-row justify-center items-center w-1/4 px-3 gap-3 bg-white rounded-lg">
                <div className="w-10 p-2 flex justify-center items-center bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full">
                  <span className="text-white text-xl">
                    <BiSearchAlt />
                  </span>
                </div>
                <Input
                  id="search"
                  type="text"
                  label="Pencarian"
                  name="search"
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
            <div className="flex sm:hidden flex-row mt-5 gap-x-5 px-3 items-center justify-center ">
              <div className="flex text-center w-full items-center justify-between ">
                <button
                  id="semua-filter"
                  onClick={() => handleButtonClick("")}
                  className={`  text-center w-full ${
                    selectedButton === ""
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  Semua
                </button>

                <button
                  id="PAUD-filter"
                  onClick={() => handleButtonClick("PAUD")}
                  className={` text-center w-full ${
                    selectedButton === "PAUD"
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  PAUD
                </button>

                <button
                  id="TK-filter"
                  onClick={() => handleButtonClick("TK")}
                  className={` text-center w-full ${
                    selectedButton === "TK"
                      ? "border-b-2 border-b-cyan-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  TK
                </button>
              </div>
              <div className="flex flex-row justify-center items-center  gap-3 bg-white rounded-lg">
                <div className="w-10 p-2 flex justify-center items-center bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full">
                  <span className="text-white text-xl">
                    <BiSearchAlt />
                  </span>
                </div>
                <div className=" sm:flex">
                  <Input
                    id="search"
                    type="text"
                    label="Pencarian"
                    name="search"
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mb-10 cursor-pointer">
              <div className="w-full sm:w-5/6">
                <p className="text-3xl px-4 font-bold">Musik</p>
                <div className={`${search ? "hidden" : ""}`}>
                  {musikByKategori.data?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={
                        item.status
                          ? item.jenis === "musik"
                            ? ""
                            : "hidden"
                          : "hidden"
                      }
                    >
                      <div className="flex flex-row my-5 px-5">
                        <p
                          className="text-xl font-normal cursor-pointer capitalize"
                          onClick={() =>
                            handleKategoriMusik(item.idKategori, item.kategori)
                          }
                        >
                          {item.kategori}
                        </p>
                        <div className="flex items-center text-cyan-500 text-xl ">
                          <AiOutlineCaretRight />
                        </div>
                      </div>

                      <div className="flex items-start w-full justify-start">
                        <div className="w-full px-8 sm:p-2">
                          <Slider {...settings}>
                            {item?.Musik?.map((musik: any, index: number) => (
                              <div key={index}>
                                <div className="w-36 sm:w-42 md:w-62 xl:w-60 2xl:w-80">
                                  <img
                                    src={musik.thumbnail}
                                    alt={musik.name}
                                    id={musik.id}
                                    className="rounded-xl cursor-pointer object-cover w-full h-full"
                                    onClick={() =>
                                      handlePlayVMusik(musik.id, musik.namaFile)
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`${
                    search ? "" : "hidden"
                  } w-full flex gap-2 flex-wrap mt-10 justify-center `}
                >
                  <div
                    className={`${
                      muiskAll?.data?.length === 0 ? "hidden" : ""
                    } flex gap-2 flex-wrap mt-10 justify-center w-full`}
                  >
                    {muiskAll?.data?.map((item: any, number: number) => (
                      <div className="w-40 sm:w-72 cursor-pointer" key={number}>
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="rounded-md"
                          onClick={() =>
                            handlePlayVMusik(item.id, item.namaFile)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className={`p-16 flex flex-col justify-center items-center ${
                      muiskAll?.data?.length === 0 ? "" : "hidden"
                    }`}
                  >
                    <img src={notFound} alt="Tidak Ditemukan" />
                    <p className="font-bold text-gray-900">
                      Musik Tidak Ditemukan
                    </p>
                    <p className="font-bold text-neutral-500">
                      Gunakan kata kunci lain untuk pencarian musik
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};
export default MusicHome;
