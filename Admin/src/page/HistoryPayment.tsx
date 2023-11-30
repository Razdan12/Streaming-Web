import { useEffect, useState } from "react";
import { TransaksiRest } from "../Router/Api";
import Layout from "../componen/Layout";
import { useStore } from "../Router/Store/Store";

const HistoryPayment = () => {
  const { token } = useStore();
  const [data, setData] = useState<any>([])

  const fatchTransaksi = async () => {
    try {
      const response = await TransaksiRest.GetTransaksi(token);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchTransaksi();
  }, []);
  return (
    <div>
      <Layout>
        <div className="mt-5 ml-5 text-3xl font-bold">Payment History</div>

        <div className="w-full p-5  max-w-full">
          <table className="table table-pin-rows table-zebra table-sm">
            {/* head */}
            <thead>
              <tr className="bg-blue-500 text-white font-bold">
                <th>No</th>
                <th>Email User</th>
                <th>Paket</th>
                <th>Invoice</th>
                <th>Metode Bayar</th>
                <th>No. Pembayaran</th>
                <th>Total</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((item:any, index: number) => (

              <tr className="hover:bg-base-200">
                <td>{index + 1}</td>
                <td>{item.emailUser}</td>
                <td>{item.paket}</td>
                <td>{item.invoice}</td>
                <td>{item.methode}</td>
                <td>{item.noPembayaran}</td>
                <td>Rp.{item.total}</td>
                <td>
                  <span className="bg-green-300 px-3  py-1 rounded-xl text-black">
                    {item.status}
                  </span>
                </td>
                {/* <th>
                 
                  <button className="btn btn-ghost btn-xs bg-blue-400">
                    details
                  </button>
                </th> */}
              </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default HistoryPayment;
