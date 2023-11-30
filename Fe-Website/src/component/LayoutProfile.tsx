import React, { FC } from "react";
import Sidebar from "./SideBar";
import NavbarProfile from "./NavbarProfile";
import ModalLogout from "./ModalLogout";

interface Props {
  children?: React.ReactNode;
  id?: string;
}
const LayoutProfile: FC<Props> = ({ children, id }) => {
  return (
    <div className={id} data-theme="light">
      <ModalLogout />
      <div className=" w-full">
        <NavbarProfile />
      </div>
      <div className="sm:grid sm:grid-cols-12 flex flex-col">
        <div className="col-span-3 sticky top-0 ">
          <Sidebar />
        </div>
        <div className="col-span-9 pl-5">
          <div className="flex justify-items-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;
