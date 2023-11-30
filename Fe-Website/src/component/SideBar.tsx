
import { Link, useLocation } from "react-router-dom";
import { BiSolidHelpCircle } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
// import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
 
  // const navigate = useNavigate();

  const Menus = [
    // { title: "Perpustakaan", path: "/perpustakaan", src: <PiArchiveBoxFill /> },
    { title: "Informasi Akun", path: "/informasiakun", src: <CgProfile /> },
    {
      title: "Pusat Bantuan",
      path: "/pusatbantuan",
      src: <BiSolidHelpCircle />,
    },
  ];

  const handleLogout = () => {
    let modalElement = document.getElementById(
      "logout"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  }
  return (
    <>
      <div className="flex sm:flex-col flex-row" data-theme="light">
        <div className="pr-3 w-full  flex flex-row  rounded-2xl sticky duration-300 ">
          <ul className="mt-0 sm:mt-12   w-full flex sm:grid">
            {Menus.map((menu, index) => (
              <Link to={menu.path} key={index}>
                <li
                  className={`flex flex-col sm:flex-row items-center gap-x-6 py-3 pr-6 pl-6 text-base font-normal cursor-pointer mt-2
                  ${
                    location.pathname === menu.path &&
                    "bg-[#E0F7FA] sm:border-s-8 border-s-cyan-500 border-b-8 sm:border-b-0 border-b-cyan-500"
                  }`}
                >
                  <span className="text-2xl">{menu.src}</span>
                  <span className="origin-left duration-300 hover:block sm:flex hidden">
                    {menu.title}
                  </span>
                </li>
              </Link>
            ))}
            <label onClick={handleLogout} className="cursor-pointer">
              <li className="flex items-center gap-x-6  py-6 pr-3 pl-6 text-red-500">
                <span className="text-2xl">
                  <RiLogoutBoxRLine />
                </span>
                <span className="origin-left duration-300 hover:block">
                  Keluar
                </span>
              </li>
            </label>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
