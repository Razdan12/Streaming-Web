import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Editor = () => {
  const [value, setValue] = useState<any>("");

  return (
    <div className="bg-white">
      <div className="w-full" 
      dangerouslySetInnerHTML={{__html: value}}/>
      <div className="w-full mt-10">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default Editor;
