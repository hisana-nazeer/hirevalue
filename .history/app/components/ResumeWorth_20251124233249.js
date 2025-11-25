const ResumeWorth = ({ result }) => {
  if (!result) return <p>No result yet...</p>;

  // Extract the value inside <Estimated Worth> ... </Estimated Worth>
  const worthMatch = result.match(/<Estimated Worth>(.*?)<\/Estimated Worth>/);
  const worth = worthMatch ? worthMatch[1] : "N/A";

  // Convert custom XML-like tags to real HTML
  const formatted = result
    .replace(/<Estimated Worth>.*?<\/Estimated Worth>/s, "") // Remove original worth tag
    .replace(/<Explanation>/g, '<div class="mt-4"><h3 class="text-lg font-bold mb-2">Explanation</h3>')
    .replace(/<\/Explanation>/g, '</div>')
    .replace(/<Improvements>/g, '<div class="mt-4"><h3 class="text-lg font-bold mb-2">Improvements</h3>')
    .replace(/<\/Improvements>/g, '</div>')
    .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-1 text-gray-200">');

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-6 shadow-lg text-gray-100 space-y-4">

      <h2 className="text-2xl font-extrabold text-indigo-400">
        Hey dude, your worth is: <span className="text-white">{worth}</span>
      </h2>

      <div dangerouslySetInnerHTML={{ __html: formatted }} />
    </div>
  );
};

export default ResumeWorth;
