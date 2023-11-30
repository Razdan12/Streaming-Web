import React, { useState, useEffect } from "react";
import "react-custom-otp/dist/index.css";
import { Input, InputPassword } from "./Input";
import api from "../Api/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Store";
import { Modals } from "./Modals";

const LoginSchema = Yup.object({
  email: Yup.string().required("Email required"),
  password: Yup.string().required("Password required"),
});

const ModalLogin: React.FC = () => {
  const { setSecretKey , setEmail, setPassword, setIdUser} = useStore();
  const navigate = useNavigate();
  const [tEmail, setTEmail] = useState<boolean>(false);
  const [tpassword, setTPassword] = useState<boolean>(false);
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email && emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
    return password && password.length >= 8;
  };

  useEffect(() => {
    const email = formikLogin.values.email;
    const password = formikLogin.values.password;

    email ? setTEmail(!validateEmail(email)) : setTEmail(false);
    password ? setTPassword(!validatePassword(password)) : setTPassword(false);
  }, [formikLogin.values]);

  const handleLogin = async () => {
    const { email, password } = formikLogin.values;

    try {
      const emailLower = email.toLowerCase()
      const response = await api.login(emailLower, password);
      const idUser = response.data?.data?.idUser
      const token = response.data?.data?.token;

      if (token === "expired") {
        setEmail(email)
        setPassword(password)
        setIdUser(idUser)
        handleLogout();
      } else {
        navigate("/pilihakun");
        setSecretKey(response.data?.data?.token);
      }
    } catch (error) {
      setTEmail(true);
      setTPassword(true);
    }
  };

  const handleLogout = () => {
    let modalElement = document.getElementById(
      "sesiLogin"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <div id="login">
      <Modals id="modal-login">
        <label
          htmlFor="modal-login"
          className="btn btn-sm absolute right-2 top-2 text-black"
        >
          ✕
        </label>
        <div className="flex justify-center mb-2 text-xl font-bold">
          Masuk Akun
        </div>
        <div className="flex items-center justify-center w-full mb-10">
          <p className="mt-2 text-md text-gray-400">
            Belum Punya Akun?{" "}
            <a className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Daftar
            </a>
          </p>
        </div>
        <div className="relative mt-5">
          <Input
            type="text"
            id="email"
            name="email"
            label="Email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
          />
          {tEmail ? (
            <div className="error-label text-red-500">
              Masukan alamat email yang valid
            </div>
          ) : null}
        </div>
        <div className="relative mt-10">
          <InputPassword
            id="password"
            type="password"
            label="Kata Sandi"
            name="password"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
          />
          {tpassword ? (
            <div className="error-label text-red-500">
              Kata Sandi Minimal 8 Karakter
            </div>
          ) : null}
        </div>
        <div className="w-full flex justify-end py-5">
          <p className="font-base">Lupa Password?</p>
        </div>
        <button
          id="btn-modal-login"
          className="hover:cursor-pointer mt-5 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-center items-center"
          onClick={handleLogin}
        >
          <label
            className="text-xl font-bold text-white cursor-pointer"
            htmlFor={tEmail ? "" : "modal-login"}
          >
            Masuk
          </label>
        </button>
      </Modals>
    </div>
  );
};

export default ModalLogin;
