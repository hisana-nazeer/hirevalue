'use client';
import React from "react";

const ResumeWorth = ({ result }) => {
  
  if (!result || result.trim().length === 0) {
    return (
      <div style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
        No resume analysis available yet.
      </div>
    );
  }

  // The API returns something like:
  // <Estimated Worth>$1000</Estimated Worth>
  // <Explanation>...</Explanation>
  // <Improvements>...</Improvements>

  // Extract sections (very forgiving parsing)
  const extractSection = (tag) => {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i");
    const match = result.match(regex);
    return match ? match[1].trim() : "";
  };
console.log("ResumeWorth result:", result);
console.log("Extracted Worth:", extractSection("Estimated Worth"));
  const worth = extractSection("Estimated Worth");
  const explanation = extractSection("Explanation");
  const improvements = extractSection("Improvements");

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      lineHeight: "1.6",
    }}>

      {/* Estimated Worth */}
      <h2 style={{ marginBottom: "8px" }}>
        Estimated Worth
      </h2>
      <div style={{
        fontSize: "22px",
        fontWeight: "bold",
        color: "#2a7ae4",
        marginBottom: "20px"
      }}>
        {worth || "N/A"}
      </div>


      {/* Explanation */}
      <h3 style={{ marginBottom: "5px" }}>
        Why You Got This Score
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: explanation }}
        style={{ marginBottom: "20px" }}
      />


      {/* Improvements */}
      <h3 style={{ marginBottom: "5px" }}>
        How To Improve It Further
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: improvements }}
      />

    </div>
  );
};

export default ResumeWorth;
