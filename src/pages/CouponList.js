import React from 'react'
import {Table} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import {Link}from 'react-router-dom';
import {useDispatch,useSelector}  from 'react-redux';
import {toast} from 'react-toastify';
import { deleteCoupon, getAllCoupons } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading'
const columns = [
{
  title : 'SNo',
  dataIndex : 'sno'
},
{
  title : 'Coupon',
  dataIndex : 'coupon',
  key : 'coupon'
},
{
  title : 'Discount',
  dataIndex : 'discount',
  key : 'discount'
},
{
  title : 'Expiry',
  dataIndex : 'expiry',
  key : 'expiry'
},
{ 
  title : 'Action',
  dataIndex : 'action',
  key : 'action'
}
]
const CouponList = () => {
  const [loading,setLoading] = React.useState(false);
  const [open,setOpen] = React.useState(false);
  const [couponId,setCouponId] = React.useState('');
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  }
  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getAllCoupons());
  },[])
  const couponSel = useSelector((state) => state.coupon.coupons);
  const [coupons,setCoupons] = React.useState([]);

  React.useEffect(()=> {
    const data = couponSel?.map((coupon,i) => {
      return {
        'sno' : i+1,
        'key' : coupon._id,
        'coupon' : coupon.name,
        'discount' : coupon.discountPercent,
        'expiry' : coupon.expiry,
        'action' :  (
          <>
              <Link to={`/admin/coupon/${coupon._id}`}>
                <BiEditAlt/>
              </Link>
              <button type="button" 
              onClick={() => {showModal(coupon._id)}}
              className="border-0 bg-transparent text-danger fs-5 ms-3">
                <AiFillDelete/>
              </button>
          </>
        )
      }
    })
    setCoupons(data);
  },[couponSel]) 
  const handleDelete = (id) => {
     setLoading(true);
     try {
       dispatch(deleteCoupon(id));
       toast.success('coupon deleted successfully.');
       setOpen(false);
       setTimeout(() => {
        dispatch(getAllCoupons());
        setLoading(false);
       },3000)
     }catch(err) {
       toast.error('something went wrong!');
       setLoading(false);
     }

  }
  return (
     <div className="container-fluid">
        <h3 className="mb-4 title">
            CouponList
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
            <Loading size="large" title="Loading"/>  
          </div>
        </div>
        :
        <>
        <div>
        <Table dataSource={coupons} columns={columns} style={{overflow:'auto'}}/>;
        </div>
        <CustomModal 
        title="are you sure to delete this coupon?"
        open = {open}
        performAction = {() => handleDelete(couponId)}
        hideModal={hideModal}
        />
        </>}
     </div>
  )
}

export default CouponList