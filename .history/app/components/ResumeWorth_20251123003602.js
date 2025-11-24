
  const ResumeWorth = ({ resumeWorth }) => {
  // Extract sections using regex
  const estimatedWorthMatch = resumeWorth.match(
    /<Estimated Worth>\$(.+?)<\/Estimated Worth>/
  );
  const explanationMatch = resumeWorth.match(
    /<Explanation>([\s\S]*?)<\/Explanation>/
  );
  const improvementsMatch = resumeWorth.match(
    /<Improvements>([\s\S]*?)<\/Improvements>/
  );

  const estimatedWorth = estimatedWorthMatch
    ? estimatedWorthMatch[1]
    : "N/A";

  const explanation = explanationMatch ? explanationMatch[1] : "";
  const improvements = improvementsMatch ? improvementsMatch[1] : "";

  // Extract individual <li> items
  const explanationItems = explanation.match(/<li>(.+?)<\/li>/g);
  const improvementItems = improvements.match(/<li>(.+?)<\/li>/g);

  return (
    <div>
      <h3>Resume Worth:</h3>
      {result ? <p>{}</p> : <p>No result yet...</p>}
    </div>
  );
};
export default ResumeWorth;