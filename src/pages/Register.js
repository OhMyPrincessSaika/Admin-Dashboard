import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import Input from '../components/Input';
import {  register } from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled,setDisabled] = React.useState(true);
  const registered = useSelector((state) => state.auth?.registered);
  React.useEffect(() => {
    console.log(registered?.token);
    if(registered?.token !== undefined) {
      if(JSON.parse(localStorage.getItem('admin'))?.token) {
         navigate("/admin",{replace:true})
      } 
    }
  },[registered])
  const schema = Yup.object().shape({
    firstname : Yup.string().required('first name is required'),
    lastname : Yup.string().required("last name is required"),
    email : Yup.string().email('Email should be valid').required('Email is required'),
    password : Yup.string().required('Password is required'),
    gender : Yup.string().required('gender is required'),
    confirm_password : Yup.string().required("confirm password is required"),
    adminId : Yup.string().required('Admin Id is required in order to create account.Contact : <thurahtetzaw02@gmail.com>')
  })
  const formik = useFormik({
    initialValues : {
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        gender : "",
        confirm_password : "",
        adminId : ""
    },
    validationSchema : schema,
    onSubmit : (values) => {
        alert(JSON.stringify(values));
        dispatch(register(values));
       
       
    }
  })
  React.useEffect(() => {
    if(formik.values.password === formik.values.confirm_password) {
      setDisabled(false);
    }else {
      setDisabled(true);
    }
  },[formik.values.password,formik.values.confirm_password])
  console.log(disabled)
  return (
    <div className="bg-warning d-flex align-items-center jusitfy-content-center"
    style = {{
        minHeight: "100vh",
        width : '100%'
    }}
    >
        <div className="container-lg bg-white  p-4 rounded"
        style={{width:'400px'}}
        >
            <h3 className="mb-4">Admin Registeration</h3>
            <form onSubmit={formik.handleSubmit}>
                <Input
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
                val={formik.values.firstname}
                id="firstname"
                placeholder="First Name"
                label="First Name"
                type="text"
                />
                <div className="error">
                  {
                    formik.touched.firstname && formik.errors.firstname
                  }
                </div>
                <Input
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                val={formik.values.lastname}
                id="lastname"
                placeholder="Last Name"
                label="Last Name"
                type="text"
                />
                <div className="error">
                  {
                    formik.touched.lastname && formik.errors.lastname
                  }
                </div>
                <Input
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                val={formik.values.email}
                id="email"
                placeholder="Email"
                label="Email"
                type="email"
                />
                <div className="error">
                  {
                    formik.touched.email && formik.errors.email
                  }
                </div>
                <Input
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                val={formik.values.password}
                id="password"
                placeholder="Password"
                label="Password"
                type="password"
                />
                <div className="error">
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <Input
                className="mb-0"
                onChange={formik.handleChange("confirm_password")}
                onBlur={formik.handleBlur("confirm_password")}
                val={formik.values.confirm_password}
                id="confirm_password"
                placeholder="Confirm Pasword"
                label="Confirm Pasword"
                type="password"
                />
                <div className="error">
                  {
                    formik.touched.confirm_password && formik?.errors?.confirm_password
                  }
                  
                  {
                    formik.values.password !== formik.values.confirm_password ? "  passwords do not match!" : ''
                  }
                </div>
                 <input
                style={{verticalAlign:'middle'}}
                className="mx-2 my-3"
                onChange={formik.handleChange('gender')}
                onBlur={formik.handleChange('gender')}
                type="radio"
                name="gender"
                value='male'
                id="male"
                />
                <label htmlFor='male'>Male</label>
                <input
                  style={{verticalAlign:'middle'}}
                  className="mx-2 my-3"
                type="radio"
                onChange={formik.handleChange('gender')}
                onBlur={formik.handleChange('gender')}
                name="gender"
                value='female'
                id="female"
                />
                <label htmlFor="female">Female</label>
                <div className="error">
                  {
                    formik.touched.gender && formik.errors.gender
                  }
                </div>
                <Input
                onChange={formik.handleChange("adminId")}
                onBlur={formik.handleBlur("adminId")}
                val={formik.values.adminId}
                id="adminId"
                placeholder="AdminId"
                label="AdminId"
                type="text"
                />
                <div className="error">
                  {
                    formik.touched.adminId && formik.errors.adminId
                  }
                </div>
                <button type="submit" disabled={disabled} className=" bg-success  px-3 py-1 text-white  border border-1 rounded">
                  Register
                </button>
                <button type="button" onClick={() => {navigate("/login",{replace:true})}} className=" mx-2  border-0 px-3 py-1 rounded">
                  Back to Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Register