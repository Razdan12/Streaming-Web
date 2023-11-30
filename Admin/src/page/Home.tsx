
import Layout from "../componen/Layout";
import DataChart from "../componen/DataChart";
import ChartSide from "../componen/Chart";

const Home = () => {
  const data1 = [
    { venue: "sen", count1: 24, count2: 32 },
    { venue: "sel", count1: 25, count2: 32 },
    { venue: "rab", count1: 21, count2: 12 },
    { venue: "kam", count1: 40, count2: 12 },
    { venue: "jum", count1: 32, count2: 34 },
  ];

  const data2 = [
    { venue: "sen", count1: 30, count2: 42 },
    { venue: "sel", count1: 34, count2: 32 },
    { venue: "rab", count1: 51, count2: 12 },
    { venue: "kam", count1: 40, count2: 32 },
    { venue: "jum", count1: 39, count2: 34 },
  ];


  return (
    <div>
      <Layout id="home">
        <div className="w-full flex justify-center bg-base-100 mt-5 mb-5">
          <div className="w-5/6 h-32 items-center ">
            <DataChart />
          </div>

        </div>
        <div className="w-full flex justify-center mt-10">
          <div className="flex gap-5 w-5/6 justify-center items-center mb-5">
            <div className="w-1/2 justify-center items-center shadow-xl p-3">
              <div className="w-full flex justify-center bg-white mb-5">
                <label htmlFor="data1" className="text-xl font-bold">
                  Jumlah User tanggal 28/08/23 - 02/09/23
                </label>
              </div>
              <ChartSide
                data={data1}
                id="data1"
                title1="reguler"
                title2="Siplah"
              />
            </div>
            <div className="w-1/2 shadow-xl p-3 ">
              <div className="w-full flex justify-center bg-white mb-5 ">
                <label htmlFor="data1" className="text-xl font-bold">
                  {" "}
                  Jumlah Akun tanggal 28/08/23 - 02/09/23
                </label>
              </div>
              <ChartSide
                data={data2}
                id="data2"
                title1="reguler"
                title2="Siplah"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <div className="flex gap-5 w-5/6 justify-center items-center">
            <div className="w-1/2 justify-center items-center shadow-xl p-3">
              <div className="w-full flex justify-center bg-white mb-5">
                <label htmlFor="data1" className="text-xl font-bold">
                  Trafic tanggal 28/08/23 - 02/09/23
                </label>
              </div>
              <ChartSide
                data={data1}
                id="data3"
                title1="video"
                title2="Musik"
              />
            </div>
            
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
