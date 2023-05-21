import React from 'react'
import {Select, Table} from 'antd';
import {Link, redirect} from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import {IoEyeSharp} from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux';
import { deleteEnquiry, getEnquiries } from '../features/enquiry/enquirySlice';
import Loading from '../components/Loading';
import {toast} from 'react-toastify'
import CustomModal from '../components/CustomModal';
import { resetState } from '../utils/resetState';
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title : 'Email',
      dataIndex : 'email',
      key :'email'
    },
    {
      title : 'Status',
      dataIndex : 'status',
      key :'status'
    },
    {
      title :'Mobile',
      dataIndex : 'mobile',
      key :'mobile'
    },
    {
      title : 'Action',
      dataIndex : 'action',
      key : 'action'
    }
  ];
const Enquiry = () => {
  const [open,setOpen] = React.useState(false);
  const [enquiryId,setEnquiryId] = React.useState('');
  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  }
  const hideModal = () => {
    setOpen(false);
  }
  const [loading,setLoading] = React.useState(false);
  const dispatch =  useDispatch();
  const [enquiry,setEnquiry] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    dispatch(getEnquiries())
  },[])

  const enqState = useSelector((state) => state.enquiry.enquiries)
  React.useEffect(() => {
      setLoading(true);
      const dataSource =[];
      for(let i=0;i < enqState?.length;i++) {
        dataSource.push(
          {
            key: enqState[i]._id,
            sno : i+1,
            name : enqState[i].name,
            email : enqState[i].email,
            status : enqState[i].status,
            mobile : enqState[i].mobile,
            action : (
              <div className="d-flex align-items-center flex-column gap-1">
                  <Link to={`/admin/enquiries/${enqState[i]._id}`}>
                    <IoEyeSharp className="fs-5"/>
                  </Link>
                  <button type="button" 
                  className='fs-5 text-danger border-0 bg-transparent'
                  onClick={() => {
                      showModal(enqState[i]._id);
                  }}
                  >
                    <AiFillDelete />
                  </button>
              </div>
            )
          }
        )
      }
      setEnquiry(dataSource)
      setLoading(false);
    
  },[enqState])

  const handleDelete = async() => {
    setLoading(true);
    setOpen(false);
    try {
      await dispatch(deleteEnquiry(enquiryId)).unwrap();
      toast.success('deleted successfully');
      setTimeout(() => {
        dispatch(resetState());
        dispatch(getEnquiries());
        setLoading(false);
      },300)
    }catch(err) {
      setLoading(false);
      toast.error(err.message);
    }

  }
  return (
     <div className='container-fluid'>
        <h3 className="mb-4 title">
            Enquires
        </h3>
        {loading
         ?
        <div
        className="d-flex align-items-center justify-content-center"
        style={{backgroundColor:'rgba(255,255,255,0.7)',
        width:'100%',
        height:'70vh',
        zIndex:4,
        borderRadius: '20px'
        }}>
          <div>
            <Loading size="default" title="Loading"/>  
          </div>
        </div>
        :

        <div>
        <Table dataSource={enquiry} columns={columns} style={{overflow:'auto'}}/>;
        <CustomModal 
        open={open}
        hideModal={hideModal}
        performAction={() => handleDelete()}
        title="Are you sure to delete this enquiry?"
        />
        </div>
        }
     </div>
  )
}

export default Enquiry