const ResumeWorth = ({ result }) => {
  if (!result) return <p>No result yet...</p>;

  const { worth, explanationHtml, improvementsHtml } = parseResult(result);

  return (
    <div>
      <h3>Estimated Worth: {worth}</h3>

      <h4>Explanation</h4>
      <div dangerouslySetInnerHTML={{ __html: explanationHtml }} />

      <h4>Improvements</h4>
      <div dangerouslySetInnerHTML={{ __html: improvementsHtml }} />
    </div>
  );
};
