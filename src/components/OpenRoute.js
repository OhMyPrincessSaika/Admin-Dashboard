import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
const OpenRoute = ({children}) => {
  const userSel = useSelector((state) => state.auth.user);
  const token = userSel?.token;
  console.log(token);
  return (
    <div>
        {token === undefined ? children : <Navigate to="/admin" replace={true}/>}
    </div>
  )
}

export default OpenRoute