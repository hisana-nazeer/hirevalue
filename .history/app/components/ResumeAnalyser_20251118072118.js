'use client'
import { useEffect, useState } from "react"
import ResumeWorth from "./ResumeWorth";
import { useCompletion } from "@ai-sdk/react";
import styles from "../styles/ResumeAnalyser.module.css"

const ResumeAnalyser = ({ text }) => {
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  const { completion, isLoading, complete } = useCompletion({
    api: '/api/resume',
  });

  useEffect(() => {
    const getResumeWorth = async () => {
      setIsLoadingResume(true);

      await complete({
        messages: [
          {
            role: "user",
            content: `RESUME:\n${text}`
          }
        ]
      });
    };

    if (text && text.trim().length > 50) {
      getResumeWorth();
    }
  }, [text]);

  return (
    <div>
      {(isLoadingResume || isLoading) ? (
        <div className={styles.loadingContainer}></div>
      ) : (
        <ResumeWorth result={completion} />
      )}
    </div>
  );
};

export default ResumeAnalyser;
