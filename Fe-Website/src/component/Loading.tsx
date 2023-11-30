import gif from "../assets/Glass spheres.gif";

const Loading = () => {
  return (
    <>
      <div
        className="w-screen h-screen flex flex-col justify-center items-center animate-pulse"
        data-theme="light"
      >
        <span className="text-md ">Loading...</span>
        <div>
          <img src={gif} alt="loading" />
        </div>
      </div>
    </>
  );
};

export default Loading;
