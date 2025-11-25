const ResumeWorth = ({ result }) => {
  if (!result) return <p>No result yet...</p>;

  const worthMatch = result.match(/<Estimated Worth>(.*?)<\/Estimated Worth>/);
  const worth = worthMatch ? worthMatch[1] : "N/A";

  const explanationMatch = result.match(/<Explanation>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const explanationHTML = explanationMatch
    ? explanationMatch[1].replace(/<li>/g, "<li class='mb-1 leading-relaxed'>")
    : "";

  const improvementMatch = result.match(/<Improvements>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const improvementHTML = improvementMatch
    ? improvementMatch[1].replace(/<li>/g, "<li class='mb-1 leading-relaxed'>")
    : "";

  return (
    <div className="w-2xl flex justify-center mt-10 mb-20 ">
      <div className="max-w-2xl px-2 w-full bg-gray-900 text-gray-100 p-8 rounded-xl shadow-xl space-y-10 ">

        {/* Worth */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-400">
            Hey dude, your worth is:
          </h2>
          <p className="text-4xl  font-extrabold text-white mt-2 fo ">{worth}</p>
        </div>

        {/* Explanation Block */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Where you shine!
          </h3>

          <ul
            className="list-disc pl-6 space-y-2  text-gray-300 "
            dangerouslySetInnerHTML={{ __html: explanationHTML }}
          />
        </div>

        {/* Improvements Block */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            How You Can Level Up!
          </h3>

          <ul
            className="list-disc pl-6 space-y-2 text-gray-300"
            dangerouslySetInnerHTML={{ __html: improvementHTML }}
          />
        </div>

      </div>
    </div>
  );
};

export default ResumeWorth;
