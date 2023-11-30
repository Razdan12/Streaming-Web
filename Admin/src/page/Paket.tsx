import { useState, useEffect } from "react";
import Layout from "../componen/Layout";
import {Api} from "../Router/Api";
import { useStore } from "../Router/Store/Store";
import { Modals } from "../componen/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const schema = Yup.object({
  name: Yup.string().required("name required"),
  masaAktif: Yup.number().required("masa aktif required"),
  harga: Yup.number().required("harga Required"),
  kapasitas: Yup.number().required("kapasitas required"),
});

const Paket = () => {
  const [paket, setPaket] = useState<any>([]);
  const [paketId, setPaketId] = useState<any>({});
  const [dataPaket, setDataPaket] = useState<any>({});
  const { token } = useStore();
  const [triger, setTriger] = useState<boolean>(false);
  const [idPaket, setIdPaket] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: undefined,
      masaAktif: undefined,
      harga: undefined,
      kapasitas: undefined,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await Api.GetPaket(token);
        const data = response.data.data;
        const filteredData = data.filter((item: { userCreate: boolean; }) => item.userCreate === false);
        setPaket(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaket();
  }, [triger]);

  useEffect(() => {
    setDataPaket(paketId);
  }, [paketId]);

  console.log(paket);
  
  const addPaket = async () => {
    const { name, masaAktif, harga, kapasitas } = formik.values;
    try {
      await Api.AddPaket(token, name, masaAktif, harga, kapasitas);

      Swal.fire({
        position: "center",
        icon: "success",
        title: " Success",
        showConfirmButton: false,
        timer: 1500,
      });
      formik.resetForm();
      setTriger(!triger);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const editPaket = async (id: string) => {
    const { name, masaAktif, harga, kapasitas } = formik.values;
    try {
      await Api.EditPaket(token, id, name, masaAktif, harga, kapasitas);

      Swal.fire({
        position: "center",
        icon: "success",
        title: " Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTriger(!triger);
      formik.resetForm();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await Api.DeletePaket(token, id);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const deletePaket = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        setTriger(!triger);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const getById = async (id: string) => {
    try {
      const response = await Api.GetPaketById(token, id);
      setPaketId(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
    console.log(paketId.name);
  };

  return (
    <div>
      <Layout id="kategori">
        <Modals id="modal-add-paket">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Tambah Paket
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Nama Paket</label>
            <input
              type="text"
              id="name"
              placeholder="Nama"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label>Masa Aktif (Hari)</label>
            <input
              type="number"
              id="masaAktif"
              placeholder="Masa Aktif"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.masaAktif}
            />
            <label>Harga</label>
            <input
              type="number"
              id="harga"
              placeholder="Harga"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.harga}
            />
            <label>Kapasitas</label>
            <input
              type="number"
              id="kapasitas"
              placeholder="Kapasitas"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.kapasitas}
            />
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="modal-add-paket"
                className="btn btn-ghost"
                id="btn-close"
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={addPaket}
            >
              Submit
            </button>
          </div>
        </Modals>
        <Modals id="edit-paket">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Edit Paket
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Nama Paket</label>
            <input
              type="text"
              id="name"
              placeholder="Nama"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label>Masa Aktif (Hari)</label>
            <input
              type="number"
              id="masaAktif"
              placeholder="Masa Aktif"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.masaAktif}
            />
            <label>Harga</label>
            <input
              type="number"
              id="harga"
              placeholder="Harga"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.harga}
            />
            <label>Kapasitas</label>
            <input
              type="number"
              id="kapasitas"
              placeholder="Kapasitas"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              onChange={formik.handleChange}
              value={formik.values.kapasitas}
            />
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="edit-paket"
                className="btn btn-ghost"
                id="btn-close"
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={() => editPaket(idPaket)}
            >
              Submit
            </button>
          </div>
        </Modals>
        <Modals id="detail-paket">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Detail Paket
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Nama Paket</label>
            <input
              disabled
              type="text"
              id="name"
              placeholder="Nama"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={dataPaket.name}
            />
            <label>Masa Aktif (Hari)</label>
            <input
              disabled
              value={dataPaket.masaAktif}
              type="number"
              id="masaAktif"
              placeholder="Masa Aktif"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Harga</label>
            <input
              disabled
              value={dataPaket.harga}
              type="number"
              id="harga"
              placeholder="Harga"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Kapasitas</label>
            <input
              disabled
              value={dataPaket.kapasitas}
              type="number"
              id="kapasitas"
              placeholder="Kapasitas"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="detail-paket"
                className="btn btn-ghost"
                id="btn-close"
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={() => editPaket(idPaket)}
            >
              Submit
            </button>
          </div>
        </Modals>

        <div className="w-full">
          <div className="mt-5 ml-5 text-3xl font-bold">Kelola Paket</div>
          <div className="w-full flex justify-end p-5">
            <label
              htmlFor="modal-add-paket"
              className="flex items-center justify-center h-12 gap-3 font-semibold text-white btn btn-ghost hover:text-black bg-primary rounded-xl"
            >
              Tambah Paket
            </label>
          </div>
          <div className="w-full flex justify-center p-5">
            <div className="w-full">
              <table className="table table-pin-rows table-zebra">
                {/* head */}
                <thead>
                  <tr className="bg-blue-500 text-white font-bold">
                    <th>No</th>
                    <th>Name</th>
                    <th>Harga</th>
                    <th>Kapasitas</th>
                    <th>Masa Aktif</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {paket?.map((item: any, index: number) => (
                    <tr className={`hover:bg-base-300 `} key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.harga}
                        <br />
                      </td>

                      <td>{item.kapasitas} Akun</td>
                      <td>{item.masaAktif} Hari</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs bg-red-600"
                          onClick={() => deletePaket(item.id)}
                        >
                          Delete
                        </button>
                        <label
                          htmlFor="edit-paket"
                          className="btn btn-ghost btn-xs bg-yellow-500"
                          onClick={() => {
                            setIdPaket(item.id);
                            getById(item.id);
                          }}
                        >
                          Edit
                        </label>
                        <label
                          className="btn btn-ghost btn-xs bg-blue-400"
                          htmlFor="detail-paket"
                          onClick={() => getById(item.id)}
                        >
                          details
                        </label>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Paket;
