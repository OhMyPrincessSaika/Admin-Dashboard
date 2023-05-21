import React from 'react'
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  {useDispatch,useSelector} from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate ,redirect} from 'react-router-dom';
import { resetState } from '../utils/resetState';
import Loading from '../components/Loading';
import bgImage from '../images/bg.jpg';
import decode from 'jwt-decode'
const Login = () => {
  const [loading,setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [authorize,setAuthorize] = React.useState(false);
  const selector = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const {user,isLoading,isError,isSucceed,message} = selector;
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
      setLoading(true);
      try {
        await dispatch(login(values)).unwrap();
        redirect('/admin/')
      }catch(err) {
        console.log(err)
        setErr(err.message);
      }
    },
    
    validationSchema : schema
  });
  
  React.useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
     
      const decodedToken = decode(user.token);
      const currentTime = Date.now() / 1000;
      if(decodedToken.exp < currentTime) {
        console.log('token is expired');
        setAuthorize(false);
      }else {
        if(isSucceed && !isError && !isLoading) {
          setAuthorize(true);
          setTimeout(() => {
            navigate('/admin',{replace : 'true'})
          },300)
        }else if(isLoading) {
          setAuthorize(true);
        }else if(isError) {
          setAuthorize(false);
        }
      }

    }
 
  },[user,isSucceed,isError,isLoading])
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
            setAuthorize(true);
          }}
          val={formik.values.password}/>
         
          <div className="error">
             <p>{err}</p>
          </div>
         
          {/* <div className="mb-2">
            <Link to="/forgotpassword">forgot password?</Link>
          </div> */}
         
            <button type="submit" className="w-100 bg-warning py-2 rounded-2 mx-auto mt-3">Submit</button>
         
        </form>
      </div>
    </div>
  )
}

export default Login