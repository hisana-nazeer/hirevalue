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
 return (
  <div
    className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-6 shadow-lg space-y-6
               w-full max-w-none min-w-full"
  >
    <h2 className="text-3xl font-extrabold text-indigo-400">
      Hey dude, your worth is:
      <span className="text-white block mt-2">{worth}</span>
    </h2>

    <div className="bg-gray-800 p-3 rounded-xl shadow-md border border-gray-700">
      <h3 className="text-xl font-bold mb-2 text-indigo-300">
        Why You’re Worth This Much
      </h3>
      <ul
        className="list-disc pl-5 space-y-1 text-gray-300"
        dangerouslySetInnerHTML={{ __html: explanationHTML }}
      />
    </div>

    <div className="bg-gray-800 p-3 rounded-xl shadow-md border border-gray-700">
      <h3 className="text-xl font-bold mb-2 text-indigo-300">
        How You Can Level Up
      </h3>
      <ul
        className="list-disc pl-5 space-y-1 text-gray-300"
        dangerouslySetInnerHTML={{ __html: improvementHTML }}
      />
    </div>
  </div>
);

      </div>

    </div>
  );
};

export default ResumeWorth;
