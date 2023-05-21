import React from 'react'
import Input from '../components/Input'
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import { createProductCategory, getProductCategory, updateProductCategory } from '../features/pcategory/pCategorySlice';
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
const AddCat = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = React.useState(false);
  const catSel = useSelector((state) => state.category);
  const {category} = catSel;
  const catId =  location.pathname.split('/')[3];
  React.useEffect(()=> {
    if(catId !== undefined) {
      setLoading(true);
      dispatch(getProductCategory(catId));
      formik.values.category = category.category
      setLoading(false);
    }else {
      dispatch(resetState())
    }
  },[catId])
  
  const schema = Yup.object().shape({
    category : Yup.string().required('Category is required')
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues : {
      category : category.category || ''
    },
    validationSchema: schema,
    onSubmit : async(values) => {
      setLoading(true);
      if(catId !== undefined) {
        const data = {id : catId,data: values}
        try {
          await dispatch(updateProductCategory(data)).unwrap();
        
          toast.success('product category updated successfully..');
          setTimeout(()=> {
            navigate('/admin/category-list')
            setLoading(false);
          },2000)
        }catch(err) {
          setLoading(false);
          toast.error(err.message);
        }
      }else {
        try {
          const result = await  dispatch(createProductCategory(values)).unwrap();
         
          if(result) {
            toast.success('product category added successfully')
            formik.resetForm();
            dispatch(createProductCategory(values));
            setTimeout(()=>{
              navigate('/admin/category-list')
              setLoading(false);
            },300)
          }else {
            toast.error('something went wrong!')
            setLoading(false);
          }
        }catch(err) {
          setLoading(false);
          toast.error(err.message);
        }

      }
    }
  })
 
  
 
  return (
    <div className="position-relative">
        <h3 className="mb-4 title">{catId ? "Edit" : "Add"} Product Category</h3>
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
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <Input 
                type="text" 
                name="category"
                label="Product Category" 
                placeholder="Product Category"
                onChange = {formik.handleChange('category')}
                onBlur ={formik.handleBlur('category')} 
                id="prod-cat"
                val={formik.values.category}
                />
                <div className="error">
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>
                <button
                type='submit' 
                className="btn btn-success border-0 rounded-3 my-5">
                   {catId ? "Edit" : "Add"} Category
                </button>
                {
                  catId &&
                  <button className="btn bg-white rounded-3 ms-3 text-dark" type="button" onClick={()=>navigate('/admin/category-list')}>
                    Cancel
                </button>
                }
            </form>
        </div>
      }
    </div>
  )
}

export default AddCat