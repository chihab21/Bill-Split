import React from 'react'

const Button = ({children,closeopen}) => {
  return (
   <button  onClick={closeopen}  className='button'> {children} </button>
  )
}

export default Button
