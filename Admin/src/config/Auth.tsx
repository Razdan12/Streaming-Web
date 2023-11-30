import React, { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {Api} from "../Router/Api";
import { useStore } from "../Router/Store/Store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [userCek, setUserCek] = useState<string | null>(null);
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false); // State untuk mengontrol navigasi
  const { token } = useStore();


  useEffect(() => {
    const cekUser = async () => {
      try {
        const response = await Api.GetInfoUser(token);
        setUserCek(response?.data?.data?.role);
      } catch (error) {
        console.log(error);
        setUserCek(null);
        setShouldNavigate(true);
      }
    };

    cekUser();
  }, [token]);

  useEffect(() => {
    if (!userCek && shouldNavigate) {
      const timeout = setTimeout(() => {
        setShouldNavigate(false);
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [userCek, shouldNavigate]);

  if (shouldNavigate) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
