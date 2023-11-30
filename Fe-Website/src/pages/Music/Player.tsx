import { FC } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./player.css";

interface PlayerMusik {
  url: string | null;
}
const Player: FC<PlayerMusik> = ({ url }) => {
  return (
    <>
      <div className=" w-full ">
        <AudioPlayer
          src={`${import.meta.env.VITE_REACT_API_URL}/streaming/audio/${url}`}
          style={{ backgroundColor: "transparent" }}
          className="custom-player"
          customIcons={{
            play: <FaPlay className="text-cyan-400" />,
            pause: <FaPause className="text-cyan-400" />,
            volume: <FaVolumeUp className="text-cyan-400" />,
          }}
          showJumpControls={false}
          showDownloadProgress={false}
          showSkipControls={false}
        />
      </div>
    </>
  );
};

export default Player;
