import { LayoutSecond } from "../component/Layout";
import siplah from "../assets/siplah.png";
import { PerbaruiButton } from "../component/Button";

const PerbaruiPaket = () => {
  return (
    <LayoutSecond>
      <div className="px-20">
        <div className="font-bold text-2xl text-[#1E2124] text-center  ">
          Perbarui Paket
        </div>
        <div className="flex flex-row py-20 px-5">
          <PerbaruiButton id="paket-biasa">
            <button className="w-full h-full justify-center inline-block px-2 py-1 items-center   font-bold text-[#616161]">
              Paket Normal
            </button>
          </PerbaruiButton>
          <PerbaruiButton id="siplah">
            <img src={siplah} alt="" />
          </PerbaruiButton>
        </div>
        <div className="flex justify-center items-center w-full h-fit my-5"></div>
      </div>
    </LayoutSecond>
  );
};

export default PerbaruiPaket