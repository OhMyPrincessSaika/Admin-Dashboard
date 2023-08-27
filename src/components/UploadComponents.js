import React from 'react';
import {AiOutlineInbox}from 'react-icons/ai';
import {BsArrowBarUp} from 'react-icons/bs';
import { useStateContext } from '../app/ContextProvider';
const UploadWidget = (props) => {
    const {setNotification,admin} = useStateContext(); 
    let adminFromLocalStorage;
    const {setUploadedFiles,bannerId,isRectangle,multiple,minified,setImage,text,profileImg} = props;
    const cloudinaryRef = React.useRef();
    const uploadRef = React.useRef();
    React.useEffect(() => {
      
            cloudinaryRef.current = window.cloudinary;
            uploadRef.current = cloudinaryRef?.current?.createUploadWidget({
                uploadPreset : 'ghykmghw',
                cloudName : 'dhtjmbn8s',
                cropping : true ,
                croppingCoordinatesMode : 'custom',
                croppingDefaultSelectionRatio : null,
                multiple : multiple ? true : false,
                croppingAspectRatio : isRectangle ? 1.6: 0.85,
                croppingShowDimension :true,

            },(err,result) => {
                    if(result.info.secure_url && result.info.public_id) {
                        
                        if(setImage) {
                            console.log(admin);
                            if(admin?.firstname === undefined) {
                                adminFromLocalStorage = JSON.parse(localStorage.getItem('admin'))?.admin;
                                console.log(admin);
                                if(profileImg) {      
                                    setNotification({name:`${adminFromLocalStorage?.firstname} ${adminFromLocalStorage?.lastname}`,description:`updated ${adminFromLocalStorage?.gender === 'female' ? 'her' : "his"} profile photo.`,read:false})
                                }else {
                                    setNotification({name:`${adminFromLocalStorage?.firstname} ${adminFromLocalStorage?.lastname}`,description:`updated ${adminFromLocalStorage?.gender === 'female' ? 'her' : "his"} cover photo.`,read:false})
    
                                }
                            }else {
                                if(profileImg) {      
                                    setNotification({name:`${admin?.firstname} ${admin?.lastname}`,description:`updated ${admin?.gender === 'female' ? 'her' : 'his'} profile photo.`,read:false})
                                }else {
                                    setNotification({name:`${admin?.firstname} ${admin?.lastname}`,description:`updated ${admin?.gender === 'female' ? 'her' : 'his'} cover photo.`,read:false})
    
                                }
                            }
                            
                            setImage({
                                url : result.info.secure_url,
                                public_id : result.info.public_id,
                                asset_id : result.info.asset_id
                            });

                            return;
                        }else {
                            setUploadedFiles((prev) => {
                                if(prev && bannerId === undefined) {
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
                    }
                
            })
       
    },[cloudinaryRef])
    const handleClick = () => {
        if(uploadRef.current) {
            uploadRef.current.open();

        }
       
    }
    return (
        <>
        {
        minified ? 
        <button 
        onClick={handleClick}
        className="border-0 px-3 py-2 rounded-2 my-2" style={{backgroundColor:'#ddd'}}><BsArrowBarUp/>{text}</button>
            :
            
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
        }
        </>
    )
}

export default UploadWidget;