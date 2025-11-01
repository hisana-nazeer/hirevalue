import React from 'react'

const ResumeWorth = ({result}) => {


     if (result!=null){
     console.log("result received in ResumeWorth:", result);
}
  return (
    <div>
     <h2>AI Analysis Result</h2>
      <pre>{result}</pre>
    </div>
  )
}

export default ResumeWorth
