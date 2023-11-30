import { useState, useEffect, useRef, ChangeEvent } from "react";
import Layout from "../componen/Layout";
import ModalWidht from "../componen/ModalWidht";
import { Modals } from "../componen/Modal";
import { getAllVideo } from "../Router/Utils";
import { Api, VideoRest } from "../Router/Api";
import { useStore } from "../Router/Store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BsPencilSquare, BsTrash3, BsCardImage } from "react-icons/bs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const animatedComponents = makeAnimated();

const schema = Yup.object({
  name: Yup.string().required("name required"),
  deskripsi: Yup.string().required("deskripsi required"),
});

interface Jenjang {
  id: string;
  name: string;
}
const UploadVideo = () => {
  const [video, setVideo] = useState<getAllVideo | undefined>(undefined);
  const [urlVideo, setUrlVideo] = useState<string | undefined>("");
  const [kategori, setKategori] = useState<any>([]);
  const [AllJenjang, setAllJenjang] = useState<Jenjang[]>([]);
  const [idKategori, setIdKategori] = useState<string>("");
  const [jenjang, setJenjang] = useState<string>("");
  const [arrayJenjang, setArrayJenjang] = useState<string[]>([]);
  const [arrayKategori, setArrayKategori] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [triger, setTriger] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [upload, setupload] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [idVideo, setIdVideo] = useState<string>("");
  const [progres, setProgres] = useState<number>(0);

  const { token } = useStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      deskripsi: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await VideoRest.getAllVideo(jenjang, idKategori);
        const videoData = response.data;
        if (videoData) {
          setVideo(videoData);
        } else {
          console.error("Data video tidak ditemukan");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideo();
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  }, [urlVideo]);

  const handlePlayVideo = (namaFile: string) => {
    setUrlVideo(`${import.meta.env.VITE_REACT_API_URL}/video/play/${namaFile}`);
  };
  const handleChange = (selectedOption: any) => {
    setArrayKategori(selectedOption.map((item: any) => item.value));
  };
  const handleJenjang = (selectedOption: any) => {
    setArrayJenjang(selectedOption.map((item: any) => item.value));
  };

  const handleUpload = async () => {
    const { name, deskripsi } = formik.values;
    const formData = new FormData();

    formData.append("video", selectedFile);
    formData.append("name", name);
    formData.append("deskripsi", deskripsi);
    arrayJenjang.map((item: string) => formData.append("jenjang", item));
    arrayKategori.map((item: string) => formData.append("idKategori", item));

    const instance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL,
      headers: { Authorization: `Bearer ${token}` },
    });

    try {
      setLoading(true);
      setupload(true);
      const response: AxiosResponse = await instance.post("/video", formData, {
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
        title: "Upload Video Success",
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
        text: "Failed Add Video",
      });
    } finally {
      setLoading(false);
      setArrayJenjang([]);
      setArrayKategori([]);
      formik.resetForm();
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setJenjang("");
    setIdKategori("");
    setProgres(0);
    setupload(false);
    setSelectedFile(null);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const HandleDelete = async (id: string) => {
    try {
      await VideoRest.deleteVideo(token, id);
      Swal.fire("Delete Video", "Delete Video Success", "success");
      setTriger(!triger);
    } catch (error) {
      Swal.fire("Delete Video", "Delete Video Gagal", "warning");
    }
  };

  const DeleteVideo = (id: string) => {
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
        HandleDelete(id);
      }
    });
  };

  const handleFileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setThumbnail(file || null);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleUploadThumbnail = async () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await VideoRest.EditVideo(token, idVideo, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload Thumbnail Success",
        showConfirmButton: false,
        timer: 1800,
      });
      setTriger(!triger);
      setPreviewUrl("");
      window.location.reload()
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const HandleEdit = async () => {
    const { name, deskripsi } = formik.values;
  
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (deskripsi) formData.append("deskripsi", deskripsi);
  
    arrayJenjang.forEach((item: string) => formData.append("jenjang", item));
    arrayKategori.forEach((item: string) => formData.append("idKategori", item));
  
    try {
      setLoading(true);
      await VideoRest.EditVideo(token, idVideo, formData);
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
  

  const DataJenjang = AllJenjang.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const DataKategori = kategori
    .filter((item: any) => item.kategoriFor === "video")
    .map((item: any) => ({
      value: item.id,
      label: item.Name,
    }));

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
        <div className="w-full mt-10">
          <ModalWidht id="video">
            <div className="w-full">
              <video
                ref={videoRef}
                controls
                controlsList="nodownload"
                className="w-full"
                onPlay={() => setLoading(true)}
                onPause={() => setLoading(false)}
                onEnded={() => setLoading(false)}
                poster={previewUrl}
              >
                <source src={urlVideo} type="video/mp4" />
              </video>
              <div className="modal-action">
                <button className={`btn ${loading ? "btn-disabled" : ""}`}>
                  Close
                </button>
              </div>
            </div>
          </ModalWidht>
          <Modals id="add-video">
            <div className="flex w-full justify-center text-2xl font-bold">
              Tambah Video
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label>Judul</label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                placeholder="Judul Video"
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
              <div className="w-full ">
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
              </div>
              <label>Video</label>
              <input
                type="file"
                onChange={handleFile}
                id="judul"
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
                  htmlFor="add-video"
                  className="btn btn-ghost"
                  id="btn-close"
                  onClick={handleClose}
                >
                  Close
                </label>
              </div>
              <button
                className={`w-32 text-white btn btn-primary flex justify-center items-center${
                  loading ? " btn-disabled" : ""
                }`}
                id="btn-submit"
                onClick={handleUpload}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Modals>
          <Modals id="edit-video">
            <div className="flex w-full justify-center text-2xl font-bold">
              Edit Video
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label>Judul</label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                placeholder="Judul Video"
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
            </div>
            <div className="flex justify-end w-full gap-2 mt-10">
              <div className="mt-0 modal-action ">
                <label
                  htmlFor="edit-video"
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
          <Modals id="upload-thumbnail">
            <div className="flex w-full justify-center text-2xl font-bold">
              Edit Video Video
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
          <div className="mt-5 ml-5 text-3xl font-bold">Kelola Video</div>

          <div className="w-full flex gap-3 justify-end">
          
            <div className=" mr-5">
              <label htmlFor="add-video" className="btn bg-blue-500 text-white">
                Tambah Video
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-5 p-5">
            <div className="w-full bg-base-300 rounded-md shadow-md p-4">
              <div>
                <table className="table table-pin-rows table-zebra">
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
                    {video?.data.map((item: any, index: number) => (
                      <tr className="hover:bg-base-200" key={index}>
                        <td>{index + 1}</td>
                        <td
                          onClick={() => {
                            (window as any).video.showModal();
                            handlePlayVideo(item.namaFile);
                            setPreviewUrl(item.thumbnail);
                          }}
                          className="cursor-pointer tooltip"
                          data-tip="Click to play"
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
                                DeleteVideo(item.id);
                              }}
                            >
                              <BsTrash3 />
                            </button>
                            <label
                              htmlFor="edit-video"
                              className="btn join-item bg-yellow-600 tooltip  tooltip-warning flex"
                              data-tip="Edit"
                              onClick={() => {
                                setIdVideo(item.id);
                              }}
                            >
                              <BsPencilSquare />
                            </label>

                            <label
                              htmlFor="upload-thumbnail"
                              className="btn join-item bg-green-400 flex tooltip tooltip-success"
                              data-tip="Upload Thumbnail"
                              onClick={() => {
                                setIdVideo(item.id);
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

export default UploadVideo;
