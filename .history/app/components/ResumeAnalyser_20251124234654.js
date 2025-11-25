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
      console.log("Frontend received:", data);

      setResult(data);
      setIsLoading(false);
    }

    fetchWorth();
  }, [text]);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center mt-10 p-6 text-gray-600">
          <p className="text-lg font-medium mb-4 animate-pulse">
            Thinking… just a moment!
          </p>

          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-3 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      ) : (
        <ResumeWorth result={result} />
      )}
    </div>
  );
};

export default ResumeAnalyser;
