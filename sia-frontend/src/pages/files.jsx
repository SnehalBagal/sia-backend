import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Files() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "import.meta.env.VITE_API_URL/files",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setFiles(res.data);
  };

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("Please select a file");
        return;
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        "import.meta.env.VITE_API_URL/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("File uploaded successfully");

      fetchFiles();

    } catch (err) {
      console.log(err);
      alert("File upload failed");
    }
  };

  const downloadFile = async (fileId, filename) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `import.meta.env.VITE_API_URL/download-file/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Files</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button onClick={uploadFile}>
          Upload File
        </button>

        <h2 style={{ marginTop: "40px" }}>
          Uploaded Files
        </h2>

        {files.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "10px"
            }}
          >
            <p>
              <b>File:</b> {item.filename}
            </p>

            <p>
              <b>Uploaded By:</b> {item.uploaded_by}
            </p>

            <button
              onClick={() =>
                downloadFile(item.id, item.filename)
              }
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}