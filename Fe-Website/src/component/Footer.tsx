import footer from "../assets/footer.png";
import {
  AiFillYoutube,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineMail,
} from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div
        className="bg-cover relative w-full lg:h-[35rem] h-[35rem] flex"
        style={{ backgroundImage: `url(${footer})` }}
      >
        <div className="w-full flex justify-center">
          <div className="absolute bottom-0 z-10 w-5/6 flex lg:p-5">
            <div className="flex lg:justify-between w-full mb-5 flex-col lg:flex-row">
              <div className="flex flex-row lg:flex-none lg:gap-x-20">
                <div className="flex flex-col">
                  <ul className="menu menu-vertical px-1 lg:ml-10">
                    <li>
                      <a className="font-extrabold text-xs lg:text-base hover:bg-transparent hover:text-blue-700">
                        Menu
                      </a>
                    </li>
                    <li>
                      <Link
                        to={"/musik"}
                        className=" text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold"
                      >
                        Musik
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/video"}
                        className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold"
                      >
                        Video
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex ml-10">
                  <ul className="menu menu-vertical px-1 lg:ml-10">
                    <li>
                      <a className="font-extrabold hover:bg-transparent hover:text-blue-700">
                        Profil
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-transparent hover:text-blue-700 hover:font-bold">
                        Ganti Akun
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-transparent hover:text-blue-700 hover:font-bold">
                        Perpustakaan
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-transparent hover:text-blue-700 hover:font-bold">
                        Pusat Bantuan
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-row justify-between lg:flex-none lg:gap-x-20 w-full sm:w-fit">
                <div>
                  <ul className="menu menu-vertical px-1 lg:ml-10 font-extrabold">
                    <Link to={"/about"}>
                      <li>
                        <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                          Tentang Kami
                        </a>
                      </li>
                    </Link>

                    <li>
                      <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                        Pembelian Paket
                      </a>
                    </li>
                    <Link to={"/s&k"}>
                      <li>
                        <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                          Syarat & Ketentuan
                        </a>
                      </li>
                    </Link>
                    <li>
                      <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                        Kebijakan Privasi
                      </a>
                    </li>
                    <Link to={"/pusatbantuan"}>
                      <li>
                        <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                          Cara Berlangganan
                        </a>
                      </li>
                    </Link>
                    <Link to={"/pusatbantuan"}>
                      <li>
                        <a className="text-xs lg:text-base hover:bg-transparent hover:text-blue-700 hover:font-bold">
                          Cara Menggunakan Siplah
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div>
                  <ul className="menu menu-vertical  text-start">
                    <li>
                      <a className="font-extrabold hover:bg-inherit text-xs lg:text-base">
                        Kontak
                      </a>
                    </li>
                    <li>
                      <div className="bg-white w-fit h-fit px-5 py-2 rounded-full flex flex-row hover:bg-inherit">
                        <div className="text-cyan-500 text-xl">
                          <BsFillTelephoneFill />
                        </div>

                        <a className="font-bold hover:bg-transparent text-xs lg:text-base">
                          082124018972
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="bg-white w-fit h-fit px-3 py-2 rounded-full flex flex-row mt-2 hover:bg-inherit">
                        <div className="text-cyan-500 text-xl">
                          <AiOutlineMail />
                        </div>
                        <a
                          className="text-xs lg:text-base font-bold hover:bg-transparent"
                          href="mailto:wijigawidyapermata@gmail.com?Subject=Hello"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          wijigawidyapermata@gmail.com
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row mt-2 p-0 w-fit hover:bg-inherit">
                        <div className="bg-white w-fit h-fit p-2 rounded-full hover:bg-inherit">
                          <IconContext.Provider
                            value={{
                              color: "gradient",
                              className: "fill-cyan-400 hover:fill-white",
                            }}
                          >
                            <a
                              href="https://www.youtube.com/@omsinungofficialreal"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiFillYoutube size="1.7rem" />
                            </a>
                          </IconContext.Provider>
                        </div>
                        <div className="bg-white w-fit h-fit p-2 rounded-full hover:bg-inherit">
                          <IconContext.Provider
                            value={{
                              color: "gradient",
                              className: "fill-cyan-400 hover:fill-white",
                            }}
                          >
                            <a
                              href="https://www.instagram.com/omsinung_/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiFillInstagram size="1.7rem" />
                            </a>
                          </IconContext.Provider>
                        </div>
                        <div className="bg-white w-fit h-fit p-2 rounded-full hover:bg-inherit">
                          <IconContext.Provider
                            value={{
                              color: "gradient",
                              className: "fill-cyan-400 hover:fill-white",
                            }}
                          >
                            <a href="">
                              <AiOutlineTwitter size="1.7rem" />
                            </a>
                          </IconContext.Provider>
                        </div>
                        <div className="bg-white w-fit h-fit p-2 rounded-full hover:bg-inherit">
                          <IconContext.Provider
                            value={{
                              color: "gradient",
                              className: "fill-cyan-400 hover:fill-white",
                            }}
                          >
                            <a
                              href="https://www.facebook.com/sinung.widodo.7568"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BiLogoFacebook size="1.7rem" />
                            </a>
                          </IconContext.Provider>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
