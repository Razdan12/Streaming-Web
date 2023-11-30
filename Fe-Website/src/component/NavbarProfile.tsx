import { MdKeyboardArrowLeft } from "react-icons/md";
import Logo from "../assets/logo.png";
import { Link} from "react-router-dom";

const NavbarProfile = () => {
  return (
    <nav className="bg-white border-gray-200 mx-2 px-2 py-2.5 shadow-sm rounded">
      <div className="mx-auto flex justify-between items-center pr-4">
        <Link to={"/"}>
          <div>
            <img src={Logo} alt="" />
          </div>
        </Link>

        <Link to={"/"}>
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl text-gray-400">
              <MdKeyboardArrowLeft />
            </span>
            <span className="text-xl font-medium whitespace-nowrap">Back</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarProfile;
