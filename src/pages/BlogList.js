import React from 'react'
import {Table} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import {Link}from 'react-router-dom';
import {useDispatch,useSelector}  from 'react-redux';
import { deleteBlog, getAllBlogs,getBlog } from '../features/blog/blogSlice';
import {toast} from 'react-toastify';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading';
import { resetState } from '../utils/resetState';
import { deleImages } from '../features/upload/uploadSlice';
const columns = [
{
  title : 'SNo',
  dataIndex : 'sno'
},
{
  title : 'Title',
  dataIndex : 'title',
  key : 'title'
},
{
  title : 'Description',
  dataIndex : 'description',
  key : 'description'
},
{
  title : 'Category',
  dataIndex : 'category',
  key : 'category',
  
},
{ 
  title : 'Action',
  dataIndex : 'action',
  key : 'action'
}
]
const BlogList = () => {
 
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [blogId,setBlogId] = React.useState('');
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  }
  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getAllBlogs());
  },[])
  const blogSel = useSelector((state) => state?.blog?.blogs);
  const [blogs,setBlogs] = React.useState([]);

  React.useEffect(()=> {
    const data = blogSel?.map((blog,i) => {
      return {
        'sno' : i+1,
        'key' : blog._id,
        'title' : blog.title,
        'category' : blog.category,
        'description' : blog.description,
        'action' :  (
          <div className="d-flex flex-column align-items-center gap-1">
              <Link to={`/admin/blog/${blog._id}`}>
                <BiEditAlt className='fs-5'/>
              </Link>
              <button 
              type="button"
              onClick={()=>{showModal(blog._id)}} 
              className='fs-5 bg-transparent border-0  text-danger'>
                <AiFillDelete />
              </button>
          </div>
        )
      }
    })
    setBlogs(data);
  },[blogSel]) 
  const singleBlogSel = useSelector((state) => state.blog.blog);
 
  const handleDelete = async(id) => {
    setLoading(true);
    setOpen(false);
    try {
      const result = await dispatch(getBlog(id)).unwrap();
        if(result) {
        console.log(result); 
        const urlArr = result.images.map((image )=>{ return {public_id :  image.public_id}});
   
        urlArr.forEach((image) => {
          dispatch(deleImages(image.public_id));
        })
        await dispatch(deleteBlog(id)).unwrap();
        toast.success('deleted successfully')
        setTimeout(()=> {
          dispatch(resetState())
          dispatch(getAllBlogs());
          setLoading(false);
        },300)
      }
    }catch(err) {
      toast.error('something went wrong!');
      setLoading(false);
    }

  }
  return (
     <div className="container-fluid">
        <h3 className="mb-4 title">
            BlogList
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
          <Table dataSource={blogs} columns={columns} style={{overflow:'auto'}}/>
          </div>
         
          <CustomModal
          open={open}
          hideModal={hideModal}
          performAction={() => handleDelete(blogId)}
          title="Are you sure you want to delete this blog?"/>
        </>
        }

     </div>
  )
}

export default BlogList