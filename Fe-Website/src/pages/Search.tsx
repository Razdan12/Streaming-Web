import Layout from "../component/Layout";
import bannerpage from "../assets/bannerpage.png";
import { Input } from "../component/Input";
import { CardSideImage } from "../component/Card";
import notFound from "../assets/notFound.png";
import { useState, useEffect } from "react";
import api from "../Api/api";
import { useStore } from "../store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const schema = Yup.object({
  search: Yup.string().required("Masukkan Kata Pencarian"),
});


const Search = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [triger, setTriger] = useState<boolean>(false);
  const [videoSearch, setVideoSearch] = useState<any>([]);
  const { searchValue, setSearchValue } = useStore();
  const navigate = useNavigate();

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleButtonClick = (buttonName: string) => {
    if (selectedButton === buttonName) {
      setSelectedButton("");
      setTriger(!triger);
    } else {
      setSelectedButton(buttonName);
      setTriger(!triger);
    }
  };

  const fetchSearchData = async () => {
    try {
      const responseSearch = await api.searchVideo(searchValue);
      setVideoSearch(responseSearch.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { search } = formikSearch.values;
    if (event.key === "Enter") {
      setSearchValue(search);
      navigate("/video/search");
    }
  };

  useEffect(() => {
    fetchSearchData();
  }, [videoSearch]);

  return (
    <Layout>
      <div className="flex flex-col mb-10">
        <div className=" bg-black flex flex-col">
          <div className="hero-content gap-2 text-sm font-bold flex flex-row justify-start px-14 pt-10">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              Home{" "}
            </div>
            <div className="font-normal text-gray-400">/</div>
            <div className="font-normal text-white">Video</div>
          </div>
          <div className="hero">
            <div className="hero-content flex-row lg:flex-row-reverse">
              <img
                src={bannerpage}
                className="max-w-2xl rounded-lg shadow-2xl"
              />
              <div className="text-white">
                <h1 className="text-5xl font-bold">Video Terbaru Wijiga</h1>
                <p className="py-6">
                  loream ipsum dolor sit amet loream ipsum dolor sit amet loream
                  ipsum dolor sit amet loream ipsum dolor sit amet loream ipsum
                  dolor sit amet loream ipsum dolor sit amet
                </p>
                <button className="btn w-40 h-11 rounded-md self-stretch justify-center items-center p-2 flex border-none bg-gradient-to-r from-cyan-300 to-indigo-500">
                  <span className="font-bold text-white capitalize text-base">
                    Putar Sekarang
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row  p-16 ">
          <div className="flex mb-4 text-center w-2/3">
            <button
              id="semua-filter"
              onClick={() => handleButtonClick("")}
              className={`px-4 py-2 text-center w-full ${
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

            <button
              id="SD-filter"
              onClick={() => handleButtonClick("SD")}
              className={`px-4 py-2 text-center w-full ${
                selectedButton === "SD"
                  ? "border-b-2 border-b-cyan-400 text-black"
                  : "text-gray-400"
              }`}
            >
              Sekolah Dasar
            </button>
          </div>
          <div className="flex flex-row justify-center items-center w-1/4 px-3 gap-3 bg-white rounded-lg">
            <div className="w-8 h-8 flex justify-center items-center bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <Input
              id="search"
              type="text"
              label="Pencarian"
              name="search"
              value={formikSearch.values.search}
              onChange={formikSearch.handleChange}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        {videoSearch.length > 0 ? (
          <div className="px-16 mb-16 flex flex-row w-full">
            {videoSearch.data?.map((item: any, index: number) => (
              <CardSideImage
                key={index}
                id={item.id}
                thumbnail={item.thumbnail}
                name={item.name}
                deskripsi={item.deskripsi}
                durasi={item.durasi === null ? "NA" : item.durasi}
                jenjang={item.jenjang}
                kategori={"NA"}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 flex flex-col justify-center items-center">
            <img src={notFound} alt="Tidak Ditemukan" />
            <p className="font-bold text-gray-900">Video Tidak Ditemukan</p>
            <p className="font-bold text-neutral-500">
              Gunakan kata kunci lain untuk pencarian video
            </p>
          </div>
        )}{" "}
      </div>
    </Layout>
  );
};

export default Search