const ResumeWorth = ({ result }) => {
  if (!result) return <p>No result yet...</p>;

  const worthMatch = result.match(/<Estimated Worth>(.*?)<\/Estimated Worth>/);
  const worth = worthMatch ? worthMatch[1] : "N/A";

  const explanationMatch = result.match(/<Explanation>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const explanationHTML = explanationMatch
    ? explanationMatch[1].replace(/<li>/g, "<li class='mb-1'>")
    : "";

  const improvementMatch = result.match(/<Improvements>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const improvementHTML = improvementMatch
    ? improvementMatch[1].replace(/<li>/g, "<li class='mb-1'>")
    : "";

  return (
 
      </div>

    </div>
  );
};

export default ResumeWorth;
