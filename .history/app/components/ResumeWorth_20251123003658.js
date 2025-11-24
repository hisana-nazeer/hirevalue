const ResumeWorth = ({ result }) => {
  
  return (
    <div>
      <h3>Resume Worth:</h3>
      {result ? <p>{result}</p> : <p>No result yet...</p>}
    </div>
  );
};
export default ResumeWorth;