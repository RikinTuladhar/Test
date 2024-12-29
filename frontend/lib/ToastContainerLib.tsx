import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastContainerLib = () => {
  return (
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    
    />
  )
}

export default ToastContainerLib
