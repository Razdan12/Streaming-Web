
const DataChart = () => {
  return (
    <>
      <div className="flex justify-between gap-4 ">
        <div className="w-60 bg-gradient-to-br from-primary to-secondary h-32 rounded-md">
          <div className="flex items-center justify-center mt-2 text-white font-bold">
            Jumlah User Aktif
          </div>
          <div className="flex justify-center mt-3 text-5xl font-bold text-white">
            <span>545</span>
          </div>
          <span className="flex items-center justify-center mt-2 text-white font-bold">User</span>
        </div>
        <div className="w-60 bg-gradient-to-br from-oren1 to-merah h-32 rounded-md">
        <div className="flex items-center justify-center mt-2 text-white font-bold">
            Jumlah Profil Aktif
          </div>
          <div className="flex justify-center mt-3 text-5xl font-bold text-white">
            <span>545</span>
          </div>
          <span className="flex items-center justify-center mt-2 text-white font-bold">Akun</span>
        </div>
        <div className="w-60 bg-gradient-to-br from-green1 to-green2 h-32 rounded-md">
        <div className="flex items-center justify-center mt-2 text-white font-bold">
            Jumlah Video
          </div>
          <div className="flex justify-center mt-3 text-5xl font-bold text-white">
            <span>545</span>
          </div>
          <span className="flex items-center justify-center mt-2 text-white font-bold">Video</span>
        </div>
        <div className="w-60 bg-gradient-to-br from-green1 to-green2 h-32 rounded-md">
        <div className="flex items-center justify-center mt-2 text-white font-bold">
            Jumlah Musik
          </div>
          <div className="flex justify-center mt-3 text-5xl font-bold text-white">
            <span>545</span>
          </div>
          <span className="flex items-center justify-center mt-2 text-white font-bold">Musik</span>
        </div>
      </div>
    </>
  );
};

export default DataChart;
