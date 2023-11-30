import { useEffect, useState } from "react";
import Layout from "../componen/Layout";
import { Modals } from "../componen/Modal";
import {Api} from "../Router/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const schema = Yup.object({
  name: Yup.string().required("name required"),
  deskripsi: Yup.string().required("required"),
  requirment: Yup.number().required("required"),
  diskon: Yup.number().required("required"),
  mulai: Yup.string().required("required"),
  berakhir: Yup.string().required("required"),
  kode: Yup.string(),
});
const Voucher = () => {
  const [voucher, setVoucher] = useState<any>([]);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [triger, setTriger] = useState<boolean>(false);
  const [voucherId, setVoucherId] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      deskripsi: "",
      requirment: 0,
      diskon: 0,
      mulai: "",
      berakhir: "",
      kode: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleCheck = () => {
    setCheckbox(!checkbox);
  };
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await Api.GetAllVoucher();
        const data = response.data;

        setVoucher(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVoucher();
  }, [triger]);

  const handleCreate = async () => {
    const { name, deskripsi, requirment, diskon, mulai, berakhir, kode } =
      formik.values;
    console.log(kode);

    const startDate = new Date(mulai).toISOString();
    const endDate = new Date(berakhir).toISOString();

    try {
      await Api.CreateVoucher(
        name,
        deskripsi,
        requirment,
        diskon,
        startDate,
        endDate,
        kode
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTriger(!triger);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const handleDetail = async (id: string) => {
    try {
      const GetVoucherById = await Api.GetVoucherById(id);
      setVoucherId(GetVoucherById.data);
      console.log(GetVoucherById.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <Layout>
        <Modals id="add-voucher">
          <div className="flex w-full justify-center text-2xl font-bold">
            Generate Voucher
          </div>
          <div className="flex flex-col w-full my-5">
            <label>Nama Voucher</label>
            <input
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Voucher diskon "
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label className="mt-4">Diskon</label>
            <input
              type="number"
              id="diskon"
              onChange={formik.handleChange}
              value={formik.values.diskon}
              placeholder="Rp. 10.000"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label className="mt-4">Requirment (hari)</label>
            <input
              type="number"
              id="requirment"
              onChange={formik.handleChange}
              value={formik.values.requirment}
              placeholder="30"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label className="mt-4">Deskripsi</label>
            <input
              type="text"
              id="deskripsi"
              onChange={formik.handleChange}
              value={formik.values.deskripsi}
              placeholder="30"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <div className="grid grid-cols-2 mt-4">
              <div className="pr">
                <label className="mt-4 w-full">Tanggal Mulai</label>
                <input
                  type="date"
                  id="mulai"
                  onChange={formik.handleChange}
                  value={formik.values.mulai}
                  placeholder="30"
                  className="h-12 p-3 rounded-md bg-white shadow-md text-black w-full"
                />
              </div>
              <div>
                <label className="mt-4">Tanggal Berakhir</label>
                <input
                  type="date"
                  id="berakhir"
                  onChange={formik.handleChange}
                  value={formik.values.berakhir}
                  placeholder="30"
                  className="h-12 p-3 rounded-md bg-white shadow-md text-black w-full"
                />
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="cursor-pointer label flex justify-start gap-4 mt-5">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    onChange={handleCheck}
                    checked={checkbox}
                  />
                  <span className="label-text">Custom Kode Voucher?</span>
                </label>
              </div>
            </div>
            <div className={`${checkbox ? "flex" : "hidden"} flex-col`}>
              <label className="mt-4">Kode Voucher</label>
              <input
                type="text"
                placeholder="WIJIGA"
                id="kode"
                onChange={formik.handleChange}
                value={formik.values.kode}
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              />
            </div>
          </div>

          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="add-voucher"
                className="btn btn-ghost"
                id="btn-close"
              >
                Close
              </label>
            </div>
            <label
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={handleCreate}
            >
              Generate
            </label>
          </div>
        </Modals>
        <Modals id="detail-voucher">
          <div className="flex w-full justify-center text-2xl font-bold">
            Detail Voucher
          </div>
          <div className="flex flex-col gap-3 my-10">
            <div className="grid grid-cols-3">
              <div>
                <ul className="font-bold">
                  <li>Nama</li>
                  <li>Syarat</li>
                  <li>Potongan</li>
                  <li>Digunakan</li>
                  <li>Kode Voucher</li>
                  <li>Mulai</li>
                  <li>Berakhir</li>
                  <li>Status</li>
                </ul>
              </div>
              <div className="col-span-2">
                <ul>
                  <li>{voucherId.name}</li>
                  <li>Minimal {voucherId.requirment} Hari</li>
                  <li>Rp. {voucherId.diskon}</li>
                  <li>
                    {voucherId.digunakan ? voucherId.digunakan : 0} kali
                    digunakan
                  </li>
                  <li className="font-bold">{voucherId.kode}</li>
                  <li>
                    {voucherId.mulai
                      ? voucherId.mulai.split("T")[0]
                      : voucherId.mulai}
                  </li>
                  <li>
                    {voucherId.berakhir
                      ? voucherId.berakhir.split("T")[0]
                      : voucherId.berakhir}
                  </li>
                  <li>{voucherId.status ? "Aktif" : "Tidak Aktif"}</li>
                </ul>
              </div>
            </div>
            <div>
              <table className="table table-pin-rows table-zebra">
                <thead>
                  <tr className="bg-blue-500 text-white font-bold">
                    <th>No</th>
                    <th>Email Pengguna</th>
                  </tr>
                </thead>
                <tbody>
                  {voucherId.pengguna?.map((item: string, index: number) => (

                  <tr>
                    <td>{index+1}</td>
                    <td>{item}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="detail-voucher"
                className="btn btn-ghost bg-slate-400"
                id="btn-close"
              >
                Close
              </label>
            </div>
          </div>
        </Modals>
        <div className="mt-5 ml-5 text-3xl font-bold">Voucher</div>

        <div className="w-full p-5">
          <div className="w-full flex justify-end my-5">
            <label htmlFor="add-voucher" className="btn bg-blue-500 text-white">
              Generate Voucher
            </label>
          </div>
          <table className="table table-pin-rows table-zebra">
            <thead>
              <tr className="bg-blue-500 text-white font-bold">
                <th>No</th>
                <th>Nama Voucher</th>
                <th>Syarat</th>
                <th>Potongan</th>
                <th>Digunakan</th>
                <th>Kode Voucher</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {voucher.map((item: any, index: number) => (
                <tr className="hover:bg-base-200" key={index}>
                  <td>{index + 1}</td>
                  <td className="cursor-pointer">{item.name}</td>
                  <td>{item.requirment}</td>
                  <td>Rp.{item.diskon}</td>

                  <td>{item.digunakan ? item.digunakan : 0} Kali</td>
                  <td className="font-bold">{item.kode}</td>
                  <td>
                    {item.status ? (
                      <span className="bg-green-500 p-1 rounded-full px-2 text-white">
                        aktif
                      </span>
                    ) : (
                      <span className="bg-red-500 p-1 rounded-full px-2 text-white">
                        non aktif
                      </span>
                    )}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs bg-red-600">
                      Delete
                    </button>
                    <button className="btn btn-ghost btn-xs bg-yellow-600">
                      Edit
                    </button>
                    <label
                      htmlFor="detail-voucher"
                      className="btn btn-ghost btn-xs bg-blue-400"
                      onClick={() => handleDetail(item.id)}
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

export default Voucher;
