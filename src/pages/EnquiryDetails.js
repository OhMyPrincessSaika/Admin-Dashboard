import React from 'react';
import { BsArrowLeft} from 'react-icons/bs';
import { getEnquiry, updateEnquiry } from '../features/enquiry/enquirySlice';
import {useDispatch,useSelector}  from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
const EnquiryDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [enqStatus,setEnqStatus] = React.useState('');
  const enquiryId = location.pathname.split('/')[3];
  const enquirySel = useSelector((state) => state.enquiry.enquiry);
  React.useEffect(() => { 
   dispatch(getEnquiry(enquiryId));
  },[enquiryId]);
  const {comment,email,name,status,mobile,_id} = enquirySel;
//   setEnqStatus(status)
  React.useEffect(() => {
   if(status) {
      setEnqStatus(status);
   }
  },[enquirySel])
  console.log(enqStatus)
  return (
     <div className="container-fluid ">
      <div className="d-flex align-items-center justify-content-between">
         
        <h3 className="title">
            {name}'s Enquiry 
        </h3>
        <button
        type="button"
        onClick={()=>{
            const data = {id: enquiryId,enquiryData : {status:enqStatus}}
            dispatch(updateEnquiry(data));
            setTimeout (() => {
               navigate('/admin/enquiries');
            },300)

         }
      }
        className="bg-transparent text-primary border-0 fs-6"
        >
            <BsArrowLeft/> Go Back
        </button>

      </div>
        <div className="mt-5 p-4 rounded-3" style={{backgroundColor:'#f5f5f5'}}>
           <div className="d-grid">
              <div className="row">
                <div className="col-4 p-4">
                   <p>Name :</p>
                   <p>Email : </p>
                   <p>Mobile : </p>
                   <p>Status : </p>
                   <p>Change Status :</p>
                   <p>Comment : </p>
                </div>
                <div className="col-8 p-4">
                   <p >{name}</p>
                   <p><a href={`mailto:${email}`}>{email}</a></p>
                  <p><a href={`tel:${mobile}`}>{mobile}</a></p>
                   <p>{status}</p>
                   <p>
                     <select
                     value={enqStatus ? enqStatus : 'Submitted'}
                     onChange={(e)=>{
                        setEnqStatus(e.target.value);
                      }}
                     >
                        <option value="Contacted">Contacted</option>
                        <option value="Submitted">Submitted</option>
                        <option value="In Progress">In Progress</option>
                     </select>
                   </p>
                   <p>{comment}</p>
                </div>

              </div>
           </div>
        </div>
     </div>
  )
}

export default EnquiryDetails