const Home=()=>{
    return(
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
           <input type='file' 
                className="file"/>
           <button className="upload-button">Upload Resume</button>

           </div>
                
        </div>
    )
}
export default Home;