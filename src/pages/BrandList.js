import React from 'react'
import {Table} from 'antd';
import { deleteBrand, getAllBrands } from '../features/brand/brandSlice';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { resetState } from '../utils/resetState';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading';
const columns = [
{
  title : 'SNo',
  dataIndex : 'sno'
},
{
  title : 'Brand',
  dataIndex : 'brand',
  key : 'brand'
},
{ 
  title : 'Action',
  dataIndex : 'action',
  key : 'action'
}
]
const BrandList = () => {
  const [loading,setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [brandId,setBrandId] = React.useState("");
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  React.useEffect( () => {
    setLoading(true);
    dispatch(getAllBrands());
    setLoading(false);
  },[])
  const brandSel = useSelector((state) => state?.brand?.brands?.brands)
  const [dataSource,setDataSource] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    const data = brandSel?.map((brand, index) => {
      return {
        key: index,
        sno: index + 1,
        brand: brand.brand,
        action: (
          <>
            <Link to={`/admin/brand/${brand._id}`}>
              <BiEditAlt className="fs-5"/>
            </Link>
            <button  
            onClick={() => showModal(brand._id)}
            className="fs-5 ms-3 text-danger bg-transparent border-0">
              <AiFillDelete />
            </button>
          </>
        ),
      };
    });
    setDataSource(data);
    setLoading(false);
  }, [brandSel]);
  const handleDelete= (id)=> {
    setLoading(true);
    dispatch(deleteBrand(id));
    setOpen(false);
    setTimeout(()=> {
      dispatch(getAllBrands())
      setLoading(false);
    },1000)
  } 
  return (
     <div className="position-relative container-fluid"  style={{minHeight:'100vh'}}>
        <h3 className="mb-4 title" >
            Brands
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
          <Table dataSource={dataSource} style={{overflow:'auto'}} columns={columns} />;
          </div>
          <CustomModal
          title="Are you sure you want to delete this brand?"
          open={open}
          performAction= {() => handleDelete(brandId)}
          hideModal ={hideModal}
          />
        </>
         }
     </div>
  )
}

export default BrandList