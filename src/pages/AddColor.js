import React from 'react'
import Input from '../components/Input';
import {useDispatch,useSelector} from 'react-redux';
import { createColor, getColor, updateColor } from '../features/color/colorSlice';
import {useNavigate,useLocation} from 'react-router-dom';
import * as Yup from 'yup';
import {toast} from 'react-toastify'
import {useFormik} from 'formik';
import Loading from '../components/Loading';
import { resetState } from '../utils/resetState';
const AddColor = () => {
  const [loading,setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const colorId = location.pathname.split('/')[3];
  const colorSel = useSelector((state)=> state.color);
  const {color : {color}} = colorSel;
  console.log(color);
  React.useEffect(()=> {
    if(colorId !== undefined) {
      dispatch(getColor(colorId));
      formik.values.color = color;
    }else {
      dispatch(resetState());
    }
  },[colorId])
  const schema = Yup.object().shape({
    "color" : Yup.string().required('Color is required.')
  })
  const formik = useFormik({
    initialValues : {
      "color" : ''
    },
    validationSchema:schema,
    onSubmit : async(values) => {
      setLoading(true);
      if(colorId !== undefined) {
        try {
          await dispatch(updateColor(colorId)).unwrap();
          toast.success('color edited successfully..');
          setTimeout(()=> {
            navigate('/admin/color-list');
            setLoading(false);
          },1000)
        }catch(err) {
          toast.error('something went wrong!');
          setLoading(false);
        }
      }else {
        try { 
          const result =  await  dispatch(createColor(values)).unwrap();
          if(result) {
            toast.success('Color added successfully..')
            formik.resetForm();
            setTimeout(() => {
              navigate('/admin/color-list')
              setLoading(false);
            },1000)
  
          }else {
            toast.error('something went wrong!')
            setLoading(false);
          }
        }catch(err) {
          toast.error(err.message);
          setLoading(false);
        }
      }
     
    }
  });
  
  return (
    <div>
        <h3 className="mb-4 title">{colorId ? "Edit" : "Add"} Color</h3>
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
              <form action="" onSubmit={formik.handleSubmit}>
                  <Input 
                  type="color" 
                  label="Select Color" 
                  placeholder="Select Color"
                  val={formik.values.color}
                  name="color"
                  onChange={formik.handleChange('color')}
                  onBlur={formik.handleBlur('color')} 
                  id="color"/>
                  <button
                  type='submit' 
                  className="btn btn-success border-0 rounded-3 my-5">
                      {colorId ? "Edit" : "Add"} Color
                  </button>
                  {
                    colorId &&
                    <button className="btn bg-white rounded-3 ms-3 text-dark" type="button" onClick={()=>navigate('/admin/color-list')}>
                    Cancel
                  </button>
                  }
              </form>
          </div>
        </>
        }
    </div>
  )
}

export default AddColor