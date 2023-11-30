import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Bg from "../assets/Hero Banner.png";
import api from "../Api/api";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router-dom";

export const SliderBanner = () => {
  const [banner, setBanner] = useState<any>([]);

  const fetchBanner = async () => {
    const response = await api.GetBanner();
    setBanner(response.data.data);
  };
  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="pb-7 w-full flex justify-center items-center z-0">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className="z-0"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {banner.map((item: any, index: number) =>
          item.aktif ? (
            item.jenis === "home" ? (
              <div>
                <div className={`w-full h-96 ${banner ? "hidden" : ""}`}>
                  <div className="w-full h-96 animate-pulse">
                    <img src={Bg} className={`w-full m-auto `} key={index} />
                  </div>
                </div>

                <img
                  src={item.url}
                  className={`w-full m-auto ${banner ? "" : "hidden"}`}
                  key={index}
                />
              </div>
            ) : null
          ) : null
        )}
      </Carousel>
    </div>
  );
};

export const SliderBannerVideo = () => {
  const [banner, setBanner] = useState<any>([]);
  const navigate = useNavigate();
  const { setIdVideo, setNamaFile } = useStore();

  const fetchBanner = async () => {
    const response = await api.GetBanner();
    setBanner(response.data.data);
  };
  useEffect(() => {
    fetchBanner();
  }, []);

  const handleChange = (produk: string) => {
    const Produk = produk.split("/");
    setIdVideo(Produk[0]);
    setNamaFile(Produk[1]);
    navigate("/detail");
  };

  return (
    <div className="pb-7 w-full flex flex-col justify-center items-center z-0">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className="z-0"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {banner.map((item: any, index: number) =>
          item.aktif ? (
            item.jenis === "video" ? (
              <div>
                <div className="sm:flex hidden" key={index}>
                  <div
                    className={`w-full max-h-96 grid grid-cols-2 bg-black`}
                  >
                    <div className="flex flex-col justify-center items-center w-full text-white ">
                      <div className="w-5/6  mb-10">
                        <div className="text-md breadcrumbs ">
                          <ul>
                            <li>
                              <a>Home</a>
                            </li>
                            <li>
                              <a className="text-cyan-500">Video</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="w-5/6  flex-col gap-6 flex ml-20">
                        <p className="text-6xl">{item.judul}</p>

                        <div
                          className="w-full text-xl pt-5"
                          dangerouslySetInnerHTML={{
                            __html: item.deskripsi || "",
                          }}
                        />
                        <div>
                          <button
                            className="btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            onClick={() => handleChange(item.namaProduk)}
                          >
                            Putar Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full relative">
                      <img
                        src={item.url}
                        className="object-cover w-full h-96"
                        alt=""
                      />

                      <div
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="sm:hidden flex h-52 ">
                  <div className="w-full relative ">
                    <img
                      src={item.url}
                      alt=""
                      className="object-cover w-full h-52"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-white gap-2  px-5 ml-12">
                      <p className="text-white text-xl">{item.judul}</p>
                      <div
                        className="w-full text-sm pt-5"
                        dangerouslySetInnerHTML={{
                          __html: item.deskripsi || "",
                        }}
                      />
                      <div>
                        <button
                          className="btn btn-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          onClick={() => handleChange(item.namaProduk)}
                        >
                          Putar Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          ) : null
        )}
      </Carousel>
    </div>
  );
};
export const SliderBannerMusik = () => {
  const [banner, setBanner] = useState<any>([]);
  const navigate = useNavigate();
  const { setIdMusik, setNamaFile } = useStore();

  const fetchBanner = async () => {
    const response = await api.GetBanner();
    setBanner(response.data.data);
  };
  useEffect(() => {
    fetchBanner();
  }, []);
  const handleChange = (produk: string) => {
    const Produk = produk.split("/");
    setIdMusik(Produk[0]);
    setNamaFile(Produk[1]);
    navigate("/musik/play");
    window.location.reload();
  };

  
  return (
    <div className="pb-7 w-full flex flex-col justify-center items-center z-0">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className="z-0"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {banner.map((item: any, index: number) =>
          item.aktif ? (
            item.jenis === "musik" ? (
              <div>
                <div className="sm:flex hidden" key={index}>
                  <div
                    className={`w-full max-h-96 grid grid-cols-2 bg-black`}
                  >
                    <div className="flex flex-col justify-center items-center w-full text-white ">
                      <div className="w-5/6  mb-10">
                        <div className="text-md breadcrumbs ">
                          <ul>
                            <li>
                              <a>Home</a>
                            </li>
                            <li>
                              <a className="text-cyan-500">Musik</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="w-5/6  flex-col gap-6 flex ml-20">
                        <p className="text-6xl">{item.judul}</p>

                        <div
                          className="w-full text-xl pt-5"
                          dangerouslySetInnerHTML={{
                            __html: item.deskripsi || "",
                          }}
                        />
                        <div>
                          <button
                            className="btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            onClick={() => handleChange(item.namaProduk)}
                          >
                            Putar Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full relative">
                      <img
                        src={item.url}
                        className="object-cover w-full h-96"
                        alt=""
                      />

                      <div
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="sm:hidden flex h-52 ">
                  <div className="w-full relative ">
                    <img
                      src={item.url}
                      alt=""
                      className="object-cover w-full h-52"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-white gap-2  px-5 ml-12">
                      <p className="text-white text-3xl">{item.judul}</p>
                      <div
                        className="w-full text-sm pt-5"
                        dangerouslySetInnerHTML={{
                          __html: item.deskripsi || "",
                        }}
                      />
                      <div>
                        <button
                          className="btn btn-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          onClick={() => handleChange(item.namaProduk)}
                        >
                          Putar Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          ) : null
        )}
      </Carousel>
    </div>
  );
};
