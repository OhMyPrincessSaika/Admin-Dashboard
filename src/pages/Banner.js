import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Table} from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import {deleteBanner, getAllBanners} from '../features/banner/bannerSlice';

const Banner = () => {
  const [open,setOpen] = React.useState(false);
  const [isLoading,setIsLoading] = React.useState(true);
  const [ImgLoadedCount,setImgLoadedCount] = React.useState(0);
  const [dataSource,setDataSource] = React.useState([]);
  const [publicId,setPublicId] = React.useState('');
  const allBannerSel = useSelector((state) => state.banner.banners.banners);
  const columns = [
    {
      title : 'SNo',
      dataIndex : 'sno',
      key:'sno'
    },
    {
      title : 'Banner Image',
      dataIndex : "banner_img",
      key:'banner_img',
      render : (imageUrl) =>  <img src={imageUrl} onLoad={() =>{setImgLoadedCount((prev) => prev+=1)}} alt="image" style={{width: '320px',height:'200px',objectFit:'cover',objectPosition:'top left'}}/>
    },
    {
      title : 'Name',
      dataIndex : 'name',
      key : 'name'
    },
    {
      title : 'Sale Text',
      dataIndex : 'sale_text',
      key : 'sale_text'
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
  React.useEffect(() => {
    if(ImgLoadedCount === allBannerSel?.length) {
      setIsLoading(false);
    }
  },[ImgLoadedCount])
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
    await dispatch(deleteBanner(publicId)).unwrap();
    await dispatch(getAllBanners()).unwrap();
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllBanners());
  },[])
  React.useEffect(() => {
    const data = [];
    for(let i=0; i < allBannerSel?.length; i++) {
      const obj = {};
      obj.sno = i+1;
      obj.key = allBannerSel[i]?.public_id;
      obj.name = allBannerSel[i]?.name;
      obj.price_range = allBannerSel[i]?.price_range;
      obj.sale_text = allBannerSel[i]?.sale_text;
      obj.action = (
      <div className="d-flex flex-column align-items-center gap-1">
      <Link to={`/admin/banner/${allBannerSel[i]?.public_id}`}>
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
        <div className="loading-container">
          
          {isLoading &&<div
          className="d-flex align-items-center justify-content-center loading"
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
          } 
          <div>
        <Table columns={columns} dataSource={dataSource} style={{overflow:'auto'}}/>
        <CustomModal
                open={open}
                hideModal={hideModal}
                performAction={() => performAction()}
                title="Are you sure you want to delete this banner?"
        />
      </div>
        </div>
      
      
    </>
  )
}

export default Banner