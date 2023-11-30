import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {Api} from "../Router/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "../Router/Store/Store";
import Bg from "../assets/bg.png"
 
const schema = Yup.object({
  email: Yup.string().required("email required"),
  password: Yup.string().required("Password required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken } = useStore();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const HandleLogin = async () => {
    const { email, password } = formik.values;
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please check your username or password again!",
      });
      return;
    }
    try {
      setLoading(true);
      const emailLower = email.toLowerCase()
      const response = await Api.Login(emailLower, password);

      const role = response.data.data.role;
      if (role === "admin") {
        setToken(response.data?.data?.token);
        navigate("/");
      
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda Bukan Admin",
          });
      }
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please make sure your username and password are correct!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen">
        <img
          src={Bg}
          className="absolute inset-0 object-cover object-center w-full h-full transition"
          alt=""
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-2/5 p-5 bg-white rounded-xl">
            <div className="w-5/6">
              <div className="flex items-center justify-center">
                <img src={Logo} alt="logo" className="w-52 mb-4" />
              </div>
              <div className="flex items-center justify-center w-full">
                <p className="text-3xl font-bold text-black">Welcome Back</p>
              </div>
              <div className="flex items-center justify-center w-full">
                <p className="mt-2 text-md text-black">
                  Please Enter Your Detail to Sign in
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  className="h-12 p-3 rounded-md bg-white shadow-lg text-black"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <input
                  id="password"
                  placeholder="password"
                  className="h-12 p-3 rounded-md bg-white shadow-lg text-black"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                />

                <a
                  type="button"
                  id="eyeIcon"
                  className="absolute mt-4 text-xl text-gray-800 bottom-6 right-4"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </a>
              </div>

              <div
                id="btn-login"
                className="hover:cursor-pointer mt-10 mb-10 w-full h-12 rounded-xl bg-gradient-to-r from-[#73A9E9] to-[#854A7A] flex justify-center items-center transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#854A7A] hover:to-[#73A9E9]"
                onClick={HandleLogin}
              >
                {loading ? (
                  <span className="text-white loading loading-dots loading-lg"></span>
                ) : (
                  <p className="text-xl font-bold text-white">Login</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
