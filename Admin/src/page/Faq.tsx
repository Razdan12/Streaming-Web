import { useEffect, useState } from "react";
import Layout from "../componen/Layout";
import { Modals } from "../componen/Modal";
import { FaqRest } from "../Router/Api";
import { useStore } from "../Router/Store/Store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const schema = Yup.object({
  question: Yup.string().required("required"),
  answer: Yup.string().required(" required"),
});

const Faq = () => {
  const { token } = useStore();
  const [data, setData] = useState<any>([]);
  const [triger, setTriger] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchPaket = async () => {
      const response = await FaqRest.GetAllFaq(token);
      setData(response.data.data);
    };
    fetchPaket();
  }, [triger]);

  const handleAdd = async () => {
    const { question, answer } = formik.values;
    try {
      setTriger(!triger);
      await FaqRest.AddFaq(token, question, answer);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const HanldeDelete = async (id: string) => {
    try {
      await FaqRest.DeleteFaq(token, id);
      setTriger(!triger);
    } catch (error) {
      console.log(error);
    }
  };

  const trigerDelete = (id: string) => {
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
        HanldeDelete(id);
      }
    });
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
    <>
      <Layout id="faq">
        <Modals id="modal-add-faq">
          <div className="flex justify-center mb-5 text-xl font-bold text-black">
            Tambah Kategori
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label>Pertanyaan</label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formik.values.question}
              onChange={(value) => {
                formik.setFieldValue("question", value);
              }}
              id="question"
            />
            <label>Jawaban</label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formik.values.answer}
              onChange={(value) => {
                formik.setFieldValue("answer", value);
              }}
              id="answer"
            />
          </div>
          <div className="flex justify-end w-full gap-2 mt-10">
            <div className="mt-0 modal-action ">
              <label
                htmlFor="modal-add-faq"
                className="btn btn-ghost"
                id="btn-close"
                // onClick={handleClose}
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              onClick={handleAdd}
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
              //   value={formik.values.name}
              //   onChange={formik.handleChange}
            />
            <label>Jenis</label>
            <select
              //   value={formik.values.jenis}
              id="jenis"
              //   onChange={formik.handleChange}
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
              //   value={formik.values.urutan}
              //   onChange={formik.handleChange}
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
                // onClick={handleClose}
              >
                Close
              </label>
            </div>
            <button
              className="w-32 text-white btn btn-primary"
              id="btn-submit"
              //   onClick={handleEditKAtegori}
            >
              Submit
            </button>
          </div>
        </Modals>

        <div className="w-full">
          <div className="mt-5 ml-5 text-3xl font-bold">
            Kelola Pusat Bantuan
          </div>
          <div className="w-full flex justify-end p-5">
            <label
              htmlFor="modal-add-faq"
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
                    <th>Pertanyaan</th>
                    <th>Jawaban</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index: number) => (
                    <tr className="hover:bg-base-200" key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.question }}
                        />
                      </td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost text-white btn-xs bg-red-600"
                          onClick={() => trigerDelete(item.id)}
                        >
                          Delete
                        </button>
                        {/* <label
                          htmlFor="modal-edit-kategori"
                          className="btn btn-ghost btn-xs bg-yellow-600"
                          //   onClick={() => setIdKAtegori(item.id)}
                        >
                          Edit
                        </label> */}
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

export default Faq;
