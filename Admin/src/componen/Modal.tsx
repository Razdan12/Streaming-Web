import React, { FC } from "react";

interface Props {
  children?: React.ReactNode;
  id?: string;
}

export const Modals: FC<Props> = ({ children, id }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box scrollbar-hide">{children}</div>
      </div>
    </>
  );
};