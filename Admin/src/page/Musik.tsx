import { useState, useEffect, ChangeEvent } from "react";
import Layout from "../componen/Layout";
import ModalWidht from "../componen/ModalWidht";
import { Modals } from "../componen/Modal";
import { Api, MusikRest } from "../Router/Api";
import { useStore } from "../Router/Store/Store";
import { getAllMusik } from "../Router/Utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BsPencilSquare, BsTrash3, BsCardImage } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const animatedComponents = makeAnimated();

const schema = Yup.object({
  name: Yup.string().required("name required"),
  deskripsi: Yup.string().required("deskripsi required"),
  lirik: Yup.string().required(" required"),
});

interface Jenjang {
  id: string;
  name: string;
}

const UploadMusik = () => {
  const { token } = useStore();

  const [kategori, setKategori] = useState<any>([]);
  const [idKategori, setIdKategori] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [jenjang, setJenjang] = useState<string>("");
  const [AllJenjang, setAllJenjang] = useState<Jenjang[]>([]);
  const [musik, setMusik] = useState<getAllMusik | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [triger, setTriger] = useState<boolean>(false);
  const [urlMusik, setUrlMusik] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [upload, setupload] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [idMusik, setIdMusik] = useState<string>("");
  const [arrayJenjang, setArrayJenjang] = useState<string[]>([]);
  const [arrayKategori, setArrayKategori] = useState<string[]>([]);
  const [progres, setProgres] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      deskripsi: "",
      lirik: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchMusik = async () => {
      try {
        const response = await MusikRest.getAllMusik(
          token,
          jenjang,
          idKategori
        );
        const musikData = response.data;
        if (musikData) {
          setMusik(musikData);
        } else {
          console.error("Data musik tidak ditemukan");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchKategori = async () => {
      try {
        const response = await Api.GetAllKAtegori(token);
        const dataKategori = response.data;

        setKategori(dataKategori);
      } catch (error) {
        console.error("Data video tidak ditemukan");
      }
    };

    fetchKategori();
    fetchMusik();
  }, [triger]);

  useEffect(() => {
    const fetchJenjang = async () => {
      try {
        const response = await Api.GetAllJenjang();
        const videoData = response.data;

        setAllJenjang(videoData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJenjang();
  }, [triger]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await Api.GetAllKAtegori(token);
        const dataKategori = response.data;

        setKategori(dataKategori);
      } catch (error) {
        console.error("Data video tidak ditemukan");
      }
    };

    fetchKategori();
  }, [triger]);

  const handlePlayMusik = (namaFile: string, thumbnail: string) => {
    setUrlMusik(`${import.meta.env.VITE_REACT_API_URL}/musik/${namaFile}`);
    setThumbnail(thumbnail);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const UploadMusik = async () => {
    const { name, deskripsi, lirik } = formik.values;
    const formData = new FormData();

    formData.append("musik", selectedFile);
    formData.append("name", name);
    formData.append("deskripsi", deskripsi);
    formData.append("lirik", lirik);
    arrayJenjang.map((item: string) => formData.append("jenjang", item));
    arrayKategori.map((item: string) => formData.append("idKategori", item));

    const instance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL,
      headers: { Authorization: `Bearer ${token}` },
    });

    try {
      setLoading(true);
      setupload(true);
      const response: AxiosResponse = await instance.post("/musik", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgres(percentCompleted);
          }
        },
      });
      console.log(response.status);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload Musik Success",
        showConfirmButton: false,
        timer: 1800,
      }).then(() => {
        setTimeout(() => {
          setTriger(!triger);
          window.location.reload();
        }, 1800);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed Add Venue",
      });
    } finally {
      setLoading(false);
      setIdKategori("");
      setJenjang("");
    }
  };

  const handleFileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setThumbnail(file || null);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const HandleEdit = async () => {
    const { name, deskripsi, lirik } = formik.values;
  
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (deskripsi) formData.append("deskripsi", deskripsi);
    if (lirik) formData.append("lirik", lirik);
  
    arrayJenjang.forEach((item: string) => formData.append("jenjang", item));
    arrayKategori.forEach((item: string) => formData.append("idKategori", item));
  
    try {
      setLoading(true);
      await MusikRest.EditMusik(token, idMusik, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 1800,
      });
      setTriger(!triger);
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed",
      });
    } finally {
      setLoading(false);
      setArrayJenjang([]);
      setArrayKategori([]);
      formik.resetForm();
    }
  };
  

  const handleUploadThumbnail = async () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await MusikRest.EditMusik(token, idMusik, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload Thumbnail Success",
        showConfirmButton: false,
        timer: 1800,
      });
      setTriger(!triger);
      setPreviewUrl("");
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed",
      });
    } finally {
      setLoading(false);
      setIdKategori("");
      setJenjang("");
    }
  };

  const DataJenjang = AllJenjang.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const DataKategori = kategori
    .filter((item: any) => item.kategoriFor === "musik")
    .map((item: any) => ({
      value: item.id,
      label: item.Name,
    }));

  const DeleteMusikId = async (MusikId: string) => {
    await MusikRest.DeleteMusik(token, MusikId);
    Swal.fire({
      position: "center",
      icon: "success",
      title: " Success",
      showConfirmButton: false,
      timer: 1800,
    });
    setTriger(!triger);
  };

  const handleJenjang = (selectedOption: any) => {
    setArrayJenjang(selectedOption.map((item: any) => item.value));
  };
  const handleChange = (selectedOption: any) => {
    setArrayKategori(selectedOption.map((item: any) => item.value));
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      ["link"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "header",
    "link",
    "image",
    "video",
  ];
  return (
    <div>
      <Layout>
        <div className="w-full mt-10 scrollbar-hide">
          <ModalWidht id="video">
            <div className="w-full relative">
              <img
                src={thumbnail}
                alt="Shoes"
                onPlay={() => setLoading(true)}
                onPause={() => setLoading(false)}
                onEnded={() => setLoading(false)}
                className="w-full rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-md"></div>
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white font-bold text-center"></div>
              <audio
                src={urlMusik}
                controls
                controlsList="nodownload"
                className="w-full absolute bottom-0"
                onPlay={() => setLoading(true)}
                onPause={() => setLoading(false)}
                onEnded={() => setLoading(false)}
              ></audio>
            </div>
            <div className="modal-action">
              <button className={`btn ${loading ? "btn-disabled" : ""}`}>
                Close
              </button>
            </div>
          </ModalWidht>
          <Modals id="add-musik">
            <div className="flex w-full justify-center text-2xl font-bold">
              Tambah Musik
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label>Judul</label>
              <input
                type="text"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Judul Musik"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              />
              <label>Jenjang</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={DataJenjang}
                onChange={handleJenjang}
              />
              <label>Kategori</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={DataKategori}
                onChange={handleChange}
              />

              <label>lirik</label>
              <div>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={formik.values.lirik}
                  onChange={(value) => {
                    formik.setFieldValue("lirik", value);
                  }}
                  id="lirik"
                />
              </div>

              <label>Deskripsi</label>
              <div>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={formik.values.deskripsi}
                  onChange={(value) => {
                    formik.setFieldValue("deskripsi", value);
                  }}
                  id="deskripsi"
                />
              </div>

              <label>Musik</label>
              <input
                type="file"
                onChange={handleFile}
                id="judul"
                accept=".mp3"
                placeholder="Judul Video"
                className="file-input file-input-bordered file-input-info rounded-md bg-white shadow-md text-black"
              />
            </div>
            <div
              className={`w-full my-4 flex justify-between gap-2 ${
                upload ? "" : "hidden"
              }`}
            >
              <progress
                className="progress progress-accent w-5/6 h-5 animate-pulse "
                value={progres}
                max="100"
              ></progress>
              <div className="font-bold">
                {progres === 100 ? "Finishing" : progres + "%"}
              </div>
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="add-musik"
                  className="btn btn-ghost"
                  id="btn-close"
                >
                  Close
                </label>
              </div>
              <button
                className={`w-32 text-white btn btn-primary flex justify-center items-center${
                  loading ? " btn-disabled" : ""
                }`}
                id="btn-submit"
                onClick={UploadMusik}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Modals>
          <Modals id="upload-thumbnail">
            <div className="flex w-full justify-center text-2xl font-bold">
              Upload Thumbnail
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label>Upload Thumbnail</label>
              <div className="join join-vertical">
                <img
                  src={
                    previewUrl
                      ? previewUrl
                      : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                  }
                  alt=""
                  className="join-item border-2"
                />
                <input
                  type="file"
                  onChange={handleFileImage}
                  id="judul"
                  placeholder="Judul Video"
                  className="join-item file-input file-input-bordered file-input-info rounded-md bg-white shadow-md text-black"
                />
              </div>
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="upload-thumbnail"
                  className="btn btn-ghost"
                  id="btn-close"
                >
                  Close
                </label>
              </div>
              <button
                className={`w-32 text-white btn btn-primary flex justify-center items-center${
                  loading ? " btn-disabled" : ""
                }`}
                id="btn-submit"
                onClick={handleUploadThumbnail}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Modals>
          <Modals id="edit-musik">
            <div className="flex w-full justify-center text-2xl font-bold">
              Edit Musik
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label>Judul</label>
              <input
                type="text"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Judul Musik"
                className="h-12 p-3 rounded-md bg-white shadow-md text-black"
              />
              <label>Jenjang</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={DataJenjang}
                onChange={handleJenjang}
              />
              <label>Kategori</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={DataKategori}
                onChange={handleChange}
              />

              <label>Deskripsi</label>
              <ReactQuill
                theme="snow"
                value={formik.values.deskripsi}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                  formik.setFieldValue("deskripsi", value);
                }}
                id="deskripsi"
              />
              <label>Lirik</label>
              <ReactQuill
                theme="snow"
                value={formik.values.lirik}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                  formik.setFieldValue("lirik", value);
                }}
                id="lirik"
              />
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="edit-musik"
                  className="btn btn-ghost"
                  id="btn-close"
                >
                  Close
                </label>
              </div>
              <button
                className={`w-32 text-white btn btn-primary flex justify-center items-center${
                  loading ? " btn-disabled" : ""
                }`}
                id="btn-submit"
                onClick={HandleEdit}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Modals>
          <div className="mt-5 ml-5 text-3xl font-bold">Kelola Musik</div>

          <div className="w-full flex gap-3 justify-end">
            <div className=" mr-5">
              <label htmlFor="add-musik" className="btn bg-blue-500 text-white">
                Tambah Musik
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-5 p-5">
            <div className="w-full bg-base-300 rounded-md shadow-md p-4">
              <div className={` scrollbar-hide`}>
                <table className="table table-pin-rows table-zebra">
                  {/* head */}
                  <thead>
                    <tr className="bg-blue-500 text-white font-bold">
                      <th>No</th>
                      <th>Thumbnail</th>
                      <th>Judul</th>
                      <th>Jenjang</th>
                      <th>Kategori</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {musik?.data.map((item: any, index: number) => (
                      <tr className="hover:bg-base-200" key={index}>
                        <td>{index + 1}</td>
                        <td
                          onClick={() => {
                            (window as any).video.showModal();
                            handlePlayMusik(item.namaFile, item.thumbnail);
                          }}
                          className="cursor-pointer"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.judul}
                            className="w-32"
                          />
                        </td>
                        <td>{item.judul}</td>
                        <td>
                          {item.jenjang.map((item: any, index: number) => (
                            <div
                              className="badge badge-secondary m-1"
                              key={index}
                            >
                              {item.name}
                            </div>
                          ))}
                        </td>
                        <td>
                          {item.kategori.map((item: any, index: number) => (
                            <div className="badge badge-accent m-1" key={index}>
                              {item.kategori}
                            </div>
                          ))}
                        </td>
                        <th className="flex">
                          <div className="join join-vertical lg:join-horizontal">
                            <button
                              className="btn join-item  bg-red-500 tooltip tooltip-error"
                              data-tip="Hapus"
                              onClick={() => {
                                DeleteMusikId(item.id);
                              }}
                            >
                              <BsTrash3 />
                            </button>
                            <label
                              htmlFor="edit-musik"
                              className="btn join-item bg-yellow-600 tooltip  tooltip-warning flex"
                              data-tip="Edit"
                              onClick={() => {
                                setIdMusik(item.id);
                              }}
                            >
                              <BsPencilSquare />
                            </label>

                            <label
                              htmlFor="upload-thumbnail"
                              className="btn join-item bg-green-400 flex tooltip tooltip-success"
                              data-tip="Upload Thumbnail"
                              onClick={() => {
                                setIdMusik(item.id);
                              }}
                            >
                              <BsCardImage />
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
        </div>
      </Layout>
    </div>
  );
};

export default UploadMusik;
