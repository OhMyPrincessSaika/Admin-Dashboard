import React from 'react'
import Input from '../components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  {useDispatch,useSelector} from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import decode from 'jwt-decode'
const Login = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userSel = useSelector((state) => state.auth.user);
  React.useEffect(() => {
    if(userSel?.token !== undefined) {
      const token = JSON.parse(localStorage.getItem('admin').token);
      if(token) {
         const decodedToken = decode(token);
         const currentTime = Date.now()/ 1000;
         if(decodedToken.exp < currentTime) {
          setErr('Token is expired')
         }else {
          navigate('/admin',{replace:true});
         }
        
      }
    }
  },[userSel]);
  const [err,setErr] = React.useState('')
 
  let schema = Yup.object().shape({
    email: Yup.string().email("Email should be valid").required("Email is required"),
    password : Yup.string().required("Password is required")
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password : ''
    },
    onSubmit: async(values) => {
      
      try {
        await dispatch(login(values)).unwrap();
      }catch(err) {
        console.log(err)
        setErr(err.message);
      }
    },
    
    validationSchema : schema
  });
  
  // React.useEffect(()=> {
  //   const user = JSON.parse(localStorage.getItem('admin'));
  //   if(user) {
     
  //     const decodedToken = decode(user.token);
  //     const currentTime = Date.now() / 1000;
  //     if(decodedToken.exp < currentTime) {
  //       console.log('token is expired');
       
  //     }else {
        
  //         setTimeout(() => {
  //           navigate('/admin',{replace : 'true'})
  //         },300)
        
  //     }

  //   }
 
  // },[userSel])
  return (
    <div className=" py-5 d-flex justify-content-center align-items-center" 
    style={{minHeight : "100vh",background:'linear-gradient(90deg,yellow,gold,rgba(255,200,255,0.5))'}}
    
    >
      <div className="my-5 bg-white rounded-3 p-4" style={{width : "320px"}}>
        <h3>Login</h3>
        <p>Login to your account.</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <Input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email" 
          onChange={formik.handleChange("email")}
          val={formik.values.email}
          label="Email" 
         />
         {formik.touched.email && formik.errors.email ? (
         <div className="error">{formik.errors.email}</div>
       ) : null}
          <Input 
          type="password" 
          id="password"
          name="password"
          placeholder="Password" 
          label="Password" 
          onChange={(e) => {
            formik.handleChange(e)
          
          }}
          val={formik.values.password}/>
         
          <div className="error">
             <p>{err}</p>
          </div>
         
          {/* <div className="mb-2">
            <Link to="/forgotpassword">forgot password?</Link>
          </div> */}
         
            <button type="submit" className="w-100 bg-warning py-2 rounded-2 mx-auto mt-3">Submit</button>
            <button type="button"
             onClick={() => {navigate('/register',{replace: true})}}
             className="w-100 bg-success py-2 rounded-2 mx-auto mt-3">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Login