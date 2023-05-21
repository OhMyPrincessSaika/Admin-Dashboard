import React from 'react'
import {Spin} from 'antd';
const Loading = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
        <Spin size={props.size ? props.size : 'small'} className="me-2" />  <span className="text-white fs-6">{props.title}...</span>
    </div>
  )
}

export default Loading