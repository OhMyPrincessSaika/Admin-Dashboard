import React from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { GiCrossMark } from 'react-icons/gi';
import UploadWidget from '../components/UploadComponents';
import {deleImages} from '../features/upload/uploadSlice'
import {useDispatch,useSelector} from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Input from '../components/Input';
import {createBanner, getBanner, updateBanner} from '../features/banner/bannerSlice';
import {toast} from 'react-toastify';
import { resetState } from '../utils/resetState';
import ImagePlaceHolder from '../components/ImagePlaceHolder';
const AddBanner = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [publicId,setPublicId] = React.useState('');
  const bannerId = location.pathname.split('/')[3];
  // const [isEditing,setIsEditing] = React.useState(false);
  const [imgKey,setImgKey] = React.useState(Date.now());
  const [uploadedFiles,setUploadedFiles] = React.useState([]);
  const [imgLoaded,setImageLoaded] = React.useState(false);
  const bannerSel = useSelector((state) => state.banner.getBanner) ;
  React.useEffect(() => {
    if(bannerId) {
      dispatch(getBanner(bannerId));
     
    }else {
      dispatch(resetState());
      formik.resetForm();
    }
  },[bannerId])
  React.useEffect(() => {
    if(bannerSel && bannerId) {
      setUploadedFiles([{
        "public_id" : bannerSel?.public_id,
        "asset_id" : bannerSel?.asset_id,
        "url" : bannerSel?.url
      }]);
      setPublicId(bannerSel?.public_id);
    } 
  },[bannerSel])
  React.useEffect(() => {
      setImgKey(Date.now());
      setImageLoaded(false);
      // setPublicId(uploadedFiles[0]?.public_id);
  },[uploadedFiles])
  const schema = Yup.object().shape({

    name : Yup.string().required('product name is required! '),
    price_range : Yup.string().required('price_range is required!'),
    sale_text : Yup.string().required('sale_text is required!'),
    productId : Yup.string().required('product id is required')
  })
  const formik = useFormik({
    enableReinitialize :true,
    initialValues : {
      name : bannerId ? bannerSel?.name : '',
      price_range : bannerId ? bannerSel?.price_range : '',
      sale_text : bannerId ? bannerSel?.sale_text : '',
      productId : bannerId ? bannerSel?._id : ''
    },
    validationSchema : schema,
    onSubmit : (values) => {
      const obj = {asset_id : uploadedFiles[0]?.asset_id,public_id: uploadedFiles[0]?.public_id,url : `https://res.cloudinary.com/dhtjmbn8s/image/upload/${uploadedFiles[0]?.public_id}`,...values};
      if(bannerId === undefined) {
        try {
          dispatch(createBanner(obj));
          toast.success('success!');
          setUploadedFiles([]);
          formik.resetForm();
        }catch(err) {
          toast.error(err.message);
        }
      }else {
       
        dispatch(deleImages(publicId))
        dispatch(updateBanner({id : publicId,data: obj}));
        toast.success('success!');
        
      }
      
      
    }
  })
 
 
  return (
     <>
      <h3 className="fs-4 title">{bannerId ? 'Edit' : 'Add'} Banner</h3>
      <form action="" onSubmit={formik.handleSubmit}>
          <UploadWidget isRectangle={true} bannerId={bannerId} setUploadedFiles={setUploadedFiles} name="banner"/>
          <div className="d-flex align-items-center m-3 justify-content-start flex-wrap gap-2">
            {
              uploadedFiles?.map((file,i) => {
                console.log(file.url);
                const str = "c_crop,g_custom";
                const newStr = file.url.replace(/(upload\/)/,"$1"+str+"/");
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
                      src={newStr}
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
          placeholder="Enter sale text"
          name="sale_text"
          id="sale_text"
          onChange={formik.handleChange('sale_text')}
          onBlur={formik.handleBlur('sale_text')}
          val={formik.values.sale_text}
          label="Sale Text"
          />
          <div className="error">
            {
              formik.touched.sale_text && formik.errors.sale_text
            }
          </div>
          <Input type="text"
          placeholder="Enter Id of the product"
          name="productId"
          id="product_id"
          onChange={formik.handleChange('productId')}
          onBlur={formik.handleBlur('productId')}
          val={formik.values.productId}
          label="Product Id"
          />
          <div className="error">
            {
              formik.touched.productId && formik.errors.productId
            }
          </div>
          <button type="submit" 
          className="btn btn-success my-5"
          >{bannerId ? 'Edit' : 'Add'} Banner</button>

      </form>
     </>
  )
}

export default AddBanner