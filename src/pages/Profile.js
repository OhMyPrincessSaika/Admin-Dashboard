import React from 'react'
import {AiFillMail} from 'react-icons/ai';
import { deleImages } from '../features/upload/uploadSlice';
import {useSelector,useDispatch} from 'react-redux';
import { addNotification, getAdmin, updateAdmin } from '../features/admin/adminSlice';
import UploadWidget from '../components/UploadComponents';
import { useStateContext } from '../app/ContextProvider';
const Profile = () => {
  const adminId = JSON.parse(localStorage.getItem('admin')).admin._id;
  const dispatch = useDispatch();
  const {admin,setAdmin,setProfileImg,profileImg,setCoverImg,coverImg,notification} = useStateContext();
  const adminSel = useSelector((state) => state.admin.admin);
  
  React.useEffect(() => {
    dispatch(getAdmin(adminId));
  },[])
  React.useEffect(() => {
    if(adminSel) {
      console.log(adminSel);
      setAdmin(adminSel);
    }
  },[adminSel]);
    const updatedAdmin = useSelector((state) => state.admin.updatedAdmin);
  const profileSel = useSelector((state) => state.admin.admin?.profile_img);
  const coverSel = useSelector((state) => state.admin.admin?.cover_img);
  React.useEffect(() => {
      if(updatedAdmin) {
        console.log(updatedAdmin);
        setAdmin(updatedAdmin);

      }
    
  },[updatedAdmin])
  React.useEffect(() => {
    dispatch(addNotification({adminId,data: {notification}}));
  },[notification]);
  React.useEffect(() => {
    if(profileImg) {
      const data = {id : adminId,data : {profile_img : {url: profileImg.url,asset_id:profileImg.asset_id,public_id:profileImg.public_id}}}
      dispatch(updateAdmin(data));
    }
  },[profileImg]);
  React.useEffect(() => {
    if(profileSel) {
      setProfileImg((prev) => {
        return  {url:profileSel?.url,asset_id:profileSel?.asset_id,public_id:profileSel?.public_id}
      });
    }
    if(coverSel) {
      setCoverImg((prev) => {
        return {url:coverSel?.url,asset_id:coverSel?.asset_id,public_id:coverSel?.public_id}
      });
    }
  },[profileSel,coverSel])
  React.useEffect(() => {
    if(coverImg) {
      const data = {id : adminId, data : {cover_img : {url : coverImg.url , asset_id : coverImg.asset_id, public_id : coverImg.public_id}}}
      dispatch(updateAdmin(data));
    }
  },[coverImg]);
  
  return (

    <div className="position-relative" style={{minHeight:'100vh'}}>
      <div className="cover-container"
      onClick={() => document.querySelector('.cover-container').classList.remove('active')}
      >
      < UploadWidget minified={true} profileImg={false} text={"Upload Cover Photo"} isRectangle={true} setImage={setCoverImg} mutiple={false}/>
      </div>
      <div >
      <img src={admin?.cover_img?.url || 'https://th.bing.com/th/id/R.325f67658034ee7aa9925724e1fd395f?rik=VEv4SN9vkVtKDw&riu=http%3a%2f%2fweknowyourdreams.com%2fimages%2fgrey%2fgrey-14.jpg&ehk=z8OHEpmPO1%2fah%2foA%2fwogQ9EZlVeKpy8rKg%2fSYtdCDyc%3d&risl=&pid=ImgRaw&r=0'} alt="cover photo" 
      style={{objectFit:'cover',width:'100%',
      objectPosition: '25% 10%',
      height:'450px'}}
      useMap='#covermap'
      onClick={() => {
        document.querySelector('.cover-container').classList.add('active');       
      }}
      />
      </div>
      <div className="profile w-100 d-flex flex-column align-items-center gap-2">
        <img 
        className="profile-img my-2"
        src={admin?.profile_img?.url || `https://th.bing.com/th/id/OIP.-CRMdTWuERDIax2boTXzTgHaHa?pid=ImgDet&rs=1`} alt="unknown profile"/>
        <h2>{admin?.firstname} {admin?.lastname}</h2>
        <p className="mb-0 text-secondary" style={{fontSize:'18px'}}><AiFillMail/>{admin?.email}</p>
        <UploadWidget minified={true} profileImg={true} text={"Upload Profile Picture"} isRectangle={false} setImage={setProfileImg} mutiple={false}/>
        <div className="d-flex">
        
        </div>
      </div>
    </div>
   
  )
}

export default Profile