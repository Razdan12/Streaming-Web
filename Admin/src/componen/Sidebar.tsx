import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../Router/Store/Store";
import {
  BsSpeedometer2,
  BsClipboardData,
  BsCreditCard,
  BsFillGearFill,
} from "react-icons/bs";
const Sidebar = () => {
  const { removeToken } = useStore();
  const navigate = useNavigate();
  const HandleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div>
      <div>
        <ul className="menu p-4 min-h-screen  bg-gradient-to-tl from-blue-500 to-cyan-600 text-white top-0 sticky shadow-md">
          <div className="w-full flex justify-between items-center mb-10 mt-5">
            <div className="flex flex-col">
              <span className="text-xl font-bold "> Welcome Back</span>
              <span>Admin</span>
            </div>
            <div className="avatar mr-4">
              <div className="w-12 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
              </div>
            </div>
          </div>
          <li className="font-medium">
            <Link to={"/"}>
              <div className="flex gap-3 items-center">
                <span className="text-xl">
                  <BsSpeedometer2 />
                </span>
                <a> Dashboard</a>
              </div>
            </Link>
          </li>

          <div className="join join-vertical w-full">
            <div className="collapse  collapse-arrow join-item ">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-medium flex gap-3">
                <span className="text-xl">
                  <BsClipboardData />
                </span>
                Kelola Konten
              </div>
              <div className="collapse-content">
                <li>
                  <Link to={"/kategori"}>
                    <a>Kategori</a>
                  </Link>
                </li>
                <li>
                  <Link to={"/banner"}>
                    <a>Banner</a>
                  </Link>
                </li>
                <li>
                  <Link to={"/video"}>
                    <a>Video</a>
                  </Link>
                </li>

                <li>
                  <Link to={"/musik"}>
                    <a>Musik</a>
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/paket-video"}>
                    <a>Paket Video & Musik</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={"/paket-musik"}>
                    <a>Paket Musik</a>
                  </Link>
                </li> */}
              </div>
            </div>
            <div className="collapse collapse-arrow join-item ">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-medium flex gap-3">
                <span className="text-xl">
                  <BsCreditCard />
                </span>
                Transaksi
              </div>
              <div className="collapse-content ">
                <li>
                  <Link to={"/paket"}>
                    <a>Paket Langganan</a>
                  </Link>
                </li>
                <li>
                  <Link to={"/payment"}>
                    <a>Histori Pembayaran</a>
                  </Link>
                </li>
                <li>
                  <Link to={"/siplah"}>
                    <a>Siplah</a>
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/voucher"}>
                    <a>Voucher</a>
                  </Link>
                </li> */}
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-medium flex gap-3">
                <span className="text-xl">
                  <BsFillGearFill />
                </span>
                Pengaturan
              </div>
              <div className="collapse-content ">
                <li>
                  <Link to={"/faq"}>
                    <a>FAQ</a>
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/"}>
                    <a>Avatar</a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={"/"}>
                    <a>Menu</a>
                  </Link>
                </li> */}
                <li>
                  <Link to={"/user"}>
                    <a>Akun User</a>
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/"}>
                    <a>User Admin</a>
                  </Link>
                </li> */}
              </div>
            </div>
          </div>
          <div className="w-full min-h-full relative justify-center items-end mt-10">
            <button
              className=" absolute btn  w-full top-20"
              onClick={HandleLogout}
            >
              Logout
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
