import React from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import { resetState } from '../utils/resetState';
import UploadWidget from '../components/UploadComponents';
import {useDispatch,useSelector} from 'react-redux';
import ImagePlaceHolder from '../components/ImagePlaceHolder';
import { useLocation } from 'react-router-dom';
import {deleImages} from '../features/upload/uploadSlice'
import { GiCrossMark } from 'react-icons/gi';
import {toast} from 'react-toastify'
import { createCatBanner, getCatBanner, updateCatBanner } from '../features/banner-cat/bannerCatSlice';
const AddBannerCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const bannerCatId = location.pathname.split('/')[3];
  console.log(bannerCatId)
  React.useEffect(() => {
    if(bannerCatId) {
      console.log(bannerCatId)
      dispatch(getCatBanner(bannerCatId));
     
    }else {
      dispatch(resetState());
      formik.resetForm();
    }
  },[bannerCatId])
  const bannerCatSel = useSelector((state) => state?.banner_cat?.catBanner);
  console.log(bannerCatSel);
  const [uploadedFiles,setUploadedFiles] = React.useState([]);
  const [publicId,setPublicId] = React.useState('');
  const [imgKey,setImgKey] = React.useState('');
  const [imgLoaded,setImageLoaded] = React.useState(false);
  const schema = Yup.object().shape({
    name : Yup.string().required('product name is required! '),
    price_range : Yup.string().required('price_range is required!'),
    type : Yup.string().required('type is required!'),
    
  })
  
  React.useEffect(() => {
    if(bannerCatSel && bannerCatId) {
      setUploadedFiles([{
        "public_id" : bannerCatSel?.public_id,
        "asset_id" : bannerCatSel?.asset_id,
        "url" : bannerCatSel?.url
      }]);
      setPublicId(bannerCatSel?.public_id);
    } 
  },[bannerCatSel])
  React.useEffect(() => {
      setImgKey(Date.now());
      setImageLoaded(false);
      // setPublicId(uploadedFiles[0]?.public_id);
  },[uploadedFiles])
  const formik = useFormik({
    enableReinitialize :true,
    initialValues : {
      name : bannerCatId ? bannerCatSel?.name : '',
      price_range : bannerCatId ? bannerCatSel?.price_range : '',
      type : bannerCatId ? bannerCatSel?.type : ''
    },
    validationSchema : schema,
    onSubmit : (values) => {
      const obj = {asset_id : uploadedFiles[0]?.asset_id,public_id: uploadedFiles[0]?.public_id,url : `https://res.cloudinary.com/dhtjmbn8s/image/upload/${uploadedFiles[0]?.public_id}`,...values};
      if(bannerCatId === undefined) {
        try {
          dispatch(createCatBanner(obj));
          toast.success('success!');
          setUploadedFiles([]);
          formik.resetForm();
        }catch(err) {
          toast.error(err.message);
        }
      }else {
       
        dispatch(deleImages(publicId))
        dispatch(updateCatBanner({id : publicId,data: obj}));
        toast.success('success!');
        
      }
      
      
    }
  })
  return (
    <>
    <h3 className="fs-4 title">{bannerCatId ? 'Edit' : 'Add'} Banner Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
          <UploadWidget isRectangle={true} bannerCatId={bannerCatId} setUploadedFiles={setUploadedFiles} name="banner category"/>
          <div className="d-flex align-items-center m-3 justify-content-start flex-wrap gap-2">
            {
              uploadedFiles?.map((file,i) => {
                let str = "c_crop,g_custom";
                let newurl = file.url.replace(/(upload\/)/,"$1"+str+"/");
                return (
                  <div className="position-relative"
                  key={i}
                  data-id={file.public_id}
                  >
                    <button
                    type="button"
                    onClick={() => {
                      dispatch(deleImages(file.public_id));
                      setUploadedFiles((prev) => prev.filter((data) => file.public_id !== data.public_id));

                    }}
                    className="position-absolute cross bg-dark text-white border-0"
                    style={{top:'2%',right:'4%',borderRadius:'5px'}}
                    >
                      <GiCrossMark/>
                    </button>
                    <div className='position-relative'>
                      <ImagePlaceHolder width="240px" height="140px" imgLoaded={imgLoaded}/>
                      <img
                      key={imgKey} 
                      src={newurl}
                      onLoad={() => { setImageLoaded(true);
                      }}
                      style={{width:'240px',height:'140px',objectCover:'cover',objectPosition:'top left'}}/>
                    </div>
                    
                    
                    
                      
                      
                    
                  
                  </div>
                )
              })
            }

          </div>
          <Input type="text"
          placeholder="Enter name of the product"
          name="name"
          id="name"
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          val={formik.values.name}
          label="Product Name"
          />
          <div className="error">
            {
              formik.touched.name && formik.errors.name
            }
          </div>
          <Input type="text"
          placeholder="Enter Price of the product"
          name="price_range"
          id="price_range"
          onChange={formik.handleChange('price_range')}
          onBlur={formik.handleBlur('price_range')}
          val={formik.values.price_range}
          label="Price Range"
          />
          <div className="error">
            {
              formik.touched.price_range && formik.errors.price_range
            }
          </div>
          <Input type="text"
          placeholder="Enter type of the product"
          name="type"
          id="type"
          onChange={formik.handleChange('type')}
          onBlur={formik.handleBlur('type')}
          val={formik.values.type}
          label="Type"
          />
          <div className="error">
            {
              formik.touched.type && formik.errors.type
            }
          </div>
          <button type="submit" 
          className="btn btn-success my-5"
          >{bannerCatId ? 'Edit' : 'Add'} Category Banner</button>

      </form>
     </>
  )
}

export default AddBannerCat;