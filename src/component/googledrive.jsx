import React,{useState, useContext} from 'react';
import Form from 'react-bootstrap/Form'
import { GoogleContext } from '../context/context';


const GoogleDrive = () => {

    const { uploadToGoogleDrive,isAuthorized } = useContext(GoogleContext);
    const [uploadFiles, setUploadFiles] = useState([]);


    const handleGoogleDriveUpload = () => {
        // console.log(genarateCalendarData());
        uploadToGoogleDrive(uploadFiles)
      };

   
    const onChangeFileUpload = (event) => {
        let uploadedFile = event.target.files[0];
        //set the state
        setUploadFiles(uploadedFile);
        
    }
    return ( 
        <>
        <p>Google drive</p>
        <>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Normal text" />
            <Form.Control type="file" accept={'image/png,image/jpeg'} onChange={(event) =>onChangeFileUpload(event)}/>
            </Form.Group>
            
</>
        <button onClick={handleGoogleDriveUpload} >Upload to GOOGLE DRIVE</button>
        {isAuthorized}
        </>
     );
}
 
export default GoogleDrive;