import React,{useState, useContext} from 'react';
import { GoogleContext } from '../context/context';
import './style.css';

const GoogleDrive = () => {

    const { uploadToGoogleDrive } = useContext(GoogleContext);
    const [uploadFiles, setUploadFiles] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        uploadToGoogleDrive(uploadFiles)
    }

      //file uploading
    const onChangeFileUpload = (event) => {
        let uploadedFile = event.target.files[0];
        //set the state
        setUploadFiles(uploadedFile);
        
    }
    return ( 
        <div className="registration-form">
	        <br/><br/><br/><br/><br/><br/><br/><br/>
        <form onSubmit={onSubmit}>
		    <h3 style={{textAlign:"center"}}>Pay to GO</h3>
		    <br/>
                <div className="form-group">
                    <input style={{borderRadius:"20px"}} type="file" className="custom-file-input form-control item" 
                    id="customFile" name="filename" accept={'image/png,image/jpeg'} onChange={(event) =>onChangeFileUpload(event)}/>
                </div>
                <div className="form-group d-grid gap-2">
                    <button type="submit" className="btn btn-block create-account">SLIIP UPLOAD</button>
                </div>
        </form>
    </div>
     );
}
 
export default GoogleDrive;