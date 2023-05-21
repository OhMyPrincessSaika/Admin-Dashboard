import React from 'react'
import Input from '../components/Input';
const ResetPassword = () => {
  return (
    <div className="bg-warning py-5 d-flex justify-content-center align-items-center" style={{minHeight : "100vh"}}>
      <div className="my-5 bg-white rounded-3 p-4" style={{width : "320px"}}>
        <h3>Reset Password</h3>
        <p>Enter new password</p>
        <Input type="password" id="pass" placeholder="New Password" label="New Password"/>
        <Input type="password" id="confirmpass" placeholder="Confirm Password" label="Confirm Password"/>
        <button type="submit" className="w-100 bg-warning py-2 rounded-2 mx-auto mt-3">Reset Password</button>
      </div>
    </div>
  )
}

export default ResetPassword