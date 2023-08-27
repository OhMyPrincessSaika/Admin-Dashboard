import React from 'react'
import {Table} from 'antd';
import {BiEditAlt, BiSleepy} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai'
import { deleteProduct, getAllProducts, getProduct } from '../features/product/productSlice';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import Loading from '../components/Loading'
import CustomModal from '../components/CustomModal';
import { resetState } from '../utils/resetState';
import { deleImages } from '../features/upload/uploadSlice';
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
    },
    {
      title : 'ProductId',
      dataIndex : '_id'
    },
    {
      title: 'Product',
      dataIndex: 'product',
      sorter : (a,b) =>  a.product.length-b.product.length
    },
    {
      title : 'Brand',
      dataIndex: 'brand',
      sorter : (a,b) =>  a.brand.length - b.brand.length
      
    },
    {
      title : 'Quantity',
      dataIndex : 'quantity',
      sorter : (a,b) =>  a-b
    },
    {
      title : "Category",
      dataIndex : 'category',
      sorter : (a,b) =>  a.category.length - b.category.length
    },
    {
      title : 'Price',
      dataIndex :'price',
      sorter : (a,b) => a-b
    },
    {
      title : "Action",
      dataIndex : 'action',
      key : 'action'
    }
  ];
const ProductList = () => {
  const [prodId,setProdId] = React.useState('');
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch(getAllProducts())
  },[])
  const showModal = (id) => {
    setOpen(true);
    setProdId(id);
  }
  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  const selector = useSelector((state) =>  (state.product?.products?.data?.products))
 
  const [products,setProducts] = React.useState([]);  
  React.useEffect(() => {
    const data = selector?.map((product,i) => {
      return {
        'key' : i,
        '_id' : product._id,
        'no' : i+1,
        'product' : product.title,
        'brand' : product.brand,
        'quantity' : product.quantity,
        'price' : product.price,
        'category' : product.category,
        'action' : (
          <div className="d-flex gap-1 flex-column align-items-center">
            <Link to={`/admin/product/${product._id}`} 

            >
              <BiEditAlt className="fs-5"/>
            </Link>
            <button
            type="button"
            onClick={()=>{
              showModal(product._id)
            }}
            className='text-danger border-0 bg-transparent'>
              <AiFillDelete className="fs-5" />
            </button>
          </div>
        )
      }
    })
    setProducts(data);
  },[selector])

  const handleDelete = async(id) => {
    setLoading(true);
    setOpen(false);
    try {
      const result = await dispatch(getProduct(id)).unwrap();
      if(result) {
        const arr = result.images.map((image ) => {return {public_id:image.public_id}});
        arr.forEach((image) => {
           dispatch(deleImages(image.public_id))
        })
        await dispatch(deleteProduct(id)).unwrap();
      
        toast.success('deleted successfully')
        setTimeout(()=> {
          dispatch(resetState());
          dispatch(getAllProducts());
          setLoading(false);
        },3000);
      }
      
    }catch(err) {
      toast.error(err.message);
      setLoading(false);
    }
  }
  return (
     <div className="container-fluid">
        <h3 className="mb-4 title">
            Products
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
          <Table dataSource={products} columns={columns} style={{overflow:'auto'}} />;
          </div>
          <CustomModal  
          title="Are you sure to delete this product?"
          performAction={()=>handleDelete(prodId)}
          open={open}
          hideModal={hideModal}/>
        </>
        } 
     </div>
  )
}

export default ProductList