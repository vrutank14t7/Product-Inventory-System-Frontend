import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import InputError from "../Basic/InputError";


const Editor = ({
  name = "description",
  defaultValue = null,
  placeholder = "enter description....",
  error = null,
  handleChange = (name, value) => { },
}) => {
  const [editorContent, setEditorContent] = useState(null);

  const onChange = (content, delta, source, editor) => {
    setEditorContent(content);
    handleChange(name, content);
  };

  useEffect(() => {
    if (defaultValue) {
      setEditorContent(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={onChange}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={placeholder}
      />
      {
        error ? (
          <div style={{ textAlign: "center" }}>
            <InputError message={error} />
          </div>
        ) : (
          ""
        )
      }</div>
  );
};

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link",],
    ["clean"],
  ],
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
  "align",
];

export default Editor;
