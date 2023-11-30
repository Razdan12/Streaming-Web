import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSecond } from "../../component/Navbar";
import { Input, InputPassword } from "../../component/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../Api/api";
import { useStore } from "../../store/Store";

interface FormValues {
  email: string;
  password: string;
  RetypePassword: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email tidak valid"
    )
    .required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
  RetypePassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Password tidak cocok"
  ),
});

const Register = () => {
  const navigate = useNavigate();
  const [trigerEmail, setTrigerEmail] = useState<boolean>(false);
  const [EmailDigunakan, setEmailDigunakan] = useState<boolean>(false);
  const [trigerPassword, setPasswordd] = useState<boolean>(false);
  const [trigerRePassword, setRePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setEmail, setIdUser, setPassword } = useStore();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      RetypePassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!schema.isValidSync(values)) {
        errors.email = "Email tidak valid";
      }
      return errors;
    },
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password && password.length >= 8;
  };

  const validateRePassword = (password: string, rePassword: string) => {
    return rePassword && password === rePassword;
  };

  useEffect(() => {
    const email = formik.values.email;
    const password = formik.values.password;
    const rePassword = formik.values.RetypePassword;

    email ? setTrigerEmail(!validateEmail(email)) : setTrigerEmail(false);
    password ? setPasswordd(!validatePassword(password)) : setPasswordd(false);
    rePassword ? setRePassword(!validateRePassword(password, rePassword)) : setRePassword(false);
   
  }, [formik.values]);

  const handleNext = async () => {
    const { email, password } = formik.values;
    if (!email || !password) {
      return setTrigerEmail(true), setPasswordd(true), setRePassword(true);
    }
    if(trigerEmail || trigerPassword || trigerRePassword){
      return setTrigerEmail(true), setPasswordd(true), setRePassword(true);
    }
    try {
      setLoading(true);
      const emailLower = email.toLowerCase()
      const response = await api.Registrasi(emailLower, password);
      const idUser = response?.data?.data?.id;

      setEmail(email);
      setIdUser(idUser);
      setPassword(password)
      
      navigate("/Pilih-Paket");
    } catch (error) {
      console.log(error);
      setEmailDigunakan(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-auto " data-theme="light">
        <div className="grow h-screen overflow-hidden">
          <NavbarSecond />
          <div className="flex flex-col justify-items-center mx-16 mt-10 ">
            <div className="flex justify-center mb-10 text-lg lg:text-xl font-bold">
              Registrasi Akun
            </div>
            <div className="justify-center items-center">
              <ul className=" steps steps-horizontal w-full text-gray-500">
                <li
                  className="step step-info bg-white text-sm"
                  data-content=""
                >
                  Isi Data Akun
                </li>
                <li className="step text-sm" data-content="">
                  Pilih Paket
                </li>
                <li className="step text-sm" data-content="">
                  Pembayaran
                </li>
              </ul>
            </div>
            <div className="relative mt-16 lg:mx-52">
              <Input
                type="text"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              {trigerEmail ? (
                <div className="error-label text-red-500">
                  Masukan alamat email yang valid
                </div>
              ) : null}
              {EmailDigunakan ? (
                <div className="error-label text-red-500">
                 Alamat Email anda sudah digunakan
                </div>
              ) : null}
              <div className="mt-10">
                <InputPassword
                  id="password-regis"
                  label="Kata Sandi"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {trigerPassword ? (
                  <div className="error-label text-red-500">
                    Password Minimal 8 Karakter
                  </div>
                ) : null}
              </div>
              <div className="mt-10">
                <InputPassword
                  id="RetypePassword"
                  label="Konfirmasi Kata Sandi"
                  name="RetypePassword"
                  value={formik.values.RetypePassword}
                  onChange={formik.handleChange}
                />
                {trigerRePassword ? (
                  <div className="error-label text-red-500">
                    Konfirmasi password anda tidak sesuai
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex w-full lg:justify-end items-center mt-5">
              <button
                className="lg:mr-52 capitalize w-full font-bold btn lg:w-40 h-11 px-14 bg-gradient-to-r from-cyan-300 to-indigo-500 rounded justify-center items-center gap-6 flex text-white"
                onClick={handleNext}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Selanjutnya"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;