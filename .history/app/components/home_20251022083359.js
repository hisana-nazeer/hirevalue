import React, { useState } from "react";

const Home = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    if (!file) {
      alert("Please upload a PDF first!");
      return;
    }
    console.log("Resume uploaded:", file);
  };

  const handleFileChange = (e) => {
    // e.target.files gives a FileList, so we get the first file
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload your resume and find your hire value!</h1>

      <div className="upload-container">
        <input
          type="file"
          className="file-upload"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <button className="upload-button" onClick={handleSubmit}>
          Upload Resume
        </button>

        {file && (
          <p style={{ marginTop: "10px" }}>
            Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
