import React from 'react'
import {Table,Modal} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { deleteProductCategory, getAllCategories, getProductCategory } from '../features/pcategory/pCategorySlice';
import Loading from '../components/Loading';
import { resetState } from '../utils/resetState';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title : 'No',
    dataIndex : 'sno'
  },
  {
    title : 'Category',
    dataIndex : 'category'
  },
  {
    title : 'Action',
    dataIndex : 'action'
  }
]
const CateogryList = () => {
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [catId,setcatId] = React.useState('');
  const showModal = (id) => {
    setOpen(true);
    setcatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getAllCategories());
  },[]);
  const catSel = useSelector((state) => state?.category?.categories?.categories );
  console.log(catSel);

  const [dataSource,setDataSource] = React.useState([]);
  React.useEffect(() => {
    const data = catSel?.map((category,i) => {
      return ({
          key :i+1, 
          sno : i+1,
          category: category.category ,
          action : (
            <>
                <Link to={`/admin/category/${category._id}`}>
                  <BiEditAlt/>
                </Link>
                <button 
                className="bg-transparent ms-3 border-0 text-danger fs-5"
                onClick={() =>showModal(category._id)}
                
                >
                  <AiFillDelete />
                </button>
                
            </>
          )
        
      })
    })
    setDataSource(data);
  },[catSel])
  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteProductCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(resetState())
      dispatch(getAllCategories());
      setLoading(false);
    },1000)
  }
  return (
     <div className="position-relative" >
        <h3 className="mb-4 title">
            Product Categories
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
          <Table dataSource={dataSource} columns={columns} />;
          </div>
          <CustomModal 
          title="Are you sure to delete this product category?"
          open = {open}
          hideModal = {hideModal}
          performAction ={()=> handleDelete(catId)}
          />
        </>
      }
     </div>
  )
}

export default CateogryList