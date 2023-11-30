import { useEffect, useState } from "react";
import LayoutProfile from "../../component/LayoutProfile";
import api from "../../Api/api";
import { useStore } from "../../store/Store";
// import { ModalLogout } from "../../component/Modals";

const PusatBantuan = () => {
  const { token } = useStore();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchPaket = async () => {
      const response = await api.GetAllFaq(token);
      setData(response.data.data);
    };
    fetchPaket();
  }, []);
  return (
    <LayoutProfile id="pusatbantuan">
      {/* <ModalLogout /> */}

      <div className="w-full min-h-screen ">
        <div className="w-full justify-center items-center flex my-10 flex-col  font-bold">
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
            Pusat Bantuan
          </span>
        
        </div>
        {data?.map((item: any, index: number) => (
          <div
            className="flex w-[97%]  flex-col justify-center items-center  border-2 rounded-2xl shadow-md"
            key={index}
          >
            <div className="collapse  collapse-arrow bg-white">
              <input type="radio" name="my-accordion-1" />
              <div
                className="collapse-title  text-xl text-black font-medium"
                dangerouslySetInnerHTML={{ __html: item.question }}
              />

              <div
                className="collapse-content text-gray-500 align-middle"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </div>
        ))}
      </div>
    </LayoutProfile>
  );
};
export default PusatBantuan;
