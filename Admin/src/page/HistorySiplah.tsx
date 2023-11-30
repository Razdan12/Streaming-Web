import { useState, useEffect } from "react";
import Layout from "../componen/Layout";
import { Modals } from "../componen/Modal";
import { Api } from "../Router/Api";
import Swal from "sweetalert2";
import { useStore } from "../Router/Store/Store";

const HistorySiplah = () => {
  const { token } = useStore();
  const [paket, setPaket] = useState<any>([]);
  const [siplah, setSiplah] = useState<any>([]);
  const [siplahId, setSiplahId] = useState<any>({});
  const [idPaket, setIdPaket] = useState<string>("");
  const [triger, setTriger] = useState<boolean>(false);
  const [bayar, setBayar] = useState<string>("");
  const [kuota, setKuota] = useState<number>(0);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await Api.GetPaket(token);
        const data = response.data.data;
        const filteredData = data.filter(
          (item: { userCreate: boolean }) => item.userCreate === false
        );
        setPaket(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaket();
  }, []);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await Api.GetAllSiplah();
        const data = response.data;
        setSiplah(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaket();
  }, [triger]);

  const HandleGenerateSiplah = async () => {
    try {
      if (!idPaket) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Paket Belum Dipilih",
        });
      }
      await Api.GenerateSiplah(idPaket, bayar, kuota);
      Swal.fire({
        position: "center",
        icon: "success",
        title: " Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTriger(!triger);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };
  const handleIdKategori = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setIdPaket(selectedId);
  };
  const handleBayar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setBayar(selectedId);
  };

  const HandleGetById = async (id: string) => {
    try {
      const response = await Api.GetSiplahById(id);
      setSiplahId(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const HandleUpdateStatus = async (id: string, status: boolean) => {
    try {
      await Api.UpdateSiplah(id, !status);
      setTriger(!triger);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout>
        <Modals id="add-siplah">
          <div className="flex w-full justify-center text-2xl font-bold">
            Generate Kode Siplah
          </div>
          <div className="flex flex-col w-full my-5 gap-3">
            <label>Pilih Paket Langganan</label>
            <select
              className="select w-full h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={idPaket}
              onChange={handleIdKategori}
            >
              <option selected>Pilih Paket</option>
              {paket?.map((item: any, index: number) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Pilih Jenis Pembayaran</label>
            <select
              className="select w-full h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={bayar}
              onChange={handleBayar}
            >
              <option>Pilih Pembayaran</option>
              <option value="siplah">Siplah</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <label>Kuota</label>
          <input
            type="number"
            value={kuota}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKuota(Number(e.target.value))
            }
            id="kuota"
            placeholder="Kuota"
            className="w-full h-12 p-3 rounded-md bg-white shadow-md text-black"
          />

          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="add-siplah"
                className="btn btn-ghost"
                id="btn-close"
              >
                Close
              </label>
            </div>
            <label
              htmlFor="add-siplah"
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={HandleGenerateSiplah}
            >
              Generate
            </label>
          </div>
        </Modals>
        <Modals id="detail-siplah">
          <div className="flex w-full justify-center text-2xl font-bold">
            Detail Siplah
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label>Nama User</label>
            <input
              disabled
              type="text"
              id="name"
              placeholder="Nama"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={siplahId.user}
            />
            <label>Nama Paket</label>
            <input
              disabled
              value={siplahId.paket}
              type="paket"
              id="paket"
              placeholder="paket"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Harga</label>
            <input
              disabled
              value={siplahId.harga}
              type="number"
              id="harga"
              placeholder="Harga"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Invoice</label>
            <input
              disabled
              value={siplahId.invoice}
              type="text"
              id="Invoice"
              placeholder="Invoice"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Nama Instansi</label>
            <input
              disabled
              value={siplahId.namaInstansi}
              type="text"
              id="Invoice"
              placeholder="Invoice"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Kode Siplah</label>
            <input
              disabled
              value={siplahId.kodeSiplah}
              type="text"
              id="Invoice"
              placeholder="Invoice"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Status</label>
            <input
              disabled
              value={
                siplahId.radem
                  ? "Belum Digunakan ( Pending )"
                  : "Sudah Di Gunakan"
              }
              type="text"
              id="Invoice"
              placeholder="Invoice"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
          </div>

          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="detail-siplah"
                className="btn btn-ghost bg-slate-400"
                id="btn-close"
              >
                Close
              </label>
            </div>
          </div>
        </Modals>
        <div className="mt-5 ml-5 text-3xl font-bold">Siplah History</div>

        <div className="w-full p-5">
          <div className="w-full flex justify-end my-5">
            <label htmlFor="add-siplah" className="btn bg-blue-500 text-white">
              Generate Code
            </label>
          </div>
          <table className="table table-pin-rows table-zebra">
            <thead>
              <tr className="bg-blue-500 text-white font-bold">
                <th>No</th>
                <th>Paket</th>
                <th>Harga</th>
                <th>Methode Bayar</th>
                <th>Kode Siplah</th>
                <th>Kuota</th>
                <th>Terpakai</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {siplah.map((item: any, index: number) => (
                <tr className="hover:bg-base-200" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.paket}</td>
                  <td>Rp. {item.harga}</td>
                  <td>{item.methodBayar}</td>
                  <td className="font-bold cursor-pointer">
                    {item.kodeSiplah}
                  </td>
                  <td>{item.kuota}</td>
                  <td>{item.sisaKuota ? item.sisaKuota : 0}</td>
                  <td>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      checked={item.avail}
                      onChange={() => HandleUpdateStatus(item.id, item.avail)}
                      className="toggle toggle-success"
                    />
                  </td>
                  <th>
                    <label
                      htmlFor="detail-siplah"
                      className="btn btn-ghost btn-xs bg-blue-400"
                      onClick={() => HandleGetById(item.id)}
                    >
                      details
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default HistorySiplah;
