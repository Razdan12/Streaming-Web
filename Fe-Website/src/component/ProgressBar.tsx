export const ProgressBar = () => {
  return (
    <>
      <div className="justify-center items-center">
        <ul className="steps steps-vertical lg:steps-horizontal w-full text-gray-500">
          <li className="step step-info bg-white">Isi Data Akun</li>
          <li className="step">Pilih Paket</li>
          <li className="step">Pembayaran</li>
        </ul>
      </div>
      {/* <div className="flex pb-3 justify-around">
        <div className="flex-1"></div>

        <div className="flex">
          <div className="w-10 h-10 bg-cyan-300 mx-auto rounded-full text-lg text-white flex items-center">
            <progress
              className="progress progress-info w-56 absolute bg-gray-200"
              value="0"
              max="0"
            ></progress>
            <div className="text-white text-center w-full relative">
              <p className="font-bold w-full fill-current white">1</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 align-center items-center align-middle content-center flex">
          <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
            <div className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded w-full"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-gray-300 mx-auto rounded-full text-lg text-white flex items-center">
            <div className="text-white text-center w-full">
              <p className="font-bold w-full fill-current white">2</p>
            </div>
          </div>
        </div>

        <div className="w-1/3 align-center items-center align-middle content-center flex">
          <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
            <div className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded w-1/5"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-gray-300 border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
            <div className="text-grey-darker text-center w-full">3</div>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex text-xs justify-between text-center text-gray-500">
        <div className="w-1/6">Isi Data Akun</div>

        <div className="w-1/6">Pilih Paket</div>

        <div className="w-1/6">Pembayaran</div>
      </div> */}
    </>
  );
};
