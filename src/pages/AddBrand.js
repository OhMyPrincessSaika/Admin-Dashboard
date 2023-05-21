import React from 'react'
import Input from '../components/Input';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate,useLocation} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { createBrand, getBrand, updateBrand } from '../features/brand/brandSlice';
import { toast } from 'react-toastify';
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = location.pathname.split('/')[3];
  const newBrand = useSelector((state)=> state.brand);
  const {createdBrand,brand : {brand}} = newBrand
  const [loading,setLoading] = React.useState(false);
  
  console.log(brand,brandId);
  React.useEffect(() => {
    if(brandId !== undefined){
      dispatch(getBrand(brandId));
      Formik.values.brand = brand;

    }else {
      dispatch(resetState())
    }
  },[brandId]);
 
  const schema = Yup.object().shape({
    brand : Yup.string().required('Brand is required')
  })
  const Formik = useFormik({
    enableReinitialize: true,
    initialValues : {
      brand : brand || ''
    },
    onSubmit : async(values) => {
      setLoading(true);
      if(brandId !== undefined) {
        const data = {id : brandId,brandData: values}
        try {
            await dispatch(updateBrand(data)).unwrap();
           
            toast.success('edited successfully');
            setTimeout(()=> {
              dispatch(resetState())
              navigate('/admin/brand-list')
              setLoading(false);
            },300)
        }catch(err) {
            toast.error(err.message);
        }
      }else {
        try{
          setLoading(true);
          const result = await dispatch(createBrand(values)).unwrap();
         
          if(result) {
            toast.success('brand added successfully')
            Formik.resetForm(values);
            setTimeout(()=> {
              dispatch(resetState())
              navigate('/admin/brand-list')
              setLoading(false);
            },300)
          }else {
            toast.error('something went wrong!')
            setLoading(false)
          }
        }catch(err) {
          console.log(err.message);
        }

      }
     
    },
    validationSchema : schema
  })
  
  return (
    <div className="position-relative">
      <h3 className="mb-4 title">{brandId!== undefined ? "Edit Brand" : "Add Brand"}</h3>
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
                name="brand"
                type="text" 
                label="Enter Brand" 
                placeholder="Brand" 
                onChange={Formik.handleChange('brand')} 
                onBlur={Formik.handleBlur('brand')} 
                val={Formik.values.brand}
                id="brand"/>
                <div className="error">
                  {
                    Formik.touched.brand && Formik.errors.brand
                  }
                </div>
                <button
                type='submit' 
                className="btn btn-success border-0 rounded-3 my-5">
                    {
                      brandId !== undefined ? "Edit Brand" : 'Add Brand'
                    }
                </button>
                {
                  brandId &&   
                  <button className="btn bg-white rounded-3 ms-3 text-dark" type="button" onClick={()=>navigate('/admin/brand-list')}>
                  Cancel
                  </button>
                }
            </form>
        </div>
        }
        
    </div>
  )
}

export default AddBrand