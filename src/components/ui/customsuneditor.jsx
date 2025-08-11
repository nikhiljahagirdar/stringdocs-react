import React, { useEffect, useRef } from "react";
import SunEditor from "suneditor";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";

const CustomSunEditor = ({
  height = "400px",
  defaultValue = "",
  onChange,
  setOptions = {},
}) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = SunEditor.create(containerRef.current, {
        height,
        buttonList: [
          ["undo", "redo"],
          ["bold", "italic", "underline", "strike"],
          ["list", "align", "font", "fontSize"],
          ["link", "image", "video"],
          ["codeView", "preview"],
        ],
        ...setOptions,
      });

      editorRef.current.setContents(defaultValue);
      editorRef.current.onChange = onChange;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [defaultValue, height, onChange, setOptions]);

  return <div ref={containerRef}></div>;
};

export default CustomSunEditor;
