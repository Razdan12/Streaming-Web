import { useState, useEffect, ChangeEvent } from "react";
import ModalWidht from "../componen/ModalWidht";

import { useStore } from "../Router/Store/Store";
import Layout from "../componen/Layout";
import Swal from "sweetalert2";
import { Banner } from "../Router/Utils";
import { BannerRest, MusikRest, VideoRest } from "../Router/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cropper, { Area, Point } from "react-easy-crop";
import { BsTrash } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { HexColorPicker } from "react-colorful";

const schema = Yup.object({
  judul: Yup.string().required("required"),
  jenis: Yup.string().required("required"),
  urutan: Yup.number().required("required"),
  deskripsi: Yup.string().required("required"),
  namaProduk: Yup.string().required("required"),
});

const KelolaBanner = () => {
  const [banner, setBanner] = useState<Banner[]>([]);
  const [musik, setMusik] = useState<any>([]);
  const [video, setVideo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerImage, setBannerImage] = useState<any>(null);
  const [triger, setTriger] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  // const [color, setColor] = useState("#000000");

  const { token } = useStore();

  const formik = useFormik({
    initialValues: {
      judul: "",
      jenis: "",
      urutan: 0,
      deskripsi: "",
      namaProduk: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const fetchBanner = async () => {
    try {
      const response = await BannerRest.GetAll();
      const Data = response.data.data;
      setBanner(Data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllMusik = async () => {
    const musikResponse = await MusikRest.GetMusikAll();
    setMusik(musikResponse.data.data);
  };

  const getAllVideo = async () => {
    const videoResponse = await VideoRest.GetVideoAll();
    setVideo(videoResponse.data.data);
  };

  useEffect(() => {
    fetchBanner();
    getAllMusik();
    getAllVideo();
  }, [triger]);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log(croppedArea);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length !== 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result as string)
      );
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
          );

          canvas.toBlob((blob) => {
            if (blob) {
              setBannerImage(blob);
            }
          }, "image/jpeg");
        }
      };
    }
    setImageSrc(null);
  };

  const handleUploadThumbnail = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    formData.append("judul", formik.values.judul);
    formData.append("jenis", formik.values.jenis);
    formData.append("urutan", formik.values.urutan.toString());
    formData.append("deskripsi", formik.values.deskripsi);
    formData.append("namaProduk", formik.values.namaProduk);
    // formData.append("idProduk", color)

    try {
      setLoading(true);
      await BannerRest.UploadBanner(token, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload Banner Success",
        showConfirmButton: false,
        timer: 1800,
      });
      setTriger(!triger);
      formik.resetForm();
      setImageSrc(null);
      setBannerImage(null);
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
  const handleJenisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    formik.setFieldValue("jenis", selectedValue);
  };
  const handleProdukChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    formik.setFieldValue("namaProduk", selectedValue);
  };

  const HandleUpdateStatus = async (id: string, status: boolean) => {
    await BannerRest.UpdateBanner(token, id, undefined, undefined, !status);
    setTriger(!triger);
  };

  const HandleClose = () => {
    formik.resetForm();
    setImageSrc(null);
    setBannerImage(null);
  };

  const HanldeDelete = async (id: string) => {
    try {
      await BannerRest.DeleteBanner(token, id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Success",
        showConfirmButton: false,
        timer: 1800,
      });
      setTriger(!triger);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed",
      });
    }
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

  const jenisTriger = formik.values.jenis;
  const select = jenisTriger === "musik" ? musik : video;
  const rasio = jenisTriger === "home" ? 16 / 5 : 9 / 5;

  return (
    <div>
      <Layout>
        <ModalWidht id="banner">
          <div className="flex w-full justify-center text-2xl font-bold">
            Tambah Banner
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label>Judul</label>
            <input
              type="text"
              value={formik.values.judul}
              onChange={formik.handleChange}
              id="judul"
              placeholder="Judul Video"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <label>Lokasi</label>
            <select
              name="jenis"
              value={formik.values.jenis}
              onChange={handleJenisChange}
              className="select w-full  h-12 p-3 rounded-md bg-white shadow-md text-black"
            >
              <option value="">Lokasi</option>
              <option value="home">HOME</option>
              <option value="video">VIDEO</option>
              <option value="musik">MUSIK</option>
            </select>
            <label>Urutan</label>
            <input
              type="number"
              value={formik.values.urutan}
              onChange={formik.handleChange}
              id="urutan"
              placeholder="Urutan Banner"
              className="h-12 p-3 rounded-md bg-white shadow-md text-black"
            />
            <div
              className={`${
                jenisTriger == "video" || jenisTriger == "musik" ? "" : "hidden"
              }`}
            >
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

                <div className="mt-4">
                  <label>Link {formik.values.jenis}</label>
                  <select
                    name="namaProduk"
                    value={formik.values.namaProduk}
                    onChange={handleProdukChange}
                    className={`select w-full  h-12 p-3 rounded-md bg-white shadow-md text-black`}
                  >
                    <option value="">Judul Musik</option>
                    {select?.map((item: any, index: number) => (
                      <option value={`${item.id}/${item.namaFile}`} key={index}>
                        {item.judul}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="mt-4">
                  <label>Warna Background</label>
                  <HexColorPicker color={color} onChange={setColor} />
                </div> */}
              </div>
            </div>
            <label>Upload Banner</label>
            <div>
              <div className="join join-vertical">
                <img
                  src={bannerImage ? URL.createObjectURL(bannerImage) : ""}
                  alt=""
                  className="join-item border-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="join-item file-input file-input-bordered file-input-info rounded-md bg-white shadow-md text-black"
                />
              </div>
              {imageSrc && (
                <div className="w-full min-h-96">
                  <div className=" ">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={rasio}
                      onCropChange={onCropChange}
                      onCropComplete={onCropComplete}
                      onZoomChange={onZoomChange}
                    />
                  </div>
                  <div className="relative bg-red-500 flex w-full  justify-end">
                    <button
                      className="absolute top-10 right-20 btn btn-warning w-32"
                      onClick={handleSave}
                    >
                      Crop
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end w-full gap-2 mt-10 items-center">
            <div className="modal-action flex justify-center items-center">
              <button
                className={`btn ${loading ? "btn-disabled" : ""}`}
                onClick={HandleClose}
              >
                Close
              </button>
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
          </div>
        </ModalWidht>
        <div className="mt-5 ml-5 text-3xl font-bold">Kelola Banner</div>
        <div className="w-full flex justify-end mt-5 p-5">
          <label
            onClick={() => {
              (window as any).banner.showModal();
              // handlePlayMusik(item.namaFile, item.thumbnail);
            }}
            className="btn bg-blue-500 text-white"
          >
            Tambah Banner
          </label>
        </div>
        <div className="w-full p-5">
          <table className="table table-pin-rows table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-blue-500 text-white font-bold">
                <th>No</th>
                <th>Thumbnail</th>
                <th>Judul</th>
                <th>Urutan</th>
                <th>Lokasi</th>
                <th>Aktif</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {banner?.map((item: any, index: number) => (
                <tr className="hover:bg-base-200" key={index}>
                  <td>{index + 1} </td>
                  <td className="cursor-pointer">
                    <img src={item.url} alt="Shoes" className="w-32" />
                  </td>
                  <td>{item.judul}</td>
                  <td>{item.urutan}</td>
                  <td>{item.jenis}</td>
                  <td>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      checked={item.aktif}
                      onChange={() => HandleUpdateStatus(item.id, item.aktif)}
                      className="toggle toggle-success"
                    />
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs bg-red-600 text-white"
                      onClick={() => HanldeDelete(item.id)}
                    >
                      <BsTrash />
                    </button>
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

export default KelolaBanner;
