import Layout from "../componen/Layout";
import { useState, useEffect } from "react";
import { PaketMusikRest, PaketVideoRest } from "../Router/Api";
import { useStore } from "../Router/Store/Store";

const PaketVideo = () => {
  const [paket, setPaket] = useState<any>([]);
  const [musik, setMusik] = useState<any>([]);
  // const [triger, setTriger] = useState<boolean>(false);
  const { token } = useStore();

  useEffect(() => {
    const fetchPaketVideo = async () => {
      try {
        const response = await PaketVideoRest.GetPaketVideo(token);
        const dataPaket = response.data;

        setPaket(dataPaket);
      } catch (error) {
        console.error("Data video tidak ditemukan");
      }
    };

    const fethPaketMusik = async () => {
      try {
        const response = await PaketMusikRest.GetPaketMusik(token);
        const dataPaket = response.data;

        setMusik(dataPaket);
      } catch (error) {
        console.log(error);
        
        console.error("Data Msuik tidak ditemukan");
      }
    };
    fethPaketMusik();
    fetchPaketVideo();
  }, []);

  console.log(musik);
  
  return (
    <>
      <Layout id="paket-video">
        <div className="mt-5 ml-5 text-3xl font-bold">Kelola Paket Video</div>
        <div className="flex w-full justify-end mr-5"></div>
        <div className="w-full grid grid-cols-2 p-5 mt-10">
          <div className="w-full p-2 border-2">
            <div className="flex justify-between items-center py-3">
              <span className="text-3xl">Paket Video</span>
              <div className="">
                <label
                  htmlFor="add-musik"
                  className="btn bg-blue-500 text-white"
                >
                  Tambah Paket
                </label>
              </div>
            </div>
            <div className="join join-vertical w-full">
              {paket.map((item: any, index: number) => (
                <div
                  className="collapse collapse-arrow join-item border border-base-300"
                  key={index}
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    {item.name}
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Jenjang</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.video?.map((item: any, index: number) => (
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.jenjang}</td>
                              <td>
                                <label htmlFor="" className="btn bg-yellow-500">
                                  Play
                                </label>
                                <label
                                  htmlFor=""
                                  className="btn bg-red-500 text-white"
                                >
                                  Delete
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="w-full flex justify-end my-3">
                        <label htmlFor="" className="btn">
                          Add Video
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full p-2 border-2">
            <div className="flex justify-between items-center py-3">
              <span className="text-3xl">Paket Musik</span>
              <div className="">
                <label
                  htmlFor="add-musik"
                  className="btn bg-blue-500 text-white"
                >
                  Tambah Paket
                </label>
              </div>
            </div>
            <div className="join join-vertical w-full">
              {musik.map((item: any, index: number) => (
                <div
                  className="collapse collapse-arrow join-item border border-base-300"
                  key={index}
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    {item.name}
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Jenjang</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.musik?.map((item: any, index: number) => (
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.jenjang}</td>
                              <td>
                                <label htmlFor="" className="btn bg-yellow-500">
                                  Play
                                </label>
                                <label
                                  htmlFor=""
                                  className="btn bg-red-500 text-white"
                                >
                                  Delete
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="w-full flex justify-end my-3">
                        <label htmlFor="" className="btn">
                          Add Musik
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaketVideo;
