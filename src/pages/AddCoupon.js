import React from 'react'
import Input from '../components/Input';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { createCoupon, getCoupon, updateCoupon } from '../features/coupon/couponSlice';
import { toast } from 'react-toastify';
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
const AddCoupon = () => {
  const [loading,setLoading] = React.useState(false);
  const location = useLocation();
  const couponId = location.pathname.split('/')[3];
  const couponSel = useSelector((state) => state.coupon);
  const {coupon : {name,discountPercent,expiry}} = couponSel;
 
  React.useEffect(()=>{
    if(couponId !== undefined) {
      dispatch(getCoupon(couponId));
     
      Formik.values.coupon = name;
      Formik.values.expiry = expiry?.slice(0,10);
      Formik.values.discountPercent= discountPercent;
    }else {
      dispatch(resetState())
    }
  },[couponId])
  const schema = Yup.object().shape({
    coupon : Yup.string().required('Coupon is required'),
    expiry : Yup.date().required('Expiry Date is required'),
    discountPercent : Yup.number().required('Discount is required')
  })
  const Formik = useFormik({
    enableReinitialize : true,
    initialValues : {
      coupon : name || '',
      expiry : expiry?.slice(0,10) || '',
      discountPercent : discountPercent || ''
    },
    onSubmit : async(values) => {
    
      if(couponId !== undefined) {
        setLoading(true);
        const data = {id : couponId,couponData: values}
        try {
          dispatch(updateCoupon(data));
          toast.success('edited successfully'); 
          setTimeout(() => {
            navigate('/admin/coupon-list');
            setLoading(false);
          },1000)
        }catch(err) {
          toast.error('something went wrong!');
          setLoading(false);
        }
        
      }else {
        try{

          const result = await dispatch(createCoupon(values)).unwrap();
          if(result) {
            toast.success('coupon added successfully')
            Formik.resetForm(values);
            setTimeout(()=> {
              dispatch(resetState())
              navigate('/admin/coupon-list')
            },1500)
          }else {
            toast.error('something went wrong!')
          }
        }catch(err) {
          console.log(err.message);
        }
      }
     
     
    },
    validationSchema : schema
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  
  
  return (
    <div>
        <h3 className="mb-4 title">{couponId ? "Edit" : "Add"} Coupon</h3>
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
            <form action="" onSubmit={Formik.handleSubmit}>
                <Input 
                name="coupon"
                type="text" 
                label="Enter Coupon" 
                placeholder="Coupon" 
                onChange={Formik.handleChange('coupon')} 
                onBlur={Formik.handleBlur('coupon')} 
                val={Formik.values.coupon}
                id="coupon"/>
                <div className="error">
                  {
                    Formik.touched.coupon && Formik.errors.coupon
                  }
                </div>
                <Input 
                name="expiry"
                type="date" 
                label="Enter Expiry Date" 
                placeholder="Expiry" 
                onChange={Formik.handleChange('expiry')} 
                onBlur={Formik.handleBlur('expiry')} 
                val={Formik.values.expiry}
                id="expiry"/>
                <div className="error">
                  {
                    Formik.touched.expiry && Formik.errors.expiry
                  }
                </div>
                <Input 
                name="discountPercent"
                type="number" 
                label="Enter Discount Percent" 
                placeholder="discount" 
                onChange={Formik.handleChange('discountPercent')} 
                onBlur={Formik.handleBlur('discountPercent')} 
                val={Formik.values.discountPercent}
                id="discountPercent"/>
                <div className="error">
                  {
                    Formik.touched.discountPercent && Formik.errors.discountPercent
                  }
                </div>
                <button
                type='submit' 
                className="btn btn-success border-0 rounded-3 my-5">
                    {couponId ? "Edit" : "Add"} Coupon
                </button>
                {
                  couponId && 
                  <button 
                  onClick= {() => {navigate('/admin/coupon-list')}}
                  className="border-0 bg-transparent text-dark fs-6 ms-3 rounded-3">
                    Cancel
                  </button>
                }
            </form>
        </div>
        }
    </div>
  )
}

export default AddCoupon