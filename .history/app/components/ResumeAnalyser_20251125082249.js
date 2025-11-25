'use client'
import { useEffect, useState } from "react";
import ResumeWorth from "./ResumeWorth";

const ResumeAnalyser = ({ text }) => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchWorth() {
      if (!text || text.trim().length < 20) return;

      setIsLoading(true);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: text
      });

      const data = await response.text();
      setResult(data);
      setIsLoading(false);
    }

    fetchWorth();
  }, [text]);

  return (
    <div className="mt-6">
      {isLoading ? (
       
      ) : (
        <ResumeWorth result={result} />
      )}
    </div>
  );
};

export default ResumeAnalyser;
