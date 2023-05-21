import React from 'react'

  const Input = (props) => {
  const {type,placeholder,label,id,name,onChange,onBlur,val} = props;
  return (
    <div className="form-floating mb-3">
        <input 
        type={type} 
        className='form-control' 
        name={name} 
        id={id}
        onChange={onChange}
        onBlur = {onBlur}
        value= {val}
        placeholder={placeholder}/>
        <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input