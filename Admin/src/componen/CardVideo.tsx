import React, { FC } from "react";

export interface VideoProps {
  thumbnail?: string;
  judul: string;
  jenjang: string;
  kategori: string
  children?: React.ReactNode;
}
const CardVideo: FC<VideoProps> = ({
  thumbnail,
  judul,
  jenjang,
  kategori,
  children,
}) => {
  return (
    <div>
      <div className="card w-72 bg-base-100 shadow-xl">
        <figure className="px-5 pt-5">
          <img src={thumbnail} alt={judul} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{judul}</h2>
          <div className="flex gap-1 justify-center items-center">
            <div className="badge badge-primary">{jenjang}</div>
            <div className="badge badge-secondary">{kategori}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardVideo;
