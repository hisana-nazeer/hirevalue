const ResumeWorth = ({ result }) => {

  if (!result) return <p>No result yet...</p>;

  const formatted = result
    .replace(/<Estimated Worth>/g, '<h2 class="text-xl font-semibold text-indigo-400">')
    .replace(/<\/Estimated Worth>/g, '</h2>')
    .replace(/<Explanation>/g, '<div class="mt-4"><h3 class="text-lg font-bold mb-2">Explanation</h3>')
    .replace(/<\/Explanation>/g, '</div>')
    .replace(/<Improvements>/g, '<div class="mt-4"><h3 class="text-lg font-bold mb-2">Improvements</h3>')
    .replace(/<\/Improvements>/g, '</div>')
    // close <ul> automatically if needed
    .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-1 text-gray-200">');

  return (
    <div
      className="bg-gray-800 p-6 rounded-xl mt-6 shadow-md text-gray-100">
        
      </div>
      
      dangerouslySetInnerHTML={{ __html: formatted }}
    />
  );
};

export default ResumeWorth;
