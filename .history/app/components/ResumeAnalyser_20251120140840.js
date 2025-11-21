'use client'
import { useEffect, useState } from "react"
import ResumeWorth from "./ResumeWorth";
import { useCompletion } from "@ai-sdk/react";
import styles from "../styles/ResumeAnalyser.module.css"

const ResumeAnalyser=({ text }) => {
  

  const [isLoadingResume, setIsLoadingResume] = useState(false);

  // useCompletion now sends prompt (resume text only)
  const { completion, isLoading, complete } = useCompletion({
    api: '/api/resume'
  });

  useEffect(() => {
    if (text && text.trim().length > 50) {
      setIsLoadingResume(true);

      complete(text)
      .finally(() => {
        setIsLoadingResume(false);
      });
    }
  }, [text]);

  return (
    <div>
      {(isLoadingResume || isLoading) ? (
        <div className={styles.loadingContainer} />
      ) : (
        <ResumeWorth result={completion} />
      )}
    </div>
  );
}

export default ResumeAnalyser;
