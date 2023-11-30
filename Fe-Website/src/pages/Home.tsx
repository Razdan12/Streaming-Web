import { SliderBanner } from "../component/Carousel";
import Layout from "../component/Layout";
import { MoreButton } from "../component/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Api/api";
import paud from "../assets/paud.png";
import tk from "../assets/tk.png";
// import sd from "../assets/sd.png";
import Slider from "react-slick";
import { useStore } from "../store/Store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../component/Loading";

const Home = () => {
  const [videoByKategori, setvideoByKategori] = useState<any>([]);
  const [musikByKategori, setmusikByKategori] = useState<any>([]);
  const [selectedButton, setSelectedButton] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();
  const [triger, setTriger] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setIdVideo, setNamaFile, setIdMusik, setKategori, setNamaKategori } =
    useStore();

  const handleButtonClick = (buttonName: string) => {
    if (selectedButton === buttonName) {
      setSelectedButton("");
      setTriger(!triger);
    } else {
      setSelectedButton(buttonName);
      setTriger(!triger);
    }
  };

  const fetchVideoByKategori = async () => {
    setLoading(true);
    try {
      const responseVideo = await api.getVideoKategori(selectedButton);
      if (responseVideo.status === 200) {
        setvideoByKategori(responseVideo.data);
      } else {
        console.error(`Error: ${responseVideo.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchMusikByKategori = async () => {
    try {
      const responseMusik = await api.getMusikKategori(selectedButton);
      setmusikByKategori(responseMusik.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token");
    if (userLoggedIn) {
      const foundUser = userLoggedIn;
      setLoggedIn(foundUser);
    }
    fetchVideoByKategori();
    fetchMusikByKategori();
  }, [triger, loggedIn]);

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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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

  const handlePlayVideo = (id: string, namaFile: string) => {
    setIdVideo(id);
    setNamaFile(namaFile);
    navigate("/detail");
  };

  const handlePlayMusik = (id: string, namaFile: string) => {
    setIdMusik(id);
    setNamaFile(namaFile);
    navigate("/musik/play");
  };

  const handleKategori = (idKategori: string, kategori: string) => {
    setKategori(idKategori);
    setNamaKategori(kategori);
    navigate("/kategorivideo");
  };
  const handleKategoriMusik = (idKategori: string, kategori: string) => {
    setKategori(idKategori);
    setNamaKategori(kategori);
    navigate("/kategorimusik");
  };

  return (
    <div>
      <div className={`${loading ? "" : "hidden"}`}>
        <Loading />
      </div>
      <div className={`${loading ? "hidden" : ""}`}>
        <Layout id="homePage">
          <div className="w-full">
            <SliderBanner />
          </div>

          <div className="mt-5 flex-row justify-center items-center">
            <div className=" justify-center items-center gap-2.5 flex">
              <button
                id="paud-filter"
                onClick={() => handleButtonClick("PAUD")}
                className={`lg:w-96 lg:h-24 rounded-2xl shadow-md shadow-cyan-100 w-1/3 h-28 ${
                  selectedButton === "PAUD"
                    ? "bg-gradient-to-r from-cyan-300 to-blue-400"
                    : "bg-white"
                }`}
              >
                <div className="justify-center items-center lg:gap-4 flex lg:flex-row pb-3 pr-3 flex-col">
                  <img
                    src={paud}
                    alt="Icon"
                    id="button-icon"
                    className="lg:w-14 lg:h-14 w-7 h-7 "
                  />
                  <div className="flex-col justify-center items-center flex">
                    <div className="text-center text-neutral-800 lg:text-2xl font-bold text-sm">
                      Paud
                    </div>
                    <div className="text-center text-neutral-800 lg:text-base font-normal text-xs">
                      <span className="flex lg:hidden md:hidden">
                        Anak usia 3-5 Tahun
                      </span>
                      <span className="hidden lg:flex md:flex">
                        Anak-anak usia 3-5 Tahun
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <button
                id="tk-filter"
                onClick={() => handleButtonClick("TK")}
                className={`lg:w-96 lg:h-24 rounded-2xl shadow-md shadow-cyan-100 w-1/3 h-28 ${
                  selectedButton === "TK"
                    ? "bg-gradient-to-r from-cyan-300 to-blue-400"
                    : "bg-white"
                }`}
              >
                <div className="justify-center items-center lg:gap-4 flex lg:flex-row pb-3 pr-3 flex-col">
                  <img
                    src={tk}
                    alt="Icon"
                    id="button-icon"
                    className="lg:w-14 lg:h-14 w-7 h-7 "
                  />
                  <div className="flex-col justify-center items-start inline-flex">
                    <div className="ml-11 text-neutral-800 lg:text-2xl font-bold text-sm lg:ml-0">
                      <div className="flex lg:hidden md:hidden">TK</div>
                      <div className="hidden lg:flex md:flex">
                        Taman Kanak Kanak
                      </div>
                    </div>
                    <div className="text-center text-neutral-800 lg:text-base font-normal text-xs">
                      <div className="flex lg:hidden md:hidden">
                        Anak usia 5-6 Tahun
                      </div>
                      <div className="hidden lg:flex md:flex">
                        Anak-anak usia 5-6 Tahun
                      </div>
                    </div>
                  </div>
                </div>
              </button>

            </div>
          </div>

          <div className="lg:px-24 px-10 mt-14">
            <div className="flex flex-col">
              <p className="text-lg font-bold lg:text-3xl">Video </p>
              {videoByKategori.data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={
                    item.status
                      ? item.jenis === "video"
                        ? ""
                        : "hidden"
                      : "hidden"
                  }
                >
                  <div className="flex flex-row my-5">
                    <p
                      className="text-sm lg:text-xl font-normal cursor-pointer capitalize"
                      onClick={() =>
                        handleKategori(item.idKategori, item.kategori)
                      }
                    >
                      {item.kategori}
                    </p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 fill-cyan-400 stroke-cyan-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-start w-full justify-start">
                    <div className="w-full ">
                      <Slider {...settings}>
                        {item.video?.map((video: any, index: number) => (
                          <div key={index}>
                            <div className="w-[128px] sm:w-42 md:w-[170px] lg:w-[240] xl:w-[250px] 2xl:w-[310px]">
                              <img
                                id={video.id}
                                src={video.thumbnail}
                                alt={video.judul}
                                className="rounded-xl cursor-pointer object-cover w-full h-full"
                                onClick={() =>
                                  handlePlayVideo(video.id, video.namaFIle)
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
              className="py-10 flex flex-row justify-center items-center cursor-pointer gap-x-0"
              onClick={() => navigate("/video")}
            >
              <MoreButton />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-cyan-400 fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold lg:text-3xl">Musik</p>
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
                  <div className="flex flex-row my-5">
                    <p
                      className="text-sm lg:text-xl font-normal cursor-pointer capitalize"
                      onClick={() =>
                        handleKategoriMusik(item.idKategori, item.kategori)
                      }
                    >
                      {item.kategori}
                    </p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 fill-cyan-400 stroke-cyan-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center w-full">
                    <div className="w-full">
                      <Slider {...settings}>
                        {item.Musik?.map((musik: any, index: number) => (
                          <div key={index}>
                            <div className="w-[128px] sm:w-42 md:w-[170px] lg:w-[240] xl:w-[250px] 2xl:w-[310px]">
                              <img
                                key={index}
                                id={musik.id}
                                src={musik.thumbnail}
                                alt={musik.judul}
                                className="rounded-xl cursor-pointer"
                                style={{ width: "100%", height: "100%" }}
                                onClick={() =>
                                  handlePlayMusik(musik.id, musik.namaFile)
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
              className="py-10 flex flex-row justify-center items-center cursor-pointer gap-x-0 mb-10"
              onClick={() => navigate("/musik")}
            >
              <MoreButton />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-cyan-500 fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Home;
