import { useEffect, useState } from "react";
import Layout from "../componen/Layout";
import { Api } from "../Router/Api";
import { useStore } from "../Router/Store/Store";
import { Modals } from "../componen/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsKeyFill, BsPencilSquare, BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  jumlah: Yup.number().required("Jumlah is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  tanggal: Yup.date().required("Tanggal is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const User = () => {
  const { token } = useStore();
  const [user, setUSer] = useState<any>([]);
  const [profil, setProfil] = useState<any>([]);
  const [paket, setPaket] = useState<any>([]);
  const [idPaket, setIdPaket] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      jumlah: 0,
      email: "",
      tanggal: new Date(), // Initialize tanggal with current date
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api.GetAllUser(token);
        setUSer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

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

  const handleIdPaket = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setIdPaket(selectedId);
  };

  const handleCreateUser = async () => {
    const { name, email, password } = formik.values;
    await Api.CreateUser(token, name, email, password, idPaket);
    window.location.reload();
  };

  const handleDeleteUSer = async (id: string) => {
    try {
      await Api.deleteUser(token, id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleResetPassUSer = async (id: string, password?: any) => {
    try {
      await Api.ResetPasswordUser(token, id, password);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    try {
      const { name, jumlah } = formik.values;
      const data = {
        name: name,
      };

      if (name && jumlah) {
        await Api.editUser(token, idUser, data);
        await Api.tambahProfil(token, idUser, jumlah);
      } else if (name && !jumlah) {
        await Api.editUser(token, idUser, data);
      } else if (!name && jumlah) {
        await Api.tambahProfil(token, idUser, jumlah);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUSer(id);
      }
    });
  };

  const ResetPassword = (id: string) => {
    Swal.fire({
      title: "Reset Password User?",
      text: "User akan tidak bisa login dengan password lama",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#1cbf03",
      confirmButtonText: "Otomatis",
      cancelButtonText: "Manual",
    }).then((result) => {
      if (result.isConfirmed) {
        handleResetPassUSer(id);
      } else {
        Swal.fire({
          title: "Masukan Password Baru",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Reset",
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
            if (login) {
              handleResetPassUSer(id, login);
            } else {
              Swal.showValidationMessage(`
              Request failed
            `);
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "success",
              title: "Berhasil Reset Password",
            });
          }
        });
      }
    });
  };

  const clickModal = (id: string) => {
    fetchProfil(id);
    let modalElement = document.getElementById(
      "profil-modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const fetchProfil = async (id: string) => {
    try {
      const response = await Api.getAllProfil(token, id);
      setProfil(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
const DeleteProfil = async (id: string) => {
  try {
   await Api.deleteProfil(token, id);
   window.location.reload()
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div>
      <Layout id="user">
        <Modals id="add-user">
          <div className="w-full">
            <div className="w-full flex justify-center">
              <span className="text-2xl font-bold">Tambah User</span>
            </div>
            <div className="w-full flex flex-col gap-2 mt-5">
              <label>Nama User</label>
              <input
                type="text"
                id="name"
                placeholder="Nama"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <label>Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <label>Password</label>
              <input
                type="text"
                id="password"
                placeholder="Password"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={formik.values.password}
                onChange={formik.handleChange}
              />

              <label>Paket</label>
              <select
                className="select w-full h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={idPaket}
                onChange={handleIdPaket}
              >
                <option selected>Pilih Paket</option>
                {paket?.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="add-user"
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
                onClick={handleCreateUser}
              >
                Simpan
              </label>
            </div>
          </div>
        </Modals>
        <Modals id="edit-user">
          <div className="w-full">
            <div className="w-full flex justify-center">
              <span className="text-2xl font-bold">Edit User</span>
            </div>
            <div className="w-full flex flex-col gap-2 mt-5">
              <label>Nama User</label>
              <input
                type="text"
                id="name"
                placeholder="Nama"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <label>Tambah Profil</label>
              <input
                type="number"
                id="jumlah"
                placeholder="Tambah Profil"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
                value={formik.values.jumlah}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="edit-user"
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
                onClick={handleEdit}
              >
                Simpan
              </label>
            </div>
          </div>
        </Modals>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="profil-modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-blue-400">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {profil?.map((item: any, index: number) => (
                    <tr className="hover:bg-base-300">
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.picture}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            
                          </div>
                        </div>
                      </td>
                      <td>{item.status ? "Aktif" : "non Aktif"}</td>
                      <td>
                        <button
                          className="btn join-item  bg-red-500 tooltip tooltip-error"
                          data-tip="Hapus"
                          onClick={() => {
                            DeleteProfil(item.id);
                          }}
                        >
                          <BsTrash3 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="w-full">
          <div className="w-full mt-10">
            <span className="m-10 text-3xl font-bold">Kelola User</span>
          </div>
          <div className="w-full flex justify-end p-5">
            <label
              htmlFor="add-user"
              className="flex items-center justify-center h-12 gap-3 font-semibold text-white btn btn-ghost hover:text-black bg-primary rounded-xl"
            >
              Tambah User
            </label>
          </div>
          <div>
            <div className="w-full flex justify-center p-5 m-4">
              <table className="table table-pin-rows table-zebra">
                {/* head */}
                <thead>
                  <tr className="bg-blue">
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Jumlah Profil</th>
                    <th>Paket Aktif</th>
                    <th>Masa Aktif</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((item: any, index: number) => (
                    <tr
                      className={`hover:bg-base-200 ${
                        item.role == "admin" ? "hidden" : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <div className="font-bold">{item.name}</div>
                      </td>
                      <td>{item.email}</td>
                      <td
                        className="cursor-pointer tooltip tooltip-info"
                        data-tip="Detail"
                        onClick={() => clickModal(item.id)}
                      >
                        {item.akun.length}
                      </td>
                      <td>paket</td>
                      <td>{item.aktif.split("T")[0]}</td>
                      <th className="flex">
                        <div className="join join-vertical lg:join-horizontal">
                          <button
                            className="btn join-item  bg-red-500 tooltip tooltip-error"
                            data-tip="Hapus"
                            onClick={() => {
                              DeleteUser(item.id);
                            }}
                          >
                            <BsTrash3 />
                          </button>
                          <label
                            htmlFor="edit-user"
                            className="btn join-item bg-yellow-600 tooltip  tooltip-warning flex"
                            data-tip="Edit"
                            onClick={() => {
                              setIdUser(item.id);
                            }}
                          >
                            <BsPencilSquare />
                          </label>

                          <label
                            htmlFor="upload-thumbnail"
                            className="btn join-item bg-green-400 flex tooltip tooltip-success"
                            data-tip="Reset Password"
                            onClick={() => {
                              ResetPassword(item.id);
                            }}
                          >
                            <BsKeyFill />
                          </label>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default User;
