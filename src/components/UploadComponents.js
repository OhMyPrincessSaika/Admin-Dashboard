import React from 'react';
import {AiOutlineInbox}from 'react-icons/ai';
const UploadWidget = (props) => {
    const {setUploadedFiles} = props;
    const cloudinaryRef = React.useRef();
    const uploadRef = React.useRef();
    React.useEffect(() => {
      
            cloudinaryRef.current = window.cloudinary;
            uploadRef.current = cloudinaryRef.current.createUploadWidget({
                uploadPreset : 'ghykmghw',
                cloudName : 'dhtjmbn8s'
            },(err,result) => {
                    if(result.info.secure_url && result.info.public_id) {
                        setUploadedFiles((prev) => {
                            if(prev) {
                                return [
                                    ...prev,
                                    {
                                        'url' : result.info.secure_url,
                                        'public_id' : result.info.public_id,
                                        'asset_id' : result.info.asset_id
                                    }
                                ]
                            }else {
                                return [
                                    {
                                        'url' : result.info.secure_url,
                                        'public_id' : result.info.public_id,
                                        'asset_id' : result.info.asset_id
                                    }
                                ]
                            }
                        })
                    }
                
            })
       
    },[cloudinaryRef])
    const handleClick = () => {
        if(uploadRef.current) {
            uploadRef.current.open();

        }
       
    }
    return (
        <button 
        type="button"
        onClick={handleClick}
        className="w-100 d-flex my-3 flex-column align-items-center"
        style = {{padding:'25px',backgroundColor : "rgba(0,0,0,0.02)",borderRadius : '7px',borderColor : 'rgba(0,0,0,0.25)'}}
         >
            <AiOutlineInbox className="fs-1"/>
            <p>Click this area to upload {props.name} images</p>
            <span className='text-secondary'>Support for a single or bulk upload.Strictly prohibited from uploading company data or other banned files</span>
        </button>
    )
}

export default UploadWidget;