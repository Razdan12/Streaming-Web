import React, { FC } from "react";

interface Props {
  children?: React.ReactNode;
  id?: string;
}

const ModalWidht: FC<Props> = ({ children, id }) =>{
  return (
    <div>
      <dialog id={id} className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          {children}
          
        </form>
      </dialog>
    </div>
  );
};

export default ModalWidht;
