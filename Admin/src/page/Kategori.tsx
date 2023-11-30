import { useEffect, useState } from "react";
import Layout from "../componen/Layout";
import { Modals } from "../componen/Modal";
import { Api } from "../Router/Api";
import Swal from "sweetalert2";
import { useStore } from "../Router/Store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("required"),
  jenis: Yup.string().required("required"),
  urutan: Yup.number().required("required"),
  aktif: Yup.boolean().required("required"),
});

const Kategori = () => {
  const { token } = useStore();
  const [kategori, setKategori] = useState<any>([]);
  const [idKategori, setIdKAtegori] = useState<string>("");
  const [triger, setTriger] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: undefined,
      jenis: undefined,
      urutan: undefined,
      aktif: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await Api.GetAllKAtegori(token);
        setKategori(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaket();
  }, [triger]);

  const handleAddKategori = async () => {
    try {
      const { name, jenis, urutan, aktif } = formik.values;
      await Api.AddKategori(token, name, jenis, urutan, aktif);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tambah Kategori Success",
        showConfirmButton: false,
        timer: 1800,
      }).then(() => {
        setTimeout(() => {
          setTriger(!triger)
          window.location.reload();
        }, 1800);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const handleClose = () => {
    formik.resetForm();
  }
  const handleEditKAtegori = async () => {
    try {
      const { name, jenis, urutan, aktif } = formik.values;
      await Api.EditKategori(token, idKategori, name,jenis,urutan,aktif);
      Swal.fire({
        position: "center",
        icon: "success",
        title: " Success",
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

  const HandleUpdateAktif = async (id: string, status: boolean) => {
    await Api.EditKategori(token, id, undefined, undefined, undefined, !status);
    console.log(!status);

    setTriger(!triger);
  };

  const handleDelete = async (id: string) => {
    try {
      await Api.DeleteKategori(token, id);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  const deleteKategori = (id: string) => {
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


  return (
    <>
      <Layout id="kategori">
        <Modals id="modal-add-kategori">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Tambah Kategori
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Nama Kategori</label>
            <input
              type="text"
              id="name"
              placeholder="Kategori"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label>Jenis</label>
            <select
              value={formik.values.jenis}
              id="jenis"
              onChange={formik.handleChange}
              className="select w-full  h-12 p-3 rounded-md bg-white shadow-md text-black"
            >
              <option disabled selected>Kategori</option>
              <option value="video">Video</option>
              <option value="musik">Musik</option>
            </select>
            <div className="flex w-full gap-4 justify-between">
              <div className="flex justify-center items-center gap-3">
                <label htmlFor="">Aktif</label>
                <input
                  type="checkbox"
                  id="aktif"
                  checked={formik.values.aktif}
                  onChange={formik.handleChange}
                  className="toggle toggle-success"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <label htmlFor="">Urutan</label>
                <input
                  type="number"
                  id="urutan"
                  value={formik.values.urutan}
                  onChange={formik.handleChange}
                  placeholder="Urutan"
                  className="h-12 p-3 w-full rounded-md bg-white shadow-md text-black"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="modal-add-kategori"
                className="btn btn-ghost"
                id="btn-close"
                onClick={handleClose}
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={handleAddKategori}
            >
              Submit
            </button>
          </div>
        </Modals>
        <Modals id="modal-edit-kategori">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Edit Kategori
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Nama Kategori</label>
            <input
              type="text"
              id="name"
              placeholder="Kategori"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label>Jenis</label>
            <select
              value={formik.values.jenis}
              id="jenis"
              onChange={formik.handleChange}
              className="select w-full  h-12 p-3 rounded-md bg-white shadow-md text-black"
            >
              <option value="">Kategori</option>
              <option value="video">Video</option>
              <option value="musik">Musik</option>
            </select>
                <label htmlFor="">Urutan</label>
                <input
                  type="number"
                  id="urutan"
                  value={formik.values.urutan}
                  onChange={formik.handleChange}
                  placeholder="Urutan"
                  className="h-12 p-3 w-full rounded-md bg-white shadow-md text-black"
                />
           
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="modal-edit-kategori"
                className="btn btn-ghost"
                id="btn-close"
                onClick={handleClose}
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={handleEditKAtegori}
            >
              Submit
            </button>
          </div>
        </Modals>
        
        
        <div className="w-full">
          <div className="mt-5 ml-5 text-3xl font-bold">Kelola Kategori</div>
          <div className="w-full flex justify-end p-5">
            <label
              htmlFor="modal-add-kategori"
              className="btn btn-active bg-blue-500 text-white"
            >
              Tambah
            </label>
          </div>
          <div className="w-full flex justify-center p-5">
            <div className="w-full">
              <table className="table table-pin-rows table-zebra">
                <thead>
                  <tr className="bg-blue-500 text-white font-bold">
                    <th>No</th>
                    <th>Name</th>
                    <th>Jenis</th>
                    <th>Urutan</th>
                    <th>Aktif</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kategori.map((item: any, index: number) => (
                    <tr className="hover:bg-base-200" key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="font-bold">{item.Name}</div>
                      </td>
                      <td>{item.kategoriFor}</td>
                      <td>{item.noKategori}</td>
                      <td>
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          checked={item.aktif}
                          onChange={() => HandleUpdateAktif(item.id, item.aktif)}
                          className="toggle toggle-success"
                        />
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs bg-red-600"
                          onClick={() => deleteKategori(item.id)}
                        >
                          Delete
                        </button>
                        <label
                          htmlFor="modal-edit-kategori"
                          className="btn btn-ghost btn-xs bg-yellow-600"
                          onClick={() => setIdKAtegori(item.id)}
                        >
                          Edit
                        </label>
                        
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Kategori;
