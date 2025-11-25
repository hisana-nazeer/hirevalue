const ResumeWorth = ({ result }) => {
  if (!result) return <p>No result yet...</p>;

  // Extract the worth
  const worthMatch = result.match(/<Estimated Worth>(.*?)<\/Estimated Worth>/);
  const worth = worthMatch ? worthMatch[1] : "N/A";

  // Extract Explanation bullets
  const explanationMatch = result.match(/<Explanation>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const explanationHTML = explanationMatch
    ? explanationMatch[1].replace(/<li>/g, "<li class='mb-1'>")
    : "";

  // Extract Improvements bullets
  const improvementMatch = result.match(/<Improvements>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const improvementHTML = improvementMatch
    ? improvementMatch[1].replace(/<li>/g, "<li class='mb-1'>")
    : "";

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-6 shadow-lg space-y-8">

      {/* Worth */}
      <h2 className="text-3xl font-extrabold text-indigo-400">
        Hey dude, your worth is:
        <span className="text-white block mt-2">{worth}</span>
      </h2>

      {/* Explanation Block */}
      <div className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700">
        <h3 className="text-xl font-bold mb-3 text-indigo-300">
          
        </h3>

        <ul
          className="list-disc pl-6 space-y-1 text-gray-300"
          dangerouslySetInnerHTML={{ __html: explanationHTML }}
        />
      </div>

      {/* Improvements Block */}
      <div className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700">
        <h3 className="text-xl font-bold mb-3 text-indigo-300">
          How You Can Level Up
        </h3>

        <ul
          className="list-disc pl-6 space-y-1 text-gray-300"
          dangerouslySetInnerHTML={{ __html: improvementHTML }}
        />
      </div>
      
    </div>
  );
};

export default ResumeWorth;
