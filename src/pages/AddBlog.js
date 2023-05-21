import React from 'react'
import Input from '../components/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import { createBlog, getBlog, updateBlog } from '../features/blog/blogSlice';
import { resetState } from '../utils/resetState';
import {toast} from 'react-toastify';
import { getAllBlogCategories } from '../features/blog-cat/blogcatSlice';
import UploadWidget from '../components/UploadComponents'; 
import Loading from '../components/Loading'
import {GiCrossMark} from 'react-icons/gi';
import { deleImages } from '../features/upload/uploadSlice';
const AddBlog = () => {

  const location = useLocation();
  const [loading,setLoading] = React.useState(false);
  const blogId = location.pathname.split('/')[3];
  const [uploadedFiles,setUploadedFiles] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getAllBlogCategories());
  },[])
  const blogCategories = useSelector((state) => state.blogcat.blogCategories);
  const navigate = useNavigate();
  const blogSel = useSelector((state) => state.blog.blog);
  React.useEffect(() => {
     if(blogId !== undefined && blogSel) {
      dispatch(getBlog(blogId));
      formik.values.category = blogSel?.category;
      formik.values.description = blogSel?.description;
      formik.values.title = blogSel?.title;
     }else {
      dispatch(resetState())
     }
  },[blogId])
  React.useEffect(() => {
    if(blogSel) {
      setUploadedFiles(blogSel.images);
    }
  },[blogSel])
  const schema = Yup.object().shape({
    'title' : Yup.string().required('Title is required'),
    'category' : Yup.string().required('Category is required'),
    'description' :Yup.string().required('Description is required'),
  })
  const formik = useFormik({
    enableReinitialize : true,
    initialValues : {
      title: blogSel?.title || "",
      category :blogSel?.category || "",
      description: blogSel?.description || "",
    },
    validationSchema : schema,
    onSubmit : values => {
      setLoading(true);
      if(uploadedFiles) {
        const obj = {
          'title' : values.title,
          'description' : values.description,
          'category' : values.category,
          'images' : uploadedFiles
        }
        if(blogId) {
          const data = {id : blogId,blogData : obj}
          try {
            dispatch(updateBlog(data));
            toast.success('edited successfully')
          }catch(err) {
            toast.error(err.message);
          }
        }else {
          try {

            dispatch(createBlog(obj));
            toast.success('created successfully')
          }catch(err) {
            toast.error(err.message);
          }
        }
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/blog-list',{replace:true})
          setLoading(false);
        },1500)
      }else {
        alert('you need images to upload.')
      }
     
    }
  })
  // const newBlog = useSelector((state) =>  state.blog);
  // const {isSuccess,isError,isLoading,createdBlog} = newBlog;
  // React.useEffect(()=> {
  //   if(isSuccess && createdBlog) {
  //     toast.success('Blog added successfully..');
  //   }
  //   if(isError) {
  //     toast.error('Something went wrong!');
  //   }
  // },[isError,isSuccess,isLoading]) 
 
  return (
    <div>
        <h3 className="my-4 title">{blogId ? 'Edit' : 'Add'} Blog</h3>
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
        <form action="" onSubmit={formik.handleSubmit}>
          <UploadWidget setUploadedFiles={setUploadedFiles} name="blog"/>
          <div className="d-flex align-items-center flex-wrap gap-2">
            {
              uploadedFiles?.map((file,i)=> {
               return( 
               <div className="position-relative" key={i} data-id={file.public_id}>
                 <button 
                 type="button"
                 onClick={() => {
                  dispatch(deleImages(file.public_id))
                  const image = document.querySelector(`[data-id="${file.public_id}"]`);
                  if(image && image.parentNode) {
                    image.parentNode.removeChild(image)
                  }
                 }}
                 className="position-absolute bg-dark text-white border-0" 
                 style={{top:'2%',right:'4%',borderRadius:'5px'}}
                 >
                    <GiCrossMark/>
                 </button>
                 <img 
                 src={file.url} 
                 style={{width:'100px',height:'140px',objectFit:'cover'}}/>
               </div>)
              })
            } 
          </div>
          <div className="mt-3">
          <Input 
          type="text" 
          name="title"
          placeholder="Blog Title" 
          label="Blog Title" 
          id="blog-title"
          val={formik.values.title}
          onChange={formik.handleChange('title')}
          />
          </div>
          <div className="error">
            {
              formik.touched.title && formik.errors.title
            }
          </div>
          <select 
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange('category')}
          className="mb-3 form-control py-3">
              <option value="">Select Blog Category</option>
              {
                blogCategories 
                ?
                blogCategories.map((blogCat,i) => {
                    return <option key={i} value={blogCat.category}>{blogCat.category}</option>
                })
                :
                null
              }
          </select>
          <div className="error">
            {
              formik.touched.category && formik.errors.category
            }
          </div>
          <ReactQuill 
          // ref={(el) => {this.quillRef=el;}}
          theme="snow"
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          onBlur ={formik.handleBlur('description')}
          name="description"
          >
            
          </ReactQuill>
          <div className="error">
            {
              formik.touched.description && formik.errors.description
            }
          </div>
          <button 
          type="submit" 
          className="btn btn-success my-5">{blogId ? 'Edit' : 'Add'} Blog</button>
          {
            blogId && 
            <button  
            type="button"
            onClick={() => navigate('/admin/blog-list')}
            className='btn bg-transparent border-0 ms-2'
            >
              Cancel
            </button>

          }

        </form>
        }
    </div>
  )
}

export default AddBlog