import React from 'react'
import {Table} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import {Link}from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { deleteBlogCategory, getAllBlogCategories } from '../features/blog-cat/blogcatSlice';
import Loading from '../components/Loading';
import { resetState } from '../utils/resetState';
import CustomModal from '../components/CustomModal';
const columns = [
{
  title : 'SNo',
  dataIndex : 'sno'
},
{
  title : 'Category',
  dataIndex : 'category',
  key : 'category'
},
{ 
  title : 'Action',
  dataIndex : 'action',
  key : 'action'
}
]
const BlogCatList = () => {
 
    const [open,setOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [blogcatId,setBlogCatId] = React.useState('');
    const showModal = (id) => {
      setOpen(true);
      setBlogCatId(id);
    };
    const hideModal = () => {
      setOpen(false);
    };
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getAllBlogCategories());
  },[])

  const blogcatSel = useSelector((state) => {
     return state.blogcat.blogCategories;
  })

  const [categories,setCategories] = React.useState([]);
  React.useEffect(()=> {
    const data = blogcatSel?.map((blogCat,i) => {
      return  {
      key :i+1, 
      sno : i+1,
      category : blogCat.category,
      action : (
        <>
            <Link to={`/admin/blog-category/${blogCat._id}`}>
              <BiEditAlt/>
            </Link>
            <button  
            type="button"
            className="bg-transparent ms-3 border-0 text-danger fs-5"
            onClick={() =>showModal(blogCat._id)}
            >
              <AiFillDelete/>
            </button>
        </>
    )
  }
    })
  setCategories(data);
  },[blogcatSel]);

  const handleDelete = (id) => {
    setLoading(true);
    setOpen(false)
    dispatch(deleteBlogCategory(id));
    setTimeout (() => {
      dispatch(getAllBlogCategories());
      setLoading(false);
    },1000)
  }
  return (
     <div>
        <h3 className="mb-4 title">
            Blog Category List
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
        <>
          <div>
          <Table dataSource={categories} columns={columns} />;
          </div>
          <CustomModal
          title="Are you sure to delete this blog category?"
          open ={open}
          performAction ={() => handleDelete(blogcatId)}
          hideModal={hideModal}
          />
        </>
      }
     </div>
  )
}

export default BlogCatList