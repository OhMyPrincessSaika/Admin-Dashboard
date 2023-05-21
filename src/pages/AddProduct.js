import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from '../components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'
import {useDispatch,useSelector} from 'react-redux'
import { getAllBrands } from '../features/brand/brandSlice';
import { getAllCategories } from '../features/pcategory/pCategorySlice';
import { getAllColors } from '../features/color/colorSlice';
import makeAnimated from 'react-select/animated';
import {deleImages, uploadImages,} from '../features/upload/uploadSlice'
import {GiCrossMark} from 'react-icons/gi';
import {createProduct,getProduct,updateProduct} from '../features/product/productSlice'
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
import { useNavigate,useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';
import UploadWidget from '../components/UploadComponents';

const AddProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[3];
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllColors());
  },[productId])
  const [isLoading,setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [uploadedFiles,setUploadedFiles] = React.useState([]);
  const prodSel = useSelector((state) => state.product);
  const [colors,setColors] = React.useState([]);
  
  console.log(uploadedFiles);

  React.useEffect(()=> {
    formik.values.color = colors ? colors : null;
  },[colors])
  // console.log(uploadedFiles)

  React.useEffect(() => {
      if(productId) {
       dispatch(getProduct(productId));
     
        formik.values.brand =prodSel?.product?.brand;
        formik.values.title = prodSel?.product?.title;
        formik.values.category = prodSel?.product?.category;
        formik.values.description = prodSel?.product?.description;
        formik.values.quantity = prodSel?.product?.quantity;
        formik.values.price = prodSel?.product?.price;
    }else {
      dispatch(resetState())
    }
  },[productId]);
  React.useEffect(() => {
    if(prodSel) {
      setUploadedFiles(prodSel.product.images)
    }
  },[prodSel])
  let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description : Yup.string().required("Descritpion is required"),
    price : Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    color: Yup
    .array()
    .required('Color is required'),
    quantity: Yup.number().required('Qunatity is required'),
    tag : Yup.string().required('Tag is required')
  });
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: prodSel?.product?.title || '',
      description : prodSel?.product?.description || '',
      price: prodSel?.product?.price || '',
      brand: prodSel?.product?.brand || '',
      category: prodSel?.product?.category || '',
      color: '',
      tag : prodSel?.product?.tag  ||  '',
      quantity: prodSel?.product?.quantity || '',
    },
    onSubmit: async(values) => {
      alert(JSON.stringify(values));
      setIsLoading(true);
      const obj = {
        ...values,
        images : uploadedFiles
      }
      if(productId) {
        const data = {id : productId,productData : obj}
        try {
          const result = await dispatch(updateProduct(data)).unwrap();
          toast.success('edited successfully');
        }catch(err) {
          toast.error('something went wrong!');
          setIsLoading(false);
        }
        formik.resetForm();
        dispatch(resetState());
        setTimeout(()=> {
          navigate('/admin/product-list');
          setIsLoading(false);
        },300)
          
      }else {
        try {
          const result = await  dispatch(createProduct(obj)).unwrap();
          if(result) {
            toast.success('product added successfully')
            formik.resetForm();
            // setColors(null);
            setTimeout(()=> {
              dispatch(resetState());
              navigate('/admin/product-list')
              setIsLoading(false);
            },2000)
  
          }else{
            toast.error('something went wrong!')
            setIsLoading(false);
          }
        }catch(err) {
          toast.error('something went wrong!');
          setIsLoading(false);

      }
      }
     
    },
    validationSchema : schema
  });
  
 
 
const animatedComponents = makeAnimated();

    const options =  []
    const brandSel = useSelector((state) =>  state?.brand?.brands?.brands);
    const categorySel = useSelector((state) => state?.category?.categories?.categories);
    const colorSel = useSelector((state) => state?.color?.colors);
    const loading = useSelector((state)=> state.upload.isLoading);
   
   
    colorSel.forEach((color) => {
      options.push({
        value: color.color,
        label: color.color
      })
    })
  

  return (
      <div className="position-relative">
          <div>   
              <h3 className="mb-4 title">
                  {productId ? 'Edit' : 'Add' } Product
              </h3>  
              {isLoading
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
                <div>
                  <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
                  <Input type="text"  
                  name="title" 
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur('title')} 
                  label="Enter Product Title" 
                  placeholder="Product Name" 
                  id="prod_name"
                  val={formik.values.title}/>
                  <div className="error">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3">
                      <ReactQuill 
                      theme="snow" 
                      
                      onChange={formik.handleChange('description')}
                      value={formik.values.description}
                      name="description" 
                      />
                  </div>
                  <div className="error">
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <Input  
                  type="number" 
                  label="Enter Price" 
                  placeholder="Price" 
                  id="prod_price" 
                  name="price"
                  onChange={formik.handleChange('price')}
                  onBlur={formik.handleBlur('price')}
                  val={formik.values.price}
                  />
                  <div className="error">
                    {formik.touched.price && formik.errors.price}
                  </div>
                  <select 
                  name="brand"
                  onChange={formik.handleChange('brand')}
                  onBlur={formik.handleBlur('brand')}
                  value={formik.values.brand}
                  className="mb-3 form-control py-3">
                      <option value="">Select Brand</option>
                      {brandSel ? 
                      brandSel.map((brand,i) => {
                        return <option key={i} value={brand.brand}>{brand.brand}</option>
                      })
                      :
                      null
                      }
                  </select>
                  <div className="error">
                    {formik.touched.brand  && formik.errors.brand}
                  </div>
                  <select 
                  name="category"
                  onChange={formik.handleChange('category')}
                  onBlur={formik.handleBlur('category')}
                  value={formik.values.category}
                  className="mb-3 form-control py-3">
                      <option value="">Select Category</option>
                      {
                        categorySel ?
                        categorySel.map((category,i) => {
                          return <option key={i} value={category.category}>{category.category}</option>
                        })
                        :
                        null
                      }
                  </select>
                  <div className="error">
                    {formik.touched.category && formik.errors.category}
                  </div>
                  <Select 
                  name="color"
                  className="mb-4 mt-1"
                  placeholder="Select Colors"
                  options={options} 
                  value={colors}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={(e) => {
                    setColors(e);
                  }}
                
                  />
                  <div className="error">
                    {formik.touched.color && formik.errors.color}
                  </div>
                   <Input type="text"  
                  name="tag" 
                  onChange={formik.handleChange("tag")}
                  onBlur={formik.handleBlur('tag')} 
                  label="Tags" 
                  placeholder="Tags" 
                  id="tag"
                  val={formik.values.tag}/>
                  <div className="error">
                    {formik.touched.tag && formik.errors.tag}
                  </div>
                  <Input 
                  name="quantity" 
                  type="number" 
                  label="Quantity" 
                  placeholder="Quantity"
                  onChange={formik.handleChange('quantity')}
                  onBlur={formik.handleBlur('qunatity')}
                  val={formik.values.quantity} 
                  id="prod_quantity"/>
                  <div className="error">
                    {formik.touched.quantity && formik.errors.quantity}
                  </div>
                <div className="bg-white border p-5 text-center">
                  <UploadWidget setUploadedFiles={setUploadedFiles} name="product"/>
                
                
                </div>
                <div style={{position:'relative'}}>
                  <div>
                    {
                      loading ?
                      <Loading/>
                      :
                      null
                    }
                  </div>
                  <div className="my-2 d-flex flex-wrap gap-3">
                
                      {  
                      uploadedFiles?.map((image,i) => {
                      return (
                        
                          <div key={image.public_id}  className='product' data-id={image.public_id} style={{position:'relative',border:'1px solid gold'}}>
                            <img src={image.url} alt={image.asset_id} style={{'width':'140px','height':'200px'}}></img>
                            <button 
                            type='button'
                            onClick={() => {
                              dispatch(deleImages(image.public_id));
                          
                              const product = document.querySelector(`[data-id="${image.public_id}"]`);
                              if (product && product.parentNode) {
                                product.parentNode.removeChild(product);
                              }
                            }
        
                            }
                            className="border-1 bg-dark" 
                            style={{borderRadius:'4px',position:'absolute',top:'4%',right:'4%'}}>
                              <GiCrossMark className="text-white"/>
                            </button>
                          </div>
                        
                      )
                      })
                      }
                  </div>
                </div>
                  <button
                      type='submit' 
                      className="btn btn-success border-0 rounded-3 my-5">
                      {productId ? 'Edit' : 'Add' } Product
                  </button> 
                  </form>
                </div>
              }
          </div>
        
      </div>

    
  )
}

export default AddProduct