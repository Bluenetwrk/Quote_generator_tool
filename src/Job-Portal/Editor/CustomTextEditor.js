import React, { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";


// Register fonts
const Font = Quill.import("formats/font");
Font.whitelist = [
  "sans-serif", "serif", "monospace", "arial", "comic-sans",
  "courier-new", "georgia", "helvetica", "lucida",
];
Quill.register(Font, true);

const CustomToolbar = ({ onYouTubeClick }) => (
  <>
    <style>{`
      .ql-font {
        height: 36px;
        min-width: 160px;
        font-size: 14px;
        padding-right: 55px;
      }
      .ql-font .ql-picker-options {
        max-height: 120px;
        overflow-y: auto;
      }
    `}</style>

    <div id="toolbar" style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ display: "flex" }}>
        <span className="ql-formats" style={{ display: "flex" }}>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <select className="ql-font" defaultValue="">
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="arial">Arial</option>
            <option value="comic-sans">Comic Sans</option>
            <option value="courier-new">Courier New</option>
            <option value="georgia">Georgia</option>
            <option value="helvetica">Helvetica</option>
            <option value="lucida">Lucida</option>
          </select>
        </span>
      </div>
      {/* <div >  */}
        <span className="ql-formats" style={{marginLeft:"-10px"}}>
          <select className="ql-size" defaultValue="medium">
            <option value="small" />
            <option value="medium" />
            <option value="large" />
            <option value="huge" />
          </select>
        </span>

        <span className="ql-formats">
          <select className="ql-color" />
          <select className="ql-background" />
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
        </span>
        <span className="ql-formats">
          <button onClick={onYouTubeClick} type="button">
            <i className="fab fa-youtube" style={{ color: "#FF0000", marginRight: 5, fontSize: "20px" }}></i>
          </button>
        </span>
      {/* </div> */}
    </div>
  </>
);

export default function CustomTextEditor({ value, onChange }) {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const quillRef = useRef(null);



  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleEmbed = () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return alert("Invalid YouTube URL");

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    editor.insertText(range.index, "\n", "user");
    editor.insertEmbed(range.index + 1, "video", embedUrl, "user");
    editor.setSelection(range.index + 2, "silent");

    setShowModal(false);
    setVideoUrl("");
  };

  return (
    <div style={{ padding: "20px", width: "100%", marginLeft: "-20px", marginTop: "-20px" }}>
      <CustomToolbar onYouTubeClick={() => setShowModal(true)} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={CustomTextEditor.modules}
        formats={CustomTextEditor.formats}
        style={{ height: "200px" }}
        placeholder="Start writing..."
      />

      {/* YouTube Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "#fff", padding: 20, width: "500px", borderRadius: 8 }}>
            <h3>Embed YouTube Video by URL</h3>
            <input
              type="text"
              placeholder="Paste YouTube video URL..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
            <button onClick={handleEmbed} style={{ marginRight: 10 }}>
              Embed
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

CustomTextEditor.modules = {
  toolbar: {
    container: "#toolbar",
  },
};

CustomTextEditor.formats = [
  "bold", "italic", "underline", "strike",
  "font", "size", "color", "background",
  "list", "bullet", "align", "video"
];
