import React, { FC, Suspense } from "react";
import Navbar, { NavbarSecond } from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";
import { ModalWarning } from "./Modals";
import { Link } from "react-router-dom";

interface layout {
  children: React.ReactNode;
  id?: string;
}
const Layout: FC<layout> = ({ children, id }) => {
  const ModalLogin = React.lazy(() => import("./ModalLogin"));
  const ModalLogout = React.lazy(() => import("./ModalLogout"));

  return (
    <>
      <div className={id} data-theme="light">
        <ModalWarning id="sesiLogin">
          <div className="w-full flex justify-center flex-col items-center">
            <div className="text-2xl font-bold mt-5">
              Anda Belum Memiliki Paket
            </div>
            <div className="text-md items-center text-center mt-5">
              Silahkan pilih paket sesuai dengan kebutuhan Anda, pilihan paket
              dapat diakses dalam laman berikut
            </div>
            <form method="dialog w-full">
              {/* if there is a button in form, it will close the modal */}
              <Link to={"pilih-paket"}>
                <button className="btn py-4 px-2 mt-5 bg-cyan-500 w-full flex justify-center font-bold text-white rounded-md cursor-pointer ">
                  Pilih Paket
                </button>
              </Link>
            </form>
          </div>
        </ModalWarning>
        <div className="top-0 z-50 w-full sticky ">
          <Navbar />
        </div>
        <div className="overflow-x-hidden w-full text-black mb-10 mt-1 z-0">
          <Suspense fallback={<Loading />}>
            <ModalLogout />
            <ModalLogin />
          </Suspense>
          {children}
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export const LayoutSecond: FC<layout> = ({ children, id }) => {
  return (
    <>
      <div className={id}>
        <div className="sticky top-0 z-30 w-full">
          <NavbarSecond />
        </div>
        <div className="overflow-x-hidden w-full   p-20">{children}</div>
      </div>
    </>
  );
};

export const LayoutPlay: FC<layout> = ({ children, id }) => {
  return (
    <div className={id} data-theme="light">
      <div className="w-full ">
        <div className="sticky top-0 z-30  w-full shadow-md">
          <Navbar />
        </div>
        <div className="overflow-x-hidden w-full">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
