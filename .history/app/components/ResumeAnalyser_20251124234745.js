'use client'
import { useEffect, useState } from "react";
import ResumeWorth from "./ResumeWorth";
import styles from "../styles/ResumeAnalyser.module.css";

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

      const data = await response.text();   // <-- important
      console.log("Frontend received:", data);

      setResult(data);
      setIsLoading(false);
    }

    fetchWorth();
  }, [text]);

  return (
    <div>
      {isLoading ? (
        <div className={styles.loadingContainer} />
      ) : (
        <ResumeWorth result={result} />
      )}
    </div>
  );
};

export default ResumeAnalyser;
