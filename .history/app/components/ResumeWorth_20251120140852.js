'use client'

import React from 'react'

const ResumeWorth = ({ result }) => {

  

  if (!result || result.trim().length === 0) {
    return (
      <div>
        <h2>AI Analysis Result</h2>
        <p>No result yet.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>AI Analysis Result</h2>

      <div
        style={{
          whiteSpace: "pre-wrap",
          background: "#f7f7f7",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "15px",
          lineHeight: "1.5"
        }}
      >
        {result}
      </div>
    </div>
  );
};

export default ResumeWorth;
