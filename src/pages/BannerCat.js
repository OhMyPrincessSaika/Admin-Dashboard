import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Table} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import {getAllCatBanners,deleteCatBanner} from '../features/banner-cat/bannerCatSlice';



const BannerCat = () => {
  const [loadedCount,setLoadedCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const columns = [
    {
      title : 'SNo',
      dataIndex : 'sno',
      key:'sno'
    },
    {
      title : 'Image',
      dataIndex : "banner_img",
      key:'banner_img',
      render : (imageUrl) =>  <img src={imageUrl} onLoad={() => {setLoadedCount((prev) => prev+=1)}}  alt="image" style={{width: '320px',height:'200px',objectFit:'cover',objectPosition:'top left'}}/>
    },
    {
      title : 'Name',
      dataIndex : 'name',
      key : 'name'
    },
    {
      title : 'Type',
      dataIndex : 'type',
      key : 'type'
    },
    {
      title : 'Price Range',
      dataIndex : 'price_range',
      key : 'price_range',
      
    },
    { 
      title : 'Action',
      dataIndex : 'action',
      key : 'action'
    }
    ]
 
 
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCatBanners());
  },[])
  const [open,setOpen] = React.useState(false);
  const [dataSource,setDataSource] = React.useState([]);
  const [publicId,setPublicId] = React.useState('');
  const allBannerSel = useSelector((state) => state.banner_cat?.catBanners.allCatBanners);
  React.useEffect(() => {
    console.log(loadedCount,allBannerSel?.length);
    if(loadedCount === allBannerSel?.length) {
      setIsLoading(false);
    }
  },[loadedCount]);
  // https://res.cloudinary.com/dhtjmbn8s/image/upload/:public_id
  const showModal = (id) => {
    setOpen(true);
    setPublicId(id);
  }
  const hideModal = () => {
    setOpen(false);
  }
  const performAction = async() => {
    setOpen(false);
    await dispatch(deleteCatBanner(publicId)).unwrap();
    await dispatch(getAllCatBanners()).unwrap();
  }
 
  React.useEffect(() => {
    const data = [];
    for(let i=0; i < allBannerSel?.length; i++) {
      const obj = {};
      obj.sno = i+1;
      obj.key = allBannerSel[i]?.public_id;
      obj.name = allBannerSel[i]?.name;
      obj.price_range = allBannerSel[i]?.price_range;
      obj.type = allBannerSel[i]?.type;
      obj.action = (
      <div className="d-flex flex-column align-items-center gap-1">
      <Link to={`/admin/banner-cat/${allBannerSel[i]?.public_id}`}>
              <BiEditAlt className="fs-5"/>
            </Link>
            <button  
            onClick={() => {
             
              showModal(allBannerSel[i]?.public_id);

              // dispatch(deleteBanner(allBannerSel[i]?.public_id));
              // dispatch(getAllBanners())
            }}
            className="fs-5  text-danger bg-transparent border-0">
              <AiFillDelete />
            </button>
      </div>)
      obj.banner_img = allBannerSel[i]?.url;
      data.push(obj);
    }
    setDataSource(data);
  },[allBannerSel]);
  return (
    <>
     
        <div className=" loading-container">
        {isLoading
         &&
          <div
          className="d-flex align-items-center justify-content-center loading"
          style={{backgroundColor:'rgba(255,255,255,0.7)',
          width:'100%',
          height:'100vh',
          zIndex:4,
          borderRadius: '20px'
          }}>
            <div>
              <Loading size="large" title="Loading"/>  
            </div>
          </div>
          }
           <div>
      <Table columns={columns} dataSource={dataSource} style={{overflow:'auto'}}/>
      <CustomModal
              open={open}
              hideModal={hideModal}
              performAction={() => performAction()}
              title="Are you sure you want to delete this banner category?"
      />
    </div>
        </div>
    
   
    </>
  )
}


export default BannerCat;
