import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../Api/api";
import { useStore } from "../store/Store";

const TestingArea = () => {
  const [videoSearch, setVideoSearch] = useState<any>([]);
  const { searchValue } = useStore();
  const fetchSearchData = async () => {
    try {
      const responseSearch = await api.searchVideo(searchValue);
      setVideoSearch(responseSearch.data);
      console.log(responseSearch.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const { setIdVideo } = useStore();
  const handleDetail = (id: any) => {
    setIdVideo(id);
    navigate("/detail");
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    fetchSearchData();
  }, []);

  return (
    <div className="flex flex-row w-full">
      {videoSearch.data?.map((item: any) => (
        <div
          className="flex-row bg-inherit gap-x-3 w-full flex justify-center items-center cursor-pointer"
          key={item.id}
          onClick={() => handleDetail(item.id)}
        >
          <img src={item.thumbnail} alt="image" className="w-64 h-36" />
          <div className="w-1/3 flex flex-col gap-y-2 items-start">
            <div className="font-bold text-black capitalize text-2xl">
              {item.name}
            </div>
            <div className="text-justify capitalize line-clamp-3 text-base">
              {item.deskripsi}
            </div>
            <div className="gap-5 flex flex-row">
              <div className="text-gray-400 ">10.10</div>
              <div className="text-gray-400 ">{item.jenjang}</div>
              <div className="text-gray-400 ">Video Ice Breaking</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TestingArea;
