import React from 'react'

const ImagePlaceHolder = (props) => {
  const {width,height,imgLoaded} = props;
  return (
    <div               
    className="img-placeholder"
    style={{width:'240px',height:'140px',display: imgLoaded ? 'none' : ''}}
    ></div>
  )
}

export default ImagePlaceHolder