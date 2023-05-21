import React from 'react'
import Input from '../components/Input'
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { createBlogCategory, getBlogCategory, updateBlogCategory } from '../features/blog-cat/blogcatSlice';
import { useFormik } from 'formik';
import { useNavigate ,useLocation} from 'react-router-dom';
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
import * as Yup from 'yup';
const AddBlogCat = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const blogCatId = location.pathname.split('/')[3];
  const blogCatSel = useSelector((state)=> state.blogcat);
  const {blogCategory : {category}} = blogCatSel
  React.useEffect(()=> {
    if(blogCatId!== undefined) {
      dispatch(getBlogCategory(blogCatId));
      formik.values.category = category;
     
     
    }else {
      dispatch(resetState());
    }
  },[blogCatId])
 
  const schema = Yup.object().shape({
    category : Yup.string().required('Category is required'),
  })
  const formik = useFormik({
    enableReinitialize:true,
    initialValues : {
      category : category || ''
    },
    validationSchema : schema,
    onSubmit : async(values) => {
      console.log(values)
      if(blogCatId !== undefined) {
        setLoading(true);
        try {
          const data = {id : blogCatId,blogcatData: values}
          await dispatch(updateBlogCategory(data)).unwrap();
          toast.success('product category edited successfully')
          setTimeout(()=> {
            navigate('/admin/blog-category-list')
            setLoading(false);
          },1000)

        }catch(err) {
          toast.error('something went wrong!');
          setLoading(false);
        }
      }else {
        try{
          const result = await dispatch(createBlogCategory(values)).unwrap();
          if(result) {
            toast.success('Blog Category added successfully');
            formik.resetForm(values);
            
            setTimeout(() => {
              dispatch(resetState())
          
              navigate('/admin/blog-category-list')
            },1500);
          }else{
            toast.error('something went wrong!')
          }
        }catch(err) {
          console.log(err.message);
        }
        
      }

      }
  })


 
 
 
  return (
    <div>
        <h3 className="mb-4 title">{blogCatId ? "Edit" : 'Add'} Blog Category</h3>
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
            <form action="" onSubmit={formik.handleSubmit}>
                <Input 
                type="text" 
                label="Blog Category" 
                placeholder="Blog Category" 
                name='category'
                val={formik.values.category}
                onChange={formik.handleChange('category')}
                onBlur = {formik.handleBlur('category')}
                id="blog-cat"/>
                <div className='error'>
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>
                <button
                type='submit' 
                className="btn btn-success border-0 rounded-3 my-5">
                    {blogCatId ? 'Edit' : 'Add'} Blog Category
                </button>
            </form>
        </div>
}
    </div>
  )
}

export default AddBlogCat